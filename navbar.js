document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("site-navbar");
  if (navbar) {
    navbar.innerHTML = `
      <nav class="navbar">
        <div class="navbar-glow"></div>
        <ul class="nav-list">
          <li class="nav-item" data-menu="create">
            <button class="nav-toggle">創角相關</button>
            <div class="submenu">
              <a href="create.html">創角流程</a>
              <a href="kin.html">族裔</a>
              <a href="profession.html">職業範型</a>
              <a href="magic.html">魔法與法術</a>
              <a href="gear.html">裝備與物品</a>
              <a href="heroic_abilities.html">英雄能力</a>
              <a href="experience.html">角色成長</a>
              <div class="feather-glow"></div>
            </div>
          </li>

          <li class="nav-item" data-menu="rules">
            <button class="nav-toggle">規則速查</button>
            <div class="submenu">
              <a href="skill.html">技能與檢定</a>
              <a href="journeys.html">旅行</a>
              <a href="combat.html">戰鬥＆傷害</a>
              <a href="forging.html">鍛造＆強化</a>
              <a href="cooking.html">烹飪＆種植</a>
              <div class="feather-glow"></div>
            </div>
          </li>

          <li class="nav-item" data-menu="world">
            <button class="nav-toggle">世界觀</button>
            <div class="submenu">
              <a href="history.html">歷史</a>
              <a href="places.html">地點</a>
              <a href="religion.html">信仰＆宇宙論</a>
              <a href="calendar.html">曆法</a>
              <a href="academy.html">三聖學</a>
              <div class="feather-glow"></div>
            </div>
          </li>
        </ul>
      </nav>
    `;
  }

  const items = document.querySelectorAll(".nav-item");
  const toggles = document.querySelectorAll(".nav-toggle");
  const navbarGlow = document.querySelector(".navbar-glow");
  let flickerTimeline = null;
  let waveTimeline = null;
  let hoverBoost = null;

  // 🟢 持續底光波動動畫
  function startWaveGlow() {
    if (waveTimeline) return;
    waveTimeline = gsap.timeline({ repeat: -1 });
    waveTimeline.to(navbarGlow, {
      backgroundPosition: "200% 0%",
      duration: 6,
      ease: "none"
    }).to(navbarGlow, {
      backgroundPosition: "0% 0%",
      duration: 6,
      ease: "none"
    });
  }

  // 🟠 Hover 加速閃亮
  function setupHoverEffects() {
    toggles.forEach(btn => {
      btn.addEventListener("mouseenter", () => {
        if (hoverBoost) hoverBoost.kill();
        hoverBoost = gsap.timeline();
        hoverBoost.to(navbarGlow, {
          opacity: 0.9,
          filter: "blur(10px) brightness(1.6)",
          duration: 0.3,
          ease: "power1.out"
        });
        if (waveTimeline) waveTimeline.timeScale(2);
      });

      btn.addEventListener("mouseleave", () => {
        if (hoverBoost) hoverBoost.reverse();
        if (waveTimeline) waveTimeline.timeScale(1);
      });
    });
  }

  // ✨ 羽光掃過 + 共振加速
  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const parent = btn.parentElement;
      const submenu = parent.querySelector(".submenu");
      const glow = submenu.querySelector(".feather-glow");
      const isOpen = parent.classList.contains("open");

      // 關閉其他
      items.forEach(i => {
        if (i !== parent) {
          i.classList.remove("open");
          const sub = i.querySelector(".submenu");
          const glowEl = i.querySelector(".feather-glow");
          if (sub) gsap.to(sub, { width: 0, opacity: 0, duration: 0.35, ease: "power2.inOut" });
          if (glowEl) gsap.set(glowEl, { opacity: 0 });
        }
      });

      if (isOpen) {
        // 關閉目前
        parent.classList.remove("open");
        gsap.to(submenu, { width: 0, opacity: 0, duration: 0.35, ease: "power2.inOut" });
        gsap.to(navbarGlow, { opacity: 0.4, duration: 1 });
        if (flickerTimeline) {
          flickerTimeline.kill();
          flickerTimeline = null;
        }
      } else {
        // 展開目前
        parent.classList.add("open");
        gsap.set(submenu, { display: "flex" });

        // 平滑展開
        gsap.fromTo(
          submenu,
          { width: 0, opacity: 0 },
          { width: "auto", opacity: 1, duration: 0.55, ease: "power3.out" }
        );

        // ✨ 羽光掃描
        const tl = gsap.timeline();
        tl.set(glow, { opacity: 0.8, x: "-130%", display: "block" })
          .to(glow, { x: "130%", duration: 1.8, ease: "power2.out" })
          .to(glow, { opacity: 0.4, duration: 0.8, ease: "power1.in" }, "-=0.4");

        // ✨ 底光共振加速（神聖共鳴）
        gsap.to(navbarGlow, { opacity: 1, duration: 0.4, ease: "power1.out" });
        if (waveTimeline) {
          const originalSpeed = waveTimeline.timeScale();
          waveTimeline.timeScale(3); // 加速
          gsap.to(waveTimeline, { timeScale: originalSpeed, duration: 2.5, ease: "sine.inOut", delay: 0.4 });
        }

        // 呼吸閃爍
        if (flickerTimeline) flickerTimeline.kill();
        flickerTimeline = gsap.timeline({ repeat: -1, yoyo: true });
        flickerTimeline.to(glow, {
          opacity: 0.6,
          duration: 1.4,
          ease: "sine.inOut"
        }).to(glow, {
          opacity: 0.3,
          duration: 1.4,
          ease: "sine.inOut"
        });
      }
    });
  });

  startWaveGlow();
  setupHoverEffects();
});
