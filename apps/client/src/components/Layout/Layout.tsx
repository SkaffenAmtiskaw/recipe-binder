import { majorScale, Pane } from 'evergreen-ui';
import type { ReactNode } from 'react';

interface Props {
  header: ReactNode;
  [propName: string]: any;
}

const Layout = ({ header, ...props }: Props) => (
  <>
    <Pane background="tealTint" padding={majorScale(3)} children={header} />
    <Pane padding={majorScale(3)} {...props} />
  </>
);

export default Layout;
