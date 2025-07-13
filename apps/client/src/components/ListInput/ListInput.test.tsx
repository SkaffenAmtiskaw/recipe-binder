import { act, cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import test from 'ava';

import type { RenderResult } from '@testing-library/react';

import ListInput from './ListInput';

test.afterEach(cleanup);

test('should render with an input for every string in the value array', (t) => {
  const { container, unmount } = render(
    <ListInput label="unit test" value={['foo', 'bar']} onChange={() => {}} />,
  );

  const inputs = container.querySelectorAll('input');

  t.is(inputs.length, 2);
  t.is(inputs[0].value, 'foo');
  t.is(inputs[1].value, 'bar');

  unmount();
});

test('should render with a textarea for every string in the value array if textarea is enabled', (t) => {
  const { container, unmount } = render(
    <ListInput
      label="unit test"
      textarea
      value={['foo', 'bar']}
      onChange={() => {}}
    />,
  );

  const inputs = container.querySelectorAll('input');
  const textareas = container.querySelectorAll('textarea');

  t.is(inputs.length, 0);
  t.is(textareas.length, 2);
  t.is(textareas[0].value, 'foo');
  t.is(textareas[1].value, 'bar');

  unmount();
});

test("should call onChange with a single empty string if it's initialized with an empty array", async (t) => {
  let wrapper: RenderResult;

  t.plan(1);

  const onChange = (value: string[]) => {
    t.deepEqual(value, ['']);
  };

  await act(() => {
    wrapper = render(
      <ListInput label="unit test" value={[]} onChange={onChange} />,
    );
  });

  wrapper!.unmount();
});

test.serial(
  'should call onChange with an updated array when an input value is changed',
  async (t) => {
    t.plan(1);

    const onChange = (value: string[]) => {
      t.deepEqual(value, ['foo', 'baz']);
    };

    const { container, unmount } = render(
      <ListInput
        label="unit test"
        value={['foo', 'bar']}
        onChange={onChange}
      />,
    );

    const inputs = container.querySelectorAll('input');

    await userEvent.type(inputs[1], 'z', {
      initialSelectionStart: 2,
      initialSelectionEnd: 3,
    });

    unmount();
  },
);

test.serial(
  'should allow a user to delete a value from the array',
  async (t) => {
    t.plan(1);

    const onChange = (value: string[]) => {
      t.deepEqual(value, ['foo', 'baz']);
    };

    const { getAllByRole, unmount } = render(
      <ListInput
        label="unit test"
        value={['foo', 'bar', 'baz']}
        onChange={onChange}
      />,
    );

    const buttons = getAllByRole('button');

    await userEvent.click(buttons[1]);

    unmount();
  },
);

test.serial('should allow a user to add a new value', async (t) => {
  t.plan(1);

  const onChange = (value: string[]) => {
    t.is(value.length, 2);
  };

  const { getAllByRole, unmount } = render(
    <ListInput label="unit test" value={['foo']} onChange={onChange} />,
  );

  const buttons = getAllByRole('button');

  await userEvent.click(buttons[buttons.length - 1]);

  unmount();
});
