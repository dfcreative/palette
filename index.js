/*!
 * @module image-palette
 */

/**
 * Module dependencies.
 */

var quantize = require('quantize');
var readimage = require('readimage');
var fs = require('fs');


/**
 * Expose `palette`.
 */

module.exports = palette;


/**
 * Library version.
 */

exports.version = require('./package').version;


/**
 * Return the color palette for the file given in `path`
 * consisting of `n` RGB color values, defaulting to 5.
 * Returning value is passed to a callback
 *
 * @param {String} path
 * @param {Function} cb
 * @param {Number} n
 * @api public
 */

function palette(path, cb, n) {
  var file = fs.readFileSync(path);

  n = n || 5;

  return readimage(file, function (err, image) {
    //transform image data for quantization
    var rawData = image.frames[0].data;
    var len = rawData.length;
    var data = [];

    for (var i = 0; i < len; i += 4) {
      // semi-transparent
      if (rawData[i + 3] < 0xaa) continue;
      data.push([rawData[i], rawData[i + 1], rawData[i + 2]]);
    }

    var colors = quantize(data, n).palette();

    cb(colors);
  });
}