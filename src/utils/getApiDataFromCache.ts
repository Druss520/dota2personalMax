export default function getApiDataFromCache(url) {
  if ('caches' in window) {
      return caches.match(url).then(function (cache) {
          if (!cache) {
              return;
          }
          return cache.json();
      });
  }
  else {
      return Promise.resolve();
  }
}
