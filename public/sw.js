var CACHE = 'site-cache';

self.addEventListener('install', function(event){
  // Perform install steps
  event.waitUntil(preCache());
});

self.addEventListener('fetch', function(event){
  event.respondWith(fromCache(event.request));
  event.waitUntil(update(event.request));
});

function preCache() {
  return caches.open(CACHE).then(function (cache){
    return cache.addAll([
      '/',
      '/i/img1.jpg',
      '/i/img2.jpg',
      '/i/img3.jpg',
      '/css/style.css'
    ]);
  });
}

function fromCache(request){
  return caches.open(CACHE).then(function(cache){
    return cache.match(request).then(function(matching){
      if (matching) return matching;
      // why we clone request - https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
      var fetchRequest = request.clone();
      return update(fetchRequest);
    });
  });
}

function update(request){
  return caches.open(CACHE).then(function(cache){
    return fetch(request).then(function(responce){
      cache.put(request, responce);
      return responce;
    });
  });
}
