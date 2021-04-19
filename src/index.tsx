import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app/App';
import './styles.scss';
import './assets/fonts/fonts.scss';
import { Provider } from 'react-redux';
import store from './redux/store';

function importAll(r: any) {
  r.keys().forEach(r);
}

importAll(require.context('./assets/images', true, /\.jpg$/));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

