import { Movie } from '../../models/movie';
import { ActionTypes } from '../action-types';
import { Action } from '../actions';

export interface MoviesState {
  items: Array<Movie>;
  selectedMovie: Movie;
}

const initialState: MoviesState = {
  items: [],
  selectedMovie: null,
};

export default function moviesReducer(
  state: MoviesState = initialState,
  action: Action
): MoviesState {
  switch (action.type) {
    case ActionTypes.SET_MOVIE: {
      return {
        ...state,
        selectedMovie: action.payload.movie,
      };
    }
    case ActionTypes.SET_MOVIES: {
      const selectedMovieId = state.selectedMovie && state.selectedMovie.id;
      return {
        ...state,
        items: [
          ...action.payload.movies.filter(
            (movie: Movie) => movie.id !== selectedMovieId
          ),
        ],
      };
    }
    default:
      return state;
  }
}
