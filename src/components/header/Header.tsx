import * as React from 'react';
import './header.scss';

interface HeaderProps {
  children: React.ReactNode
}

function Header(props: HeaderProps): React.ReactElement {
  return (
    <header className="header">
      {props.children}
    </header>
  );
}

export default Header;
