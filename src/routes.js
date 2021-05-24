import SearchMoviesPage from './components/search-movies-page/search-movies-page';
import ErrorPage from './components/error-page/error-page';
import MovieDetails from './components/movie-details/movie-details';
import StartPage from './components/start-page/start-page';

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
