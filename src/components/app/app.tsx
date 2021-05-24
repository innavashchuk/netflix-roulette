import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import MovieDetails from '../movie-details/movie-details';
import SearchMoviesPage from '../search-movies-page/search-movies-page';
import { CustomAlert } from '../custom-alert/custom-alert';
import { CustomLoader } from '../custom-loader/custom-loader';
import ErrorPage from '../error-page/error-page';
import 'isomorphic-fetch';
import StartPage from '../start-page/start-page';

const App: React.FunctionComponent<any> = ({ Router, location, context, store }) => 
  <>
  <Provider store={store}>
    <CustomAlert />
    <CustomLoader />
    <Router location={location} context={context}>
      <Switch>
        <Route exact path="/">
          <StartPage />
        </Route>
        <Route path="/search">
          <SearchMoviesPage />
        </Route>
        <Route path="/film/:id">
          <MovieDetails />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
    </Provider>
  </>;

export default hot(module)(App);
