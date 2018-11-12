'use strict'

var palette = require('./')
var t = require('tape')
var img = require('image-pixels')
var array = require('array-range')
var almostEqual = require('almost-equal')


t('readme', async t => {
	var data = await img('./examples/test_pattern.png')
	var {ids, colors, amount} = palette(data, 100)

	t.deepEqual(unpack(ids, colors), data.data)

	t.end()


	function unpack(ids, colors) {
		var res = []
		for (let i = 0; i < ids.length; i++) {
			var color = colors[ids[i]]
			res.push(...color)
		}
		return res
	}
})


// get-rgba-palette case
var RED = [255,0,0,255]
var BLUE_TRANSPARENT = [0,0,255,0]
function concat(a, b) { return a.concat(b) }
t("gets a palette of main colors from an array of pixels", function(t) {

    //a red image
    var red = array(100)
        .map(function() { return RED })
        .reduce(concat)

    t.deepEqual(palette(red, 1).colors, [ [255,0,0,255] ], 'should guess red-like rgba color')
    t.deepEqual(palette.quantized(red, 1).colors, [ [255,0,0,255] ], 'should guess red-like rgba color')
    t.deepEqual(palette(red, 0).colors, [], 'should return empty array')

    t.deepEqual(palette(red, 6).colors.length, 1, 'should not return extra colors')


    var blue = array(300)
        .map(function () { return BLUE_TRANSPARENT })
        .reduce(concat)
    var redAndBlue = red.slice().concat(blue)

    t.deepEqual(palette(blue, 1).colors, [ [ 0, 0, 255, 0 ] ], 'gets blue')
    t.deepEqual(palette(redAndBlue, 1).colors, [ [ 63, 0, 191, 63 ] ], 'gets blue red avg')

    t.end()
})

t('amounts', t => {
    var gradient = array(100)
        .map(function(i, x, self) {
            var c = RED.slice()
            //gradient from black to red
            c[0] = ~~(c[0] * (x/self.length))
            return c
        })
        .reduce(function(a, b) { return a.concat(b) })
    var sum1 = palette(gradient, 4).amount.reduce(sum, 0)

    t.ok(almostEqual(sum1, 1), 'amount sums to one')

    var sum2 = palette(gradient, 2).amount.reduce(sum, 0)
    t.ok(almostEqual(sum2, 1), 'amount sums to one')

	function sum(prev, a) {
	    return prev + a
	}

    t.end()
})
