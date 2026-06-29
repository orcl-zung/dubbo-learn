/* ============================================================
   dubbo-learn · 可复用 Dubbo 架构流程图（assets/diagram.js）
   用法：<div class="arch-diagram" data-dubbo-arch data-highlight="3"></div>
        <script src="../assets/diagram.js" defer></script>
   data-highlight 可选，取值 "0".."5"，高亮某一步（其余变淡）。
   配色经 CSS 变量驱动，随浅/深主题自适应（见 assets/style.css）。
   经典五角色：Container / Provider / Registry / Consumer / Monitor
   ============================================================ */
(function () {
  "use strict";

  // 颜色全部走 CSS 变量，保证深色模式下可见
  var NODE = 'rx="8" style="fill:var(--arch-node-fill);stroke:var(--ink);stroke-width:1.6"';
  var NL   = 'style="fill:var(--ink)"';
  var SL   = 'style="fill:var(--ink-soft)"';
  var EDGE = 'fill="none" stroke-width="1.5" marker-end="url(#dubArrow)" style="stroke:var(--ink)"';

  function badge(n, cx, cy) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="11" style="fill:var(--accent)"/>' +
      '<text x="' + cx + '" y="' + (cy + 3.5) + '" text-anchor="middle" ' +
      'font-family="-apple-system,sans-serif" font-size="12" font-weight="700" fill="#fff">' + n + '</text>';
  }

  var svg = [
'<svg viewBox="0 0 760 440" role="img" aria-label="Dubbo 角色与调用流程图">',
  '<defs>',
    '<marker id="dubArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">',
      '<path d="M0,0 L10,5 L0,10 z" style="fill:var(--ink)"/>',
    '</marker>',
  '</defs>',
  '<g>',
    '<rect x="20"  y="190" width="120" height="64" ' + NODE + '/>',
    '<text x="80"  y="218" text-anchor="middle" font-family="-apple-system,Helvetica Neue,PingFang SC,sans-serif" font-size="13" font-weight="700" ' + NL + '>Container</text>',
    '<text x="80"  y="236" text-anchor="middle" font-family="-apple-system,Helvetica Neue,PingFang SC,sans-serif" font-size="11" ' + SL + '>服务容器</text>',

    '<rect x="280" y="54"  width="120" height="64" ' + NODE + '/>',
    '<text x="340" y="82"  text-anchor="middle" font-family="-apple-system,Helvetica Neue,PingFang SC,sans-serif" font-size="13" font-weight="700" ' + NL + '>Provider</text>',
    '<text x="340" y="100" text-anchor="middle" font-family="-apple-system,Helvetica Neue,PingFang SC,sans-serif" font-size="11" ' + SL + '>服务提供者</text>',

    '<rect x="280" y="200" width="120" height="64" ' + NODE + '/>',
    '<text x="340" y="228" text-anchor="middle" font-family="-apple-system,Helvetica Neue,PingFang SC,sans-serif" font-size="13" font-weight="700" ' + NL + '>Registry</text>',
    '<text x="340" y="246" text-anchor="middle" font-family="-apple-system,Helvetica Neue,PingFang SC,sans-serif" font-size="11" ' + SL + '>注册中心</text>',

    '<rect x="280" y="346" width="120" height="64" ' + NODE + '/>',
    '<text x="340" y="374" text-anchor="middle" font-family="-apple-system,Helvetica Neue,PingFang SC,sans-serif" font-size="13" font-weight="700" ' + NL + '>Consumer</text>',
    '<text x="340" y="392" text-anchor="middle" font-family="-apple-system,Helvetica Neue,PingFang SC,sans-serif" font-size="11" ' + SL + '>服务消费者</text>',

    '<rect x="600" y="200" width="120" height="64" ' + NODE + '/>',
    '<text x="660" y="228" text-anchor="middle" font-family="-apple-system,Helvetica Neue,PingFang SC,sans-serif" font-size="13" font-weight="700" ' + NL + '>Monitor</text>',
    '<text x="660" y="246" text-anchor="middle" font-family="-apple-system,Helvetica Neue,PingFang SC,sans-serif" font-size="11" ' + SL + '>监控中心</text>',
  '</g>',

  '<g class="arch-step arch-step-0">',
    '<path d="M140,208 L272,100" ' + EDGE + '/>',
    '<text x="150" y="150" font-family="-apple-system,sans-serif" font-size="11" ' + SL + '>启动</text>',
    badge(0, 196, 150),
  '</g>',
  '<g class="arch-step arch-step-1">',
    '<path d="M358,120 L358,196" ' + EDGE + '/>',
    '<text x="368" y="162" font-family="-apple-system,sans-serif" font-size="11" ' + SL + '>注册</text>',
    badge(1, 358, 158),
  '</g>',
  '<g class="arch-step arch-step-2">',
    '<path d="M358,344 L358,270" ' + EDGE + '/>',
    '<text x="368" y="312" font-family="-apple-system,sans-serif" font-size="11" ' + SL + '>订阅</text>',
    badge(2, 358, 306),
  '</g>',
  '<g class="arch-step arch-step-3">',
    '<path d="M322,266 L322,342" ' + EDGE + '/>',
    '<text x="300" y="312" text-anchor="end" font-family="-apple-system,sans-serif" font-size="11" ' + SL + '>通知</text>',
    badge(3, 322, 306),
  '</g>',
  '<g class="arch-step arch-step-4">',
    '<path d="M282,362 C214,330 214,132 282,100" ' + EDGE + '/>',
    '<text x="150" y="300" font-family="-apple-system,sans-serif" font-size="11" ' + SL + '>调用</text>',
    badge(4, 224, 232),
  '</g>',
  '<g class="arch-step arch-step-5">',
    '<path d="M400,92 C486,92 542,150 598,208" ' + EDGE + '/>',
    '<path d="M400,372 C486,372 542,300 598,256" ' + EDGE + '/>',
    '<text x="498" y="150" font-family="-apple-system,sans-serif" font-size="11" ' + SL + '>统计/分钟</text>',
    badge(5, 500, 188),
  '</g>',
'</svg>'
  ].join("");

  function init() {
    document.querySelectorAll("[data-dubbo-arch]").forEach(function (node) {
      node.classList.add("arch-diagram");
      node.innerHTML = svg;
      var hi = node.getAttribute("data-highlight");
      if (hi) {
        node.querySelectorAll(".arch-step").forEach(function (g) {
          g.style.opacity = g.classList.contains("arch-step-" + hi) ? "1" : "0.2";
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
