import { _adapters } from 'chart.js';

describe('Moment Adapter', function() {
	it('should format correctly using format presets', function() {
		var adapter = new _adapters._date();
		var formats = adapter.formats();

		expect(adapter.format(1559056227321, formats.year)).toEqual('2019');
		expect(adapter.format(1559056227321, formats.quarter)).toEqual('Q2 - 2019');
		expect(adapter.format(1559056227321, formats.month)).toEqual('May 2019');
		expect(adapter.format(1559056227321, formats.week)).toEqual('May 28, 2019');
		expect(adapter.format(1559056227321, formats.day)).toEqual('May 28');
	});
});
