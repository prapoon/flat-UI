
//service worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
    //service worker file is at the root of the domain
    navigator.serviceWorker.register('/sworkers.js').then(function(registration) {
    // If registration was successful
    console.log('ServiceWorker registration successful');
    }, function(err) {
    // If registration fails
    console.log('ServiceWorker registration failed');
    });
    });
    }