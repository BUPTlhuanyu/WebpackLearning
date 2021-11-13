const a = require('./store');

module.exports = function loader(src) {
  console.log('loader2', a.loader);
  a.loader = 'this is loader2';
  return src.replace('MODE', this._compilation)
}
