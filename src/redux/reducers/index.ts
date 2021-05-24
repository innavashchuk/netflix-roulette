import {combineReducers} from 'redux';
import { MovieQueryParams } from '../../models/movie-query-params';
import alertReducer, { AlertState } from './alert';
import loaderReducer, { LoaderState } from './loader';
import moviesReducer, { MoviesState } from './movies';
import queryParamsReducer from './query-params';

export interface AppState {
    movies: MoviesState,
    alert: AlertState,
    loader: LoaderState,
    queryParams: MovieQueryParams
}

export default combineReducers({
    movies: moviesReducer,
    alert: alertReducer,
    loader: loaderReducer,
    queryParams: queryParamsReducer
});
