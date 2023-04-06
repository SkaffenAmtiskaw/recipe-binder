import test from 'ava';

import getStartOfWeek from './getStartOfWeek';

test('it should return the Monday in the week of the provided date', (t) => {
  const date = new Date('2023-03-30');
  const expected = new Date('2023-03-27');

  t.deepEqual(getStartOfWeek(date), expected);
});

test('it should start the week on Monday', (t) => {
  const date = new Date('2023-04-02');
  const expected = new Date('2023-03-27');

  t.deepEqual(getStartOfWeek(date), expected);
});
