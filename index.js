const util = require("util");

// 调用node的模块util.deprecate展示
const deprecateContext = util.deprecate(() => {console.log(1)},
    "Hook.context is deprecated and will be removed");
    deprecateContext()