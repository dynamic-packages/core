if (window.Promise && window.Promise.prototype.finally) {
  main();
} else {
  const polyfill = 'https://polyfill.io/v3/polyfill.js?features=es5,es6,es7';
  require([polyfill], main);
}
