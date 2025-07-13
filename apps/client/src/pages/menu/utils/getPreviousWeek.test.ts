import test from 'ava';

import getPreviousWeek from './getPreviousWeek';

test('it should return the start date of the following week', (t) => {
  const date = new Date('2023-04-03');
  const expected = new Date('2023-03-27');

  t.deepEqual(getPreviousWeek(date), expected);
});
