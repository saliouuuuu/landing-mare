import os,shutil,re,json,base64,hashlib
S='src'; D='dist'
shutil.rmtree(D,ignore_errors=True); os.makedirs(D+'/assets/img')
shutil.copy(S+'/index.src.html',D+'/index.html'); shutil.copy(S+'/app.css',D+'/assets/app.css'); shutil.copy(S+'/app.js',D+'/assets/app.js')
shutil.copy('assets/favicon.svg',D+'/assets/favicon.svg')
for f in os.listdir('assets/img'): shutil.copy('assets/img/'+f,D+'/assets/img/'+f)
open(D+'/sitemap.xml','w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>{{ORIGIN}}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>\n')
open(D+'/robots.txt','w').write('User-agent: *\nAllow: /\nSitemap: {{ORIGIN}}/sitemap.xml\n')
open(D+'/404.html','w').write('<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Pagina non trovata · Marea Creative</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#ECEBE7;color:#11181B;font:18px/1.5 system-ui,sans-serif;text-align:center}a{color:inherit;font-weight:700}</style></head><body><main><p>Questa pagina non esiste.</p><p><a href="/">Torna a Marea Creative</a></p></main></body></html>')
# controlli
h=open(D+'/index.html').read()
refs=set(re.findall(r'assets/[\w./-]+\.(?:webp|png|jpg|svg|css|js)',h))
miss=[r for r in refs if not os.path.exists(D+'/'+r)]
print('file',sum(len(f) for _,_,f in os.walk(D)),'mancanti',miss)
