const util = require('loader-utils') ;

module.exports = function(source) {
    console.log('source',typeof source)
    console.log('source',source)
    const options = util.getOptions(this);
    console.log(options)
    // 匹配js中的注释内容
    const reg = new RegExp(/(\/\/.*)|(\/\*[\s\S]*?\*\/)/g)

    console.log('loader共享属性', this)

    // 删除注释
    return source.replace(reg, '')
  }
  
  module.exports.pitch = function(remainingRequest, precedingRequest, data) {
    data.value = 42;
  };
  