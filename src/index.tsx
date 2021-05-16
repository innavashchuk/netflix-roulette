import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app/App';
import {BrowserRouter} from 'react-router-dom';
import './styles.scss';
import './assets/fonts/fonts.scss';
import configureStore from './redux/configure-store';

const store = configureStore((window as any).PRELOADED_STATE);

function importAll(r: any) {
    r.keys().forEach(r);
}

importAll(require.context('./assets/images', true, /\.jpg$/));

ReactDOM.hydrate(
    <App Router={BrowserRouter} store={store}/>,
    document.getElementById('output')
);
