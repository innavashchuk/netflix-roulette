import { MOVIES } from '../data/movies';
import { Movie } from '../models/movie';

let DATA_MOVIES = [...MOVIES];

export const getMovies = (): Movie[] => DATA_MOVIES;

export const updateMovie = (movieRecord: Movie): void => {
  const movieToUpdateIndex = DATA_MOVIES.findIndex(movie => movie.id === movieRecord.id);
  DATA_MOVIES = [
    ...DATA_MOVIES.slice(0, movieToUpdateIndex),
    movieRecord,
    ...DATA_MOVIES.slice(movieToUpdateIndex + 1)
  ];
};

export const addMovie = (movieRecord: Movie): void => {
  if (!movieRecord) {
    return;
  }
  movieRecord = {
    ...movieRecord,
    id: new Date().getTime()
  }
  DATA_MOVIES.push(movieRecord);
};

export const deleteMovie = (id: number): void => {
  const movieIndex = DATA_MOVIES.findIndex(movie => movie.id === id);
  DATA_MOVIES = [
    ...DATA_MOVIES.slice(0, movieIndex),
    ...DATA_MOVIES.slice(movieIndex + 1)
  ];
};

export const getMovieCardById = (id: number): Movie => DATA_MOVIES.find(movie => movie.id === id);
