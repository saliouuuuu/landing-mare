import os,shutil,re,json,base64,hashlib
S='src'; D='dist'
shutil.rmtree(D,ignore_errors=True); os.makedirs(D+'/assets/img')
shutil.copy(S+'/index.src.html',D+'/index.html'); shutil.copy(S+'/app.css',D+'/assets/app.css'); shutil.copy(S+'/app.js',D+'/assets/app.js')
shutil.copy('assets/favicon.svg',D+'/assets/favicon.svg')
for f in os.listdir('assets/img'): shutil.copy('assets/img/'+f,D+'/assets/img/'+f)
# versione nei link a CSS e JS: se il file cambia, cambia l'indirizzo e il browser non usa la copia vecchia in cache
t=open(D+'/index.html').read()
for f in ('app.css','app.js'):
    v=hashlib.sha1(open(D+'/assets/'+f,'rb').read()).hexdigest()[:10]
    t=t.replace('assets/'+f+'"','assets/'+f+'?v='+v+'"')
open(D+'/index.html','w').write(t)
open(D+'/sitemap.xml','w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>{{ORIGIN}}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>\n')
open(D+'/robots.txt','w').write('User-agent: *\nAllow: /\nSitemap: {{ORIGIN}}/sitemap.xml\n')
open(D+'/404.html','w').write('<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Pagina non trovata · Marea Creative</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#ECEBE7;color:#11181B;font:18px/1.5 system-ui,sans-serif;text-align:center}a{color:inherit;font-weight:700}</style></head><body><main><p>Questa pagina non esiste.</p><p><a href="/">Torna a Marea Creative</a></p></main></body></html>')
# su Netlify l'indirizzo del sito arriva dalla build: dominio principale in produzione, indirizzo dell'anteprima altrimenti
# (in locale e per il Worker Cloudflare i segnaposto {{ORIGIN}} restano, li sostituisce il Worker)
origin=os.environ.get('SITE_ORIGIN') or ''
staging=False
if os.environ.get('NETLIFY')=='true':
    ctx=os.environ.get('CONTEXT','production')
    staging=ctx!='production'
    origin=origin or (os.environ.get('URL') if not staging else os.environ.get('DEPLOY_PRIME_URL')) or ''
    if not origin: raise SystemExit('manca l\'indirizzo del sito (URL / DEPLOY_PRIME_URL)')
if origin:
    origin=origin.rstrip('/')
    for f in ('index.html','sitemap.xml','robots.txt'):
        t=open(D+'/'+f).read().replace('{{ORIGIN}}',origin); open(D+'/'+f,'w').write(t)
    print('indirizzo del sito:',origin,'(anteprima, noindex)' if staging else '')
hdr='/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n'
if staging:
    hdr+='  X-Robots-Tag: noindex, nofollow\n'
    t=open(D+'/index.html').read(); t=t.replace('<meta charset="utf-8">','<meta charset="utf-8">\n<meta name="robots" content="noindex, nofollow">',1); open(D+'/index.html','w').write(t)
    open(D+'/robots.txt','w').write('User-agent: *\nDisallow: /\n')
hdr+='/assets/*\n  Cache-Control: public, max-age=86400\n/\n  Cache-Control: no-cache\n/index.html\n  Cache-Control: no-cache\n'
open(D+'/_headers','w').write(hdr)
# controlli
h=open(D+'/index.html').read()
refs=set(re.findall(r'assets/[\w./-]+\.(?:webp|png|jpg|svg|css|js)(?=["?])',h))
miss=[r for r in refs if not os.path.exists(D+'/'+r)]
print('file',sum(len(f) for _,_,f in os.walk(D)),'mancanti',miss)
