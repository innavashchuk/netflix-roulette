import * as React from 'react';
import Logo from '../logo/Logo';
import './footer.scss';

export default function Footer(): React.ReactElement {
  return (
    <footer className="footer">
      <Logo />
    </footer>
  );
}
