import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import './styles.scss';
import './assets/images/logo.png';
import './assets/images/no-image.png';
import './assets/fonts/fonts.scss';
import configureStore from './redux/configure-store';

const store = configureStore((window as any).PRELOADED_STATE);
function importAll(r: any) {
  r.keys().forEach(r);
}

importAll(require.context('./assets/images', true, /\.jpg$/));

ReactDOM.hydrate(
  <App Router={ BrowserRouter } store={store} />,
  document.getElementById('output')
);
