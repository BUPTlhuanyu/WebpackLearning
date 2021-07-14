/**
 * @file
 */
import('./async.js').then(({default: text}) => {
    console.log(text);
});