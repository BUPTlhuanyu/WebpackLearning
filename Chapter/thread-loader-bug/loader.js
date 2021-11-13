const a = require('./store');

module.exports = function loader(src) {
  console.log('loader1', a.loader);
  a.loader = 'this is loader1';
  return src.replace('MODE', this._compiler)
}
