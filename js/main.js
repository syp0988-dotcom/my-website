/* ============================================================
   个人网站交互脚本
   - 预加载计数
   - 汉堡菜单
   - 滚动入场动画（逐词拆分 + 整块揭示）
   - 自定义光标
   - 顶部导航状态
   ============================================================ */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ---------- 预加载计数 ---------- */
  const preloader = document.getElementById("preloader");
  const countEl = document.getElementById("preloaderCount");
  const barFill = document.getElementById("preloaderBarFill");

  let loadDone = false;

  function finishPreloader() {
    if (loadDone) return;
    loadDone = true;
    preloader.classList.add("is-done");
    document.body.classList.add("is-loaded");
    // 等过渡结束后把预加载器移出 DOM
    setTimeout(() => preloader && preloader.remove(), 1400);
  }

  function runCounter() {
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const value = Math.round(eased * 100);
      countEl.textContent = String(value).padStart(3, "0");
      barFill.style.width = value + "%";
      if (p < 1 && !loadDone) requestAnimationFrame(tick);
      else if (loadDone) {
        countEl.textContent = "100";
        barFill.style.width = "100%";
      }
    }
    requestAnimationFrame(tick);
  }

  if (prefersReduced) {
    countEl.textContent = "100";
    barFill.style.width = "100%";
  } else {
    runCounter();
  }

  window.addEventListener("load", () => setTimeout(finishPreloader, 350));
  // 兜底：资源加载再慢也不能卡住页面
  setTimeout(finishPreloader, 5000);

  /* ---------- 汉堡菜单 ---------- */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    document.body.style.overflow = open ? "hidden" : "";
  }

  burger.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));

  menu.querySelectorAll(".menu-link").forEach((link) =>
    link.addEventListener("click", () => setMenu(false))
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) setMenu(false);
  });

  /* ---------- 逐词拆分动画 ---------- */
  function splitHeadings() {
    document.querySelectorAll("[data-split]").forEach((el) => {
      if (el.dataset.splitted) return;
      el.dataset.splitted = "true";

      // 保留 <br> 换行结构：按行拆分
      const lines = Array.from(el.childNodes);
      const wrapper = document.createElement("span");

      lines.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const words = node.textContent.trim().split(/\s+/);
          words.forEach((word) => {
            if (!word) return;
            const wordEl = document.createElement("span");
            wordEl.className = "split-word";
            const inner = document.createElement("span");
            inner.className = "split-word-inner";
            inner.textContent = word;
            wordEl.appendChild(inner);
            wrapper.appendChild(wordEl);
            wrapper.appendChild(document.createTextNode(" "));
          });
        } else if (node.nodeName === "BR") {
          wrapper.appendChild(document.createElement("br"));
        } else {
          // 已存在的子元素（如 <span>你的</span><span>名字</span>）也做拆分
          const copy = node.cloneNode(true);
          const wordEl = document.createElement("span");
          wordEl.className = "split-word";
          const inner = document.createElement("span");
          inner.className = "split-word-inner";
          inner.appendChild(copy);
          wordEl.appendChild(inner);
          wrapper.appendChild(wordEl);
        }
      });

      el.textContent = "";
      el.appendChild(wrapper);
    });
  }

  function triggerSplit(el) {
    const words = el.querySelectorAll(".split-word-inner");
    words.forEach((w, i) => {
      w.style.transitionDelay = 0.05 * i + "s";
    });
  }

  /* ---------- 滚动入场观察器 ---------- */
  const revealEls = document.querySelectorAll("[data-reveal], [data-split]");

  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("is-in");
          if (el.hasAttribute("data-split")) triggerSplit(el);
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );

    revealEls.forEach((el) => io.observe(el));
  } else {
    // 不支持 / 减少动态：直接显示
    revealEls.forEach((el) => {
      el.classList.add("is-in");
      triggerSplit(el);
    });
  }

  // 首屏 Hero 在预加载结束后再触发拆分动画
  const heroName = document.querySelector(".hero-name");
  if (heroName) {
    splitHeadings();
    const kickHero = () => {
      heroName.classList.add("is-in");
      triggerSplit(heroName);
    };
    if (loadDone) kickHero();
    else setTimeout(kickHero, 1650);
  }

  /* ---------- 顶部导航状态 ---------- */
  const header = document.getElementById("header");
  const onScroll = () => {
    header.classList.toggle("is-solid", window.scrollY > window.innerHeight * 0.7);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 自定义光标 ---------- */
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (dot && ring && !isTouch && !prefersReduced) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    });

    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll("a, button, .work-card").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
    });
  }

  /* ---------- 摄影灯箱 ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(btn) {
    lightboxImg.src = btn.dataset.full;
    lightboxImg.alt = btn.querySelector("img").alt;
    lightboxCaption.textContent = btn.dataset.caption || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".photo-open").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(btn));
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---------- 顶部滚动进度条 + 回到顶部 ---------- */
  const scrollProgress = document.getElementById("scrollProgress");
  const toTopBtn = document.getElementById("toTopBtn");

  function updateScrollUI() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = p + "%";
    if (toTopBtn) toTopBtn.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.5);
  }
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  if (toTopBtn) {
    toTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 角色打字机 ---------- */
  const roles = ["RAG 全链路设计", "Multi-Agent 架构", "LangGraph 开发", "AI 服务工程化", "Open Source 爱好者"];
  const roleText = document.getElementById("roleText");
  if (roleText && !prefersReduced) {
    let ri = 0;
    let ci = 0;
    let deleting = false;
    (function typeLoop() {
      const word = roles[ri];
      ci += deleting ? -1 : 1;
      roleText.textContent = word.slice(0, ci);
      let delay = deleting ? 36 : 85;
      if (!deleting && ci === word.length) {
        delay = 1700;
        deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        delay = 350;
      }
      setTimeout(typeLoop, delay);
    })();
  }

  /* ---------- 数据统计滚动计数 ---------- */
  const statEls = document.querySelectorAll(".about-stats strong[data-count]");

  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const decimals = (el.dataset.count.split(".")[1] || "").length;
    const duration = 1300;
    const start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if ("IntersectionObserver" in window && !prefersReduced) {
    const statIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          statIO.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    statEls.forEach((el) => statIO.observe(el));
  } else {
    statEls.forEach((el) => {
      el.textContent = el.dataset.count + (el.dataset.suffix || "");
    });
  }
})();
