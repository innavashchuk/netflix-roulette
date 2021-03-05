import * as React from 'react';
import './movies-list.scss';
import MovieCard from '../movie-card/Movie-Card';
import { Movie } from '../../models/interfaces/movie';

export interface MoviesListProps {
  moviesList: Movie[]
}

function MoviesList({ moviesList = [] }: MoviesListProps): React.ReactElement {
  if (moviesList.length > 0) {
    return (
      <>
        <p className="movies-total">
          <span className="movies-total__count">{moviesList.length}</span> movies found
            </p>
        <div className="movies-list">
          {
            moviesList.map(movie => <MovieCard movie={movie} key={movie.id} />)
          }
        </div>
      </>
    );
  }
  return (
    <div className="movies-not-found-message">
      <p>No Movies Found</p>
    </div>
  )
}

export default MoviesList;
