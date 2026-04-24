(() => {
  const grid = document.getElementById("menuGrid");
  const filters = document.getElementById("filters");
  const searchInput = document.getElementById("searchInput");
  const emptyState = document.getElementById("emptyState");
  const cartEl = document.getElementById("cart");
  const overlay = document.getElementById("overlay");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartBadge = document.getElementById("cartBadge");
  const openCartBtn = document.getElementById("openCart");
  const closeCartBtn = document.getElementById("closeCart");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const yearEl = document.getElementById("year");

  let activeCat = "all";
  let searchTerm = "";
  const order = new Map(); // key = item name -> { item, qty }

  yearEl.textContent = new Date().getFullYear();

  // --- Render category chips ---
  CATEGORIES.forEach(cat => {
    const chip = document.createElement("button");
    chip.className = "chip" + (cat.id === "all" ? " is-active" : "");
    chip.dataset.cat = cat.id;
    chip.innerHTML = `<span>${cat.icon}</span> ${cat.label}`;
    chip.addEventListener("click", () => {
      activeCat = cat.id;
      document.querySelectorAll(".chip").forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      render();
    });
    filters.appendChild(chip);
  });

  // --- Render menu ---
  function render() {
    const term = searchTerm.trim().toLowerCase();
    const filtered = MENU.filter(item => {
      const matchCat = activeCat === "all" || item.cat === activeCat;
      const matchSearch = !term ||
        item.name.toLowerCase().includes(term) ||
        (item.desc && item.desc.toLowerCase().includes(term));
      return matchCat && matchSearch;
    });

    grid.innerHTML = "";

    if (filtered.length === 0) {
      emptyState.hidden = false;
      return;
    }
    emptyState.hidden = true;

    // Group by category when showing all
    if (activeCat === "all") {
      const byCat = {};
      filtered.forEach(it => {
        (byCat[it.cat] ??= []).push(it);
      });
      CATEGORIES.forEach(cat => {
        if (cat.id === "all" || !byCat[cat.id]) return;
        const label = document.createElement("h3");
        label.className = "category-label";
        label.innerHTML = `<span>${cat.icon}</span> ${cat.label}`;
        grid.appendChild(label);
        byCat[cat.id].forEach(item => grid.appendChild(buildCard(item)));
      });
    } else {
      filtered.forEach(item => grid.appendChild(buildCard(item)));
    }
  }

  function buildCard(item) {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card__head">
        <div class="card__emoji">${item.emoji || "🍽️"}</div>
        <div>
          <h4 class="card__title">${item.name}</h4>
          ${item.desc ? `<p class="card__desc">${item.desc}</p>` : ""}
        </div>
      </div>
      <div class="card__foot">
        <span class="card__price">${item.price.toFixed(2)}</span>
        <button class="card__add" data-name="${item.name}">+ Añadir</button>
      </div>
    `;
    const btn = card.querySelector(".card__add");
    btn.addEventListener("click", () => {
      addToOrder(item);
      btn.classList.add("added");
      btn.textContent = "✓ Añadido";
      setTimeout(() => {
        btn.classList.remove("added");
        btn.textContent = "+ Añadir";
      }, 900);
    });
    return card;
  }

  // --- Cart logic ---
  function addToOrder(item) {
    const current = order.get(item.name);
    if (current) current.qty += 1;
    else order.set(item.name, { item, qty: 1 });
    renderCart();
  }

  function changeQty(name, delta) {
    const entry = order.get(name);
    if (!entry) return;
    entry.qty += delta;
    if (entry.qty <= 0) order.delete(name);
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    if (order.size === 0) {
      cartItems.innerHTML = '<p class="cart__empty">Tu orden está vacía. ¡Añade algunos platos!</p>';
    } else {
      order.forEach(({ item, qty }) => {
        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
          <div class="cart-item__emoji">${item.emoji || "🍽️"}</div>
          <div class="cart-item__info">
            <div class="cart-item__name">${item.name}</div>
            <div class="cart-item__price">$${(item.price * qty).toFixed(2)}</div>
          </div>
          <div class="cart-item__qty">
            <button data-action="dec" aria-label="Quitar uno">−</button>
            <span>${qty}</span>
            <button data-action="inc" aria-label="Añadir uno">+</button>
          </div>
        `;
        row.querySelector('[data-action="inc"]').addEventListener("click", () => changeQty(item.name, 1));
        row.querySelector('[data-action="dec"]').addEventListener("click", () => changeQty(item.name, -1));
        cartItems.appendChild(row);
      });
    }

    const { total, count } = getTotals();
    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartBadge.textContent = count;
    cartBadge.style.display = count > 0 ? "inline-grid" : "inline-grid";
  }

  function getTotals() {
    let total = 0, count = 0;
    order.forEach(({ item, qty }) => {
      total += item.price * qty;
      count += qty;
    });
    return { total, count };
  }

  function openCart() {
    cartEl.classList.add("is-open");
    overlay.classList.add("is-visible");
    cartEl.setAttribute("aria-hidden", "false");
  }
  function closeCart() {
    cartEl.classList.remove("is-open");
    overlay.classList.remove("is-visible");
    cartEl.setAttribute("aria-hidden", "true");
  }

  openCartBtn.addEventListener("click", openCart);
  closeCartBtn.addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);

  checkoutBtn.addEventListener("click", () => {
    if (order.size === 0) {
      alert("Tu orden está vacía. Añade algunos platos primero.");
      return;
    }
    const lines = ["*Nueva orden — Fusión Criolla* 🍽️", ""];
    order.forEach(({ item, qty }) => {
      lines.push(`• ${qty}× ${item.name} — $${(item.price * qty).toFixed(2)}`);
    });
    const { total } = getTotals();
    lines.push("", `*Total:* $${total.toFixed(2)}`);
    const msg = encodeURIComponent(lines.join("\n"));
    // Cambia este número por el del restaurante
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  });

  searchInput.addEventListener("input", e => {
    searchTerm = e.target.value;
    render();
  });

  // Initial render
  render();
  renderCart();
})();
