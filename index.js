'use strict';

// Modules:
var crossfilter = require('crossfilter');
var _           = require('underscore');
var data        = require('./data/links.json');

var records   = crossfilter(data);
var ups       = records.dimension(function (d) { return d.ups; });
var downs     = records.dimension(function (d) { return d.down; });
var dayOfWeek = records.dimension(function (d) { return new Date(d.created * 1000).getUTCDay(); });
var month     = records.dimension(function (d) { return new Date(d.created * 1000).getUTCMonth(); });
var dates     = records.dimension(function (d) { return new Date(d.created * 1000); });

console.log('\nReport: '+records.size()+' records.');

var yearGroups = dates.group(function (date) {
	return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1);
});

console.log(dayOfWeek.group().all());
console.log(month.group().all());

//console.log(ups.group(function (d) { return d < 10 ? '< 10' : '>= 10'; }).all());
