if(!window.Promise){
	window.Promise=Promise;
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('swork.js')
    .then(function() {
      console.log('Service worker registered!');
    });
}