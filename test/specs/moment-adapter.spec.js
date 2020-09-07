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

	it('should startOf correctly using isoWeek preset', function() {
		const adapter = new _adapters._date();

		const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		const daysInMonth = moment().daysInMonth();

		for (const dayOfWeek of dayOfWeekNames) {
			for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
				const dt = moment({ day: dayOfMonth, hour: 8, minute: 30 });
				const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', dayOfWeekNames.indexOf(dayOfWeek));
				expect(adapter.format(startOf, 'ddd')).toEqual(dayOfWeek);
				expect(startOf.day).not.toBeGreaterThan(dt.day);
			}
		}

		for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
			const dt = moment({ day: dayOfMonth, hour: 8, minute: 30 });
			const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', false);
			expect(adapter.format(startOf, 'ddd')).toEqual('Sun');
			expect(startOf.day).not.toBeGreaterThan(dt.day);
		}

		for (let dayOfMonth=1; dayOfMonth<=daysInMonth; dayOfMonth++) {
			const dt = moment({day: dayOfMonth, hour: 8, minute: 30});
			const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', true);
			expect(adapter.format(startOf, 'ddd')).toEqual('Mon');
			expect(startOf.day).not.toBeGreaterThan(dt.day);
		}

		for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
			const dt = moment({ day: dayOfMonth, hour: 8, minute: 30 });
			const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', 100);
			expect(adapter.format(startOf, 'ddd')).toEqual('Sat');
			expect(startOf.day).not.toBeGreaterThan(dt.day);
		}

		for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
			const dt = moment({ day: dayOfMonth, hour: 8, minute: 30 });
			const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', -100);
			expect(adapter.format(startOf, 'ddd')).toEqual('Sun');
			expect(startOf.day).not.toBeGreaterThan(dt.day);
		}

	});
});
