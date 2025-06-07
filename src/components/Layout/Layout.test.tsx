import { render } from '@testing-library/react';
import test from 'ava';

import Layout from './Layout';

test('render a header and content', (t) => {
  t.plan(2);

  const HEADER_TEXT = 'this is the header';
  const CONTENT_TEXT = 'this is the content';

  const header = <div>{HEADER_TEXT}</div>;
  const content = <div>{CONTENT_TEXT}</div>;

  const { getByText } = render(<Layout header={header}>{content}</Layout>);

  t.truthy(getByText(HEADER_TEXT));
  t.truthy(getByText(CONTENT_TEXT));
});
