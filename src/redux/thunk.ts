import { Movie } from '../models/movie';
import { MovieQueryParams, MovieQueryParamsDict } from '../models/movie-query-params';
import { addMovie, deleteMovie, getMovie, getMovies, updateMovie } from '../services/data-service';
import { Action, setAlert, setLoading, setMovie, setMovieNotFound, setMovies } from './actions';
import { AlertTypesEnum } from './reducers/alert';

type DispatchAsync = (dispatch: Dispatch) => Promise<void>;
type Dispatch = (arg: Action | DispatchAsync) => void;

export const getMovieThunk = (id: number) => async (dispatch: Dispatch): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const movie = await getMovie(id);
    dispatch(setMovieNotFound(false));
    dispatch(setMovie(movie));
  }
  catch (error) {
    dispatch(setMovie(null));
    dispatch(setMovieNotFound(true));
  }
  // This timeout has no practical sense, just removes the loader after view is refreshed
  setTimeout(() => dispatch(setLoading(false)), 1000);
};

export const addMovieThunk = (movieRecord: Movie) => async (dispatch: Dispatch): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const movie = await addMovie(movieRecord);
    dispatch(setMovie(movie));
    dispatch(setAlert({
      type: AlertTypesEnum.success,
      message: `Successfully added movie ${movieRecord.title}`
    }));
  }
  catch (error) {
    dispatch(setAlert({
      type: AlertTypesEnum.error,
      message: error.toString()
    }))
  }
  setTimeout(() => dispatch(setLoading(false)), 1000);
};

export const getMoviesThunk = (queryParams: MovieQueryParamsDict) => async (dispatch: Dispatch): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const movies = await getMovies(queryParams);
    dispatch(setMovies(movies));
  }
  catch (error) {
    dispatch(setAlert({
      type: AlertTypesEnum.error,
      message: error.toString()
    }))
  }
  setTimeout(() => dispatch(setLoading(false)), 1000);
};

export const updateMovieThunk = (movieRecord: Movie, movieQueryParams: MovieQueryParamsDict) => async (dispatch: Dispatch): Promise<void> => {
  if (!movieRecord) {
    return;
  }
  // Tagline is a required field, but in some movies it's not present
  if (!movieRecord.tagline) {
    movieRecord.tagline = 'Tagline is not defined';
  }
  dispatch(setLoading(true));
  try {
    const movie = await updateMovie(movieRecord);
    dispatch(setMovie(movie));
    dispatch(getMoviesThunk(movieQueryParams));
    dispatch(setAlert({
      type: AlertTypesEnum.success,
      message: `Successfully updated movie ${movieRecord.title}`
    }));
  }
  catch (error) {
    dispatch(setAlert({
      type: AlertTypesEnum.error,
      message: error.toString()
    }))
  }
  setTimeout(() => dispatch(setLoading(false)), 1000);
};

export const deleteMovieThunk = (id: number, movieQueryParams: MovieQueryParamsDict) => async (dispatch: Dispatch): Promise<void> => {
  dispatch(setLoading(true));
  try {
    await deleteMovie(id);
    dispatch(getMoviesThunk(movieQueryParams));
    dispatch(setAlert({
      type: AlertTypesEnum.success,
      message: 'Successfully deleted movie'
    }));
  }
  catch (error) {
    dispatch(setAlert({
      type: AlertTypesEnum.error,
      message: error.toString()
    }))
  }
  setTimeout(() => dispatch(setLoading(false)), 1000);
};
