/* =============================================================
 * main.js —— 汉堡抽屉 / 导航高亮 / 联系表单5态 / 新闻加载更多
 * 缓动统一 --ease-standard（非弹跳），prefers-reduced-motion 由 CSS 处理。
 * ============================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initDrawer();
    initNavActive();
    initContactForm();
    initLoadMore();
    initReveal();
    initCountUp();
    initNavScrolled();
    initBackToTop();
  });

  /* ---------------- 移动端汉堡抽屉 ---------------- */
  function initDrawer() {
    var toggle = document.querySelector('.nav-toggle');
    var drawer = document.getElementById('mobile-drawer');
    var backdrop = document.querySelector('[data-drawer-backdrop]');
    var closeBtn = drawer ? drawer.querySelector('.drawer__close') : null;
    if (!toggle || !drawer || !backdrop) return;

    function open() {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
    }
    function close() {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    }

    toggle.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    // 点击抽屉内链接关闭
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    // Esc 关闭
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });
  }

  /* ---------------- 导航当前页高亮 ---------------- */
  function initNavActive() {
    var body = document.body;
    var page = body ? body.getAttribute('data-page') : '';
    if (!page) {
      // 兜底：依据路径名判断
      var path = location.pathname.split('/').pop() || 'index.html';
      page = path.replace('.html', '');
    }
    var links = document.querySelectorAll('.nav-link');
    links.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var name = href.replace('.html', '').replace('./', '');
      if (name === page) link.classList.add('is-active');
    });
    // 抽屉内同步
    var dlinks = document.querySelectorAll('.drawer__links a');
    dlinks.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var name = href.replace('.html', '').replace('./', '');
      if (name === page) link.classList.add('is-active');
    });
  }

  /* ---------------- 联系表单：5 态校验 ---------------- */
  function initContactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;

    var fields = {
      name: form.querySelector('#cf-name'),
      phone: form.querySelector('#cf-phone'),
      company: form.querySelector('#cf-company'),
      need: form.querySelector('#cf-need')
    };
    var needCount = form.querySelector('[data-need-count]');
    var submitBtn = form.querySelector('[data-submit]');
    var submitLabel = form.querySelector('[data-submit-label]');
    var submitIcon = form.querySelector('[data-submit-icon]');

    function setError(field, msg) {
      if (!field) return;
      field.classList.add('is-error');
      var err = form.querySelector('[data-error-for="' + field.name + '"]');
      if (err) {
        if (msg) err.textContent = msg;
        err.classList.add('is-visible');
      }
    }
    function clearError(field) {
      if (!field) return;
      field.classList.remove('is-error');
      var err = form.querySelector('[data-error-for="' + field.name + '"]');
      if (err) err.classList.remove('is-visible');
    }

    function validPhone(v) {
      var s = v.replace(/[\s-]/g, '');
      return /^1[3-9]\d{9}$/.test(s);
    }

    function validateField(field, silent) {
      if (!field) return true;
      var v = field.value.trim();
      switch (field.name) {
        case 'name':
          if (!v) { if (!silent) setError(field, '请填写姓名'); return false; }
          clearError(field); return true;
        case 'phone':
          if (!v) { if (!silent) setError(field, '请填写联系电话'); return false; }
          if (!validPhone(v)) { if (!silent) setError(field, '请填写有效的 11 位手机号'); return false; }
          clearError(field); return true;
        case 'company':
          if (v.length > 40) { if (!silent) setError(field, '公司名称过长'); return false; }
          clearError(field); return true;
        case 'need':
          if (v.length < 10) { if (!silent) setError(field, '请填写需求描述（10 字以上）'); return false; }
          clearError(field); return true;
        default:
          return true;
      }
    }

    // 实时校验：focus 后输入即校验（silent 直到首次失焦/提交）
    Object.keys(fields).forEach(function (key) {
      var f = fields[key];
      if (!f) return;
      f.addEventListener('input', function () {
        if (f.classList.contains('is-error')) validateField(f, false);
        if (f.name === 'need' && needCount) needCount.textContent = f.value.length;
      });
      f.addEventListener('blur', function () { validateField(f, false); });
    });

    // 提交：Loading 态 → 成功 Toast
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      ['name', 'phone', 'company', 'need'].forEach(function (k) {
        if (!validateField(fields[k], false)) ok = false;
      });
      if (!ok) {
        var firstErr = form.querySelector('.form-control.is-error');
        if (firstErr) firstErr.focus();
        return;
      }

      // Loading 态
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
      if (submitIcon) submitIcon.innerHTML = '<span class="spinner"></span>';
      if (submitLabel) submitLabel.textContent = '提交中…';
      form.querySelectorAll('.form-control').forEach(function (c) { c.disabled = true; });

      // 模拟请求（无后端，演示用）
      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
        if (submitIcon) submitIcon.innerHTML = '<i data-icon="send" data-size="20"></i>';
        if (submitLabel) submitLabel.textContent = '提交预约';
        form.querySelectorAll('.form-control').forEach(function (c) { c.disabled = false; });
        if (window.Iconify) window.Iconify.injectAll(submitIcon);
        form.reset();
        if (needCount) needCount.textContent = '0';
        showToast('已收到，我们将在 1 个工作日内联系您');
      }, 1100);
    });

    function showToast(msg) {
      var toast = document.querySelector('[data-toast]');
      if (!toast) return;
      toast.textContent = '';
      toast.innerHTML = '<span class="icon-wrap"><i data-icon="check" data-size="16"></i></span>' + msg;
      if (window.Iconify) window.Iconify.injectAll(toast);
      toast.classList.add('is-visible');
      setTimeout(function () { toast.classList.remove('is-visible'); }, 3600);
    }
  }

  /* ---------------- 新闻"加载更多" ---------------- */
  function initLoadMore() {
    var btn = document.querySelector('[data-load-more]');
    if (!btn) return;
    var label = btn.querySelector('[data-load-label]');
    var iconWrap = btn.querySelector('[data-load-icon]');
    var extras = document.querySelectorAll('[data-extra]');

    btn.addEventListener('click', function () {
      if (btn.disabled) return;
      // Loading 态
      btn.disabled = true;
      if (iconWrap) iconWrap.innerHTML = '<span class="spinner spinner--dark"></span>';
      if (label) label.textContent = '加载中…';

      setTimeout(function () {
        extras.forEach(function (el) {
          el.hidden = false;
          observeReveal(el); // 新显示条目也播放入场动画
        });
        if (label) label.textContent = '已显示全部';
        if (iconWrap && window.Iconify) { iconWrap.innerHTML = '<i data-icon="check" data-size="20"></i>'; window.Iconify.injectAll(iconWrap); }
        btn.disabled = true; // 已无更多
        // 收起：仅保留文本提示，按钮保留禁用态
      }, 700);
    });
  }

  /* ---------------- 揭示动画（进入视口） ---------------- */
  var revealIO = null;
  function observeReveal(el) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('is-in'); return; }
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-in'); revealIO.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
    }
    revealIO.observe(el);
  }
  function initReveal() {
    document.querySelectorAll('.reveal').forEach(observeReveal);
  }

  /* ---------------- 指标数字滚动计数 ---------------- */
  function initCountUp() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    function animate(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      if (isNaN(target)) return;
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1400;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        // easeOutCubic
        var eased = 1 - Math.pow(1 - p, 3);
        var val = target * eased;
        var text = Number.isInteger(target)
          ? Math.round(val).toLocaleString('en-US')
          : val.toFixed(1);
        el.textContent = text + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = (Number.isInteger(target)
          ? target.toLocaleString('en-US')
          : target.toFixed(1)) + suffix;
      }
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      els.forEach(animate);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animate(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- 导航栏滚动状态 ---------------- */
  function initNavScrolled() {
    var nav = document.querySelector('.navbar');
    if (!nav) return;
    var ticking = false;
    function update() {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------------- 返回顶部 ---------------- */
  function initBackToTop() {
    var btn = document.querySelector('[data-back-to-top]');
    if (!btn) return;
    function update() {
      btn.classList.toggle('is-visible', window.scrollY > 480);
    }
    window.addEventListener('scroll', update, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    update();
  }
})();
