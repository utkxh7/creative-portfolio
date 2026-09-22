// ---------- Product data ----------
const PRODUCTS = [
  {
    id: "royal-bengal",
    name: "Royal Bengal",
    house: "Chapter One — Pre-Order",
    houseSlug: "chapter-one",
    tag: "Best Seller",
    tagClass: "",
    price: 1399,
    pieces: "Pre-order — ships in drop 01",
    desc: "A crouching Bengal tiger amidst lotus blooms — traditional block-print artwork hand-printed onto steel.",
    story: "Royal Bengal brings traditional Indian block-print iconography to modern steel. Featuring a crouching tiger surrounded by lotus petals under a crimson moon, it's equal parts royal protection charm and statement piece.",
    finish: "UV-cured print, scratch-sealed steel",
    fluid: "Butane, refillable",
    capacity: "Approx. 300 lights per fill",
    edition: "No. 004 / 250",
    img: "assets/royal-bengal.png"
  },
  {
    id: "third-eye",
    name: "Third Eye",
    house: "Chapter One — Pre-Order",
    houseSlug: "chapter-one",
    tag: "Limited",
    tagClass: "limited",
    price: 1599,
    pieces: "Pre-order — ships in drop 01",
    desc: "A sun painted between the brows, glowing blue like it belongs somewhere darker.",
    story: "Third Eye was built to be seen twice — once in normal light, once under a blacklight, where the whole piece shifts. It took the longest of the four to get print-ready, because getting the glow to survive outside a UV room turned out to be the hard part.",
    finish: "UV-reactive ink, matte steel",
    fluid: "Butane, refillable",
    capacity: "Approx. 300 lights per fill",
    edition: "No. 001 / 120",
    img: "assets/third-eye.png"
  },
  {
    id: "sol-wave",
    name: "Sol & Wave",
    house: "Chapter One — Pre-Order",
    houseSlug: "chapter-one",
    tag: "New",
    tagClass: "",
    price: 1399,
    pieces: "Pre-order — ships in drop 01",
    desc: "A crimson sun casting golden beams over surging sea waves as a shooting star cuts through the sky.",
    story: "Sol & Wave captures the exact second celestial light breaks over the ocean tide. A vintage woodcut rendering of solar rays, deep waters, and falling stars on scratch-sealed steel.",
    finish: "UV-cured print, scratch-sealed steel",
    fluid: "Butane, refillable",
    capacity: "Approx. 300 lights per fill",
    edition: "No. 002 / 250",
    img: "assets/sol-wave.png"
  },
  {
    id: "meteor-eyes",
    name: "Meteor Eyes",
    house: "Chapter One — Pre-Order",
    houseSlug: "chapter-one",
    tag: "New",
    tagClass: "",
    price: 1399,
    pieces: "Pre-order — ships in drop 01",
    desc: "Mirrored shades catching a meteor shower mid-fall, head tipped all the way back.",
    story: "Meteor Eyes is our nod to old sci-fi paperback covers — the kind with a lone figure staring up at something enormous. We wanted a design that felt like the cover of a book that doesn't exist yet.",
    finish: "UV-cured print, scratch-sealed steel",
    fluid: "Butane, refillable",
    capacity: "Approx. 300 lights per fill",
    edition: "No. 003 / 250",
    img: "assets/meteor-eyes.jpeg"
  }
];

// ---------- Seal builder (signature element) ----------
function buildSeal(el){
  const label = el.getAttribute("data-seal-label") || "CHINGARI · HAND MADE";
  const size = parseInt(el.getAttribute("data-seal-size") || "118", 10);
  const r = size/2 - 8;
  const cx = size/2, cy = size/2;
  const id = "sealPath" + Math.random().toString(36).slice(2,8);
  el.innerHTML = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <defs><path id="${id}" d="M ${cx},${cy} m -${r},0 a ${r},${r} 0 1,1 ${r*2},0 a ${r},${r} 0 1,1 -${r*2},0"/></defs>
      <circle cx="${cx}" cy="${cy}" r="${r-6}" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/>
      <text font-family="IBM Plex Mono" font-size="8.6" letter-spacing="2" fill="currentColor">
        <textPath href="#${id}" startOffset="0%">${label} • ${label} •</textPath>
      </text>
    </svg>
    <span class="seal-center"></span>
  `;
}

function initSeals(){
  document.querySelectorAll(".seal").forEach(buildSeal);
}

// ---------- Mobile nav toggle ----------
function initNav(){
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if(!toggle || !nav) return;

  let isOpen = false;

  toggle.addEventListener("click", () => {
    isOpen = !isOpen;
    if(isOpen){
      nav.classList.add("mobile-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.textContent = "✕";
    } else {
      nav.classList.remove("mobile-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }
  });

  // Close mobile nav when a link is clicked
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if(isOpen){
        isOpen = false;
        nav.classList.remove("mobile-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      }
    });
  });
}

// ---------- Smooth scroll for anchor links ----------
function initSmoothScroll(){
  document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      // Only handle same-page anchors
      if(href.startsWith("#") || (href.includes("#") && href.split("#")[0] === "" )){
        const target = document.querySelector("#" + href.split("#")[1]);
        if(target){
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
}

// ---------- Form handling ----------
function wireForm(form, successText){
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit], .form-submit");
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending...";

    const action = form.action;
    const isPlaceholder = action.includes("YOUR_") || action.includes("YOUR_FORM_ID") || action.includes("YOUR_NEWSLETTER_FORM_ID") || action.includes("YOUR_RESERVE_FORM_ID");

    if(isPlaceholder){
      // Formspree not configured yet — simulate success after a short delay
      await new Promise(r => setTimeout(r, 800));
      btn.textContent = successText;
      form.reset();
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 3500);
      return;
    }

    try{
      const res = await fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });
      if(res.ok){
        btn.textContent = successText;
        form.reset();
      } else {
        btn.textContent = "Something went wrong — try again";
      }
    } catch(err){
      btn.textContent = "Something went wrong — try again";
    }
    setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 3500);
  });
}

function initForms(){
  const nf = document.querySelector(".newsletter-form");
  if(nf) wireForm(nf, "Welcome in ✓");

  const cf = document.querySelector(".contact-form");
  if(cf) wireForm(cf, "Message sent ✓");

  const rf = document.querySelector(".reserve-form");
  if(rf) wireForm(rf, "You're on the list ✓");
}

// ---------- Product card / grid rendering ----------
function productCardHTML(p){
  return `
  <a class="product-card" href="shop.html#${p.id}" data-open="${p.id}">
    <div class="product-media">
      ${p.tag ? `<span class="tag ${p.tagClass}">${p.tag}</span>` : ""}
      <img src="${p.img}" alt="${p.name} lighter" loading="lazy">
      <div class="mini-seal seal" data-seal-size="52" data-seal-label="NUMBERED"></div>
    </div>
    <div class="product-info">
      <div class="product-house">${p.house}</div>
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>
      <div class="price-row">
        <span class="price">₹${p.price.toLocaleString('en-IN')}</span>
        <span class="pieces">${p.pieces}</span>
      </div>
    </div>
  </a>`;
}

function renderGrid(container, list){
  container.innerHTML = list.map(productCardHTML).join("");
  container.querySelectorAll(".seal").forEach(buildSeal);
  container.querySelectorAll("[data-open]").forEach(card => {
    card.addEventListener("click", e => {
      e.preventDefault();
      openModal(card.getAttribute("data-open"));
    });
  });
}

// ---------- Modal ----------
function openModal(id){
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  const overlay = document.getElementById("productModal");
  if(!overlay) return;
  overlay.querySelector(".modal-media img").src = p.img;
  overlay.querySelector(".modal-media img").alt = p.name;
  overlay.querySelector(".modal-house").textContent = p.house;
  overlay.querySelector(".modal-title").textContent = p.name;
  overlay.querySelector(".modal-story").textContent = p.story;
  overlay.querySelector(".modal-price").textContent = "₹" + p.price.toLocaleString('en-IN');
  overlay.querySelector(".spec-finish").textContent = p.finish;
  overlay.querySelector(".spec-fluid").textContent = p.fluid;
  overlay.querySelector(".spec-capacity").textContent = p.capacity;
  overlay.querySelector(".spec-edition").textContent = p.edition;
  const preorderBtn = overlay.querySelector(".modal-preorder-btn");
  if(preorderBtn) preorderBtn.href = "shop.html?design=" + encodeURIComponent(p.name) + "#reserve";
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  history.pushState({ modal: id }, "", "#" + id);
}

function closeModal(){
  const overlay = document.getElementById("productModal");
  if(!overlay) return;
  if(!overlay.classList.contains("open")) return;
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  // Only replace state if current hash is a product
  if(location.hash && PRODUCTS.some(p => p.id === location.hash.slice(1))){
    history.replaceState(null, "", location.pathname + location.search);
  }
}

function initModal(){
  const overlay = document.getElementById("productModal");
  if(!overlay) return;

  // Close on overlay click
  overlay.addEventListener("click", e => { if(e.target === overlay) closeModal(); });

  // Close button
  const closeBtn = overlay.querySelector(".modal-close");
  if(closeBtn) closeBtn.addEventListener("click", closeModal);

  // Close on Escape key
  document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

  // Handle browser back button
  window.addEventListener("popstate", () => {
    if(overlay.classList.contains("open")){
      closeModal();
    } else if(location.hash){
      const id = location.hash.slice(1);
      if(PRODUCTS.some(p => p.id === id)) openModal(id);
    }
  });

  // Open modal if URL has a product hash on load
  if(location.hash){
    const id = location.hash.slice(1);
    if(PRODUCTS.some(p => p.id === id)){
      // Small delay to let page render first
      setTimeout(() => openModal(id), 100);
    }
  }
}

// ---------- Shop filters ----------
function initShopFilters(){
  const grid = document.getElementById("shopGrid");
  if(!grid) return;
  renderGrid(grid, PRODUCTS);
  const btns = document.querySelectorAll(".filter-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.getAttribute("data-filter");
      const list = f === "all" ? PRODUCTS : PRODUCTS.filter(p => p.tag === f);
      renderGrid(grid, list);
    });
  });
}

// ---------- Home page featured grid ----------
function initHomeGrid(){
  const grid = document.getElementById("homeGrid");
  if(!grid) return;
  renderGrid(grid, PRODUCTS.slice(0,4));
}

// ---------- Reserve form pre-fill from query param ----------
function initReservePrefill(){
  const select = document.getElementById("r-design");
  if(!select) return;
  const params = new URLSearchParams(window.location.search);
  const design = params.get("design");
  if(design){
    const match = Array.from(select.options).find(o => o.value === design);
    if(match) select.value = design;
  }
}

// ---------- Scroll-to-reserve on shop page ----------
function initScrollToReserve(){
  if(location.hash === "#reserve"){
    const el = document.getElementById("reserve");
    if(el){
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }
}

// ---------- Cart (placeholder — shows count badge) ----------
function initCart(){
  const cartBtns = document.querySelectorAll(".icon-btn[aria-label='Cart']");
  cartBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Placeholder: no real cart yet. Show a brief message.
      const count = btn.querySelector(".cart-count");
      if(count) count.textContent = "0";
      alert("Cart coming soon! Reserve your designs through the shop page for now.");
    });
  });
}

// ---------- Initialize everything ----------
document.addEventListener("DOMContentLoaded", () => {
  initSeals();
  initNav();
  initSmoothScroll();
  initForms();
  initModal();
  initShopFilters();
  initHomeGrid();
  initReservePrefill();
  initScrollToReserve();
  initCart();
});
