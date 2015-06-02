var palette = require('./');
var assert = require('assert');

palette('./examples/cat.jpg', function (colors) {
	assert(colors.length);
});