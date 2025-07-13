import test from 'ava';

import dedupe from './dedupe';

test('dedupe should remove duplicates from array', (t) => {
  t.plan(5);

  t.deepEqual(dedupe(['foo', 'foo']), ['foo']);
  t.deepEqual(dedupe(['bar', 'bar']), ['bar']);
  t.deepEqual(dedupe(['bar', 'foo', 'bar']), ['bar', 'foo']);
  t.deepEqual(dedupe([0, 1, 1]), [0, 1]);

  const foo = { name: 'foo' };
  const bar = { name: 'bar' };

  t.deepEqual(dedupe([foo, foo, bar]), [foo, bar]);
});
