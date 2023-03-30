import test from 'ava';
import { act, cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TagInput from './TagInput';

const OPTIONS = ['foo', 'bar', 'baz'];

test.afterEach(cleanup);

test.serial('should display an input', t => {
  const { getByRole } = render(
    <TagInput options={OPTIONS} value={[]} onChange={() => {}} />
  );

  t.notThrows(() => getByRole('textbox'));
});

test.serial('should allow a user to add a value to the array', async t => {
  t.plan(1);

  const onChange = (value: string[]) => {
    t.deepEqual(value, ['foo']);
  }

  const { getByRole } = render(
    <TagInput options={[]} value={[]} onChange={onChange} />
  );

  const input = getByRole('textbox');

  await act(async () => {
    await userEvent.type(input, 'foo[Enter]');
  });
});

test.serial('should not allow a user to add a new value when restrict is set', async t => {
  t.plan(1);

  const onChange = (value: string[]) => {
    t.deepEqual(value, []);
  }

  const { getByRole } = render(
    <TagInput restrict options={['bar']} value={[]} onChange={onChange} />
  );

  const input = getByRole('textbox');

  await act(async () => {
    await userEvent.type(input, 'foo[Enter]');
  });
});

test.serial('should not allow a user to add a duplicate value', async t => {
  t.plan(1);

  const onChange = (value: string[]) => {
    t.deepEqual(value, ['foo']);
  }

  const { getByRole } = render(
    <TagInput options={OPTIONS} value={['foo']} onChange={onChange} />
  );

  const input = getByRole('textbox');

  await act(async () => {
    await userEvent.type(input, 'foo[Enter]');
  });
});

test.serial('should allow a user to add a value to the array via autocomplete', async t => {
  t.plan(1);

  const onChange = (value: string[]) => {
    t.deepEqual(value, ['foo']);
  }

  const { getByRole, findByRole, unmount } = render(
    <TagInput options={OPTIONS} value={[]} onChange={onChange} />
  );

  const input = getByRole('textbox');

  await act(async () => {
    await userEvent.type(input, 'f');
  });

  const option = await findByRole('option');

  await act(async () => {
    await userEvent.click(option);
  });

  unmount();
});

test.serial('should allow a user to remove a value from the array', async t => {
  t.plan(1);

  const onChange = (value: string[]) => {
    t.deepEqual(value, ['bar']);
  }

  const { getByText, unmount } = render(
    <TagInput options={OPTIONS} value={['foo', 'bar']} onChange={onChange} />
  );

  const tag = getByText('foo');
  const button = tag.querySelector('svg');

  await act(async () => {
    await userEvent.click(button!);
  });

  unmount();
});

test.serial('should close the options when the user tabs away', async t => {
  t.plan(2);

  const { getByRole, findByRole, unmount } = render(
    <TagInput options={OPTIONS} value={[]} onChange={() => {}} />
  );

  const input = getByRole('textbox');

  await act(async () => {
    await userEvent.type(input, 'f');
  });

  await t.notThrowsAsync(async () => await findByRole('option'));

  await act(async () => {
    await userEvent.type(input, '[Tab]');
  });

  await t.throwsAsync(async () => await findByRole('option'));

  unmount();
})