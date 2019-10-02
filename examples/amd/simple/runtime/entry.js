if (window.Promise && window.Promise.prototype && window.Promise.prototype.finally) {
  main();
} else {
  const polyfill = 'https://polyfill.io/v3/polyfill.min.js?features=es5,es6,es7,es8';
  require([polyfill], main);
}
