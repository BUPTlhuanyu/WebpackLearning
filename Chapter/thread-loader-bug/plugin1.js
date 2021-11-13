/**
 * @file
 */
const a = require('./store');

class PluginA {
    apply(compiler) {
        // compiler.hooks.compilation.tap('plugin', compilation => {
        //     compilation.hooks.finishModules.tap('plugin', () => {
        //         console.log('plugin finishModules', a.loader);
        //     })
        // })
        console.log('plugin begin', a.loader);
        a.loader = 'plugin hahaha';
        compiler.hooks.done.tap('plugin', compilation => {
            console.log('plugin done', a.loader);
        })
    }
}

module.exports = PluginA;
