import { combineReducers } from 'redux';
import alertReducer, { AlertState } from './alert';
import loaderReducer, { LoaderState } from './loader';
import moviesReducer, { MoviesState } from './movies';

export interface AppState {
  movies: MoviesState;
  alert: AlertState;
  loader: LoaderState;
}

export default combineReducers({
  movies: moviesReducer,
  alert: alertReducer,
  loader: loaderReducer,
});
