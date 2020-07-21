//define cache name and url to cache
var cache_name = 'myapp-v1';
var linksToCache = [
'/',
'/index.html',
'/app.js',
];
//performing installation
self.addEventListener('install', function(event) {
//event.waitUntil() method takes a promise and uses it to know how
//long installation takes, and whether it succeeded or not
event.waitUntil(
    //open and cache files and confirm whether all the required assets are cached or not
//a chain of promises (caches.open() and cache.addAll())
caches.open(cache_name)
.then(function(cache) {
console.log('Available cache');
return cache.addAll(linksToCache);
})
);
});

self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] activate');
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
            if (key !== cache_name) {
            console.log('[ServiceWorker] deleting old cache', key);
            return caches.delete(key);
            }
            }));
            })
            );
            //activate the service worker faster
            return self.clients.claim();
            });

self.addEventListener('fetch', function(event) {
                console.log('[ServiceWorker] fetching', event.request.url);
                e.respondWith(
                /*caches.match (event.request) allows us to match each resource requested from the network with the equivalent resource available in the cache, if there is a matching one available. The matching is done via url and vary headers,just like with normal HTTP requests. It then either responds with the cached version or uses fetch to get a copy from the network */
                caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
                })
                );
                });