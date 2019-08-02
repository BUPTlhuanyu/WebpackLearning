import(/* webpackChunkName: "1" */ './c').then(test => {
    console.log(test)
})

import(/* webpackChunkName: "2" */ './d').then(test => {
    console.log(test)
})