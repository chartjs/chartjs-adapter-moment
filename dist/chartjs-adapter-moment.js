/*!
 * chartjs-adapter-moment v0.1.1
 * https://www.chartjs.org
 * (c) 2020 Chart.js Contributors
 * Released under the MIT license
 */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('moment'), require('chart.js')) :
typeof define === 'function' && define.amd ? define(['moment', 'chart.js'], factory) :
(global = global || self, factory(global.moment, global.Chart));
}(this, (function (moment, chart_js) { 'use strict';

moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

const FORMATS = {
	datetime: 'MMM D, YYYY, h:mm:ss a',
	millisecond: 'h:mm:ss.SSS a',
	second: 'h:mm:ss a',
	minute: 'h:mm a',
	hour: 'hA',
	day: 'MMM D',
	week: 'll',
	month: 'MMM YYYY',
	quarter: '[Q]Q - YYYY',
	year: 'YYYY'
};

chart_js._adapters._date.override(typeof moment === 'function' ? {
	_id: 'moment', // DEBUG ONLY

	formats: function() {
		return FORMATS;
	},

	parse: function(value, format) {
		if (typeof value === 'string' && typeof format === 'string') {
			value = moment(value, format);
		} else if (!(value instanceof moment)) {
			value = moment(value);
		}
		return value.isValid() ? value.valueOf() : null;
	},

	format: function(time, format) {
		return moment(time).format(format);
	},

	add: function(time, amount, unit) {
		return moment(time).add(amount, unit).valueOf();
	},

	diff: function(max, min, unit) {
		return moment(max).diff(moment(min), unit);
	},

	startOf: function(time, unit, weekday) {
		time = moment(time);
		if (unit === 'isoWeek') {
			return time.isoWeekday(weekday).valueOf();
		}
		return time.startOf(unit).valueOf();
	},

	endOf: function(time, unit) {
		return moment(time).endOf(unit).valueOf();
	}
} : {});

})));
