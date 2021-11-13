Issue: LoaderContext.mode is missing when running in `thread-loader`

## Not Working

- `npm run build`
- Check `dist/main.js`
  - `console.log('mode is: undefined')`

## Working

- Comment out `thread-loader` in config
- `npm run build`
- Check `dist/main.js`
  - `console.log('mode is: MODE')`

## bug
- loader 与 loader 之间可以通过单例传值，但是设计到 compilation hook 则失效
- loader 与 plugin 之间无法通过单例传值，因为设计到 compilation hook，同时 loader 中的 this._compiler 也是 undefined。