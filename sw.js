const CACHE='oven-to-air-fryer-v1.1.0';
const ASSETS=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('oven-to-air-fryer-')&&key!==CACHE)await caches.delete(key);await self.clients.claim();})());});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE);const url=new URL(event.request.url);const isNavigation=event.request.mode==='navigate';
 if(isNavigation){try{const response=await fetch(event.request);if(response.ok)await cache.put('./index.html',response.clone());return response;}catch{return(await cache.match('./index.html'))||Response.error();}}
 const cached=await cache.match(event.request);if(cached)return cached;
 try{const response=await fetch(event.request);if(response.ok)await cache.put(event.request,response.clone());return response;}catch{return Response.error();}
 })());
});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});