import mod from './d.js'

mod(100, 11)

import(/* webpackChunkName: "b" */ './b').then(add => add(1, 2))


import('./c').then(del => del(1, 2))