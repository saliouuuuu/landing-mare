// Marea Creative · sito statico servito da un unico Worker (file generato da build-worker.py)
const FILES = /*FILES*/{};
const BASE = { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'Permissions-Policy': 'camera=(), microphone=(), geolocation=()' };
const cache = new Map();
const raw = p => { let u = cache.get(p); if (!u) { const s = atob(FILES[p].b); u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); cache.set(p, u); } return u; };
const text = p => new TextDecoder().decode(raw(p));
export default {
  async fetch(req) {
    const url = new URL(req.url);
    if (req.method !== 'GET' && req.method !== 'HEAD') return new Response('Metodo non consentito', { status: 405, headers: { Allow: 'GET, HEAD', ...BASE } });
    // finché il sito è su *.workers.dev non va indicizzato: l'indirizzo vero sarà il dominio
    const staging = url.hostname.endsWith('.workers.dev');
    const origin = staging ? url.origin : 'https://' + url.hostname;
    let p = decodeURIComponent(url.pathname);
    if (p.endsWith('/')) p += 'index.html';
    let f = FILES[p], status = 200;
    if (!f) { f = FILES['/404.html']; p = '/404.html'; status = 404; }
    const h = { 'Content-Type': f.t, 'Cache-Control': f.c, ...BASE };
    if (staging || status === 404) h['X-Robots-Tag'] = 'noindex, nofollow';
    let body;
    if (f.x) {
      let t = text(p).split('{{ORIGIN}}').join(origin);
      if (p === '/robots.txt' && staging) t = 'User-agent: *\nDisallow: /\n';
      if (p === '/index.html' && staging) t = t.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<meta name="robots" content="noindex, nofollow">');
      body = t; h['ETag'] = '"' + f.e + (staging ? 's' : 'p') + '"';
    } else { body = raw(p); h['ETag'] = '"' + f.e + '"'; }
    if (status === 200 && req.headers.get('If-None-Match') === h['ETag']) return new Response(null, { status: 304, headers: h });
    return new Response(req.method === 'HEAD' ? null : body, { status, headers: h });
  }
};
