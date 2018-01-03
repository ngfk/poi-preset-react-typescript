# poi-preset-react-typescript

[![npm version](https://img.shields.io/npm/v/@ngfk/poi-preset-react-typescript.svg)](https://www.npmjs.com/package/@ngfk/poi-preset-react-typescript)

## Installation

```
$ npm i -D @ngfk/poi-preset-react-typescript
```

## Features

* Does not use babel
* Support for React `.tsx` files
* Hot module reloading with `react-hot-loader@3.1`

Combines:

* [poi-preset-react](https://github.com/egoist/poi/tree/master/packages/poi-preset-react)
* [poi-preset-typescript](https://github.com/egoist/poi/tree/master/packages/poi-preset-typescript)

## Usage

```js
// poi.config.js

module.exports = {
    presets: [require('@ngfk/poi-preset-react-typescript')()]
};
```

Check the [example](example/tsconfig.json) for a working `tsconfig.json`.
