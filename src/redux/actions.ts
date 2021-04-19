import { ActionTypes } from './action-types';
import { Movie } from '../models/movie';
import { AlertState } from './reducers/alert';

export interface Action {
  type: string,
  payload: any
}

export const setMovie = (movie: Movie | null): Action => ({
  type: ActionTypes.SET_MOVIE,
  payload: { movie }
});

export const setMovies = (movies: Movie[]): Action => ({
  type: ActionTypes.SET_MOVIES,
  payload: { movies }
});

export const setLoading = (isLoading: boolean): Action => ({
  type: ActionTypes.SET_LOADING,
  payload: { isLoading }
});

export const setAlert = (alert: AlertState): Action => ({
  type: ActionTypes.SET_ALERT,
  payload: { ...alert }
});
