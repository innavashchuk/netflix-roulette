import * as React from 'react';
import MovieDetails from '../movie-details/Movie-Details';
import {CustomAlert} from '../custom-alert/Custom-Alert';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import SearchMoviesPage from '../search-movies-page/Search-Movies-Page';
import {ErrorPage} from '../error-page/Error-Page';

const App: React.FunctionComponent<Record<string, unknown>> = () =>
    <>
        <CustomAlert/>
        <Router>
            <Switch>
                <Route exact path="/">
                    <SearchMoviesPage/>
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
    </>;

export default App;
