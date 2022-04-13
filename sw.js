var cacheName = 'phaser-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/game.js',
  '/phaser.min.js',

  '/scenes/endGame.js',
  '/scenes/options.js',
  '/scenes/pauseGame.js',
  '/scenes/preload.js',
  '/scenes/preview.js',
  '/scenes/selectGame.js',
  '/scenes/startGame.js',
  '/scenes/UI.js',

  '/classes/draw3.js',
  '/classes/levels.js',
  '/classes/settings.js',

  '/assets/particles.png',
  '/assets/sprites/blank.png',
  '/assets/sprites/check.png',
  '/assets/sprites/gems_round.png',
  '/assets/sprites/gems.png',
  '/assets/sprites/icons.png',
  '/assets/sprites/menu_icons.png',
  '/assets/sprites/modal.png',
  '/assets/sprites/rover.png',
  '/assets/sprites/select_icons.png',
  '/assets/sprites/star.png',
  '/assets/sprites/switch.png',

  '/assets/sound/music1.mp3',

  '/assets/fonts/topaz.png',
  '/assets/fonts/topaz.xml',

  //'https://cdn.jsdelivr.net/gh/photonstorm/phaser@3.10.1/dist/phaser.min.js'
];
self.addEventListener('install', function (event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function (err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('sw activate');
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});