import * as React from 'react';
import './main.scss';

export interface MainProps {
  children: React.ReactNode
}

const Main: React.FunctionComponent<MainProps> = (props: MainProps) =>
  <main className="main-container">
    {props.children}
  </main>
;

export default Main;
