import os,base64,hashlib,json
D='dist'
mt={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'}
files={}
for dp,_,fs in os.walk(D):
    for f in sorted(fs):
        rel='/'+os.path.relpath(os.path.join(dp,f),D); d=open(D+rel,'rb').read(); ext=os.path.splitext(f)[1]
        tpl=ext in ('.html','.xml','.txt')
        cc='no-cache' if ext in ('.html','.xml','.txt') else ('public, max-age=300' if ext in ('.css','.js') else 'public, max-age=86400')
        files[rel]={'t':mt[ext],'e':hashlib.sha256(d).hexdigest()[:16],'c':cc,'b':base64.b64encode(d).decode()}
        if tpl: files[rel]['x']=1
js=open('worker.template.js').read().replace('/*FILES*/{}',json.dumps(files,separators=(',',':')))
open('worker.js','w').write(js)
open('worker-meta.json','w').write(json.dumps({'main_module':'worker.js','compatibility_date':'2026-10-17'}))
print(len(files),'file,',len(js)//1024,'KB')
