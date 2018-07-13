export default function getApiDataFromCache(url) {
  if ('caches' in window) {
    //   caches.keys().then((value) => {
    //       alert(value);
    //   })
    //   caches.open('api-1-1-1').then((cache) => {
    //       cache.keys().then((value) => {
    //           alert(value[0].url);
    //       })
    //   })
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
