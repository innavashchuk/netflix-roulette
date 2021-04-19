import { MovieGenreEnum } from './enums/movie-genre';

export interface Movie {
  id: number,
  title: string,
  release_date: string;
  poster_path: string,
  genres: Array<string>,
  overview: string,
  runtime: number,
  vote_average: number,
  vote_count: number,
  revenue: number,
  budget: number,
  tagline: string
}

export class MovieRecord implements Movie {
  id = 0;

  title = '';

  release_date = new Date().toDateString();

  poster_path = '';

  genres: MovieGenreEnum[] = [];

  overview = '';

  runtime = 0;

  vote_average: number;

  vote_count: number;

  revenue: number;

  budget: number;

  tagline: string;
}

export interface MovieQueryParams {
  [key: string]: string,
  sortBy: string,
  sortOrder: string,
  search: string,
  searchBy: string,
  filter: string,
  offset: string,
  limit: string
}