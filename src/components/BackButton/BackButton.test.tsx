import { act, render } from '@testing-library/react';
import test from 'ava';

import { useEffect } from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';

import BackButton from './BackButton';

const LocationWatcher = ({ onSuccess }: { onSuccess: () => void }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/foo') {
      onSuccess();
    }
  }, [location]);

  return null;
};

test('renders a button which goes back in the history stack on click', async (t) => {
  t.plan(1);

  const onSuccess = () => {
    t.pass();
  };

  const { container } = render(
    <MemoryRouter initialEntries={['/foo', '/bar']}>
      <BackButton />
      <LocationWatcher onSuccess={onSuccess} />
    </MemoryRouter>,
  );

  const button = container.querySelector('button');

  await act(() => {
    button!.click();
  });
});
