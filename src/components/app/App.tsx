import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import {hot} from 'react-hot-loader';
import {Provider} from 'react-redux';
import MovieDetails from '../movie-details/Movie-Details';
import SearchMoviesPage from '../search-movies-page/Search-Movies-Page';
import 'isomorphic-fetch';
import CustomAlert from '../custom-alert/Custom-Alert';
import ErrorPage from '../error-page/Error-Page';
import StartPage from '../start-page/Start-Page';

const App: React.FunctionComponent<any> = ({Router, location, context, store}) =>
    <>
        <Provider store={store}>
            <CustomAlert/>
            <Router location={location} context={context}>
                <Switch>
                    <Route exact path="/">
                        <StartPage/>
                    </Route>
                    <Route path="/search">
                        <SearchMoviesPage/>
                    </Route>
                    <Route path="/film/:id">
                        <MovieDetails/>
                    </Route>
                    <Route path="*">
                        <ErrorPage/>
                    </Route>
                </Switch>
            </Router>
        </Provider>
    </>;

export default hot(module)(App);
