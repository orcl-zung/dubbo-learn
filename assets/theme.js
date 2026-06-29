/* ============================================================
   dubbo-learn · 主题切换组件（assets/theme.js）
   在 <head> 中【同步、不加 defer】引入，置于样式表之后：
     <script src="../assets/theme.js"></script>
   行为：
   · 首次访问跟随系统（prefers-color-scheme）；
   · 点击右上角按钮手动切换，选择写入 localStorage 持久化；
   · 手动指定后不再跟随系统变化（撤销手动设置可清 localStorage）。
   通过设置 <html data-theme="light|dark"> 驱动 CSS 变量。
   ============================================================ */
(function () {
  "use strict";
  var root = document.documentElement;
  var KEY = "dubbo-learn-theme";
  var mql = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function savedTheme() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setSaved(t)  { try { localStorage.setItem(KEY, t); } catch (e) {} }
  function systemDark() { return !!(mql && mql.matches); }
  function current()    { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }

  function applyInitial() {
    var s = savedTheme();
    root.setAttribute("data-theme",
      (s === "light" || s === "dark") ? s : (systemDark() ? "dark" : "light"));
  }

  var MOON = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">' +
    '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" fill="currentColor"/></svg>';
  var SUN = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" ' +
    'stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
    '<circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>' +
    '<line x1="12" y1="2.5" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="21.5"/>' +
    '<line x1="2.5" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="21.5" y2="12"/>' +
    '<line x1="5.2" y1="5.2" x2="6.6" y2="6.6"/><line x1="17.4" y1="17.4" x2="18.8" y2="18.8"/>' +
    '<line x1="5.2" y1="18.8" x2="6.6" y2="17.4"/><line x1="17.4" y1="6.6" x2="18.8" y2="5.2"/></svg>';
  function icon() { return current() === "dark" ? SUN : MOON; }

  function refreshBtn() {
    var b = document.querySelector(".theme-toggle");
    if (b) b.innerHTML = icon();
  }

  function buildToggle() {
    if (document.querySelector(".theme-toggle")) return;
    var btn = document.createElement("button");
    btn.className = "theme-toggle";
    btn.type = "button";
    btn.setAttribute("aria-label", "切换深色 / 浅色模式");
    btn.title = "切换深色 / 浅色模式";
    btn.innerHTML = icon();
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      setSaved(next);
      btn.innerHTML = icon();
    });
    document.body.appendChild(btn);
  }

  // 1. 同步应用初始主题（放在 head，先于 body 渲染，避免闪烁）
  applyInitial();

  // 2. 系统主题变化：仅当用户未手动指定时跟随
  if (mql && mql.addEventListener) {
    mql.addEventListener("change", function () {
      if (!savedTheme()) {
        root.setAttribute("data-theme", systemDark() ? "dark" : "light");
        refreshBtn();
      }
    });
  }

  // 3. DOM 就绪后注入按钮
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildToggle);
  } else {
    buildToggle();
  }
})();
