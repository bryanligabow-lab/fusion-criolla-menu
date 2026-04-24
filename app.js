(() => {
  const menuList = document.getElementById("menu-list");
  const tabsEl = document.getElementById("tabs");
  const searchBar = document.getElementById("searchBar");
  const searchInput = document.getElementById("searchInput");
  const searchToggle = document.getElementById("searchToggle");
  const emptyState = document.getElementById("emptyState");
  const yearEl = document.getElementById("year");
  const topnav = document.querySelector(".topnav");

  let activeTab = "all";
  let searchTerm = "";

  yearEl.textContent = new Date().getFullYear();

  // TOP NAV scroll state
  window.addEventListener("scroll", () => {
    topnav.classList.toggle("is-scrolled", window.scrollY > 50);
  }, { passive: true });

  // SEARCH TOGGLE
  searchToggle.addEventListener("click", () => {
    const isHidden = searchBar.hidden;
    searchBar.hidden = !isHidden;
    if (isHidden) {
      searchInput.focus();
      document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    }
  });
  searchInput.addEventListener("input", e => {
    searchTerm = e.target.value.trim().toLowerCase();
    renderMenu();
  });

  // --- TABS ---
  // "Todo" tab first
  const allTabs = [{ id: "all", label: "Todo" }, ...TABS];
  allTabs.forEach(t => {
    const btn = document.createElement("button");
    btn.className = "tab" + (t.id === "all" ? " is-active" : "");
    btn.dataset.tab = t.id;
    btn.textContent = t.label;
    btn.addEventListener("click", () => {
      activeTab = t.id;
      document.querySelectorAll(".tab").forEach(el => el.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderMenu();
    });
    tabsEl.appendChild(btn);
  });

  // --- RENDER ---
  function renderMenu() {
    menuList.innerHTML = "";
    let anyRendered = false;

    Object.entries(MENU).forEach(([id, group]) => {
      if (activeTab !== "all" && activeTab !== id) return;

      // Filter by search
      const filteredItems = group.items.filter(it => {
        if (!searchTerm) return true;
        return it.name.toLowerCase().includes(searchTerm) ||
               (it.desc && it.desc.toLowerCase().includes(searchTerm));
      });
      if (filteredItems.length === 0) return;

      const groupEl = document.createElement("div");
      groupEl.className = "menu-group";
      groupEl.innerHTML = `
        <div class="menu-group__head">
          <h3 class="menu-group__title">${group.label}</h3>
        </div>
        <div class="menu-group__items"></div>
      `;

      const itemsWrap = groupEl.querySelector(".menu-group__items");
      filteredItems.forEach(item => {
        const itemEl = document.createElement("div");
        itemEl.className = "menu-item" + (item.featured ? " featured" : "");
        itemEl.innerHTML = `
          <div class="menu-item__name-wrap">
            <span class="menu-item__name">${item.name}</span>
            <span class="menu-item__dots"></span>
          </div>
          <span class="menu-item__price">${item.price.toFixed(2)}</span>
          ${item.desc ? `<div class="menu-item__desc">${item.desc}</div>` : ""}
        `;
        itemsWrap.appendChild(itemEl);
      });

      menuList.appendChild(groupEl);
      anyRendered = true;
    });

    emptyState.hidden = anyRendered;
  }

  // --- NAV PILLS active state ---
  const pills = document.querySelectorAll(".pill");
  pills.forEach(p => {
    p.addEventListener("click", () => {
      pills.forEach(x => x.classList.remove("pill--active"));
      p.classList.add("pill--active");
    });
  });

  // --- Reveal on scroll ---
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animation = "fadeUp .8s ease both";
        io.unobserve(e.target);
      }
    });
  }, { threshold: .1 });
  document.querySelectorAll(".section-head, .contact__card").forEach(el => {
    el.style.opacity = "0";
    io.observe(el);
  });
  // Reset opacity when anim runs (IO removes after triggering)
  document.addEventListener("animationstart", e => {
    if (e.target.style) e.target.style.opacity = "";
  });

  renderMenu();
})();
