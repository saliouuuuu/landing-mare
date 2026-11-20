/* Marea Creative · sito */
(() => {
'use strict';
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const G = window.gsap;
const ANIM = !!(G && window.ScrollTrigger) && !reduce;
const safe = fn => { try { fn(); } catch (err) { console.error(err); } };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pad2 = n => String(n).padStart(2, '0');
const eur = n => Math.round(n).toLocaleString('it-IT');
const svg = (id, cls = '') => `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" aria-hidden="true"><use href="#${id}"/></svg>`;

/* ---------- contatti ---------- */
const WA = '393505920776';
const wa = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const setWa = scope => $$('[data-wa]', scope).forEach(a => { a.href = wa(a.dataset.wa); });
setWa(document);

/* ---------- offerta del mese: finisce il 30 novembre, poi i prezzi tornano pieni ---------- */
const OFFER_END = new Date('2026-11-30T23:59:59+01:00');
const offerOn = new Date() <= OFFER_END;
const offerTxt = OFFER_END.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', timeZone: 'Europe/Rome' });

/* ---------- contenuti ---------- */
const PIANI = [
  { nome: 'Essenziale', sotto: 'tutto quello che serve per esserci, bene', vecchio: 560, prezzo: 460, visibili: 8,
    desc: 'Un sito su una sola pagina, fatto su misura, che spiega chi sei, mostra i tuoi lavori e ti fa contattare in un tocco.', voci: [
    'Sito <b>one page</b> su misura, niente modelli', 'Sezioni <b>servizi, chi sono e contatti</b>', '<b>Galleria</b> dei tuoi lavori', 'Perfetto su <b>telefono</b>, tablet e computer',
    'Pulsanti per <b>WhatsApp</b> e <b>chiamata</b>', '<b>Mappa</b> e indicazioni per raggiungerti', '<b>Animazioni</b> leggere e curate', '<b>SEO di base</b> per farti trovare in zona',
    'Collegamento ai tuoi <b>social</b>', '<b>Caricamento veloce</b>, foto ottimizzate', '<b>Lucchetto HTTPS</b> e protezione di base', '<b>Anteprima</b> curata quando condividi il link',
    'Pagina <b>privacy</b> inclusa', 'Messa online e <b>dominio collegato</b>', '<b>2 giri</b> di revisioni', '<b>Spiegazione</b> alla consegna'] },
  { nome: 'Completo', sotto: 'per chi offre più servizi', vecchio: 760, prezzo: 640, visibili: 4,
    desc: 'Più pagine per raccontare ogni servizio, testi rivisti insieme a te e SEO curata pagina per pagina.', voci: [
    'Tutto quello di <b>Essenziale</b>', 'Fino a <b>5 pagine</b>', 'Pagine dedicate ai <b>singoli servizi</b>', '<b>Animazioni</b> più ricche',
    '<b>SEO</b> curata pagina per pagina', 'Testi <b>rivisti</b> insieme a te', '<b>3 giri</b> di revisioni'] },
  { nome: 'Premium', sotto: 'tutto curato, anche dopo', vecchio: 960, prezzo: 830, visibili: 4,
    desc: 'Pagine senza limite fisso, un pannello per aggiornare da solo foto e contenuti e assistenza dopo la consegna.', voci: [
    'Tutto quello di <b>Completo</b>', 'Pagine <b>senza limite</b> fisso', '<b>Pannello</b> per aggiornare foto e contenuti', '<b>Prima e dopo</b> interattivo dei lavori',
    '<b>Sicurezza</b> e velocità rinforzate', '<b>4 giri</b> di revisioni', '<b>Assistenza</b> dopo la consegna'] }
];
const priceOf = p => offerOn ? p.prezzo : p.vecchio;
const SEMPRE = [
  ['Design su misura', 'Niente modelli già pronti: il sito nasce sul tuo lavoro e sui tuoi colori.'],
  ['Perfetto sul telefono', 'La maggior parte dei clienti ti cerca dal cellulare: ogni pagina è pensata prima lì.'],
  ['Velocità di caricamento', 'Immagini ottimizzate e codice leggero: chi aspetta più di qualche secondo se ne va.'],
  ['Lucchetto HTTPS', 'Connessione cifrata e certificato sempre rinnovato: il browser non segnala il sito come non sicuro.'],
  ['Dominio e messa online', 'Collego il tuo indirizzo (es. tuonome.it) e pubblico il sito: non devi configurare niente.'],
  ['Pronto per Google', 'Titoli, descrizioni e struttura giusti per farti trovare nelle ricerche della tua zona.'],
  ['Anteprima sui social', 'Quando condividi il link su WhatsApp o Facebook compare un\'immagine curata, non un riquadro vuoto.'],
  ['Privacy in regola', 'Pagina dell\'informativa e nessun tracciamento inutile dei tuoi visitatori.'],
  ['Protezione di base', 'Regole di sicurezza contro accessi e richieste indesiderate.'],
  ['Provato su più dispositivi', 'Controllo il sito su telefoni, tablet e computer prima di consegnarlo.'],
  ['Testi e foto sistemati', 'Ritaglio, comprimo e sistemo le tue foto; correggo e ordino i testi che mi dai.'],
  ['Spiegazione alla consegna', 'Ti mostro come funziona e cosa fare se vuoi cambiare qualcosa.']
];
const HOW = [
  { t: 'Consulenza', tag: 'Gratuita', d: 'Parliamo del tuo lavoro, dei clienti che cerchi e di cosa deve fare il sito.', cls: 'gl' },
  { t: 'Bozza', tag: 'Gratuita', d: 'Vedi com\'è fatta la prima pagina, con i tuoi colori e i tuoi testi.', cls: 'st--pe' },
  { t: 'Decidi', d: 'Scegli il pacchetto solo se ti piace quello che hai visto.', cls: 'gl' },
  { t: 'Online', d: 'Collego il tuo indirizzo, pubblico il sito e ti spiego come funziona.', cls: 'st--sa' }
];
const FACTS = ['Apertura animata con piante e colibrì', 'Prima e dopo con cursore su 7 lavori', 'Galleria che Lisa aggiorna da sola dal pannello', 'Preventivo guidato che arriva su WhatsApp', 'Pannello riservato e protetto'];
const LH = [['Prestazioni', 95, '#A9BDCB'], ['Accessibilità', 98, '#A7C0B2'], ['SEO', 100, '#EDB79E']];
const FAQ = [
  ['Devo pagare per vedere la bozza?', 'No. Consulenza e bozza sono gratuite: vedi com\'è fatta la prima pagina, con i tuoi colori e i tuoi testi. Scegli il pacchetto solo se ti piace.'],
  ['Cosa mi serve per partire?', 'Basta che mi racconti il tuo lavoro e mi mandi le foto e i testi che hai. Ritaglio, comprimo e sistemo le foto; correggo e ordino i testi. Nel pacchetto Completo li rivediamo insieme.'],
  ['Posso usare il mio indirizzo?', 'Sì: collego il tuo indirizzo (per esempio tuonome.it) e pubblico il sito. Non devi configurare niente.'],
  ['Quante modifiche posso chiedere?', 'Due giri di revisioni con l\'Essenziale, tre con il Completo, quattro con il Premium.'],
  ['Funziona bene dal telefono?', 'È la prima cosa che controllo: la maggior parte dei clienti ti cerca dal cellulare, quindi ogni pagina è pensata prima lì. Prima di consegnare provo il sito su telefoni, tablet e computer.'],
  ['Posso aggiornarlo da solo?', 'Con il pacchetto Premium c\'è un pannello per aggiornare foto e contenuti. Alla consegna ti spiego comunque come funziona e cosa fare se vuoi cambiare qualcosa.'],
  ['E per progetti più grandi?', 'Tempi, urgenze e progetti più grandi si concordano di persona: scrivimi e ne parliamo.'],
  ['Dove lavori?', 'Soprattutto in provincia di Cuneo: Saluzzo, Bra, Alba, Fossano, Mondovì, Savigliano. Se sei più lontano scrivimi lo stesso.']
];

/* ---------- scorrimento morbido ---------- */
let lenis = null;
if (ANIM && window.Lenis) {
  lenis = new Lenis({ lerp: .1, smoothWheel: true, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  G.ticker.add(t => lenis.raf(t * 1000));
  G.ticker.lagSmoothing(0);
}
if (G && window.ScrollTrigger) { G.registerPlugin(ScrollTrigger); ScrollTrigger.config({ ignoreMobileResize: true }); }
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const scrollToEl = t => { if (!t) return; if (lenis) lenis.scrollTo(t.id === 'top' ? 0 : t, { duration: 1.4, offset: -40 }); else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); };
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]'); if (!a) return;
  const id = a.getAttribute('href'); if (id.length < 2) return; const t = $(id); if (!t) return;
  e.preventDefault(); scrollToEl(t);
});
const toastEl = $('#toast'); let tt;
const toast = m => { toastEl.textContent = m; toastEl.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove('show'), 2800); };
const countUp = (el, to, dur = 1.4) => { if (!ANIM) { el.textContent = to; return; } const o = { v: 0 }; G.to(o, { v: to, duration: dur, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v); } }); };

/* ---------- testi legati all'offerta ---------- */
$('#heroOffer').innerHTML = offerOn
  ? `Fino al ${offerTxt}: siti da <b>${eur(PIANI[0].prezzo)} €</b> invece di ${eur(PIANI[0].vecchio)} €.`
  : `Siti su misura da <b>${eur(PIANI[0].vecchio)} €</b>, con consulenza e bozza gratuite.`;
if (offerOn) $('#priceLead').textContent = `Tre pacchetti, tutto elencato. Fino al ${offerTxt} hai i prezzi di novembre: scegli una cartella per vedere cosa c'è dentro.`;

/* ---------- metodo ---------- */
$('#stairs').innerHTML = HOW.map((s, i) => `<article class="st ${s.cls}" style="--i:${i};--dy:0px">
  <h3>${esc(s.t)}</h3><p class="st__in">${esc(s.d)}</p>${s.tag ? `<span class="st__tag">${esc(s.tag)}</span>` : ''}
  <span class="st__n">${pad2(i + 1)}</span></article>`).join('');
$('#stairs').insertAdjacentHTML('afterend', `<p class="stairs__end">${svg('i-tick')}Se non ti convince, non devi nulla.</p>`);

/* ---------- lavoro di Lisa ---------- */
$('#facts').innerHTML = FACTS.map(f => `<li>${esc(f)}</li>`).join('');
$('#lh').innerHTML = LH.map(([k, v, c]) => `<div class="lh__r" style="--c:${c}"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="g0" cx="50" cy="50" r="44"/><circle class="g1" cx="50" cy="50" r="44" pathLength="100" data-v="${v}"/></svg><b data-n="${v}">${v}</b><small>${k}</small></div>`).join('');

/* ---------- prezzi: cartelle ---------- */
const tick = svg('i-tick');
const elenco = (voci, n) => {
  const a = voci.slice(0, n), b = voci.slice(n), li = (v, k) => `<li${k != null ? ` style="--k:${k}"` : ''}>${tick}<span>${v}</span></li>`;
  return `<ul class="list">${a.map(v => li(v)).join('')}</ul>` + (b.length ? `<div class="extra"><div><ul class="list">${b.map((v, k) => li(v, k)).join('')}</ul></div></div><button class="more" type="button" aria-expanded="false"><span class="ic"></span><span class="lbl" data-a="Vedi tutto · ${b.length} in più" data-b="Mostra meno">Vedi tutto · ${b.length} in più</span></button>` : '');
};
const tabs = $('#tabs'), panel = $('#pkPanel');
tabs.innerHTML = PIANI.map((p, i) => `<button class="tab" type="button" role="tab" id="tab${i}" aria-controls="pkPanel" aria-selected="false" tabindex="-1">
  <small>${p.voci.length} voci</small><b>${p.nome}</b><span>${eur(priceOf(p))} €</span></button>`).join('');
const tabEls = $$('.tab', tabs);
let cur = -1;
const select = (i, focus) => {
  if (i === cur) return; cur = i;
  const p = PIANI[i], pr = priceOf(p);
  tabEls.forEach((t, k) => { const on = k === i; t.classList.toggle('on', on); t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
  if (focus) tabEls[i].focus();
  panel.setAttribute('aria-labelledby', 'tab' + i);
  const perks = [offerOn ? `Prezzo di novembre valido fino al ${offerTxt}` : 'Consulenza gratuita, senza impegno', 'Prezzo bloccato una volta confermato', 'Bozza gratuita prima di decidere'];
  panel.innerHTML = `<div class="pk__l">
      <div class="pk__name"><b>${p.nome}</b>${i === 0 ? '<span class="badge">Il più scelto</span>' : ''}</div>
      <p class="pk__desc">${p.desc}</p>
      <p class="pk__lbl">${offerOn ? `fino al ${offerTxt}` : 'prezzo del pacchetto'}</p>
      <div class="pk__now">${eur(pr)}<small>€</small></div>
      ${offerOn ? `<p class="pk__was">prezzo pieno <s>${eur(p.vecchio)} €</s><span>−${p.vecchio - p.prezzo} €</span></p>` : '<p class="pk__was"></p>'}
      <ul class="pk__perks">${perks.map(t => `<li>${tick}${t}</li>`).join('')}</ul>
      <a class="btn btn--pe" data-wa="Ciao, vorrei il pacchetto ${p.nome} (${eur(pr)} €)" href="#" target="_blank" rel="noopener">${svg('i-wa', 'ic')}Scegli ${p.nome}</a>
    </div>
    <div class="pk__r"><h4>Cosa include<span>${p.voci.length} voci</span></h4>${elenco(p.voci, p.visibili)}</div>`;
  setWa(panel);
  if (ANIM && panel._seen) { G.fromTo(panel.children, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .5, stagger: .05, ease: 'power3.out', clearProps: 'transform,opacity' }); setTimeout(() => ScrollTrigger.refresh(), 300); }
  panel._seen = 1;
};
tabEls.forEach((t, i) => t.addEventListener('click', () => select(i)));
tabs.addEventListener('keydown', e => {
  const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!k) return;
  e.preventDefault(); select((cur + k + PIANI.length) % PIANI.length, true);
});
select(0);
document.addEventListener('click', e => {
  const b = e.target.closest('.more'); if (!b) return;
  const host = b.closest('.pk__r'); const open = !host.classList.contains('open');
  host.classList.toggle('open', open); b.setAttribute('aria-expanded', String(open));
  const l = $('.lbl', b); l.textContent = open ? l.dataset.b : l.dataset.a;
  setTimeout(() => ANIM && ScrollTrigger.refresh(), 900);
});

/* sempre incluso: schede di colori e altezze diverse */
{
  const tint = ['it--pe it--big', '', 'it--sa', 'it--mi', '', 'it--pe', 'it--sa it--big', '', 'it--mi', '', 'it--pe', 'it--sa'];
  $('#alwaysBox').innerHTML = `<div class="al-h"><h3><b>${SEMPRE.length}</b>cose sempre incluse</h3><p>Spesso non si vedono, ma fanno la differenza tra un sito qualsiasi e un sito che lavora per te. Ci sono in ogni pacchetto.</p><div class="sphere sphere--sa" aria-hidden="true"></div></div>
    <div class="mas">${SEMPRE.map((v, i) => `<div class="it ${tint[i]}"><h4>${v[0]}</h4><p>${v[1]}</p></div>`).join('')}</div>`;
}

/* ---------- quanto rende ---------- */
safe(() => {
  const vIn = $('#vIn'), cIn = $('#cIn'), seg = $('#roiPlan'), bars = $('#bars');
  seg.innerHTML = PIANI.map((p, i) => `<label><input type="radio" name="rp" value="${i}"${i === 0 ? ' checked' : ''}><span>${p.nome}<small>${eur(priceOf(p))} €</small></span></label>`).join('');
  bars.insertAdjacentHTML('beforeend', Array.from({ length: 12 }, () => '<i class="b"><u></u></i>').join(''));
  const bs = $$('i.b', bars), line = $('#barsLine');
  const fill = r => r.style.setProperty('--p', ((r.value - r.min) / (r.max - r.min) * 100).toFixed(1) + '%');
  let shown = !ANIM;
  const calc = () => {
    const v = +vIn.value, c = +cIn.value, p = priceOf(PIANI[+($('input[name=rp]:checked', seg).value)]);
    $('#vOut').textContent = eur(v) + ' €'; $('#cOut').textContent = c; fill(vIn); fill(cIn);
    const n = Math.max(1, Math.ceil(p / v)), per = v * c, mon = Math.max(1, Math.ceil(p / per));
    $('#roiN').textContent = n; $('#roiNl').textContent = n === 1 ? 'lavoro in più' : 'lavori in più';
    $('#roiSub').textContent = `Con ${c} ${c === 1 ? 'cliente' : 'clienti'} in più al mese, ${mon <= 1 ? 'già nel primo mese' : mon > 12 ? 'in più di un anno' : 'in circa ' + mon + ' mesi'}.`;
    const tot = per * 12, max = Math.max(tot, p) * 1.1;
    bs.forEach((b, i) => { const cum = per * (i + 1); b.firstChild.style.height = shown ? (cum / max * 100).toFixed(1) + '%' : '0%'; b.classList.toggle('up', cum >= p); });
    line.style.bottom = (p / max * 100).toFixed(1) + '%';
    $('#roiYear').textContent = `+${eur(tot)} €`;
  };
  [vIn, cIn].forEach(r => r.addEventListener('input', calc)); seg.addEventListener('change', calc); calc();
  if (ANIM) ScrollTrigger.create({ trigger: bars, start: 'top 90%', once: true, onEnter: () => { shown = true; calc(); } });
});

/* ---------- modulo preventivo -> WhatsApp ---------- */
safe(() => {
  const sel = $('#qPlan'); sel.insertAdjacentHTML('beforeend', PIANI.map(p => `<option value="${p.nome} (${eur(priceOf(p))} €)">${p.nome} · ${eur(priceOf(p))} €</option>`).join(''));
  const send = $('#qSend'), form = $('#qForm');
  const build = () => {
    const name = $('#qName').value.trim(), work = $('#qWork').value.trim(), needs = $$('.chk input:checked', form).map(i => i.value), plan = sel.value;
    let m = `Ciao, ${name ? 'sono ' + name : 'vorrei una bozza gratuita del mio sito'}.`;
    if (work) m += ` Mi occupo di ${work}.`;
    if (needs.length) m += ` Mi serve: ${needs.join(', ')}.`;
    if (plan) m += ` Mi interessa il pacchetto ${plan}.`;
    return m + ' Puoi prepararmi la bozza e il preventivo?';
  };
  const sync = () => { send.href = wa(build()); };
  ['input', 'change'].forEach(ev => form.addEventListener(ev, sync)); sync();
  form.addEventListener('submit', e => { e.preventDefault(); send.click(); });
  send.addEventListener('click', () => toast('Si apre WhatsApp con il messaggio già scritto'));
});

/* ---------- domande ---------- */
$('#faqList').innerHTML = FAQ.map(q => `<div class="qa"><button class="qa__b" type="button" aria-expanded="false">${esc(q[0])}<span class="pm"></span></button><div class="qa__p"><div><p>${esc(q[1])}</p></div></div></div>`).join('');
$('#faqList').addEventListener('click', e => {
  const b = e.target.closest('.qa__b'); if (!b) return; const it = b.closest('.qa'), o = !it.classList.contains('open');
  $$('.qa.open', $('#faqList')).forEach(x => { if (x !== it) { x.classList.remove('open'); $('.qa__b', x).setAttribute('aria-expanded', 'false'); } });
  it.classList.toggle('open', o); b.setAttribute('aria-expanded', String(o)); setTimeout(() => ANIM && ScrollTrigger.refresh(), 800);
});

/* ---------- barra alta, voce attiva, WhatsApp fisso ---------- */
safe(() => {
  const top = $('#top-bar'), waf = $('#waf'), hero = $('#top'); let lastY = 0, tk = false;
  const on = () => { tk = false; const y = scrollY;
    if (y > lastY + 2 && y > 200) top.classList.add('hide'); else if (y < lastY - 2 || y < 200) top.classList.remove('hide');
    top.classList.toggle('solid', y > 40); waf.classList.toggle('show', y > hero.offsetHeight * .7); lastY = y; };
  addEventListener('scroll', () => { if (!tk) { tk = true; requestAnimationFrame(on); } }, { passive: true }); on();
  const links = $$('.top__nav a');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const id = '#' + e.target.id;
      links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === id)); }), { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section').forEach(s => io.observe(s));
  }
});

/* ---------- animazioni ---------- */
const ringsOn = () => { $$('#lh .g1').forEach(c => { c.style.strokeDashoffset = 100 - c.dataset.v; }); $('.gauge').classList.add('on'); };
if (!ANIM) { root.classList.remove('js'); $('.spark').classList.add('on'); ringsOn(); }
else safe(() => {
  const tl = G.timeline({ delay: .1, defaults: { ease: 'power3.out' } });
  tl.fromTo('.hero__t .ln>span', { yPercent: 112, visibility: 'visible' }, { yPercent: 0, duration: 1.15, stagger: .1 }, 0)
    .fromTo('.hv', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .9, stagger: .08, clearProps: 'transform' }, .25)
    .fromTo('.hero__lines', { opacity: 0 }, { opacity: 1, duration: 1.6 }, .2)
    .fromTo('.hero__orb', { opacity: 0, scale: .85 }, { opacity: 1, scale: 1, duration: 1.6, ease: 'expo.out' }, .3)
    .fromTo('.hero__orb2', { opacity: 0 }, { opacity: 1, duration: 1.2 }, .6)
    .fromTo('.hero__phone', { opacity: 0, y: 70, rotation: -14 }, { opacity: 1, y: 0, rotation: -7, duration: 1.4, ease: 'expo.out' }, .5)
    .fromTo('.hero__card, .hero__tag, .hero__msg', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: .15 }, .95)
    .call(() => { $('.spark').classList.add('on'); countUp($('.hero__card b'), 100, 1.6); }, null, 1.1);
  tl.eventCallback('onComplete', () => root.classList.remove('js'));
  // la composizione si muove appena col puntatore
  if (fine) {
    const mk = (sel, k) => ({ x: G.quickTo(sel, 'x', { duration: 1.4, ease: 'power3.out' }), y: G.quickTo(sel, 'y', { duration: 1.4, ease: 'power3.out' }), k });
    const parts = [mk('.hero__phone', 14), mk('.hero__card', -18), mk('.hero__tag', 10), mk('.hero__msg', -12)];
    $('#top').addEventListener('pointermove', e => { if (tl.isActive()) return; const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5; parts.forEach(o => { o.x(x * o.k); o.y(y * o.k * .7); }); });
  }
  G.to('.hero__art', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true } });
  // titoli e testi
  $$('.sh, .faqw__l').forEach(el => G.from($$('.orn, .h2', el), { y: 40, opacity: 0, duration: 1.1, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
  $$('.rv').forEach(el => G.from(el, { y: 26, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
  // vantaggi
  G.from('.bx', { y: 50, opacity: 0, duration: 1.1, stagger: .1, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '#bento', start: 'top 82%', once: true } });
  G.from('.bub', { y: 16, opacity: 0, scale: .94, duration: .7, stagger: .5, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.bx--b', start: 'top 75%', once: true } });
  G.from('.sw i', { x: -20, opacity: 0, duration: .8, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.bx--c', start: 'top 80%', once: true } });
  ScrollTrigger.create({ trigger: '.gauge', start: 'top 85%', once: true, onEnter: () => { $('.gauge').classList.add('on'); countUp($('.gauge b'), 95, 1.6); } });
  // metodo
  G.from('.st', { '--dy': '90px', opacity: 0, duration: 1.2, stagger: .12, ease: 'expo.out', scrollTrigger: { trigger: '#stairs', start: 'top 80%', once: true } });
  G.from('.stairs__end', { y: 20, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.stairs__end', start: 'top 94%', once: true } });
  // lavoro
  G.from('.facts li', { x: 24, opacity: 0, duration: .8, stagger: .07, ease: 'power3.out', scrollTrigger: { trigger: '.facts', start: 'top 88%', once: true } });
  ScrollTrigger.create({ trigger: '#lh', start: 'top 92%', once: true, onEnter: () => { ringsOn(); $$('#lh b').forEach(b => countUp(b, +b.dataset.n, 1.6)); } });
  G.to('.case__orb', { yPercent: -25, ease: 'none', scrollTrigger: { trigger: '.case', start: 'top bottom', end: 'bottom top', scrub: true } });
  // prezzi
  G.from('.tab', { y: 60, opacity: 0, duration: 1, stagger: .1, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '#tabs', start: 'top 88%', once: true } });
  G.from('.it', { y: 30, opacity: 0, duration: .8, stagger: .05, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '.mas', start: 'top 88%', once: true } });
  // contatti e domande
  G.from('.ct__card', { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '.ct__stage', start: 'top 82%', once: true } });
  G.from('.clist li', { y: 20, opacity: 0, duration: .8, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.clist', start: 'top 92%', once: true } });
  G.from('.qa', { y: 18, opacity: 0, duration: .7, stagger: .05, ease: 'power3.out', scrollTrigger: { trigger: '#faqList', start: 'top 88%', once: true } });
  G.from('.ft__big', { y: 50, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.ft__big', start: 'top 95%', once: true } });
  ScrollTrigger.refresh();
});
window.__mOk = true;

/* ---------- ricalcolo quando cambia l'altezza ---------- */
if (G && window.ScrollTrigger) safe(() => {
  let lastH = 0, rt = null;
  const ro = new ResizeObserver(() => { const h = document.documentElement.scrollHeight; if (Math.abs(h - lastH) < 2) return; lastH = h; clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 260); });
  $$('main > section').forEach(s => ro.observe(s));
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh());
});
})();
