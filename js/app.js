(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const clone = value => JSON.parse(JSON.stringify(value));
  const money = value => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(Number(value) || 0).replace('COP', '').trim();
  const slug = value => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const state = { category: 'Todos', query: '', sort: 'featured', cart: [], selectedBase: null, selectedBases: {}, giftItems: {}, detailProductId: null, mobileNav: false, searchOpen: false, editingProductId: null };
  const seed = clone(window.KAIROS_CATALOG);
  let catalog = loadCatalog();

  function loadCatalog() {
    try {
      const saved = localStorage.getItem('kairos_catalog_override');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.products) && Array.isArray(parsed.categories)) return { ...clone(seed), ...parsed };
      }
    } catch (error) { console.warn('No se pudo leer el catálogo local.', error); }
    return clone(seed);
  }
  function saveCatalog() { localStorage.setItem('kairos_catalog_override', JSON.stringify(catalog)); }
  function loadCart() {
    try { const data = JSON.parse(localStorage.getItem('kairos_cart') || '[]'); return Array.isArray(data) ? data : []; }
    catch (_) { return []; }
  }
  function persistCart() { localStorage.setItem('kairos_cart', JSON.stringify(state.cart)); }
  state.cart = loadCart();
  const toastTimer = { id: null };
  function toast(message) {
    const node = $('#toast'); node.textContent = message; node.classList.add('show');
    clearTimeout(toastTimer.id); toastTimer.id = setTimeout(() => node.classList.remove('show'), 2800);
  }
  function setImageFallback(img, label) {
    img.addEventListener('error', () => {
      img.remove();
      const parent = img.parentElement;
      if (parent) { parent.classList.add('image-fallback'); const fallback = document.createElement('span'); fallback.className = 'fallback-label'; fallback.textContent = label || 'KAIROS'; parent.append(fallback); }
    }, { once: true });
  }
  function productById(id) { return catalog.products.find(product => product.id === id); }
  function getCategories() { return ['Vinos','Whisky','Tequila','Champagne','Aguardiente','Espumosos','Sin alcohol','Regalos']; }
  function categoryIcons(category) {
    const names = { 'Vinos': '◒︎', 'Whisky': '♜︎', 'Tequila': '✳︎', 'Champagne': '✧︎', 'Aguardiente': '◈︎', 'Espumosos': '✧︎', 'Cervezas': '▥︎', 'Sin alcohol': '◌︎', 'Café y gourmet': '⌁︎', 'Regalos': '◇︎' };
    return names[category] || '✳︎';
  }
  function productImage(product, compact = false) {
    const wrapper = document.createElement('div'); wrapper.className = compact ? 'mini-product-image' : 'product-image';
    if (product.image) { const img = document.createElement('img'); img.src = product.image; img.alt = product.name; img.loading = 'lazy'; setImageFallback(img, product.category); wrapper.append(img); }
    else { wrapper.classList.add('image-fallback'); const label = document.createElement('span'); label.className = 'fallback-label'; label.textContent = product.category || 'KAIROS'; wrapper.append(label); }
    return wrapper;
  }
  function renderCategories() {
    const grid = $('#categoryGrid'); grid.replaceChildren();
    const categoryData = getCategories().map((name, i) => ({ name, icon: categoryIcons(name), index: i }));
    categoryData.forEach((category, index) => {
      const count = catalog.products.filter(product => product.category === category.name).length;
      const card = document.createElement('button'); card.className = `category-card category-card-${(index % 4) + 1}`; card.type = 'button';
      const top = document.createElement('div'); top.className = 'category-card-top';
      const icon = document.createElement('span'); icon.className = 'category-symbol'; icon.textContent = category.icon;
      const arrow = document.createElement('span'); arrow.className = 'category-arrow'; arrow.textContent = '↗︎';
      top.append(icon, arrow);
      const title = document.createElement('h3'); title.textContent = category.name;
      const note = document.createElement('p'); note.textContent = `${count} ${count === 1 ? 'opción' : 'opciones'} para elegir`;
      card.append(top, title, note); card.addEventListener('click', () => { state.category = category.name; renderFilterChips(); renderProducts(); document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' }); }); grid.append(card);
    });
    renderFilterChips();
  }
  function renderFilterChips() {
    const holder = $('#filterChips'); holder.replaceChildren();
    ['Todos', ...getCategories()].forEach(category => {
      const button = document.createElement('button'); button.type = 'button'; button.className = `filter-chip ${state.category === category ? 'active' : ''}`; button.dataset.category = category;
      button.textContent = category === 'Todos' ? 'Todo' : category;
      button.addEventListener('click', () => { state.category = category; renderFilterChips(); renderProducts(); }); holder.append(button);
    });
  }
  function filteredProducts() {
    let items = catalog.products.filter(product => {
      const matchesCategory = state.category === 'Todos' || product.category === state.category;
      const query = state.query.trim().toLowerCase();
      const matchesQuery = !query || [product.name, product.category, product.style, product.description].some(value => String(value || '').toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
    if (state.sort === 'price-asc') items.sort((a, b) => a.price - b.price);
    else if (state.sort === 'price-desc') items.sort((a, b) => b.price - a.price);
    else if (state.sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name, 'es'));
    else items.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return items;
  }
  function renderProducts() {
    const grid = $('#productGrid'); grid.replaceChildren(); const items = filteredProducts();
    $('#productCount').textContent = `${items.length} ${items.length === 1 ? 'producto' : 'productos'}`;
    $('#emptyState').classList.toggle('hidden', items.length > 0);
    grid.classList.toggle('hidden', items.length === 0);
    items.forEach(product => {
      const card = document.createElement('article'); card.className = 'product-card';
      const imageWrap = productImage(product); imageWrap.classList.add('product-detail-trigger'); imageWrap.setAttribute('role','button'); imageWrap.setAttribute('tabindex','0'); imageWrap.setAttribute('aria-label', `Ver detalles de ${product.name}`); imageWrap.addEventListener('click', () => openProductDetail(product.id)); imageWrap.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProductDetail(product.id); } });
      const top = document.createElement('div'); top.className = 'product-image-top';
      if (product.badge) { const badge = document.createElement('span'); badge.className = 'product-badge'; badge.textContent = product.badge; top.append(badge); }
      if (!product.available) { const sold = document.createElement('span'); sold.className = 'sold-badge'; sold.textContent = 'Agotado'; top.append(sold); }
      imageWrap.append(top);
      const details = document.createElement('div'); details.className = 'product-details';
      const eyebrow = document.createElement('p'); eyebrow.className = 'product-category'; eyebrow.textContent = `${product.category}${product.style ? ` · ${product.style}` : ''}`;
      const name = document.createElement('h3'); name.textContent = product.name; name.classList.add('product-detail-trigger'); name.tabIndex = 0; name.setAttribute('role','button'); name.setAttribute('aria-label', `Ver detalles de ${product.name}`); name.addEventListener('click', () => openProductDetail(product.id)); name.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProductDetail(product.id); } });
      const description = document.createElement('p'); description.className = 'product-description'; description.textContent = product.description || 'Una selección para celebrar ese momento especial.';
      const bottom = document.createElement('div'); bottom.className = 'product-bottom'; const prices = document.createElement('div'); prices.className = 'product-prices';
      const price = document.createElement('strong'); price.textContent = money(product.price); prices.append(price);
      if (product.oldPrice && Number(product.oldPrice) > Number(product.price)) { const old = document.createElement('del'); old.textContent = money(product.oldPrice); prices.append(old); }
      const add = document.createElement('button'); add.className = 'add-product'; add.type = 'button'; add.textContent = product.available ? ((state.giftItems[product.id] || 0) > 0 ? `+ ${state.giftItems[product.id]}` : '+') : '×'; add.setAttribute('aria-label', product.available ? `Añadir ${product.name} al regalo. Seleccionadas: ${state.giftItems[product.id] || 0}` : `${product.name} agotado`); add.disabled = !product.available;
      add.addEventListener('click', () => addProductToGift(product.id)); bottom.append(prices, add);
      details.append(eyebrow, name, description, bottom); card.append(imageWrap, details); grid.append(card);
    });
  }
  function openProductDetail(id) {
    const product = productById(id); if (!product) return; state.detailProductId = id;
    const holder = $('#productDetailContent'); holder.replaceChildren();
    const layout = document.createElement('div'); layout.className = 'product-detail-layout';
    const visual = productImage(product); visual.classList.add('product-detail-visual');
    const info = document.createElement('div'); info.className = 'product-detail-info';
    const eyebrow = document.createElement('p'); eyebrow.className = 'eyebrow dark-eyebrow'; eyebrow.textContent = `${product.category}${product.style ? ' · ' + product.style : ''}`;
    const title = document.createElement('h2'); title.textContent = product.name;
    const price = document.createElement('strong'); price.className = 'product-detail-price'; price.textContent = money(product.price);
    const desc = document.createElement('p'); desc.className = 'product-detail-description'; desc.textContent = product.description || 'Una opción especial para regalar y compartir.';
    const facts = document.createElement('div'); facts.className = 'product-detail-facts';
    const style = String(product.style || 'Consultar presentación');
    const size = style.match(/\d+(?:[.,]\d+)?\s?(?:ml|L|g|kg|unidades)/i)?.[0] || 'Consultar tamaño';
    const alcohol = /sin alcohol|café|gourmet|tarjeta/i.test(`${product.category} ${product.name}`) ? 'Sin alcohol / no aplica' : 'Bebida alcohólica; graduación exacta por confirmar en etiqueta';
    [[ 'Presentación', size ],['Tipo', product.category],['Alcohol', alcohol],['Ideal para', product.occasion || product.description || 'Celebraciones, agradecimientos y regalos especiales']].forEach(([label,value]) => { const row=document.createElement('div'); row.className='product-fact'; const b=document.createElement('b'); b.textContent=label; const span=document.createElement('span'); span.textContent=value; row.append(b,span); facts.append(row); });
    const note = document.createElement('p'); note.className='product-detail-note'; note.textContent='Revisa la etiqueta del producto para confirmar la graduación alcohólica y los datos del fabricante. La disponibilidad se confirma al hacer el pedido.';
    const add = document.createElement('button'); add.className='button button-dark full-width'; add.type='button'; add.textContent='Añadir al regalo'; add.disabled = !product.available; add.textContent = product.category === 'Regalos' ? 'Añadir regalo a la bolsa' : 'Añadir al regalo'; add.addEventListener('click', () => { addProductToGift(id); closeProductDetail(); });
    info.append(eyebrow,title,price,desc,facts,note,add); layout.append(visual,info); holder.append(layout);
    $('#productDetailModal').classList.add('show'); $('#productDetailModal').setAttribute('aria-hidden','false'); document.body.classList.add('no-scroll');
  }
  function closeProductDetail() { $('#productDetailModal').classList.remove('show'); $('#productDetailModal').setAttribute('aria-hidden','true'); document.body.classList.remove('no-scroll'); }
  function bottleCount() { return Object.values(state.giftItems).reduce((sum, qty) => sum + Math.max(0, Number(qty)||0), 0); }
  function boxCount() { return Object.values(state.selectedBases).reduce((sum, qty) => sum + Math.max(0, Number(qty)||0), 0); }
  function addProductToGift(id) {
    const product = productById(id);
    if (!product || !product.available) { toast('Este producto no está disponible por ahora.'); return; }
    if (product.category === 'Regalos') { addToCart(id); return; }
    state.giftItems[id] = (state.giftItems[id] || 0) + 1;
    renderBuilder();
    toast(`${product.name} se agregó a tu regalo.`);
    $('#builder').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function addToCart(id, amount = 1) {
    const product = productById(id); if (!product || !product.available) { toast('Este producto no está disponible por ahora.'); return; }
    const existing = state.cart.find(item => item.type === 'product' && item.id === id);
    if (existing) existing.qty += amount; else state.cart.push({ type: 'product', id, qty: amount });
    persistCart(); renderCart(); toast('Añadido a tu bolsa.');
  }
  function addGiftToCart() {
    const items = Object.entries(state.giftItems).filter(([_, qty]) => qty > 0);
    if (!items.length) { toast('Elige al menos una botella.'); return; }
    const bottles = bottleCount(), boxes = boxCount();
    if (boxes !== bottles) { toast(`Seleccionaste ${bottles} botella(s): asigna exactamente ${bottles} caja(s). Llevas ${boxes}.`); $('#boxSelectionNote').textContent = `Te faltan ${bottles-boxes} caja(s) para tus ${bottles} botella(s). La regla es 1 botella = 1 caja.`; $('#boxSelectionNote').classList.add('box-selection-warning'); return; }
    const products = items.map(([id, qty]) => ({ id, qty, name: productById(id)?.name || id }));
    const bases = Object.entries(state.selectedBases).filter(([_,qty])=>qty>0).map(([id,qty])=>({id,qty,name:catalog.giftBases.find(b=>b.id===id)?.name||id,price:catalog.giftBases.find(b=>b.id===id)?.price||0}));
    const gift = { type: 'gift', id: `gift-${Date.now()}`, qty: 1, baseId: bases[0]?.id, baseName: bases.map(b=>`${b.qty} × ${b.name}`).join(', '), basePrice: bases.reduce((sum,b)=>sum+b.qty*b.price,0), boxes:bases, products };
    state.cart.push(gift); persistCart(); renderCart(); toast('Tu regalo se agregó a la bolsa.'); $('#cartDrawer').classList.add('open'); $('#cartOverlay').classList.add('show'); $('#cartDrawer').setAttribute('aria-hidden', 'false');
  }
  function getGiftPrice(item) { return (Number(item.basePrice) || 0) + item.products.reduce((sum, product) => sum + (Number(productById(product.id)?.price) || 0) * product.qty, 0); }
  function cartItemPrice(item) {
    if (item.type === 'gift') return getGiftPrice(item);
    return (Number(productById(item.id)?.price) || 0) * item.qty;
  }
  function cartTotal() { return state.cart.reduce((sum, item) => sum + cartItemPrice(item), 0); }
  function totalCartUnits() { return state.cart.reduce((sum, item) => sum + (item.type === 'gift' ? 1 : item.qty), 0); }
  function renderCart() {
    $('#cartCount').textContent = totalCartUnits(); $('#drawerCount').textContent = `(${totalCartUnits()})`; $('#cartSubtotal').textContent = money(cartTotal());
    const holder = $('#cartItems'); holder.replaceChildren();
    if (!state.cart.length) {
      const empty = document.createElement('div'); empty.className = 'cart-empty'; empty.innerHTML = '<div>✳</div><h3>Aún no hay brindis.</h3><p>Explora la colección y encuentra algo especial.</p>';
      const button = document.createElement('button'); button.className = 'button button-dark'; button.textContent = 'Explorar productos'; button.addEventListener('click', closeCart); empty.append(button); holder.append(empty); return;
    }
    state.cart.forEach(item => {
      const row = document.createElement('div'); row.className = 'cart-item';
      let title = '', subtitle = '', price = 0;
      if (item.type === 'gift') { title = item.baseName || 'Regalo personalizado'; subtitle = `${item.products.length} referencia(s) · Regalo personalizado`; price = getGiftPrice(item); }
      else { const product = productById(item.id); if (!product) return; title = product.name; subtitle = `${product.category} · Cant. ${item.qty}`; price = cartItemPrice(item); row.append(productImage(product, true)); }
      const detail = document.createElement('div'); detail.className = 'cart-item-detail'; const name = document.createElement('b'); name.textContent = title; const desc = document.createElement('small'); desc.textContent = subtitle; const value = document.createElement('strong'); value.textContent = money(price); detail.append(name, desc, value);
      const remove = document.createElement('button'); remove.className = 'remove-cart-item'; remove.textContent = 'Quitar'; remove.addEventListener('click', () => { state.cart = state.cart.filter(cartItem => cartItem !== item); persistCart(); renderCart(); }); row.append(detail, remove); holder.append(row);
    });
  }
  function openCart() { $('#cartDrawer').classList.add('open'); $('#cartOverlay').classList.add('show'); $('#cartDrawer').setAttribute('aria-hidden', 'false'); document.body.classList.add('no-scroll'); }
  function closeCart() { $('#cartDrawer').classList.remove('open'); $('#cartOverlay').classList.remove('show'); $('#cartDrawer').setAttribute('aria-hidden', 'true'); document.body.classList.remove('no-scroll'); }
  function checkout() {
    if (!state.cart.length) { toast('Tu bolsa está vacía.'); return; }
    const lines = ['Hola, KAIROS. Quiero confirmar este pedido:', ''];
    state.cart.forEach(item => {
      if (item.type === 'gift') {
        lines.push(`• ${item.baseName} — ${money(getGiftPrice(item))}`);
        item.products.forEach(product => lines.push(`   - ${product.qty} × ${productById(product.id)?.name || product.name}`));
      } else {
        const product = productById(item.id); if (product) lines.push(`• ${item.qty} × ${product.name} — ${money(cartItemPrice(item))}`);
      }
    });
    lines.push('', `Subtotal estimado: ${money(cartTotal())}`, '', '¿Me confirman disponibilidad, envío y medios de pago?');
    const number = String(catalog.whatsappNumber || '').replace(/\D/g, '');
    if (number.length < 10 || number === '573000000000') { toast('Configura el WhatsApp real en js/catalog.js antes de recibir pedidos.'); return; }
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
  }
  function renderBuilder() {
    const baseHolder = $('#baseOptions'); baseHolder.replaceChildren();
    const bottles = bottleCount(); const boxes = boxCount();
    $('#boxSelectionNote').textContent = bottles === 0 ? 'Primero elige tus botellas; luego asigna una caja por cada una.' : `Has elegido ${bottles} botella(s) y ${boxes} caja(s). ${boxes===bottles?'¡Perfecto! Cada botella tiene su caja.':boxes<bottles?`Te faltan ${bottles-boxes} caja(s).`:`Tienes ${boxes-bottles} caja(s) de más.`}`;
    $('#boxSelectionNote').classList.toggle('box-selection-warning', bottles !== boxes && bottles > 0);
    catalog.giftBases.forEach(base => {
      const row = document.createElement('div'); row.className = `base-option box-quantity-option ${state.selectedBases[base.id] ? 'selected' : ''}`;
      const art = document.createElement('span'); art.className = `base-art base-art-${base.tone || 'kraft'}`; art.innerHTML = '<i></i><b>K</b>';
      const text = document.createElement('span'); text.className = 'base-option-text'; const name = document.createElement('b'); name.textContent = base.name; const desc = document.createElement('small'); desc.textContent = base.description; const price = document.createElement('small'); price.className='base-capacity'; price.textContent = `${money(base.price)} por caja`;
      text.append(name,desc,price); const counter=document.createElement('div'); counter.className='quantity-control box-counter'; const minus=document.createElement('button'); minus.type='button'; minus.textContent='−'; minus.setAttribute('aria-label',`Quitar caja ${base.name}`); const qty=document.createElement('span'); qty.textContent=state.selectedBases[base.id]||0; const plus=document.createElement('button'); plus.type='button'; plus.textContent='+'; plus.setAttribute('aria-label',`Añadir caja ${base.name}`);
      minus.addEventListener('click',()=>{state.selectedBases[base.id]=Math.max(0,(state.selectedBases[base.id]||0)-1);renderBuilder();}); plus.addEventListener('click',()=>{ state.selectedBases[base.id]=(state.selectedBases[base.id]||0)+1;renderBuilder(); }); counter.append(minus,qty,plus); row.append(art,text,counter); baseHolder.append(row);
    });
    const itemsHolder = $('#builderProductList'); itemsHolder.replaceChildren();
    catalog.products.filter(product => product.available).forEach(product => {
      const row = document.createElement('div'); row.className = 'builder-product'; row.append(productImage(product, true));
      const info = document.createElement('div'); info.className = 'builder-product-info'; const name = document.createElement('b'); name.textContent = product.name; const meta = document.createElement('small'); meta.textContent = `${product.category}${product.style ? ` · ${product.style}` : ''}`; const price = document.createElement('strong'); price.textContent = money(product.price); info.append(name, meta, price);
      const counter = document.createElement('div'); counter.className = 'quantity-control'; const minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', `Quitar ${product.name}`); const qty = document.createElement('span'); qty.textContent = state.giftItems[product.id] || 0; const plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', `Añadir ${product.name}`);
      minus.addEventListener('click', () => { state.giftItems[product.id] = Math.max(0, (state.giftItems[product.id] || 0) - 1); renderBuilder(); }); plus.addEventListener('click', () => { state.giftItems[product.id] = (state.giftItems[product.id] || 0) + 1; renderBuilder(); }); counter.append(minus, qty, plus); row.append(info, counter); itemsHolder.append(row);
    });
    renderBuilderSummary();
  }
  function renderBuilderSummary() {
    const holder = $('#builderSummary'); holder.replaceChildren(); let subtotal = 0;
    Object.entries(state.selectedBases).filter(([_,qty])=>qty>0).forEach(([id,qty])=>{const box=catalog.giftBases.find(b=>b.id===id);if(!box)return;subtotal+=box.price*qty;const line=document.createElement('div');line.className='summary-line';const title=document.createElement('span');title.textContent=`${qty} × ${box.name}`;const price=document.createElement('b');price.textContent=money(box.price*qty);line.append(title,price);holder.append(line);});
    Object.entries(state.giftItems).filter(([_, qty]) => qty > 0).forEach(([id, qty]) => { const product = productById(id); if (!product) return; subtotal += product.price * qty; const line = document.createElement('div'); line.className = 'summary-line'; const title = document.createElement('span'); title.textContent = `${qty} × ${product.name}`; const price = document.createElement('b'); price.textContent = money(product.price * qty); line.append(title, price); holder.append(line); });
    if (!boxCount() && !Object.values(state.giftItems).some(q => q > 0)) { const empty = document.createElement('p'); empty.className = 'muted'; empty.textContent = 'Elige una presentación y agrega productos para comenzar.'; holder.append(empty); }
    $('#builderTotal').textContent = money(subtotal);
  }
  function adminOpen() { $('#adminLoginModal').classList.add('show'); document.body.classList.add('no-scroll'); $('#adminEmail').value=''; $('#adminLoginError').textContent=''; setTimeout(() => $('#adminEmail').focus(), 50); }
  function adminLoginClose() { $('#adminLoginModal').classList.remove('show'); document.body.classList.remove('no-scroll'); }
  function showAdminPanel() { adminLoginClose(); $('#adminModal').classList.add('show'); document.body.classList.add('no-scroll'); renderAdmin(); }
  function adminClose() { $('#adminModal').classList.remove('show'); document.body.classList.remove('no-scroll'); }
  function setAdminStatus(message) { $('#adminStatus').textContent = message; }
  function renderAdmin() {
    $('#categoryInput').value = getCategories().join(', ');
    const suggestions = $('#categorySuggestions'); suggestions.replaceChildren(); getCategories().forEach(category => { const option = document.createElement('option'); option.value = category; suggestions.append(option); });
    const holder = $('#adminProductList'); holder.replaceChildren();
    catalog.products.forEach(product => {
      const row = document.createElement('div'); row.className = 'admin-product-row'; row.append(productImage(product, true));
      const info = document.createElement('div'); info.className = 'admin-product-info'; const name = document.createElement('b'); name.textContent = product.name; const meta = document.createElement('small'); meta.textContent = `${product.category} · ${money(product.price)} · ${product.available ? 'Disponible' : 'Agotado'}`; info.append(name, meta);
      const actions = document.createElement('div'); actions.className = 'admin-row-actions'; const edit = document.createElement('button'); edit.className = 'button button-outline compact-button'; edit.textContent = 'Editar'; edit.addEventListener('click', () => openProductForm(product.id)); const remove = document.createElement('button'); remove.className = 'button button-outline compact-button danger-outline'; remove.textContent = 'Eliminar'; remove.addEventListener('click', () => { if (confirm(`¿Eliminar “${product.name}” del catálogo local?`)) { catalog.products = catalog.products.filter(p => p.id !== product.id); saveCatalog(); renderAdmin(); renderAll(); setAdminStatus('Producto eliminado.'); } }); actions.append(edit, remove); row.append(info, actions); holder.append(row);
    });
  }
  function openProductForm(id = null) {
    state.editingProductId = id; const product = id ? productById(id) : null; uploadedProductImage = ''; $('#productForm').reset(); $('#productId').value = id || '';
    $('#productFormTitle').textContent = product ? 'Editar producto' : 'Añadir producto';
    $('#productImageFile').value = ''; uploadedProductImage = (product?.image || '').startsWith('data:image/') ? product.image : ''; $('#productImagePreview').replaceChildren(); if (product?.image) { const preview = document.createElement('img'); preview.src = product.image; preview.alt = 'Vista previa'; $('#productImagePreview').append(preview); } $('#productName').value = product?.name || ''; $('#productCategory').value = product?.category || getCategories()[0] || ''; $('#productStyle').value = product?.style || ''; $('#productPrice').value = product?.price ?? ''; $('#productOldPrice').value = product?.oldPrice || ''; $('#productDescription').value = product?.description || ''; $('#productImage').value = product?.image || ''; $('#productStock').value = product?.available === false ? 'false' : 'true'; $('#productFeatured').checked = !!product?.featured;
    $('#productModal').classList.add('show'); $('#adminModal').classList.remove('show');
  }
  function closeProductForm(backToAdmin = true) { $('#productModal').classList.remove('show'); if (backToAdmin) { $('#adminModal').classList.add('show'); renderAdmin(); } }
  function exportCatalog() {
    const source = '/* KAIROS — Catálogo exportado desde el administrador. Reemplaza js/catalog.js por este archivo. */\nwindow.KAIROS_CATALOG = ' + JSON.stringify(catalog, null, 2) + ';\n';
    const blob = new Blob([source], { type: 'text/javascript;charset=utf-8' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'catalog.js'; document.body.appendChild(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); setAdminStatus('catalog.js descargado. Reemplaza js/catalog.js en la carpeta del proyecto y vuelve a publicar el sitio.');
  }
  function importCatalogFile(file) {
    if (!file) return; const reader = new FileReader();
    reader.onload = () => { try { const imported = JSON.parse(reader.result); if (!Array.isArray(imported.products) || !Array.isArray(imported.categories)) throw new Error('El archivo debe incluir products y categories.'); catalog = { ...clone(seed), ...imported }; saveCatalog(); state.category = 'Todos'; renderAll(); renderAdmin(); setAdminStatus('Catálogo importado correctamente.'); toast('Catálogo importado.'); } catch (error) { alert(`No se pudo importar el archivo JSON. ${error.message || ''}`); } $('#importCatalog').value = ''; };
    reader.readAsText(file);
  }
  function renderAll() { renderCategories(); renderProducts(); renderCart(); renderBuilder(); }

  // Búsqueda y filtros
  $('#catalogSearch').addEventListener('input', event => { state.query = event.target.value; renderProducts(); });
  $('#sortSelect').addEventListener('change', event => { state.sort = event.target.value; renderProducts(); });
  $('#resetFilters').addEventListener('click', () => { state.category = 'Todos'; state.query = ''; $('#catalogSearch').value = ''; renderFilterChips(); renderProducts(); });
  $('#searchToggle').addEventListener('click', () => { $('#searchBar').classList.toggle('open'); if ($('#searchBar').classList.contains('open')) $('#globalSearch').focus(); });
  function doGlobalSearch() { state.query = $('#globalSearch').value; $('#catalogSearch').value = state.query; state.category = 'Todos'; renderFilterChips(); renderProducts(); $('#catalogo').scrollIntoView({ behavior: 'smooth' }); $('#searchBar').classList.remove('open'); }
  $('#searchGo').addEventListener('click', doGlobalSearch); $('#globalSearch').addEventListener('keydown', event => { if (event.key === 'Enter') doGlobalSearch(); });
  $('#menuToggle').addEventListener('click', () => { state.mobileNav = !state.mobileNav; $('#mobileNav').classList.toggle('open', state.mobileNav); });
  $$('#mobileNav a').forEach(link => link.addEventListener('click', () => { $('#mobileNav').classList.remove('open'); state.mobileNav = false; }));

  // Bolsa y builder
  $('#cartOpen').addEventListener('click', openCart); $('#cartClose').addEventListener('click', closeCart); $('#cartOverlay').addEventListener('click', closeCart); $('#continueShopping').addEventListener('click', closeCart); $('#checkoutButton').addEventListener('click', checkout);
  $('#clearCart').addEventListener('click', () => { state.cart = []; persistCart(); renderCart(); toast('Tu bolsa está vacía.'); });
  $('#addGiftToCart').addEventListener('click', addGiftToCart);
  $('#productDetailClose').addEventListener('click', closeProductDetail);
  $('#productDetailModal').addEventListener('click', e => { if(e.target.id==='productDetailModal') closeProductDetail(); });
  $('#resetBuilder').addEventListener('click', () => { state.selectedBase = null; state.selectedBases = {}; state.giftItems = {}; renderBuilder(); toast('El regalo se reinició.'); });

  // Edad: se recuerda en este navegador. El aviso no reemplaza verificación de edad ni obligaciones legales.
  try { if (sessionStorage.getItem('kairos_age_confirmed') === 'yes') $('#ageModal').classList.remove('show'); else $('#ageModal').classList.add('show'); } catch (_) { $('#ageModal').classList.add('show'); }
  $('#ageConfirm').addEventListener('click', () => { try { sessionStorage.setItem('kairos_age_confirmed', 'yes'); } catch (_) {} $('#ageModal').classList.remove('show'); });
  $('#ageDeny').addEventListener('click', () => { $('#ageModal .age-card').innerHTML = '<div class="age-logo">K<span>✳</span></div><h2>Gracias por visitarnos.</h2><p>Debes tener 18 años o más para ingresar a esta tienda.</p>'; });

  // Administración local del catálogo
  $('#adminOpen').addEventListener('click', event => { event.preventDefault(); adminOpen(); }); $('#adminLoginClose').addEventListener('click', adminLoginClose); $('#adminLoginModal').addEventListener('click', event => { if (event.target === $('#adminLoginModal')) adminLoginClose(); }); $('#adminLoginForm').addEventListener('submit', event => { event.preventDefault(); const email = $('#adminEmail').value.trim().toLowerCase(); if (email === 'kairos@gmail.com') { showAdminPanel(); } else { $('#adminLoginError').textContent = 'Este correo no está autorizado.'; } }); $('#adminClose').addEventListener('click', adminClose);
  $('#newProductButton').addEventListener('click', () => openProductForm()); $('#productFormClose').addEventListener('click', () => closeProductForm()); $('#productFormCancel').addEventListener('click', () => closeProductForm());
  let uploadedProductImage = '';
  $('#productImageFile').addEventListener('change', event => { const file = event.target.files && event.target.files[0]; if (!file) return; if (!file.type.startsWith('image/')) { toast('Selecciona un archivo de imagen.'); return; } if (file.size > 1800000) { toast('La imagen supera 1.8 MB. Redúcela para guardarla en este navegador.'); event.target.value=''; return; } const reader = new FileReader(); reader.onload = () => { uploadedProductImage = String(reader.result || ''); const img = document.createElement('img'); img.src = uploadedProductImage; img.alt = 'Vista previa del producto'; $('#productImagePreview').replaceChildren(img); $('#productImage').value=''; }; reader.readAsDataURL(file); });
  $('#productForm').addEventListener('submit', event => {
    event.preventDefault(); const name = $('#productName').value.trim(); const category = $('#productCategory').value.trim(); const id = $('#productId').value || `${slug(name)}-${Math.random().toString(36).slice(2, 6)}`; const previous = productById(id);
    const product = { id, name, category, style: $('#productStyle').value.trim(), description: $('#productDescription').value.trim(), price: Number($('#productPrice').value), oldPrice: $('#productOldPrice').value ? Number($('#productOldPrice').value) : null, image: uploadedProductImage || $('#productImage').value.trim() || previous?.image || '', available: $('#productStock').value === 'true', featured: $('#productFeatured').checked };
    if (!name || !category || !Number.isFinite(product.price) || product.price < 0) { toast('Revisa el nombre, categoría y precio.'); return; }
    const existingIndex = catalog.products.findIndex(item => item.id === id); if (existingIndex >= 0) catalog.products[existingIndex] = product; else catalog.products.unshift(product);
    if (!catalog.categories.includes(category)) catalog.categories.push(category);
    saveCatalog(); closeProductForm(false); $('#adminModal').classList.add('show'); renderAdmin(); renderAll(); setAdminStatus('Producto guardado en este navegador.'); toast('Producto guardado.');
  });
  $('#saveCategories').addEventListener('click', () => { const list = $('#categoryInput').value.split(',').map(item => item.trim()).filter(Boolean); catalog.categories = list.filter((item, i) => list.indexOf(item) === i); saveCatalog(); renderAll(); renderAdmin(); setAdminStatus('Categorías guardadas en este navegador.'); });
  $('#exportCatalog').addEventListener('click', exportCatalog); $('#importCatalog').addEventListener('change', event => importCatalogFile(event.target.files[0]));
  $('#resetCatalog').addEventListener('click', () => { if (confirm('Esto reemplaza el catálogo local por los datos de ejemplo. ¿Continuar?')) { catalog = clone(seed); localStorage.removeItem('kairos_catalog_override'); renderAll(); renderAdmin(); setAdminStatus('Catálogo de ejemplo restaurado.'); } });
  $('#adminModal').addEventListener('click', event => { if (event.target === $('#adminModal')) adminClose(); }); $('#productModal').addEventListener('click', event => { if (event.target === $('#productModal')) closeProductForm(); });

  // Contacto. Cambia el número en js/catalog.js por el número real de WhatsApp.
  function setupWhatsappLink() {
    const number = String(catalog.whatsappNumber || '').replace(/\D/g, '');
    $('#whatsappFooter').href = number.length >= 10 ? `https://wa.me/${number}?text=${encodeURIComponent('Hola, KAIROS. Quisiera información sobre sus productos y regalos.')}` : 'javascript:void(0)';
    $('#whatsappFooter').addEventListener('click', event => { if ($('#whatsappFooter').getAttribute('href') === 'javascript:void(0)') { event.preventDefault(); toast('Configura tu WhatsApp en js/catalog.js antes de publicar.'); } });
    $('#contactLink').addEventListener('click', event => { event.preventDefault(); if (number.length >= 10) window.open(`https://wa.me/${number}?text=${encodeURIComponent('Hola, KAIROS. Quisiera recibir asesoría para elegir un regalo.')}`, '_blank', 'noopener,noreferrer'); else toast('Configura tu WhatsApp en js/catalog.js antes de publicar.'); });
  }
  $('#newsletterForm').addEventListener('submit', event => { event.preventDefault(); const email = $('#newsletterEmail').value.trim(); $('#newsletterMessage').textContent = `¡Gracias! Para habilitar suscripciones reales, conecta un servicio de email marketing. (${email})`; $('#newsletterMessage').classList.add('success-message'); });
  $('#yearNow').textContent = new Date().getFullYear();
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeCart(); adminClose(); adminLoginClose(); $('#productModal').classList.remove('show'); document.body.classList.remove('no-scroll'); } });
  renderAll(); setupWhatsappLink();
})();
