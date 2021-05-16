import SearchMoviesPage from './components/search-movies-page/Search-Movies-Page';
import ErrorPage from './components/error-page/Error-Page';
import MovieDetails from './components/movie-details/Movie-Details';
import StartPage from './components/start-page/Start-Page';

const routes = [
    {
        path: '/',
        exact: true,
        component: StartPage
    },
    {
        path: '/search',
        component: SearchMoviesPage
    },
    {
        path: '/film/:id',
        component: MovieDetails
    },
    {
        path: '*',
        component: ErrorPage
    },
];

export default routes;
