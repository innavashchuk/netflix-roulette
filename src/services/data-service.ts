import { MOVIES } from '../data/movies';
import {
  FilterFieldEnum,
  MoviesFilter,
  SortingDirectionEnum,
  SortingFieldsEnum,
} from '../models/enums/movies-list';
import { Movie } from '../models/movie';

let DATA_MOVIES = [...MOVIES];

export const getMovies = (): Movie[] => DATA_MOVIES;

export const updateMovie = (movieRecord: Movie): void => {
  const movieToUpdateIndex = DATA_MOVIES.findIndex(
    (movie) => movie.id === movieRecord.id
  );
  DATA_MOVIES = [
    ...DATA_MOVIES.slice(0, movieToUpdateIndex),
    movieRecord,
    ...DATA_MOVIES.slice(movieToUpdateIndex + 1),
  ];
};

export const addMovie = (movieRecord: Movie): void => {
  if (!movieRecord) {
    return;
  }
  movieRecord = {
    ...movieRecord,
    id: new Date().getTime(),
  };
  DATA_MOVIES.push(movieRecord);
};

export const deleteMovie = (id: number): void => {
  const movieIndex = DATA_MOVIES.findIndex((movie) => movie.id === id);
  DATA_MOVIES = [
    ...DATA_MOVIES.slice(0, movieIndex),
    ...DATA_MOVIES.slice(movieIndex + 1),
  ];
};

export const filterMovies = (filter: MoviesFilter): Movie[] =>
  DATA_MOVIES.filter(
    (movie) =>
      (!filter.searchValue ||
        movie.title
          ?.toLowerCase()
          .includes(filter.searchValue.toLowerCase())) &&
      (!filter.filterField ||
        filter.filterField === FilterFieldEnum.all ||
        movie.genres.includes(filter.filterField))
  ).sort((prev, curr) => {
    if (filter.sortField === SortingFieldsEnum.rating) {
      return filter.sortingDirection === SortingDirectionEnum.asc
        ? prev.vote_average - curr.vote_average
        : curr.vote_average - prev.vote_average;
    }
    if (filter.sortField === SortingFieldsEnum.genre) {
      const prevGenres =
        Array.isArray(prev.genres) && prev.genres.sort().join('');
      const currGenres =
        Array.isArray(curr.genres) && curr.genres.sort().join('');
      if (prevGenres > currGenres) {
        return filter.sortingDirection;
      }
      if (prevGenres < currGenres) {
        return -filter.sortingDirection;
      }
    }
    if (filter.sortField === SortingFieldsEnum.releaseDate) {
      const prevDate = new Date(prev.release_date).getTime();
      const currDate = new Date(curr.release_date).getTime();
      return filter.sortingDirection === SortingDirectionEnum.asc
        ? prevDate - currDate
        : currDate - prevDate;
    }
    return 0;
  });

export const getMovieCardById = (id: number): Movie =>
  DATA_MOVIES.find((movie) => movie.id === id);
