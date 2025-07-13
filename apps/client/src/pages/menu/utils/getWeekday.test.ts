import test from 'ava';

import weekdayFormat from './getWeekday';

test('should display the weekday given a date', (t) => {
  t.is(weekdayFormat.format(new Date('2023-03-30')), 'Thursday');
});
