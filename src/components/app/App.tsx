import * as React from 'react';
import MovieDetails from '../movie-details/Movie-Details';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import SearchMoviesPage from '../search-movies-page/Search-Movies-Page';
import {ErrorPage} from '../error-page/Error-Page';
import CustomAlert from '../custom-alert/Custom-Alert';

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
