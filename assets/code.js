/* ============================================================
   dubbo-learn · 代码高亮 + 一键复制（assets/code.js）
   每个页面在 <head> 末尾 <script src="../assets/code.js" defer></script>
   · 自动识别 Java / YAML / XML / Bash 并高亮（也可在 <code class="language-xxx"> 显式指定）
   · 给每个 <pre> 注入右上角「复制」按钮（悬停浮现）
   · 高亮只处理 <pre><code>；行内 <code> 不动
   · 配色走 CSS 变量，随浅/深主题自适应
   ============================================================ */
(function () {
  "use strict";

  // 每种语言一组「优先级从高到低」的 [token名, 正则源]；用命名分组拼成一条总正则
  var RULES = {
    java: [
      ["comment", "\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/"],
      ["string",  "\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*'"],
      ["anno",    "@[A-Za-z_]\\w*"],
      ["keyword", "\\b(?:public|private|protected|static|final|abstract|class|interface|enum|void|return|new|import|package|extends|implements|throws?|try|catch|finally|if|else|for|while|switch|case|default|break|continue|this|super|null|true|false|int|long|short|byte|float|double|boolean|char|var|synchronized|volatile|transient|native|instanceof|do)\\b"],
      ["type",    "\\b[A-Z][A-Za-z0-9_]*\\b"],
      ["number",  "\\b0[xX][0-9a-fA-F]+\\b|\\b\\d[\\d_]*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fFdDlL]?\\b"]
    ],
    yaml: [
      ["comment", "#.*"],
      ["string",  "\"(?:\\\\.|[^\"\\\\])*\"|'[^']*'"],
      ["number",  "\\b\\d+(?:\\.\\d+)?\\b"],
      ["keyword", "\\b(?:true|false|null|yes|no|on|off)\\b"],
      ["attr",    "^[ \\t]*[\\w.\\-]+(?=:[ \\t]|:$)"]
    ],
    xml: [
      ["comment", "<!--[\\s\\S]*?-->"],
      ["string",  "\"[^\"]*\""],
      ["tag",     "<[\\/!?]?[A-Za-z_][\\w.\\-]*|\\/?>"],
      ["attr",    "[\\w.\\-:]+(?=\\s*=)"]
    ],
    bash: [
      ["comment", "#.*"],
      ["string",  "\"(?:\\\\.|[^\"\\\\])*\"|'[^']*'"],
      ["keyword", "\\b(?:cd|mvn|docker|java|sudo|sh|source|export|echo|cat|ls|mkdir|rm|cp|run|exec|start|install|clean)\\b"],
      ["number",  "\\b\\d+\\b"]
    ]
  };

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function highlight(code, lang) {
    var rules = RULES[lang];
    if (!rules) return esc(code);
    var re = new RegExp(rules.map(function (r) { return "(?<" + r[0] + ">" + r[1] + ")"; }).join("|"), "gm");
    var out = "", last = 0, m;
    while ((m = re.exec(code)) !== null) {
      if (m.index > last) out += esc(code.slice(last, m.index));
      var g = m.groups || {}, name = null;
      for (var i = 0; i < rules.length; i++) {
        if (g[rules[i][0]] != null) { name = rules[i][0]; break; }
      }
      out += '<span class="tok-' + name + '">' + esc(m[0]) + "</span>";
      last = m.index + m[0].length;
      if (m[0].length === 0) re.lastIndex++; // 防零宽死循环
    }
    if (last < code.length) out += esc(code.slice(last));
    return out;
  }

  function langOfClass(code) {
    var m = /language-(\w+)/.exec(code.className || "");
    return m && RULES[m[1]] ? m[1] : null;
  }

  // 启发式识别（不写 language- 类时用）
  function detectLang(text) {
    if (/<\?xml|<\/[A-Za-z]/.test(text)) return "xml";
    if ((/^[ \t]*#/m.test(text) || /^[ \t]*(?:cd|mvn|docker|java|sh|sudo)\b/m.test(text))
        && /\b(?:mvn|docker|cd|sudo|sh|java|export)\b/.test(text)) return "bash";
    if (/^[ \t]*[\w.\-]+:[ \t]*\S/m.test(text) || /dubbo:[ \t]*$/m.test(text)) {
      if (/\n[ \t]+[\w.\-]+:[ \t]/.test(text) || /dubbo:/.test(text)) return "yaml";
    }
    if (/\b(?:package|import|public|private|protected|static|final|void|class|interface|enum|new|return|throws?)\b/.test(text)) return "java";
    if (/\/\/.*|\.\w+\(|;\s*$|\{[^}]*\}/.test(text)) return "java";
    return null;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // file:// 等非安全上下文的兜底
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    });
  }

  function enhance(pre) {
    var code = pre.querySelector("code");
    if (!code) return; // 只处理 <pre><code>

    // 高亮（幂等：已处理则跳过）
    if (!code.getAttribute("data-hl")) {
      var lang = langOfClass(code) || detectLang(code.textContent);
      if (lang) code.innerHTML = highlight(code.textContent, lang);
      code.setAttribute("data-hl", "1");
    }

    // 复制按钮（幂等）；带 data-nocopy 的块（如依赖关系图）不加按钮
    if (pre.hasAttribute("data-nocopy") || pre.querySelector(".copy-btn")) return;
    var btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "复制代码");
    btn.textContent = "复制";
    btn.addEventListener("click", function () {
      copyText(code.textContent).then(function () {
        btn.textContent = "已复制 ✓";
        btn.classList.add("copied");
      }, function () {
        btn.textContent = "复制失败";
      }).then(function () {
        setTimeout(function () { btn.textContent = "复制"; btn.classList.remove("copied"); }, 1500);
      });
    });
    pre.appendChild(btn);
  }

  function init() {
    document.querySelectorAll("pre").forEach(enhance);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
