import test from 'ava';

import replace from './replace';

test('replace should return a new array with an item changed at a specific index', (t) => {
  t.plan(2);

  const array = [1, 2, 4, 4];
  const result = [1, 2, 3, 4];

  t.deepEqual(replace(array, 3, 2), result);
  t.notDeepEqual(array, result);
});

test('insert should work for any type of array', (t) => {
  const foo = { name: 'foo' };
  const bar = { name: 'bar' };
  const baz = { name: 'baz' };

  const array = [foo, baz];
  const result = [foo, bar];

  t.deepEqual(replace(array, bar, 1), result);
});
