import test from 'ava';

import getISODate from './getISODate';

test('should convert a JS date to an iso date string', (t) => {
  const date = new Date('2023-03-30');
  const expected = '2023-03-30';

  t.is(getISODate(date), expected);
});
