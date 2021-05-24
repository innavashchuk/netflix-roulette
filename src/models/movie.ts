import { MovieGenreEnum } from './enums/movie-genre';
import { InitialMovieValues } from './initial-movie-record';

export interface Movie {
  id?: number,
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
  tagline?: string
}

export class MovieRecord implements Movie {
  title = '';

  release_date = new Date().toISOString();

  poster_path = '';

  genres: string[] = [];

  overview = 'No overview provided';

  runtime = 0;

  vote_average: number;

  vote_count: number;

  revenue: number;

  budget: number;

  tagline: 'No tagline provided';

  constructor(values?: InitialMovieValues) {
    if (values) {
      this.title = values.title;
      this.genres = values.genres;
      this.overview = values.overview;
      this.poster_path = values.poster_path;
      this.release_date = values.release_date.toISOString();
      this.runtime = values.runtime;
    }
  }
}
