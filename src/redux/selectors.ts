import { Movie } from '../models/movie';
import { MovieQueryParams, MovieQueryParamsDict } from '../models/movie-query-params';
import { AppState } from './reducers';

export const selectMovies = ({ movies }: AppState): Movie[] => movies.items;

export const selectMovie = ({ movies }: AppState): Movie => movies.selectedMovie;

export const selectMovieNotFound = ({ movies }: AppState): boolean => movies.notFound;

export const selectMovieId = ({ movies }: AppState): number => movies.selectedMovie && movies.selectedMovie.id;

export const selectIsLoading = ({ loader }: AppState): boolean => loader.isLoading;

export const selectAlertType = ({ alert }: AppState): string => alert.type;

export const selectAlertMessage = ({ alert }: AppState): string => alert.message;

export const selectMovieQueryParams = ({ queryParams }: AppState): MovieQueryParams => queryParams;

export const selectFilterParam = ({ queryParams }: AppState): string => queryParams && queryParams.filter;

export const selectSortOrderParam = ({ queryParams }: AppState): string => queryParams && queryParams.sortOrder;

export const selectSortByParam = ({ queryParams }: AppState): string => queryParams && queryParams.sortBy;
