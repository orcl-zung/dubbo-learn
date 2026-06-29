/* ============================================================
   dubbo-learn · 可复用测验组件（assets/quiz.js）
   用法：在任意 HTML 中放
     <div class="quiz" data-quiz='{
        "title":"本课练手",
        "questions":[
          {"q":"题干","options":["A","B","C","D"],"answer":1,"explain":"解析"}
        ]
     }'></div>
     <script src="../assets/quiz.js"></script>
   answer 为正确选项的下标（从 0 起）。点击即给即时反馈，结束后给总分。
   ============================================================ */
(function () {
  "use strict";

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function render(root, data) {
    if (!data || !Array.isArray(data.questions)) return;
    if (data.title) {
      root.appendChild(el("div", "quiz-title", data.title));
    }

    const answered = new Array(data.questions.length).fill(null);

    data.questions.forEach(function (q, qi) {
      const block = el("div", "quiz-q");
      const text = el("div", "q-text",
        '<span class="q-num">Q' + (qi + 1) + '</span>' + escapeHtml(q.q));
      block.appendChild(text);

      const opts = el("ol", "quiz-options");
      q.options.forEach(function (opt, oi) {
        const li = el("li");
        const key = String.fromCharCode(65 + oi);
        const btn = el("button", "quiz-btn",
          '<span class="opt-key">' + key + '</span>' + escapeHtml(opt));
        btn.type = "button";
        btn.addEventListener("click", function () {
          if (answered[qi] !== null) return; // 锁定，不重复作答
          answered[qi] = oi;
          opts.querySelectorAll(".quiz-btn").forEach(function (b) { b.classList.add("locked"); });
          if (oi === q.answer) {
            btn.classList.add("correct");
          } else {
            btn.classList.add("wrong");
            // 同时高亮正确答案
            opts.children[q.answer].querySelector(".quiz-btn").classList.add("correct");
          }
          const ex = block.querySelector(".quiz-explain");
          if (ex) ex.classList.add("show");
          updateScore();
        });
        li.appendChild(btn);
        opts.appendChild(li);
      });
      block.appendChild(opts);

      if (q.explain) {
        block.appendChild(el("div", "quiz-explain", "💡 " + escapeHtml(q.explain)));
      }
      root.appendChild(block);
    });

    const score = el("div", "quiz-score");
    root.appendChild(score);

    function updateScore() {
      const done = answered.filter(function (a) { return a !== null; }).length;
      if (done === 0) return;
      const right = answered.reduce(function (sum, a, i) {
        return sum + (a === data.questions[i].answer ? 1 : 0);
      }, 0);
      score.classList.add("show");
      score.innerHTML =
        "已答 " + done + "/" + data.questions.length +
        "　·　正确 " + right + "/" + data.questions.length +
        (done === data.questions.length && right === data.questions.length
          ? "　🎉 全对！" : "");
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function init() {
    document.querySelectorAll("[data-quiz]").forEach(function (node) {
      let data;
      try { data = JSON.parse(node.getAttribute("data-quiz")); }
      catch (e) { node.innerHTML = '<div class="quiz-explain show">测验数据解析失败</div>'; return; }
      render(node, data);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
