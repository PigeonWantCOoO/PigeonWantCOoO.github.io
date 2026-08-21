/* =============================================================
 * icons.js —— Lucide 描边 SVG 内联注册表 + 自动注入
 * 库：Lucide（stroke-width 1.75, fill none, stroke currentColor）
 * 尺寸约定：inline 16 / button 20 / standalone 24 / hero 28
 * 用法：<i data-icon="robot" data-size="24"></i>  （i 标签仅作占位，无语义）
 * 依赖：无。离线可用，绝对不使用 emoji。
 * ============================================================= */
(function (global) {
  'use strict';

  // 每个条目为 svg 内部 path 标记（viewBox 0 0 24 24）
  var ICONS = {
    robot:
      '<rect width="10" height="10" x="7" y="9" rx="2"/>' +
      '<circle cx="12" cy="14" r="1"/>' +
      '<path d="M12 9V5"/>' +
      '<path d="M6.6 9a2 2 0 0 1-.6-1.5V5a2 2 0 0 1 2-2h1"/>' +
      '<path d="M17.4 9a2 2 0 0 0 .6-1.5V5a2 2 0 0 0-2-2h-1"/>' +
      '<path d="M17.4 11H20a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1"/>' +
      '<path d="M6.6 11H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1"/>',
    cpu:
      '<rect width="16" height="16" x="4" y="4" rx="2"/>' +
      '<rect width="6" height="6" x="9" y="9" rx="1"/>' +
      '<path d="M15 2v2"/><path d="M15 20v2"/>' +
      '<path d="M2 15h2"/><path d="M2 9h2"/>' +
      '<path d="M20 15h2"/><path d="M20 9h2"/>' +
      '<path d="M9 2v2"/><path d="M9 20v2"/>',
    brain:
      '<path d="M12 5a3 3 0 1 0-5.997.142 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>' +
      '<path d="M12 5a3 3 0 1 1 5.997.142 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>' +
      '<path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>' +
      '<path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>' +
      '<path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>' +
      '<path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>' +
      '<path d="M19.938 10.5a4 4 0 0 1 .585.396"/>' +
      '<path d="M6 18a4 4 0 0 1-1.967-.516"/>' +
      '<path d="M19.967 17.484A4 4 0 0 1 18 18"/>',
    'graduation-cap':
      '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.51 3.91a2 2 0 0 0 1.66 0z"/>' +
      '<path d="M22 10v6"/>' +
      '<path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    'book-open':
      '<path d="M12 7v14"/>' +
      '<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    modules:
      '<path d="M7.3 11H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3.3"/>' +
      '<path d="M9.3 4h1.4a1 1 0 0 1 1 1v.6"/>' +
      '<path d="M13.6 4h1.4a1 1 0 0 1 1 1v.6"/>' +
      '<path d="M16.7 11H20a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3.3"/>' +
      '<path d="M7.3 20h1.4a1 1 0 0 1 1 1v.6"/>' +
      '<path d="M13.6 20h1.4a1 1 0 0 1 1 1v.6"/>' +
      '<path d="M12 14v3"/>' +
      '<path d="M9.8 8.8v1.4a1 1 0 0 1-1 1H7.4"/>' +
      '<path d="M14.2 8.8v1.4a1 1 0 0 0 1 1h1.4"/>',
    box:
      '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>' +
      '<path d="m3.3 7 8.7 5 8.7-5"/>' +
      '<path d="M12 22V12"/>',
    layers:
      '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>' +
      '<path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>' +
      '<path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    network:
      '<rect x="9" y="2" width="6" height="6" rx="1"/>' +
      '<rect x="2" y="16" width="6" height="6" rx="1"/>' +
      '<rect x="16" y="16" width="6" height="6" rx="1"/>' +
      '<path d="M12 8v3"/><path d="M12 11h-3v4"/><path d="M12 11h3v4"/>',
    wrench:
      '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-2.4-.6-.6-2.4z"/>',
    'flask-conical':
      '<path d="M10 2v7.31"/><path d="M14 9.3V2"/><path d="M8.5 2h7"/>' +
      '<path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/>',
    zap:
      '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    gauge:
      '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    target:
      '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    shield:
      '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    award:
      '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/>' +
      '<circle cx="12" cy="8" r="6"/>',
    users:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>' +
      '<circle cx="9" cy="7" r="4"/>' +
      '<path d="M22 21v-2a4 4 0 0 0-3-3.87"/>' +
      '<path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'building-2':
      '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>' +
      '<path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>' +
      '<path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>' +
      '<path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
    mail:
      '<rect width="20" height="16" x="2" y="4" rx="2"/>' +
      '<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    phone:
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    'map-pin':
      '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>' +
      '<circle cx="12" cy="10" r="3"/>',
    clock:
      '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    calendar:
      '<path d="M8 2v4"/><path d="M16 2v4"/>' +
      '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    send:
      '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/>' +
      '<path d="m21.854 2.147-10.94 10.939"/>',
    'arrow-right':
      '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-up':
      '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    'arrow-up-right':
      '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    'chevron-down':
      '<path d="m6 9 6 6 6-6"/>',
    menu:
      '<path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/>',
    x:
      '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    check:
      '<path d="M20 6 9 17l-5-5"/>',
    search:
      '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    'external-link':
      '<path d="M15 3h6v6"/><path d="M10 14 21 3"/>' +
      '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    lightbulb:
      '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/>' +
      '<path d="M9 18h6"/><path d="M10 22h4"/>',
    handshake:
      '<path d="m11 17 2 2a1 1 0 1 0 3-3"/>' +
      '<path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>' +
      '<path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>' +
      '<path d="M3 4h8"/>'
  };

  // 尺寸映射
  var SIZE_MAP = { inline: 16, button: 20, standalone: 24, hero: 28 };

  function resolveSize(el) {
    var ds = el.getAttribute('data-size');
    if (ds && SIZE_MAP[ds]) return SIZE_MAP[ds];
    var n = parseInt(ds, 10);
    if (!isNaN(n) && n > 0) return n;
    var cls = el.className || '';
    if (cls.indexOf('icon-inline') > -1) return 16;
    if (cls.indexOf('icon-button') > -1) return 20;
    if (cls.indexOf('icon-hero') > -1) return 28;
    return 24; // 默认 standalone
  }

  function injectAll(root) {
    root = root || document;
    var nodes = root.querySelectorAll('[data-icon]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var name = el.getAttribute('data-icon');
      var inner = ICONS[name];
      if (!inner) {
        // 未注册图标：降级为空，避免空白方块（仍保持占位尺寸）
        el.setAttribute('aria-hidden', 'true');
        continue;
      }
      var size = resolveSize(el);
      var stroke = el.getAttribute('data-stroke') || '1.75';
      el.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size +
        '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + stroke +
        '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
        inner + '</svg>';
      el.setAttribute('role', 'img');
      if (!el.getAttribute('aria-label')) el.setAttribute('aria-hidden', 'true');
    }
  }

  // 单个图标 getter（用于 JS 动态创建）
  function getSvg(name, size, stroke) {
    var inner = ICONS[name];
    if (!inner) return '';
    size = size || 24;
    stroke = stroke || '1.75';
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + stroke +
      '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      inner + '</svg>';
  }

  global.Iconify = { injectAll: injectAll, getSvg: getSvg, names: Object.keys(ICONS) };

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { injectAll(document); });
    } else {
      injectAll(document);
    }
  }
})(typeof window !== 'undefined' ? window : this);
