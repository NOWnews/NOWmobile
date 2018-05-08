if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register(pwa_sw.url)
            .then(function(registration) { console.log('service worker ready'); registration.update(); })
            .catch(function(error) { console.log('failed with ' + error); });
    });
}