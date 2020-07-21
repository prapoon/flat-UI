var CACHE_STATIC_NAME='static-v2';

self.addEventListener('install', function(event) {
  //console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
          '/',
          'index.html',
          'app.js',
          'aboutme.html',
          'colorshades.json',
          'data.json',
          'demo.html',
          'favicon.png',
          'flatcolor.json',
          'Flaticon.html',
          'FlatUIcp.html',
          'internationalCP.html',
          'internationalCP.json',
          'manifest.json',
          'app.js',
          'assets/images/icons/flat1.png',
          'assets/images/icons/flat3.png',
          'assets/images/icons/chat.svg',
          'assets/css/demo.css',
          'assets/js/jquery-3.5.1.min.js',
          'assets/js/bootstrap.min.js',
          'assets/js/dom-to-image.min.js',
          'assets/js/FileSaver.min.js',
          'assets/js/flat1.png',
        ]);
      })
  )
});

self.addEventListener('activate', function(event) {
  //console.log('[Service Worker] Activating Service Worker ...', event);
	event.waitUntil(
		caches.keys()
			.then(function (keyList){
				return Promise.all(keyList.map(function (key){
					if(key!==CACHE_STATIC_NAME){
						return caches.delete(key);
					}
				}));
			})
	);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  //console.log('[Service Worker] Fetching something ....', event);
  //event.respondWith(fetch(event.request));
  event.respondWith(
		  caches.match(event.request)
		  	.then(function (response){
		  		if(response){
		  			return response;
		  		}
		  		else{
		  			return fetch(event.request);
		  		}
		  	})
	);
});

