/**
 * 龙械库 × HyperFrames 适配层
 *
 * 让龙械库动画引擎与 HyperFrames 视频渲染管线无缝对接。
 *
 * 用法：
 * 在 HyperFrames composition 的 <head> 中引入：
 *
 * <script src="./path/to/龙械库-hyperframes-适配.js"></script>
 * <script type="importmap">
 * {
 *   "imports": {
 *     "longrhythm": "./path/to/龙械库.js"
 *   }
 * }
 * </script>
 * <script type="module">
 *   import { 起, 涌, 谱 } from 'longrhythm';
 *   import '龙械库/hyperframes-适配.js';
 *
 *   // 注册到 HyperFrames 时间线
 *   window.龙械注册(谱()
 *     .起('.title', { 签名: '寒', 时长: 800 })
 *     .涌('.cards', { 签名: '弹', 节奏: '涟漪' })
 *   );
 * </script>
 *
 * 原理：HyperFrames 通过 window.__hfAnime 数组
 * 寻找实现了 seek(timeMs) 接口的动画实例。
 * 该适配层将龙械库的动画实例桥接到这个接口。
 */

(function() {
'use strict';

// 确保 HyperFrames 环境检测
const isHyperFrames = typeof window !== 'undefined' &&
  (window.__hyperframes !== undefined ||
   document.querySelector('[data-composition-id]'));

/**
 * 注册一个或多个动画实例到 HyperFrames 时间线
 * @param {Object|Object[]} 实例 - 龙械库动画实例（animate 或 timeline 返回值）
 */
window.龙械注册 = function(实例) {
  if (!实例) return;

  window.__hfAnime = window.__hfAnime || [];
  const instances = Array.isArray(实例) ? 实例 : [实例];

  instances.forEach(inst => {
    if (inst && typeof inst.seek === 'function') {
      // 已存在则不重复添加
      if (!window.__hfAnime.includes(inst)) {
        window.__hfAnime.push(inst);
      }
    }
  });
};

/**
 * 自动发现：扫描 window.龙械 上所有谱()创建的 timeline 实例
 * 在页面加载完成后自动执行
 */
if (isHyperFrames) {
  // 延迟执行，给 composition 脚本加载时间
  const observer = new MutationObserver(() => {
    if (window.__hfAnime && window.__hfAnime.length > 0) {
      observer.disconnect();
    }
    // 尝试从 anime.running 自动发现（龙械库底层用 anime.js）
    if (typeof window.anime !== 'undefined' &&
        Array.isArray(window.anime.running) &&
        window.anime.running.length > 0) {
      window.__hfAnime = window.__hfAnime || [];
      window.anime.running.forEach(inst => {
        if (!window.__hfAnime.includes(inst)) {
          window.__hfAnime.push(inst);
        }
      });
    }
  });
  observer.observe(document, { childList: true, subtree: true });

  // 超时断连（5秒）
  setTimeout(() => observer.disconnect(), 5000);
}

console.log('[龙械库] HyperFrames 适配层已加载');

})();
