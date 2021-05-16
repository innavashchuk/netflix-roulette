import {ActionTypes} from './action-types';
import {Movie} from '../models/movie';
import {AlertState} from './reducers/alert';
import {MovieQueryParams} from '../models/movie-query-params';

export interface Action {
    type: string,
    payload: any
}

export const setMovie = (movie: Movie | null): Action => ({
    type: ActionTypes.SET_MOVIE,
    payload: {movie}
});

export const setMovieNotFound = (notFound: boolean): Action => ({
    type: ActionTypes.SET_MOVIE_NOT_FOUND,
    payload: {notFound}
});

export const setMovies = (movies: Movie[] | undefined[]): Action => ({
    type: ActionTypes.SET_MOVIES,
    payload: {movies}
});

export const setLoading = (isLoading: boolean): Action => ({
    type: ActionTypes.SET_LOADING,
    payload: {isLoading}
});

export const setAlert = (alert: AlertState): Action => ({
    type: ActionTypes.SET_ALERT,
    payload: {...alert}
});

export const setFilter = (filter: string): Action => ({
    type: ActionTypes.SET_FILTER,
    payload: {filter}
});

export const setSortOrder = (sortOrder: string): Action => ({
    type: ActionTypes.SET_SORT_ORDER,
    payload: {sortOrder}
});

export const setSortBy = (sortBy: string): Action => ({
    type: ActionTypes.SET_SORT_BY,
    payload: {sortBy}
});

export const setSearch = (search: string): Action => ({
    type: ActionTypes.SET_SEARCH,
    payload: {search}
});

export const setQueryParams = (params: MovieQueryParams): Action => ({
    type: ActionTypes.SET_QUERY_PARAMS,
    payload: {...params}
});
