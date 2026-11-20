/* Marea Creative · sito in vetro */
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
if (!offerOn) { $('#topPillTxt').textContent = 'Consulenza e bozza gratuite'; $('#priceTag').textContent = 'Prezzi'; }

/* ---------- contenuti ---------- */
const PIANI = [
  { nome: 'Essenziale', sotto: 'tutto quello che serve per esserci, bene', vecchio: 560, prezzo: 460, visibili: 8, c: '#7FD3DF',
    desc: 'Un sito su una sola pagina, fatto su misura, che spiega chi sei, mostra i tuoi lavori e ti fa contattare in un tocco.', voci: [
    'Sito <b>one page</b> su misura, niente modelli', 'Sezioni <b>servizi, chi sono e contatti</b>', '<b>Galleria</b> dei tuoi lavori', 'Perfetto su <b>telefono</b>, tablet e computer',
    'Pulsanti per <b>WhatsApp</b> e <b>chiamata</b>', '<b>Mappa</b> e indicazioni per raggiungerti', '<b>Animazioni</b> leggere e curate', '<b>SEO di base</b> per farti trovare in zona',
    'Collegamento ai tuoi <b>social</b>', '<b>Caricamento veloce</b>, foto ottimizzate', '<b>Lucchetto HTTPS</b> e protezione di base', '<b>Anteprima</b> curata quando condividi il link',
    'Pagina <b>privacy</b> inclusa', 'Messa online e <b>dominio collegato</b>', '<b>2 giri</b> di revisioni', '<b>Spiegazione</b> alla consegna'] },
  { nome: 'Completo', sotto: 'per chi offre più servizi', vecchio: 760, prezzo: 640, visibili: 4, c: '#2F9BAE',
    desc: 'Più pagine per raccontare ogni servizio, testi rivisti insieme a te e SEO curata pagina per pagina.', voci: [
    'Tutto quello di <b>Essenziale</b>', 'Fino a <b>5 pagine</b>', 'Pagine dedicate ai <b>singoli servizi</b>', '<b>Animazioni</b> più ricche',
    '<b>SEO</b> curata pagina per pagina', 'Testi <b>rivisti</b> insieme a te', '<b>3 giri</b> di revisioni'] },
  { nome: 'Premium', sotto: 'tutto curato, anche dopo', vecchio: 960, prezzo: 830, visibili: 4, c: '#FFB08F',
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
const VANTAGGI = offerOn
  ? [['Sconto del mese', `Fino a 130 euro in meno sul prezzo pieno, confermando entro il <b>${offerTxt}</b>.`], ['Prezzo bloccato', 'Una volta confermato, il prezzo non cambia per tutta la durata del lavoro.'], ['Bozza gratuita', 'Vedi una prima versione del tuo sito prima di decidere, senza impegno.']]
  : [['Prezzo bloccato', 'Una volta confermato, il prezzo non cambia per tutta la durata del lavoro.'], ['Bozza gratuita', 'Vedi una prima versione del tuo sito prima di decidere, senza impegno.'], ['Consulenza gratuita', 'Parliamo del tuo lavoro e dei clienti che cerchi, senza impegno.']];
const GAIN = [
  { t: 'Ti trovano', tag: 'Google', n: 100, em: 'SEO · Lisa Garden', d: 'Titoli, descrizioni e struttura giusti per farti trovare nelle ricerche della tua zona.' },
  { t: 'Ti scrivono', tag: 'WhatsApp', n: 1, em: 'tocco e ti scrivono', d: 'Pulsanti per WhatsApp e chiamata, mappa e indicazioni: dal telefono ti contattano subito.' },
  { t: 'Ti scelgono', tag: 'Su misura', n: 0, em: 'modelli già pronti', d: 'Un sito disegnato sul tuo lavoro: chi arriva capisce subito chi sei e perché fidarsi.' },
  { t: 'Veloce e sicuro', tag: 'HTTPS', n: 95, em: 'prestazioni · Lisa Garden', d: 'Immagini ottimizzate e codice leggero: chi aspetta più di qualche secondo se ne va.' }
];
const HOW = [
  { t: 'Consulenza', tag: 'Gratuita', d: 'Parliamo del tuo lavoro, dei clienti che cerchi e di cosa deve fare il sito.', cls: 'gl' },
  { t: 'Bozza', tag: 'Gratuita', d: 'Vedi com\'è fatta la prima pagina, con i tuoi colori e i tuoi testi.', cls: 'st--solid' },
  { t: 'Decidi', d: 'Scegli il pacchetto solo se ti piace quello che hai visto.', cls: 'gl' },
  { t: 'Online', d: 'Collego il tuo indirizzo, pubblico il sito e ti spiego come funziona.', cls: 'st--sea' }
];
const FACTS = ['Apertura animata con piante e colibrì', 'Prima e dopo con cursore su 7 lavori', 'Galleria che Lisa aggiorna da sola dal pannello', 'Preventivo guidato che arriva su WhatsApp', 'Pannello riservato e protetto'];
const LH = [['Prestazioni', 95], ['Accessibilità', 98], ['SEO', 100]];
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
const scrollToEl = t => { if (!t) return; if (lenis) lenis.scrollTo(t.id === 'top' ? 0 : t, { duration: 1.4, offset: -10 }); else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); };
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]'); if (!a) return;
  const id = a.getAttribute('href'); if (id.length < 2) return; const t = $(id); if (!t) return;
  e.preventDefault(); scrollToEl(t);
});
const toastEl = $('#toast'); let tt;
const toast = m => { toastEl.textContent = m; toastEl.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove('show'), 2800); };
const countUp = (el, to, dur = 1.4) => { if (!ANIM) { el.textContent = to; return; } const o = { v: 0 }; G.to(o, { v: to, duration: dur, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v); } }); };

/* ---------- cursore (le schede create dopo si collegano da sole) ---------- */
const curEl = $('#cur'), curLabel = $('#curLabel');
function bindCursor(scope) { if (!fine || !G) return; $$('[data-cur]', scope).forEach(el => { if (el._cur) return; el._cur = 1;
  el.addEventListener('pointerenter', () => { curLabel.textContent = el.dataset.cur; curEl.classList.add('is-label'); });
  el.addEventListener('pointerleave', () => curEl.classList.remove('is-label')); }); }

/* ---------- hero: orologio, calendario, pacchetti ---------- */
safe(() => {
  const clock = $('#clock');
  const tickClock = () => { clock.textContent = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Rome' }); };
  tickClock(); setInterval(tickClock, 20000);

  const now = new Date(), y = now.getFullYear(), m = now.getMonth(), d = now.getDate();
  const first = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
  const endHere = offerOn && OFFER_END.getMonth() === m && OFFER_END.getFullYear() === y;
  const endDay = OFFER_END.getDate();
  let g = ['L', 'M', 'M', 'G', 'V', 'S', 'D'].map(w => `<em>${w}</em>`).join('') + '<span></span>'.repeat(first);
  for (let i = 1; i <= days; i++) g += `<span class="${[i === d ? 'today' : '', i < d ? 'past' : '', endHere && i === endDay ? 'end' : ''].join(' ').trim()}">${i}</span>`;
  const mese = now.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  $('#cal').innerHTML = `<div class="cal__h"><b>${mese}</b><span>oggi ${d}</span></div><div class="cal__g">${g}</div>
    <p class="cal__l">${endHere ? `<i></i>${offerTxt} · fine prezzi di novembre` : '<i style="background:var(--sea2)"></i>Consulenza e bozza sempre gratuite'}</p>`;

  $('#heroPk').innerHTML = PIANI.map((p, i) => `<a class="pkm" href="#prezzi" data-pk="${i}" data-cur="Apri">
    <span class="pkm__t"><span class="pkm__ic" style="--c:${p.c}">${svg(i ? 'i-arrow' : 'i-tick')}</span>${offerOn ? `<small>fino al ${OFFER_END.getDate()} nov</small>` : ''}</span>
    <b>${p.nome}</b><p>${eur(priceOf(p))} €${offerOn ? `<s>${eur(p.vecchio)} €</s>` : ''}</p></a>`).join('');
});

/* ---------- valore: schede attorno all'anello ---------- */
$('#gainCards').innerHTML = GAIN.map(c => `<article class="oc gl"><div class="oc__t"><b>${esc(c.t)}</b><span>${esc(c.tag)}</span></div>
  <p class="oc__n"><strong data-n="${c.n}">${c.n}</strong><em>${esc(c.em)}</em></p><p>${esc(c.d)}</p></article>`).join('');

/* ---------- metodo: pannelli sfalsati ---------- */
$('#stairs').innerHTML = HOW.map((s, i) => `<article class="st ${s.cls}" style="--i:${i};--dy:0px">
  <h3>${esc(s.t)}</h3><p class="st__in">${esc(s.d)}</p>${s.tag ? `<span class="st__tag">${esc(s.tag)}</span>` : ''}
  <span class="st__n">${pad2(i + 1)}</span><span class="st__bars" aria-hidden="true"><i></i><i></i><i></i></span></article>`).join('');
$('#stairs').insertAdjacentHTML('afterend', `<p class="stairs__end">${svg('i-tick')}Se non ti convince, non devi nulla.</p>`);

/* ---------- lavoro di Lisa ---------- */
$('#facts').innerHTML = FACTS.map((f, i) => `<li><span>${pad2(i + 1)}</span>${esc(f)}</li>`).join('');
$('#lh').innerHTML = LH.map(([k, v]) => `<div class="lh__r"><span>${k}</span><span class="lh__t"><i data-w="${v}"></i></span><b data-n="${v}">${v}</b></div>`).join('');

/* ---------- prezzi: cartelle a ventaglio ---------- */
const tick = svg('i-tick');
const elenco = (voci, n) => {
  const a = voci.slice(0, n), b = voci.slice(n), li = (v, k) => `<li${k != null ? ` style="--k:${k}"` : ''}>${tick}<span>${v}</span></li>`;
  return `<ul class="list">${a.map(v => li(v)).join('')}</ul>` + (b.length ? `<div class="extra"><div><ul class="list">${b.map((v, k) => li(v, k)).join('')}</ul></div></div><button class="more" type="button" aria-expanded="false"><span class="ic"></span><span class="lbl" data-a="Vedi tutto · ${b.length} in più" data-b="Mostra meno">Vedi tutto · ${b.length} in più</span></button>` : '');
};
const fan = $('#fan'), float = $('#fanFloat'), panel = $('#pkPanel');
fan.insertAdjacentHTML('beforeend',
  [-2, 2].map(o => `<div class="fold fold--ghost" data-o="${o}" aria-hidden="true"><span class="fold__b"><span class="fold__tab"></span><span class="fold__sh"></span></span></div>`).join('') +
  PIANI.map((p, i) => `<button class="fold" type="button" role="tab" id="tab${i}" aria-controls="pkPanel" aria-selected="false" tabindex="-1" data-o="${i - 1}" data-cur="Apri">
    <span class="fold__b"><span class="fold__tab"></span><span class="fold__sh"></span>
    <span class="fold__in"><small>${svg('i-layers')}${p.voci.length} voci</small><b>${p.nome}</b></span></span></button>`).join(''));
const folds = $$('.fold', fan), real = folds.filter(f => !f.classList.contains('fold--ghost'));
let cur = -1, fanBusy = false;
const layoutFan = () => {
  if (fanBusy) return;
  const fw = real[0].offsetWidth || 220, W = fan.clientWidth, small = innerWidth <= 600;
  const S = small ? Math.min(fw * .78, (W - fw * .82) / 2) : Math.max(46, Math.min(210, (W - fw * .85) / 4));
  folds.forEach(f => f.style.setProperty('--x', (+f.dataset.o * S).toFixed(1)));
};
const select = (i, focus) => {
  if (i === cur) return;
  cur = i; const p = PIANI[i], pr = priceOf(p);
  real.forEach((f, k) => {
    const on = k === i; f.classList.toggle('on', on); f.setAttribute('aria-selected', String(on)); f.tabIndex = on ? 0 : -1;
    f.style.zIndex = k + 2;
    if (on) f.style.setProperty('--lift', innerWidth <= 600 ? -34 : -48); else f.style.removeProperty('--lift');
  });
  if (focus) real[i].focus();
  panel.setAttribute('aria-labelledby', 'tab' + i);
  float.innerHTML = `<div class="ff__t"><b>${p.nome}</b>${svg('i-arrow')}</div><small>${p.sotto}</small>
    <div class="ff__p"><strong>${eur(pr)}<em>€</em></strong>${offerOn ? `<s>${eur(p.vecchio)} €</s>` : ''}<i class="ff__dot"></i></div>`;
  panel.innerHTML = `<div class="pk__l">
      <div class="pk__name"><b>${p.nome}</b>${i === 0 ? '<span class="badge">Consigliato</span>' : ''}</div>
      <p class="pk__sub">${p.sotto}</p><p class="pk__desc">${p.desc}</p>
      <p class="pk__lbl">${offerOn ? `fino al ${offerTxt}` : 'prezzo del pacchetto'}</p>
      <div class="pk__now">${eur(pr)}<small>€</small></div>
      ${offerOn ? `<p class="pk__was">prezzo pieno <s>${eur(p.vecchio)} €</s><span>−${p.vecchio - p.prezzo} €</span></p>` : '<p class="pk__was"></p>'}
      <a class="btn btn--or" data-wa="Ciao, vorrei il pacchetto ${p.nome} (${eur(pr)} €)" data-cur="Scegli" href="#" target="_blank" rel="noopener">${svg('i-wa', 'ic')}Scegli ${p.nome}</a>
    </div>
    <div class="pk__r"><h4>Cosa include<span>${p.voci.length} voci</span></h4>${elenco(p.voci, p.visibili)}</div>`;
  setWa(panel); bindCursor(panel);
  if (ANIM && float._seen) { G.fromTo([...float.children, ...panel.children], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .55, stagger: .04, ease: 'power3.out', clearProps: 'transform,opacity' }); setTimeout(() => ScrollTrigger.refresh(), 300); }
  float._seen = 1;
};
real.forEach((f, i) => f.addEventListener('click', () => select(i)));
fan.addEventListener('keydown', e => {
  const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!k) return;
  e.preventDefault(); select((cur + k + PIANI.length) % PIANI.length, true);
});
document.addEventListener('click', e => { const a = e.target.closest('[data-pk]'); if (a) select(+a.dataset.pk); });
select(0); layoutFan(); addEventListener('resize', layoutFan);

$('#alwaysBox').innerHTML = (() => {
  const it = (v, i) => `<div class="it"${i >= 6 ? ` style="--k:${i - 6}"` : ''}><h4><span>${pad2(i + 1)}</span>${v[0]}</h4><p>${v[1]}</p></div>`;
  return `<div class="al-h"><h3>Sempre incluso</h3><p>Cose che spesso non si vedono, ma che fanno la differenza tra un sito qualsiasi e un sito che lavora per te.</p></div>
  <div class="agrid">${SEMPRE.slice(0, 6).map(it).join('')}</div>
  <div class="extra"><div><div class="agrid">${SEMPRE.slice(6).map((v, i) => it(v, i + 6)).join('')}</div></div></div>
  <button class="more" type="button" aria-expanded="false"><span class="ic"></span><span class="lbl" data-a="Vedi tutto · ${SEMPRE.length - 6} in più" data-b="Mostra meno">Vedi tutto · ${SEMPRE.length - 6} in più</span></button>`;
})();
$('#perks').innerHTML = VANTAGGI.map(v => `<div class="perk"><h3>${v[0]}</h3><p>${v[1]}</p></div>`).join('');
document.addEventListener('click', e => {
  const b = e.target.closest('.more'); if (!b) return;
  const host = b.closest('.pk__r, .always'); const open = !host.classList.contains('open');
  host.classList.toggle('open', open); b.setAttribute('aria-expanded', String(open));
  const l = $('.lbl', b); l.textContent = open ? l.dataset.b : l.dataset.a;
  setTimeout(() => ANIM && ScrollTrigger.refresh(), 900);
});

/* ---------- quanto rende ---------- */
safe(() => {
  const vIn = $('#vIn'), cIn = $('#cIn'), seg = $('#roiPlan'), bars = $('#bars');
  seg.innerHTML = PIANI.map((p, i) => `<label><input type="radio" name="rp" value="${i}"${i === 0 ? ' checked' : ''}><span>${p.nome}<small>${eur(priceOf(p))} €</small></span></label>`).join('');
  bars.insertAdjacentHTML('beforeend', Array.from({ length: 12 }, () => '<i class="b"><u></u></i>').join(''));
  const bs = $$('i.b', bars), line = $('#barsLine'), fillEl = $('#payFill'), mark = $('#payMark');
  const fill = r => r.style.setProperty('--p', ((r.value - r.min) / (r.max - r.min) * 100).toFixed(1) + '%');
  let shown = !ANIM;
  const calc = () => {
    const v = +vIn.value, c = +cIn.value, p = priceOf(PIANI[+($('input[name=rp]:checked', seg).value)]);
    $('#vOut').textContent = eur(v) + ' €'; $('#cOut').textContent = c; fill(vIn); fill(cIn);
    const n = Math.max(1, Math.ceil(p / v)), per = v * c, mon = Math.max(1, Math.ceil(p / per));
    $('#roiN').textContent = n; $('#roiNl').textContent = n === 1 ? 'lavoro in più' : 'lavori in più';
    $('#roiSub').textContent = `Con ${c} ${c === 1 ? 'cliente' : 'clienti'} in più al mese il sito si ripaga ${mon <= 1 ? 'già nel primo mese' : mon > 12 ? 'in più di un anno' : 'in circa ' + mon + ' mesi'}.`;
    const pos = Math.min(1, mon / 12);
    fillEl.style.width = (pos * 100).toFixed(1) + '%'; mark.style.left = `calc(${(pos * 100).toFixed(1)}% - 1px)`;
    mark.classList.toggle('r', pos > .7);
    $('#payLbl').textContent = mon <= 1 ? '1° mese' : mon > 12 ? 'oltre 12 mesi' : mon + ' mesi';
    const tot = per * 12, max = Math.max(tot, p) * 1.08;
    bs.forEach((b, i) => { const cum = per * (i + 1); b.firstChild.style.height = shown ? (cum / max * 100).toFixed(1) + '%' : '0%'; b.classList.toggle('up', cum >= p); });
    line.style.bottom = (p / max * 100).toFixed(1) + '%';
    $('#roiYear').textContent = `+${eur(tot)} € in 12 mesi`;
  };
  [vIn, cIn].forEach(r => r.addEventListener('input', calc)); seg.addEventListener('change', calc); calc();
  if (ANIM) ScrollTrigger.create({ trigger: bars, start: 'top 88%', once: true, onEnter: () => { shown = true; calc(); } });
});

/* ---------- modulo preventivo -> WhatsApp ---------- */
safe(() => {
  const sel = $('#qPlan'); sel.insertAdjacentHTML('beforeend', PIANI.map(p => `<option value="${p.nome} (${eur(priceOf(p))} €)">${p.nome} · ${eur(priceOf(p))} €</option>`).join(''));
  const send = $('#qSend'), form = $('#qForm'), dots = $$('.dots i', form);
  const build = () => {
    const name = $('#qName').value.trim(), work = $('#qWork').value.trim(), needs = $$('.chk input:checked', form).map(i => i.value), plan = sel.value;
    let m = `Ciao, ${name ? 'sono ' + name : 'vorrei una bozza gratuita del mio sito'}.`;
    if (work) m += ` Mi occupo di ${work}.`;
    if (needs.length) m += ` Mi serve: ${needs.join(', ')}.`;
    if (plan) m += ` Mi interessa il pacchetto ${plan}.`;
    const filled = [name || work, needs.length, plan].filter(Boolean).length;
    dots.forEach((d, i) => d.classList.toggle('on', i < Math.max(1, filled)));
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

/* ---------- barra alta e dock ---------- */
safe(() => {
  const top = $('#top-bar'); let lastY = 0, tk = false;
  const on = () => { tk = false; const y = scrollY;
    if (y > lastY + 2 && y > 160) top.classList.add('hide'); else if (y < lastY - 2 || y < 160) top.classList.remove('hide'); lastY = y; };
  addEventListener('scroll', () => { if (!tk) { tk = true; requestAnimationFrame(on); } }, { passive: true });
  const links = $$('#dock a');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const s = e.target.dataset.s;
      links.forEach(a => a.classList.toggle('on', a.dataset.s === s)); }), { rootMargin: '-45% 0px -50% 0px' });
    $$('main [data-s]').forEach(s => io.observe(s));
  }
});

/* ---------- animazioni ---------- */
const lhFill = () => $$('#lh i').forEach(i => { i.style.width = i.dataset.w + '%'; });
if (!ANIM) { root.classList.remove('js'); $('.spark').classList.add('on'); lhFill(); }
else safe(() => {
  // ingresso della finestra
  const tl = G.timeline({ delay: .1, defaults: { ease: 'power3.out' } });
  tl.fromTo('#win', { opacity: 0, y: 50, scale: .97 }, { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'expo.out', clearProps: 'transform' }, 0)
    .fromTo('.hero__t .ln>span', { yPercent: 112, visibility: 'visible' }, { yPercent: 0, duration: 1.1, stagger: .1 }, .2)
    .fromTo('.hv', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .9, stagger: .07, clearProps: 'transform' }, .4)
    .fromTo('#heroOrb', { opacity: 0 }, { opacity: 1, duration: 1.4 }, .5)
    .fromTo('.orbz .fchip, .orbz .fcard', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: .12, ease: 'back.out(1.6)' }, .8)
    .call(() => { $('.spark').classList.add('on'); countUp($('.fcard b[data-n]'), 100, 1.6); }, null, 1)
    .fromTo('#dock, #top-bar', { opacity: 0 }, { opacity: 1, duration: .8, clearProps: 'opacity' }, .3);
  tl.eventCallback('onComplete', () => root.classList.remove('js'));
  // le schede della hero seguono il puntatore
  if (fine) {
    const els = $$('.orbz .fchip, .orbz .fcard').map((el, i) => ({ x: G.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }), y: G.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }), k: [14, -22, 18][i] || 12 }));
    $('#top').addEventListener('pointermove', e => { if (tl.isActive()) return; const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5; els.forEach(o => { o.x(x * o.k); o.y(y * o.k * .7); }); });
  }
  // titoli e testi
  $$('.h2').forEach(el => G.from(el, { y: 50, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
  $$('.sh .tag').forEach(el => G.from(el, { scale: .7, opacity: 0, duration: .9, ease: 'back.out(1.8)', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));
  $$('.rv').forEach(el => G.from(el, { y: 30, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
  // anello e schede
  G.fromTo('.orbit__ring .r1', { strokeDashoffset: 25 }, { strokeDashoffset: -25, ease: 'none', scrollTrigger: { trigger: '#orbit', start: 'top bottom', end: 'bottom top', scrub: true } });
  G.from('.orbit__c', { opacity: 0, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: '#orbit', start: 'top 75%', once: true } });
  G.from('.oc', { y: 50, opacity: 0, duration: 1, stagger: .1, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '#gainCards', start: 'top 80%', once: true } });
  $$('.oc__n strong').forEach(b => ScrollTrigger.create({ trigger: b, start: 'top 92%', once: true, onEnter: () => countUp(b, +b.dataset.n, 1.4) }));
  // metodo
  G.from('.st', { '--dy': '90px', opacity: 0, duration: 1.2, stagger: .12, ease: 'expo.out', scrollTrigger: { trigger: '#stairs', start: 'top 80%', once: true } });
  G.from('.stairs__end', { y: 20, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.stairs__end', start: 'top 94%', once: true } });
  // lavoro
  G.from('.case__phone', { y: 90, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.case__shot', start: 'top 70%', once: true } });
  G.from('#facts li', { x: 30, opacity: 0, duration: .8, stagger: .07, ease: 'power3.out', scrollTrigger: { trigger: '#facts', start: 'top 88%', once: true } });
  ScrollTrigger.create({ trigger: '#lh', start: 'top 90%', once: true, onEnter: () => { lhFill(); $$('#lh b').forEach(b => countUp(b, +b.dataset.n, 1.4)); } });
  // cartelle: partono chiuse una sull'altra e si aprono a ventaglio
  G.from(folds, { '--x': 0, opacity: 0, duration: 1.3, stagger: .06, ease: 'expo.out',
    scrollTrigger: { trigger: '#fan', start: 'top 78%', once: true }, onStart: () => { fanBusy = true; }, onComplete: () => { fanBusy = false; layoutFan(); } });
  G.from('#pkPanel', { y: 40, opacity: 0, duration: 1, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '#pkPanel', start: 'top 88%', once: true } });
  G.from('#alwaysBox > .agrid .it', { y: 24, opacity: 0, duration: .8, stagger: .05, ease: 'power3.out', scrollTrigger: { trigger: '#alwaysBox', start: 'top 85%', once: true } });
  G.from('.perk', { y: 30, opacity: 0, duration: .9, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '#perks', start: 'top 90%', once: true } });
  // contatti e domande
  G.from('.ct__card', { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '.ct__stage', start: 'top 80%', once: true } });
  G.from('.clist li', { y: 24, opacity: 0, duration: .8, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.clist', start: 'top 92%', once: true } });
  G.from('.qa', { y: 20, opacity: 0, duration: .7, stagger: .05, ease: 'power3.out', scrollTrigger: { trigger: '#faqList', start: 'top 88%', once: true } });
  G.from('.ft__big', { y: 60, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.ft__big', start: 'top 95%', once: true } });
  ScrollTrigger.refresh();
});

/* ---------- cursore e pulsanti ---------- */
if (fine && G) safe(() => {
  const ring = $('.cur__ring', curEl), dot = $('.cur__dot', curEl);
  const rx = G.quickTo(ring, 'x', { duration: .55, ease: 'power3.out' }), ry = G.quickTo(ring, 'y', { duration: .55, ease: 'power3.out' }), dx = G.quickTo(dot, 'x', { duration: .12 }), dy = G.quickTo(dot, 'y', { duration: .12 });
  let shown = false;
  addEventListener('pointermove', e => { if (!shown) { shown = true; G.to(curEl, { opacity: 1, duration: .4 }); } rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY); });
  document.addEventListener('pointerleave', () => { G.to(curEl, { opacity: 0, duration: .3 }); curEl.classList.remove('is-label'); });
  document.addEventListener('pointerenter', () => G.to(curEl, { opacity: 1, duration: .3 }));
  bindCursor(document);
});
window.__mOk = true;

/* ---------- ricalcolo quando cambia l'altezza ---------- */
if (G && window.ScrollTrigger) safe(() => {
  let lastH = 0, rt = null;
  const ro = new ResizeObserver(() => { const h = document.documentElement.scrollHeight; if (Math.abs(h - lastH) < 2) return; lastH = h; clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 260); });
  $$('main > section').forEach(s => ro.observe(s));
  if (document.fonts) document.fonts.ready.then(() => { ScrollTrigger.refresh(); layoutFan(); });
  addEventListener('load', () => ScrollTrigger.refresh());
});
})();
