import { MovieGenreEnum } from '../enums/movie-genre';

export interface Movie {
  id: number,
  title: string,
  release_date: string;
  poster_path: string,
  genres: Array<MovieGenreEnum>,
  overview: string,
  runtime: number,
  vote_average: number,
  vote_count: number,
  revenue: number,
  budget: number,
  tagline: string
}
