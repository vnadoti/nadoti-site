(function () {
  const P = window.NADOTI_PRODUCTS || [];
  const C = window.NADOTI_CONFIG || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const wa = (msg) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`;

  const GLYPHS = {
    check: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="3"/><path d="M3 9h18M8 2v4M16 2v4M8 14.5l2.5 2.5L16 12"/></svg>',
    canvas: '<svg viewBox="0 0 24 24"><rect x="2.5" y="3" width="11" height="8" rx="1.5"/><rect x="10.5" y="9" width="11" height="12" rx="1.5"/><rect x="3.5" y="14" width="5" height="6" rx="1"/><path d="m12.5 18 3-3 2 2 2-2"/></svg>',
    book: '<svg viewBox="0 0 24 24"><path d="M2 5.5C4.5 4 8 4 12 6c4-2 7.5-2 10-.5V19c-2.5-1.5-6-1.5-10 .5-4-2-7.5-2-10-.5z"/><path d="M12 6v13.5"/></svg>',
    md: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M6 15V9l2.5 3L11 9v6M16 9v6m-2.5-2.5L16 15l2.5-2.5"/></svg>',
    bass: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 15h3v-4h4v-3h3M7 18h10"/></svg>',
    folders: '<svg viewBox="0 0 24 24"><path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z"/><path d="M8 15v-2M12 15v-4M16 15v-3"/></svg>',
    pulse: '<svg viewBox="0 0 24 24"><path d="M2 12h4l2.5-6 4 13 3-9 1.5 2H22"/></svg>',
    tiles: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="10" height="18" rx="1.5"/><rect x="15" y="3" width="6" height="8" rx="1.5"/><rect x="15" y="13" width="6" height="8" rx="1.5"/></svg>',
  };
  // Ícone de cada app no launcher do topo
  const ICON_OF = { 'madbass': 'bass', 'daw-manager': 'folders', 'pulso-live': 'pulse', 'vtask': 'check', 'mosaico': 'tiles','refcanvas': 'canvas', 'ollo-reader': 'book', 'yoink-md': 'md' };
  // Se o produto tem ícone real (campo `icon`), usa ele; senão, o desenho genérico
  const iconFor = (p) => p.icon ? `<img src="${esc(p.icon)}" alt="" width="36" height="36">`
    : GLYPHS[ICON_OF[p.id] || p.glyph] || GLYPHS.md;
  const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  const media = (p, cls) => {
    if (p.image) {
      const pos = p.imagePosition ? ` style="object-position:${esc(p.imagePosition)}"` : '';
      return `<div class="${cls}"><img src="${esc(p.image)}" alt="Tela do ${esc(p.name)}" loading="lazy"${pos}></div>`;
    }
    return `<div class="${cls}"><div class="art">${GLYPHS[p.glyph] || GLYPHS.md}</div></div>`;
  };
  // Preço em destaque (verde); "Valor em breve" e afins ficam discretos
  const priceHtml = (p) => {
    const real = /\d/.test(p.price) || p.free;
    return `<span class="price${real ? '' : ' is-tbd'}">${esc(p.price)}<small>${esc(p.priceNote || '')}</small></span>`;
  };
  const badge = (p) => p.status !== 'live' ? '<span class="badge soon">Em breve</span>'
    : p.free ? '<span class="badge free">Grátis</span>' : '<span class="badge live">Disponível</span>';

  /* ---------- Cards ---------- */
  const grid = $('#grid');
  grid.innerHTML = P.map((p, i) => `
    <article class="card${p.featured ? ' is-featured' : ''}${p.status !== 'live' ? ' is-soon' : ''}" data-cat="${p.category}" data-id="${p.id}" tabindex="0" role="button" aria-label="Ver detalhes do ${esc(p.name)}">
      ${media(p, 'card-media')}
      <div class="card-body">
        <div class="card-top"><span class="mono kind">${String(i + 1).padStart(2, '0')} · ${esc(p.kind)}</span>${badge(p)}</div>
        <h3>${esc(p.name)}</h3>
        <p class="tagline">${esc(p.tagline)}</p>
        <div class="tags">${[...p.formats, ...p.platforms].map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
        <div class="card-foot">
          ${priceHtml(p)}
          <span class="more">Ver detalhes ${ARROW}</span>
        </div>
      </div>
    </article>`).join('');

  /* ---------- Filtros ---------- */
  $$('.chip').forEach((chip) => chip.addEventListener('click', () => {
    $$('.chip').forEach((c) => { c.classList.toggle('is-on', c === chip); c.setAttribute('aria-selected', c === chip); });
    const f = chip.dataset.filter;
    const cards = $$('.card');
    cards.forEach((c) => c.classList.toggle('is-hidden', f !== 'all' && c.dataset.cat !== f));
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(cards.filter((c) => !c.classList.contains('is-hidden')), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .6, stagger: .06, ease: 'power3.out' });
    }
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  }));

  /* ---------- Download grátis com e-mail (Brevo via /api/subscribe) ---------- */
  const gateKey = (p) => `nadoti-download-${p.id}`;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* sem storage, segue */ } },
  };
  const downloadBtn = (p, url) =>
    `<a class="btn" href="${esc(url)}" target="_blank" rel="noopener">Baixar o ${esc(p.name)} ${ARROW}</a>`;
  function gateForm(p) {
    const saved = store.get(gateKey(p));
    if (saved) {
      return `<div class="gate is-done"><p class="gate-title">Seu download já está liberado.</p>${downloadBtn(p, saved)}</div>`;
    }
    return `
      <form class="gate" id="gateForm" novalidate>
        <p class="gate-title">Deixe seu e-mail e baixe grátis</p>
        <p class="gate-sub">Eu te aviso quando sair atualização ou um app novo. Nada de spam.</p>
        <div class="gate-row">
          <label class="sr-only" for="gateEmail">Seu e-mail</label>
          <input class="gate-input" id="gateEmail" name="email" type="email" inputmode="email" autocomplete="email" placeholder="seu@email.com" required>
          <button class="btn" type="submit">Liberar download ${ARROW}</button>
        </div>
        <input class="hp" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">
        <label class="gate-consent">
          <input type="checkbox" name="consent" required>
          <span>Aceito receber e-mails da Nadoti com novidades e lançamentos. Posso cancelar a qualquer momento pelo link no rodapé dos e-mails.</span>
        </label>
        <p class="gate-msg" role="status" aria-live="polite"></p>
      </form>`;
  }
  function bindGate(p) {
    const form = $('#gateForm');
    if (!form) return;
    const msg = $('.gate-msg', form);
    const btn = $('button[type=submit]', form);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      msg.className = 'gate-msg is-error';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { msg.textContent = 'Confira o seu e-mail.'; form.email.focus(); return; }
      if (!form.consent.checked) { msg.textContent = 'Marque a caixa de consentimento para continuar.'; return; }
      btn.disabled = true; msg.className = 'gate-msg'; msg.textContent = 'Liberando…';
      try {
        const r = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email, product: p.id, consent: true, website: form.website.value }),
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok || !data.ok) throw new Error(data.error || 'Não consegui registrar seu e-mail agora. Tente de novo.');
        if (data.downloadUrl) store.set(gateKey(p), data.downloadUrl);
        form.outerHTML = `<div class="gate is-done"><p class="gate-title">Pronto! Download liberado.</p>
          <p class="gate-sub">Obrigado por baixar o ${esc(p.name)}.</p>${data.downloadUrl ? downloadBtn(p, data.downloadUrl) : ''}</div>`;
      } catch (err) {
        btn.disabled = false;
        msg.className = 'gate-msg is-error';
        msg.textContent = err.message;
      }
    });
  }

  /* ---------- Drawer ---------- */
  const drawer = $('#drawer');
  const body = $('#drawerBody');
  let lastFocus = null;
  function openProduct(id) {
    const p = P.find((x) => x.id === id);
    if (!p) return;
    body.innerHTML = `
      ${media(p, 'd-media')}
      <div class="d-body">
        <div class="card-top"><span class="mono kind">${esc(p.kind)}</span>${badge(p)}</div>
        <h2 id="drawerTitle">${p.icon ? `<img class="d-icon" src="${esc(p.icon)}" alt="" width="44" height="44">` : ''}${esc(p.name)}</h2>
        <p class="d-tagline">${esc(p.tagline)}</p>
        <p class="d-desc">${esc(p.description)}</p>
        <ul class="d-feat">${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
        <dl class="d-meta">
          <div><dt class="mono">Plataformas</dt><dd>${esc(p.platforms.join(' · '))}</dd></div>
          <div><dt class="mono">Formatos</dt><dd>${esc(p.formats.join(' · '))}</dd></div>
        </dl>
        <div class="d-buy">
          ${priceHtml(p)}
          ${p.gated ? '' : `<div class="d-actions">
            ${p.url
              ? `<a class="btn" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.ctaLabel || (p.free ? 'Baixar grátis' : 'Ver site e comprar'))} ${ARROW}</a>`
              : `<span class="btn btn-off" aria-disabled="true">Site em breve</span>`}
          </div>`}
        </div>
        ${p.gated ? gateForm(p) : ''}
      </div>`;
    if (p.gated) bindGate(p);
    lastFocus = document.activeElement;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lock');
    lenis && lenis.stop();
    $('.drawer-panel').scrollTop = 0;
    setTimeout(() => $('.drawer-close').focus(), 50);
    history.replaceState(null, '', `#${p.id}`);
  }
  function closeProduct() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lock');
    lenis && lenis.start();
    history.replaceState(null, '', location.pathname);
    lastFocus && lastFocus.focus();
  }
  grid.addEventListener('click', (e) => { const c = e.target.closest('.card'); if (c) openProduct(c.dataset.id); });
  grid.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('card')) { e.preventDefault(); openProduct(e.target.dataset.id); } });
  $$('[data-close]', drawer).forEach((b) => b.addEventListener('click', closeProduct));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeProduct(); });

  /* ---------- Launcher (paleta de comandos) ---------- */
  const launcher = $('#launcher');
  const lList = $('#lList');
  const lQuery = $('#lQuery');
  const lCount = $('#lCount');
  launcher.tabIndex = 0;
  lList.innerHTML = P.map((p) => `
    <li class="l-item" data-id="${p.id}" role="option">
      <span class="l-icon${p.icon ? ' has-img' : ''}" aria-hidden="true">${iconFor(p)}</span>
      <span class="l-text"><span class="l-name">${esc(p.name)}</span><span class="l-kind">${esc(p.tagline)}</span></span>
      <span class="l-go">Abrir <kbd>↵</kbd></span>
    </li>`).join('');
  const items = $$('.l-item', lList);
  let active = -1;
  function setActive(i) {
    active = i;
    items.forEach((el, k) => {
      el.classList.toggle('is-active', k === i);
      el.classList.toggle('is-dim', i >= 0 && k !== i);
      el.setAttribute('aria-selected', k === i);
    });
    lCount.textContent = i >= 0 ? `${i + 1} de ${P.length}` : `${P.length} ferramentas`;
  }
  setActive(-1);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let paused = false;
  let onScreen = true;
  let run = 0; // muda quando o ciclo precisa recomeçar
  async function waitReady(id) { while ((paused || !onScreen || document.hidden) && id === run) await sleep(200); }
  async function cycle(start) {
    const id = ++run;
    let i = start;
    while (id === run) {
      const p = P[i];
      const text = p.task || p.tagline;
      setActive(-1);
      for (let c = 1; c <= text.length; c++) {
        await waitReady(id); if (id !== run) return;
        lQuery.textContent = text.slice(0, c);
        await sleep(38 + Math.random() * 45);
      }
      await sleep(260); if (id !== run) return;
      setActive(i);
      await sleep(2300); await waitReady(id); if (id !== run) return;
      for (let c = text.length; c >= 0; c--) {
        if (id !== run) return;
        lQuery.textContent = text.slice(0, c);
        await sleep(14);
      }
      await sleep(250);
      i = (i + 1) % P.length;
    }
  }
  function showNow(i) {
    run++;
    setActive(i);
    lQuery.textContent = P[i].task || P[i].tagline;
  }
  const resume = () => { paused = false; if (!reduced) cycle((Math.max(active, 0) + 1) % P.length); };
  items.forEach((el, i) => {
    el.addEventListener('mouseenter', () => { paused = true; showNow(i); });
    el.addEventListener('click', () => openProduct(P[i].id));
  });
  launcher.addEventListener('mouseleave', () => { if (document.activeElement !== launcher) resume(); });
  launcher.addEventListener('blur', () => { if (paused && !launcher.matches(':hover')) resume(); });
  launcher.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const n = active < 0 ? 0 : (active + (e.key === 'ArrowDown' ? 1 : -1) + P.length) % P.length;
      paused = true; showNow(n);
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault(); openProduct(P[active].id);
    }
  });
  // Ctrl/Cmd + K foca o launcher, como num app de verdade
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (lenis) lenis.scrollTo(0); else window.scrollTo({ top: 0, behavior: 'smooth' });
      launcher.focus({ preventScroll: true });
      paused = true; showNow(Math.max(active, 0));
    }
  });
  if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }).observe(launcher);
  if (reduced) showNow(0); else cycle(0);

  /* ---------- Marquee ---------- */
  const words = ['Apps para Windows e macOS', 'Plugins de áudio', 'Extensões', 'Feito no Brasil', 'Licença vitalícia', 'Sistemas sob medida', 'Sem assinatura'];
  $('#marquee').innerHTML = [...words, ...words].map((w) => `<span>${w}</span>`).join('');

  /* ---------- Links de contato ---------- */
  $$('[data-wa]').forEach((a) => { a.href = wa(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });
  if (C.email) $('#mailLink').href = `mailto:${C.email}`; else $('#mailLink').remove();
  $('#igLink').href = C.instagram || '#';
  $('#ghLink').href = C.github || '#';
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Nav + menu mobile ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const burger = $('#burger');
  const menu = $('#mobileMenu');
  const setMenu = (open) => {
    burger.setAttribute('aria-expanded', open);
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', !open);
    document.body.classList.toggle('lock', open);
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* ---------- Lenis ---------- */
  var lenis = null;
  if (typeof Lenis !== 'undefined' && !isMobile && !reduced) {
    try {
      lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      } else {
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
      }
      $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1 && $(id)) { e.preventDefault(); lenis.scrollTo(id === '#top' ? 0 : id, { offset: -72 }); }
      }));
    } catch (e) { lenis = null; }
  }

  /* ---------- Animações (sempre gsap.from: sem JS, tudo aparece) ---------- */
  if (typeof gsap !== 'undefined' && !reduced) {
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
    const ease = 'power4.out';

    if (typeof SplitType !== 'undefined') {
      const split = new SplitType('.hero-title', { types: 'words' });
      gsap.from(split.words, { opacity: 0, y: 40, rotate: 2, duration: 1.2, stagger: 0.08, ease });
    }
    gsap.from('.hero .eyebrow, .hero-sub, .hero-cta, .hero-stats', { opacity: 0, y: 24, duration: 1, stagger: .1, delay: .35, ease });
    gsap.from('.launcher', { opacity: 0, y: 40, scale: .97, duration: 1.2, delay: .2, ease });
    gsap.from('.l-item', { opacity: 0, x: -16, duration: .8, stagger: .05, delay: .55, ease, clearProps: 'opacity,transform' });

    if (typeof ScrollTrigger !== 'undefined') {
      $$('.section').forEach((sec) => {
        const items = $$('.section-head > *, .filters, .steps li, .custom > div > *, .ticks li', sec);
        if (items.length) gsap.from(items, { opacity: 0, y: 36, duration: .9, stagger: .08, ease, scrollTrigger: { trigger: sec, start: 'top 80%' } });
      });
      ScrollTrigger.batch('.card', {
        start: 'top 90%',
        onEnter: (els) => gsap.from(els, { opacity: 0, y: 48, duration: 1, stagger: .1, ease, overwrite: true }),
      });
      gsap.from('.footer-big > *', { opacity: 0, y: 40, duration: 1, stagger: .1, ease, scrollTrigger: { trigger: '.footer', start: 'top 85%' } });
    }
  }

  /* Abre direto um produto via link: site.com/#madbass */
  const hash = location.hash.slice(1);
  if (hash && P.some((p) => p.id === hash)) setTimeout(() => openProduct(hash), 300);
})();
