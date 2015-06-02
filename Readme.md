# Image-palette

Image color palette extraction. Fork of [palette](http://github.com/tj/palette) without node-canvas dependency and async result.

## Installation

```
$ npm install image-palette
```

## API

 Palette's public API consists of a single function, the one returned by `require()`. This function accepts the `filepath` you wish to compute a color palette for, a callback and an optional number of samples defaulting to `5`.


```js
var palette = require('image-palette');
var Color = require('color');

var colors = palette('./image.jpg', function (colors) {
  Color().rgb(colors[0]);
});
```

[![NPM](https://nodei.co/npm/image-palette.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/image-palette/)