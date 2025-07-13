import test from 'ava';

import getNextWeek from './getNextWeek';

test('it should return the start date of the following week', (t) => {
  const date = new Date('2023-03-27');
  const expected = new Date('2023-04-03');

  t.deepEqual(getNextWeek(date), expected);
});
