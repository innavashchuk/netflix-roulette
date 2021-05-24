import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import App from './components/app/app';
import configureStore from './redux/configure-store';
import { MovieQueryParamsDict } from './models/movie-query-params';
import { setQueryParams } from './redux/actions';

function renderHTML(html, preloadedState) {
  return `
      <!doctype html>
      <html>
        <head>
          <meta charset=utf-8>
          <title>React Server Side Rendering</title>
          <link rel="icon" type="image/png" href="./assets/images/logo.png">
          ${process.env.NODE_ENV === 'development' ? '' : '<link href="./styles.css" rel="stylesheet" type="text/css">'}
        </head>
        <body>
          <div id="output" class="output">${html}</div>
          <script>
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <script src="/js/main.js"></script>
        </body>
      </html>
  `;
}

export default function serverRenderer() {
  return (req, res) => {
    const store = configureStore();
    const context = {};
      const renderRoot = () => (
        <App
          context={context}
          location={req.url}
          Router={StaticRouter}
          store={store}
          />
      );
      if (req.query) {
        const queryParams = new MovieQueryParamsDict(req.query);
        if (queryParams) {
          store.dispatch(setQueryParams(queryParams));
        }
      }
      store.runSaga().done.then(() => {
        const htmlString = renderToString(renderRoot());
        if (context.url) {
          res.writeHead(302, {
            Location: context.url,
          });
          res.end();
          return;
        }
        const preloadedState = store.getState();
        res.send(renderHTML(htmlString, preloadedState));
      });

      renderToString(renderRoot());
      store.close();
  };
}
