import { Movie } from '../models/movie';
import { AppState } from './reducers';

export const selectMovies = ({ movies }: AppState): Movie[] => movies.items;

export const selectMovie = ({ movies }: AppState): Movie => movies.selectedMovie;

export const selectMovieId = ({ movies }: AppState): number => movies.selectedMovie && movies.selectedMovie.id;

export const selectIsLoading = ({ loader }: AppState): boolean => loader.isLoading;

export const selectAlertType = ({ alert }: AppState): string => alert.type;

export const selectAlertMessage = ({ alert }: AppState): string => alert.message;
