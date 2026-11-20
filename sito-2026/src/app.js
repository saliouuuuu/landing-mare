/* Marea Creative · sito */
(() => {
'use strict';
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const isMob = () => innerWidth <= 760;
const G = window.gsap;
const ANIM = !!(G && window.ScrollTrigger) && !reduce;
const safe = fn => { try { fn(); } catch (err) { console.error(err); } };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pad2 = n => String(n).padStart(2, '0');
const eur = n => Math.round(n).toLocaleString('it-IT');

/* ---------- contatti ---------- */
const WA = '393505920776';
const wa = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const setWa = scope => $$('[data-wa]', scope).forEach(a => { a.href = wa(a.dataset.wa); });
setWa(document);

/* ---------- offerta del mese: finisce il 30 novembre, poi i prezzi tornano pieni ---------- */
const OFFER_END = new Date('2026-11-30T23:59:59+01:00');
const offerOn = new Date() <= OFFER_END;
const offerTxt = OFFER_END.toLocaleDateString('it-IT', { day: 'numeric', month: 'long' });
$$('#offerEnd, .endd').forEach(e => { e.textContent = offerTxt; });
if (!offerOn) { $('#offerChip').hidden = true; $('#offerChip2').hidden = true; }

/* ---------- contenuti ---------- */
const PIANI = [
  { nome: 'Essenziale', vecchio: 560, prezzo: 460, visibili: 8, voci: [
    'Sito <b>one page</b> su misura, niente modelli', 'Sezioni <b>servizi, chi sono e contatti</b>', '<b>Galleria</b> dei tuoi lavori', 'Perfetto su <b>telefono</b>, tablet e computer',
    'Pulsanti per <b>WhatsApp</b> e <b>chiamata</b>', '<b>Mappa</b> e indicazioni per raggiungerti', '<b>Animazioni</b> leggere e curate', '<b>SEO di base</b> per farti trovare in zona',
    'Collegamento ai tuoi <b>social</b>', '<b>Caricamento veloce</b>, foto ottimizzate', '<b>Lucchetto HTTPS</b> e protezione di base', '<b>Anteprima</b> curata quando condividi il link',
    'Pagina <b>privacy</b> inclusa', 'Messa online e <b>dominio collegato</b>', '<b>2 giri</b> di revisioni', '<b>Spiegazione</b> alla consegna'] },
  { nome: 'Completo', sotto: 'per chi offre più servizi', glow: 'g-sky', vecchio: 760, prezzo: 640, visibili: 4, voci: [
    'Tutto quello di <b>Essenziale</b>', 'Fino a <b>5 pagine</b>', 'Pagine dedicate ai <b>singoli servizi</b>', '<b>Animazioni</b> più ricche',
    '<b>SEO</b> curata pagina per pagina', 'Testi <b>rivisti</b> insieme a te', '<b>3 giri</b> di revisioni'] },
  { nome: 'Premium', sotto: 'tutto curato, anche dopo', glow: 'g-peach', vecchio: 960, prezzo: 830, visibili: 4, voci: [
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
const VANTAGGI = offerOn
  ? [['Sconto del mese', `Fino a 130 euro in meno sul prezzo pieno, confermando entro il <b class="endd">${offerTxt}</b>.`], ['Prezzo bloccato', 'Una volta confermato, il prezzo non cambia per tutta la durata del lavoro.'], ['Bozza gratuita', 'Vedi una prima versione del tuo sito prima di decidere, senza impegno.']]
  : [['Prezzo bloccato', 'Una volta confermato, il prezzo non cambia per tutta la durata del lavoro.'], ['Bozza gratuita', 'Vedi una prima versione del tuo sito prima di decidere, senza impegno.'], ['Consulenza gratuita', 'Parliamo del tuo lavoro e dei clienti che cerchi, senza impegno.']];

const STAR = '<svg viewBox="0 0 20 20" aria-hidden="true"><use href="#i-star"/></svg>';
const SEARCH = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>';
const GAIN = [
  { k: '01', t: 'Ti trovano', orb: '#2F7F95', d: 'Titoli, descrizioni e struttura giusti per farti trovare nelle ricerche della tua zona.',
    v: `<div class="mock mock--s"><div class="bar">${SEARCH}<span>falegname vicino a me</span></div><small>latuaattivita.it</small><b>La tua attività · la tua città</b><p>Il tuo lavoro, i tuoi contatti, tutto in primo piano.</p></div><p class="vis-c">Esempio di come ti trovano</p>` },
  { k: '02', t: 'Ti scrivono subito', orb: '#FF8A5C', d: 'Pulsanti per WhatsApp e chiamata, mappa e indicazioni: dal telefono ti contattano in un tocco.',
    v: `<div class="wa-bg"><div class="bub bub--in">Buongiorno, vorrei un preventivo<small>09:12</small></div><div class="bub bub--out">Certo, ti rispondo subito<small>09:13 ✓✓</small></div></div>` },
  { k: '03', t: 'Ti scelgono', orb: '#C9E6D8', d: 'Un sito disegnato sul tuo lavoro, non su un modello: chi arriva capisce subito chi sei e perché fidarsi.',
    v: `<div class="mock mock--h"><div class="tb"><i></i><i></i><i></i></div><div class="hb"><b>Il tuo lavoro,<br>fatto bene.</b><span>Richiedi un preventivo</span></div></div>` },
  { k: '04', t: 'Veloce e sicuro', orb: '#F2A7B5', d: 'Immagini ottimizzate e codice leggero: chi aspetta più di qualche secondo se ne va.',
    v: `<div class="ring"><svg viewBox="0 0 100 100"><circle class="r0" cx="50" cy="50" r="42"/><circle class="r1" cx="50" cy="50" r="42"/></svg><b data-n="98">98</b></div><p class="vis-c">Prestazioni del sito di Lisa Garden</p>` }
];
const HOW = [
  { k: '01', t: 'Consulenza', orb: '#2F7F95', tag: 'Gratuita', d: 'Parliamo del tuo lavoro, dei clienti che cerchi e di cosa deve fare il sito.' },
  { k: '02', t: 'Bozza', orb: '#FF8A5C', tag: 'Gratuita', d: 'Vedi com\'è fatta la prima pagina, con i tuoi colori e i tuoi testi.' },
  { k: '03', t: 'Decidi', orb: '#C9E6D8', d: 'Scegli il pacchetto solo se ti piace quello che hai visto.' },
  { k: '04', t: 'Online', orb: '#F2A7B5', d: 'Collego il tuo indirizzo, pubblico il sito e ti spiego come funziona.' }
];
const FACTS = ['Apertura animata con piante e colibrì', 'Prima e dopo con cursore su 7 lavori', 'Galleria che Lisa aggiorna da sola dal pannello', 'Preventivo guidato che arriva su WhatsApp', 'Pannello riservato e protetto'];
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
const WHO = ['Artigiani', 'Negozi', 'B&B e hotel', 'Professionisti', 'Ristoranti', 'Saloni e palestre'];

/* ---------- scorrimento morbido ---------- */
let lenis = null;
if (ANIM && window.Lenis) {
  lenis = new Lenis({ lerp: .1, smoothWheel: true, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  G.ticker.add(t => lenis.raf(t * 1000));
  G.ticker.lagSmoothing(0);
}
if (G && window.ScrollTrigger) { G.registerPlugin(ScrollTrigger); if (window.SplitText) G.registerPlugin(SplitText); ScrollTrigger.config({ ignoreMobileResize: true }); }
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
let locks = 0;
const lock = () => { locks++; if (lenis) lenis.stop(); };
const unlock = () => { locks = Math.max(0, locks - 1); if (!locks && lenis) lenis.start(); };
const scrollToEl = t => { if (!t) return; if (lenis) lenis.scrollTo(t, { duration: 1.4 }); else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); };
const toastEl = $('#toast'); let tt;
const toast = m => { toastEl.textContent = m; toastEl.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove('show'), 2800); };

/* ---------- schede (render) ---------- */
const lineCards = (arr, cls) => arr.map((c, i) => `<article class="cd ${cls}" style="--orb:${c.orb}"><i class="cd__orb"></i>
  <div class="cd__top"><span>${cls === 'cd--how' ? 'Passo' : c.k}</span><span></span></div>
  ${cls === 'cd--how' ? `<span class="cd__n">${c.k}</span>` : ''}
  <h3 class="cd__t">${esc(c.t)}</h3><p class="cd__d">${esc(c.d)}</p>
  ${c.v ? `<div class="cd__vis">${c.v}</div>` : ''}
  ${c.tag && cls === 'cd--how' ? `<span class="cd__tag">${esc(c.tag)}</span>` : ''}</article>`).join('');
$('#gainRow').innerHTML = lineCards(GAIN, 'cd--gain');
$('#howRow').innerHTML = lineCards(HOW, 'cd--how');
$('#metodo .rctl').insertAdjacentHTML('afterend', `<div class="wrap"><p class="how__end">${STAR}Se non ti convince, non devi nulla.</p></div>`);
$('#facts').innerHTML = FACTS.map((f, i) => `<li><span>${pad2(i + 1)}</span>${esc(f)}</li>`).join('');

/* ---------- pacchetti ---------- */
const tick = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-tick"/></svg>';
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7l10 10M17 9v8H9"/></svg>';
const prezzo = p => offerOn
  ? `<div class="price-l">fino al ${offerTxt}:</div><div class="now"><span class="n" data-to="${p.prezzo}">${eur(p.prezzo)}</span><small>€</small></div><div class="price-l">prezzo pieno:</div><div><span class="was">${eur(p.vecchio)} €</span><span class="chip">−${p.vecchio - p.prezzo} €</span></div>`
  : `<div class="price-l">prezzo del pacchetto:</div><div class="now">${eur(p.vecchio)}<small>€</small></div>`;
const elenco = (voci, n) => {
  const a = voci.slice(0, n), b = voci.slice(n), li = v => `<li>${tick}<span>${v}</span></li>`;
  return `<ul class="list">${a.map(li).join('')}</ul>` + (b.length ? `<div class="extra"><div><ul class="list">${b.map((v, k) => li(v).replace('<li', `<li style="--k:${k}"`)).join('')}</ul></div></div><button class="more" type="button" aria-expanded="false"><span class="ic"></span><span class="lbl" data-a="Vedi tutto · ${b.length} in più" data-b="Mostra meno">Vedi tutto · ${b.length} in più</span></button>` : '');
};
const buy = p => `<a class="pbtn" data-wa="Ciao, vorrei il pacchetto ${p.nome} (${eur(priceOf(p))} €)" href="#" target="_blank" rel="noopener" data-cur="Scegli"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-wa"/></svg>Scegli ${p.nome}</a>`;
const P0 = PIANI[0];
$('#plans').innerHTML = `
  <article class="plan plan--feat" data-i="0"><div class="plan__glow g-teal"></div>
    <div class="left"><div><span class="badge">Consigliato</span></div>
      <div class="top"><div class="tile">${arrow}</div><div><div class="name">${P0.nome}</div><div class="sub">tutto quello che serve per esserci, bene</div></div></div>
      <p class="desc">Un sito su una sola pagina, fatto su misura, che spiega chi sei, mostra i tuoi lavori e ti fa contattare in un tocco.</p>
      <div class="pr">${prezzo(P0)}</div>${buy(P0)}</div>
    <div class="right"><div class="rh"><h3>Cosa include</h3><span class="sub">${P0.voci.length} voci</span></div>${elenco(P0.voci, P0.visibili)}</div>
  </article>
  <p class="sign"><strong>Marea Creative</strong> · tempi, urgenze e progetti più grandi si concordano di persona.</p>
  <div class="pair">${PIANI.slice(1).map(p => `<article class="plan plan--s" data-i="${PIANI.indexOf(p)}"><div class="plan__glow ${p.glow}"></div>
    <div class="top"><div class="tile">${arrow}</div><div><div class="name">${p.nome}</div><div class="sub">${p.sotto}</div></div></div>
    ${elenco(p.voci, p.visibili)}<div class="pr" style="margin:28px 0 24px">${prezzo(p)}</div>${buy(p)}</article>`).join('')}</div>`;
setWa($('#plans'));

$('#alwaysBox').innerHTML = (() => {
  const it = (v, i) => `<div class="it"${i >= 6 ? ` style="--k:${i - 6}"` : ''}><h4><span>${pad2(i + 1)}</span>${v[0]}</h4><p>${v[1]}</p></div>`;
  return `<div class="al-h"><div><p class="eyebrow">In ogni pacchetto</p><h3>Sempre incluso</h3></div><p class="lead">Cose che spesso non si vedono, ma che fanno la differenza tra <b>un sito qualsiasi</b> e <b>un sito che lavora per te</b>.</p></div>
  <div class="agrid">${SEMPRE.slice(0, 6).map(it).join('')}</div>
  <div class="extra"><div><div class="agrid">${SEMPRE.slice(6).map((v, i) => it(v, i + 6)).join('')}</div></div></div>
  <button class="more" type="button" aria-expanded="false"><span class="ic"></span><span class="lbl" data-a="Vedi tutto · ${SEMPRE.length - 6} in più" data-b="Mostra meno">Vedi tutto · ${SEMPRE.length - 6} in più</span></button>`;
})();
$('#perks').innerHTML = VANTAGGI.map(v => `<div class="perk rv"><h3>${v[0]}</h3><p>${v[1]}</p></div>`).join('');
// apri / chiudi (delegato: schede e "sempre incluso")
document.addEventListener('click', e => {
  const b = e.target.closest('.more'); if (!b) return;
  const host = b.closest('.right, .plan, .always'); const open = !host.classList.contains('open');
  host.classList.toggle('open', open); b.setAttribute('aria-expanded', String(open));
  const l = $('.lbl', b); l.textContent = open ? l.dataset.b : l.dataset.a;
  if (ANIM) G.fromTo(l, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .5, ease: 'power3.out' });
  setTimeout(() => ANIM && ScrollTrigger.refresh(), 900);
});

/* ---------- quanto rende ---------- */
safe(() => {
  const vIn = $('#vIn'), cIn = $('#cIn'), seg = $('#roiPlan'), chart = $('#roiChart');
  seg.innerHTML = PIANI.map((p, i) => `<label><input type="radio" name="rp" value="${i}"${i === 0 ? ' checked' : ''}><span>${p.nome}<small>${eur(priceOf(p))} €</small></span></label>`).join('');
  chart.insertAdjacentHTML('afterbegin', Array.from({ length: 12 }, () => '<i class="b"></i>').join(''));
  const bars = $$('i.b', chart), line = $('#chartLine');
  const fill = r => r.style.setProperty('--p', ((r.value - r.min) / (r.max - r.min) * 100).toFixed(1) + '%');
  const calc = () => {
    const v = +vIn.value, c = +cIn.value, p = priceOf(PIANI[+($('input[name=rp]:checked', seg).value)]);
    $('#vOut').textContent = eur(v) + ' €'; $('#cOut').textContent = c; fill(vIn); fill(cIn);
    const n = Math.max(1, Math.ceil(p / v)), mon = p / (v * c), per = v * c;
    $('#roiN').textContent = n; $('#roiNl').textContent = n === 1 ? 'lavoro in più' : 'lavori in più';
    $('#roiSub').textContent = `basta per ripagare il sito. Con ${c} ${c === 1 ? 'cliente' : 'clienti'} in più al mese succede ${mon <= 1 ? 'già nel primo mese' : 'in circa ' + Math.ceil(mon) + ' mesi'}.`;
    const tot = per * 12, max = Math.max(tot, p) * 1.05;
    bars.forEach((b, i) => { const cum = per * (i + 1); b.style.height = (cum / max * 100).toFixed(1) + '%'; b.classList.toggle('up', cum >= p); });
    line.style.bottom = (p / max * 100).toFixed(1) + '%';
    $('#roiYear').innerHTML = `In 12 mesi: <b>${eur(tot)} €</b> in più, contro ${eur(p)} € di sito.`;
  };
  [vIn, cIn].forEach(r => r.addEventListener('input', calc)); seg.addEventListener('change', calc); calc();
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
});

/* ---------- domande e marquee ---------- */
$('#faqList').innerHTML = FAQ.map(q => `<div class="qa"><button class="qa__b" type="button" aria-expanded="false">${esc(q[0])}<span class="pm"></span></button><div class="qa__p"><div><p>${esc(q[1])}</p></div></div></div>`).join('');
$('#faqList').addEventListener('click', e => {
  const b = e.target.closest('.qa__b'); if (!b) return; const it = b.closest('.qa'), o = !it.classList.contains('open');
  $$('.qa.open', $('#faqList')).forEach(x => { if (x !== it) { x.classList.remove('open'); $('.qa__b', x).setAttribute('aria-expanded', 'false'); } });
  it.classList.toggle('open', o); b.setAttribute('aria-expanded', String(o)); setTimeout(() => ANIM && ScrollTrigger.refresh(), 800);
});
{
  const s = WHO.map((w, i) => (i % 2 ? `<em>${esc(w)}</em>` : esc(w)) + STAR).join('');
  $('#mqT').innerHTML = `<span>${s}</span><span>${s}</span>`;
  $('.who').insertAdjacentHTML('beforeend', `<ul class="sr-only" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">${WHO.map(w => `<li>${esc(w)}</li>`).join('')}</ul>`);
}
// onda sopra i contatti
$('#contatti').insertAdjacentHTML('afterbegin', '<svg class="ct__wave" viewBox="0 0 2880 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 60 C 120 20 240 20 360 60 S 600 100 720 60 S 960 20 1080 60 S 1320 100 1440 60 S 1680 20 1800 60 S 2040 100 2160 60 S 2400 20 2520 60 S 2760 100 2880 60 V120 H0Z"/></svg>');

/* ---------- menu, intestazione, link ---------- */
const hd = $('#hd'), hero = $('#top'), waf = $('#waf'), menu = $('#menu'), menuBtn = $('#menuBtn');
const setMenu = o => { document.body.classList.toggle('menu-open', o); menuBtn.setAttribute('aria-expanded', String(o)); menu.setAttribute('aria-hidden', String(!o)); if (o) hd.classList.remove('hide'); o ? lock() : unlock(); };
const closeMenu = () => { if (document.body.classList.contains('menu-open')) setMenu(false); };
menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); closeZoom(); } });
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const id = a.getAttribute('href'); if (id.length < 2) return; const t = $(id); if (!t) return;
  e.preventDefault(); const was = document.body.classList.contains('menu-open'); closeMenu(); setTimeout(() => scrollToEl(t), was ? 320 : 0);
}));
safe(() => {
  let lastY = 0, hh = innerHeight, tick = false;
  const measure = () => { hh = hero.offsetHeight; }; measure(); addEventListener('resize', measure);
  const on = () => { tick = false; const y = scrollY, mo = document.body.classList.contains('menu-open');
    if (y > lastY + 2 && y > 140 && !mo) hd.classList.add('hide'); else if (y < lastY - 2 || y < 140) hd.classList.remove('hide');
    hd.classList.toggle('solid', y > 60); waf.classList.toggle('show', y > hh * .5); lastY = y; };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(on); } }, { passive: true }); on();
  if ('IntersectionObserver' in window) { const set = new Set(); const io = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? set.add(e.target) : set.delete(e.target)); waf.classList.toggle('hide', set.size > 0); }, { rootMargin: '0px 0px -25% 0px' }); [$('#contatti'), $('#preventivo')].forEach(e => e && io.observe(e)); }
});

/* ---------- righe orizzontali ---------- */
function makeRow(row, ctl) {
  const api = { update() {} }; if (!row) return api;
  const prev = ctl && $('.rp', ctl), next = ctl && $('.rn', ctl), bar = ctl && $('.rbar i', ctl), num = ctl && $('.rnum', ctl);
  const items = () => [...row.children].filter(c => !c.classList.contains('gone'));
  const scrollable = () => row.scrollWidth > row.clientWidth + 4;
  const nearest = (it, x) => { if (!it.length) return 0; const base = it[0].offsetLeft; let b = 0, bd = Infinity; it.forEach((c, i) => { const d = Math.abs(c.offsetLeft - base - x); if (d < bd) { bd = d; b = i; } }); return b; };
  let raf = 0;
  const update = () => { raf = 0; const it = items(), n = it.length, sl = row.scrollLeft, cw = row.clientWidth, sw = row.scrollWidth, max = sw - cw, can = sw > cw + 4;
    const idx = sl >= max - 2 && n ? n - 1 : nearest(it, sl);
    const W = innerWidth; it.forEach(c => { const o = c._o || (c._o = $('.cd__orb', c)); if (!o) return; const r = c.getBoundingClientRect(); if (r.right > -40 && r.left < W + 40) o.style.setProperty('--px', ((((r.left + r.width / 2) / W) - .5) * -16).toFixed(2)); });
    if (prev) prev.disabled = !can || sl <= 2; if (next) next.disabled = !can || sl >= max - 2;
    if (bar) bar.style.transform = `scaleX(${Math.min(1, (sl + cw) / Math.max(1, sw)).toFixed(4)})`;
    if (num) { const t = `${pad2(n ? idx + 1 : 0)} / ${pad2(n)}`; if (num.textContent !== t) num.textContent = t; } };
  api.update = () => { if (!raf) raf = requestAnimationFrame(update); };
  const go = dir => { const it = items(); if (!it.length) return; const base = it[0].offsetLeft, ni = Math.max(0, Math.min(it.length - 1, nearest(it, row.scrollLeft) + dir)); row.scrollTo({ left: Math.min(row.scrollWidth - row.clientWidth, it[ni].offsetLeft - base), behavior: reduce ? 'auto' : 'smooth' }); };
  if (prev) prev.addEventListener('click', () => go(-1)); if (next) next.addEventListener('click', () => go(1));
  row.addEventListener('scroll', api.update, { passive: true }); addEventListener('resize', api.update);
  row.addEventListener('wheel', e => { if (scrollable() && (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey)) e.stopPropagation(); }, { passive: true });
  let down = false, moved = false, sx = 0, sl0 = 0, lastX = 0, lastT = 0, vel = 0, pid = 0, dragged = 0;
  row.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.button !== 0 || !scrollable()) return; down = true; moved = false; sx = lastX = e.clientX; sl0 = row.scrollLeft; lastT = performance.now(); vel = 0; pid = e.pointerId; });
  row.addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (!moved) { if (Math.abs(dx) < 6) return; moved = true; row.classList.add('drag'); try { row.setPointerCapture(pid); } catch (_) { /* niente */ } }
    const now = performance.now(); vel = (e.clientX - lastX) / Math.max(1, now - lastT); lastX = e.clientX; lastT = now; row.scrollLeft = sl0 - dx; });
  const up = () => { if (!down) return; down = false; if (!moved) return; dragged = performance.now(); const it = items(), base = it.length ? it[0].offsetLeft : 0, i = nearest(it, row.scrollLeft - vel * 220);
    const target = Math.max(0, Math.min(row.scrollWidth - row.clientWidth, it[i] ? it[i].offsetLeft - base : 0)); let done = false; const rel = () => { if (done) return; done = true; row.classList.remove('drag'); };
    if ('onscrollend' in window) row.addEventListener('scrollend', rel, { once: true }); setTimeout(rel, 700); row.scrollTo({ left: target, behavior: 'smooth' }); };
  row.addEventListener('pointerup', up); row.addEventListener('pointercancel', up); row.addEventListener('lostpointercapture', up);
  row.addEventListener('click', e => { if (dragged && performance.now() - dragged < 450) { e.preventDefault(); e.stopPropagation(); } }, true);
  requestAnimationFrame(update); return api;
}
const rows = [makeRow($('#gainRow'), $('#gainCtl')), makeRow($('#howRow'), $('#howCtl'))];

/* ---------- immagine ingrandita (lavoro di Lisa) ---------- */
const zoom = $('#zoom'), zImg = $('#zoomImg');
function closeZoom() { if (zoom.hidden) return; zoom.classList.remove('on'); setTimeout(() => { zoom.hidden = true; unlock(); }, 400); }
$('#workShot').addEventListener('click', () => { zImg.src = $('#workShot img').src; zoom.hidden = false; lock(); requestAnimationFrame(() => requestAnimationFrame(() => zoom.classList.add('on'))); });
zoom.addEventListener('click', closeZoom);

/* ---------- animazioni ---------- */
const countUp = (el, to, dur = 1.4) => { const o = { v: 0 }; G.to(o, { v: to, duration: dur, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v); } }); };
if (!ANIM) { root.classList.remove('js'); $$('.ring .r1').forEach(c => { c.style.strokeDashoffset = 264 * .02; }); }
else safe(() => {
  // ingresso della hero
  const tl = G.timeline({ delay: .1, defaults: { ease: 'power3.out' } });
  tl.fromTo('.hero__t .ln>span', { yPercent: 112, visibility: 'visible' }, { yPercent: 0, duration: 1.1, stagger: .1 }, 0)
    .fromTo('.hv', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .9, stagger: .09, clearProps: 'transform' }, .25)
    .fromTo('#browser', { opacity: 0, y: 80, rotation: -8 }, { opacity: 1, y: 0, rotation: -2, duration: 1.4, ease: 'expo.out' }, .2)
    .fromTo('#phone', { opacity: 0, y: 110, rotation: 14 }, { opacity: 1, y: 0, rotation: 5, duration: 1.3, ease: 'expo.out' }, .5)
    .fromTo('.stage .score', { opacity: 0, scale: .6, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: .8, stagger: .12, ease: 'back.out(1.8)' }, .9)
    .call(() => $$('.stage .score b').forEach(b => countUp(b, +b.dataset.n, 1.6)), null, .95)
    .fromTo('.hd', { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: .8 }, .3);
  tl.eventCallback('onComplete', () => root.classList.remove('js'));
  // la scena segue il puntatore
  if (fine) {
    const qx = G.quickTo('#browser', 'x', { duration: 1.1, ease: 'power3.out' }), qy = G.quickTo('#browser', 'y', { duration: 1.1, ease: 'power3.out' });
    const px = G.quickTo('#phone', 'x', { duration: 1.4, ease: 'power3.out' }), py = G.quickTo('#phone', 'y', { duration: 1.4, ease: 'power3.out' });
    hero.addEventListener('pointermove', e => { const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5; qx(x * -18); qy(y * -12); px(x * 30); py(y * 20); });
  }
  // profondità mentre scorri
  G.to('.hero__glow--a', { yPercent: 25, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  G.to('.stage__float', { yPercent: -6, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  // titoli e testi
  if (window.SplitText) $$('.split').forEach(el => SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true, onSplit: s => G.from(s.lines, { yPercent: 110, duration: 1.1, stagger: .09, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }) }));
  $$('.rv').forEach(el => G.from(el, { y: 30, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
  // schede
  const cards = (sel, trig) => G.from(sel, { y: 60, opacity: 0, duration: 1, stagger: .1, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: trig, start: 'top 86%', once: true } });
  cards('#gainRow .cd', '#gainRow'); cards('#howRow .cd', '#howRow');
  G.from('.how__end', { x: -30, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.how__end', start: 'top 92%', once: true } });
  G.to('.ring .r1', { strokeDashoffset: 264 * .02, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: '.ring', start: 'top 90%', once: true } });
  ScrollTrigger.create({ trigger: '.ring', start: 'top 90%', once: true, onEnter: () => countUp($('.ring b'), 98, 1.6) });
  // la scena del lavoro
  G.from('.work__phone', { y: 100, rotation: 14, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.work__stage', start: 'top 75%', once: true } });
  G.from('.work__shot', { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.work__stage', start: 'top 82%', once: true } });
  G.from('.facts li', { x: 30, opacity: 0, duration: .8, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: '.facts', start: 'top 86%', once: true } });
  $$('.sc b').forEach(b => ScrollTrigger.create({ trigger: b, start: 'top 92%', once: true, onEnter: () => countUp(b, +b.dataset.n, 1.4) }));
  // prezzi
  G.from('.plan', { y: 70, opacity: 0, duration: 1.1, stagger: .12, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '#plans', start: 'top 82%', once: true } });
  $$('.plan .was').forEach(w => ScrollTrigger.create({ trigger: w, start: 'top 90%', once: true, onEnter: () => w.classList.add('on') }));
  $$('.plan .n').forEach(n => ScrollTrigger.create({ trigger: n, start: 'top 92%', once: true, onEnter: () => countUp(n, +n.dataset.to, 1.2) }));
  G.from('.agrid .it', { y: 24, opacity: 0, duration: .8, stagger: .06, ease: 'power3.out', scrollTrigger: { trigger: '.agrid', start: 'top 86%', once: true } });
  // modulo e domande
  G.from('.paper', { y: 60, rotation: 4, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.paper', start: 'top 86%', once: true } });
  G.from('.qa', { y: 26, opacity: 0, duration: .8, stagger: .07, ease: 'power3.out', scrollTrigger: { trigger: '#faqList', start: 'top 86%', once: true } });
  G.from('.clist li', { y: 24, opacity: 0, duration: .8, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.clist', start: 'top 92%', once: true } });
  G.from('.ct__t', { y: 50, opacity: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.ct__t', start: 'top 88%', once: true } });
  ScrollTrigger.refresh();
});
window.__mOk = true;

/* ---------- cursore e pulsanti magnetici ---------- */
const cur = $('#cur'), curLabel = $('#curLabel');
function bindCursor(scope) { if (!fine || !G) return; $$('[data-cur]', scope).forEach(el => { if (el._cur) return; el._cur = 1;
  el.addEventListener('pointerenter', () => { curLabel.textContent = el.dataset.cur; cur.classList.add('is-label'); });
  el.addEventListener('pointerleave', () => cur.classList.remove('is-label')); }); }
if (fine && G) safe(() => {
  const ring = $('.cur__ring', cur), dot = $('.cur__dot', cur);
  const rx = G.quickTo(ring, 'x', { duration: .55, ease: 'power3.out' }), ry = G.quickTo(ring, 'y', { duration: .55, ease: 'power3.out' }), dx = G.quickTo(dot, 'x', { duration: .12 }), dy = G.quickTo(dot, 'y', { duration: .12 });
  let shown = false;
  addEventListener('pointermove', e => { if (!shown) { shown = true; G.to(cur, { opacity: 1, duration: .4 }); } rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY); });
  document.addEventListener('pointerleave', () => G.to(cur, { opacity: 0, duration: .3 })); document.addEventListener('pointerenter', () => G.to(cur, { opacity: 1, duration: .3 }));
  bindCursor(document);
  $$('.btn--ink, .btn--orange, .pbtn').forEach(b => { b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); G.to(b, { x: (e.clientX - r.left - r.width / 2) * .2, y: (e.clientY - r.top - r.height / 2) * .28, duration: .5, ease: 'power3.out' }); }); b.addEventListener('pointerleave', () => G.to(b, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1,.4)' })); });
});

/* ---------- ricalcolo quando cambia l'altezza ---------- */
if (G && window.ScrollTrigger) safe(() => {
  let lastH = 0, rt = null;
  const ro = new ResizeObserver(() => { const h = document.documentElement.scrollHeight; if (Math.abs(h - lastH) < 2) return; lastH = h; clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 260); });
  $$('main > section').forEach(s => ro.observe(s));
  if (document.fonts) document.fonts.ready.then(() => { ScrollTrigger.refresh(); rows.forEach(r => r.update()); });
  addEventListener('load', () => ScrollTrigger.refresh());
});
})();
