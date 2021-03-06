# image-palette [![Build Status](https://travis-ci.org/dy/image-palette.svg?branch=master)](https://travis-ci.org/dy/image-palette) [![unstable](https://img.shields.io/badge/stability-unstable-green.svg)](http://github.com/badges/stability-badges)

Extract palette from pixels array, return pixels mapped to palette. Useful for organizing [palette-based encoding](https://ghub.io/image-encode), like GIF, or various limited colors renderers, like [gl-scatter2d](https://ghub.io/gl-scatter2d).

Inspired by [get-rgba-palette](https://github.com/mattdesl/get-rgba-palette).

## Usage

[![$ npm install image-palette](http://nodei.co/npm/image-palette.png?mini=true)](http://npmjs.org/package/image-palette)

```javascript
var palette = require('image-palette')
var pixels = require('image-pixels')

var {ids, colors} = palette(await pixels('./image.png'))
```

## API

### `var {ids, colors, amount} = palette(pixels, count=5)`

Extract palette from the input `pixels` array with `rgba` pixels sequence, whether flat or nested.

* `colors` is a list of extracted colors `[[r, g, b, a], [r, g, b, a], ...]`.
* `ids` is an array of input pixels mapped to extracted `colors`.
* `amount` is an array with amounts corresponding to the extracted colors, from `0..1` range.
* `count` is max number of colors to extract.

## Related

* [image-pixels](https://ghub.io/image-pixels) − load pixels data from any image source.
* [image-save](https://ghub.io/image-save) − save image/pixel data to a file, canvas or array.
* [image-equal](https://ghub.io/image-equal) − test if two images are equal, based on fuzzy comparison.

## License

© 2018 Dmitry Yv. MIT License.
