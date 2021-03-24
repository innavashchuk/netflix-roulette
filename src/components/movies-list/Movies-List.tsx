import * as React from 'react';
import './movies-list.scss';
import MovieCard from '../movie-card/Movie-Card';
import { Movie } from '../../models/movie';

export interface MoviesListProps {
  moviesList: Movie[],
  onMovieCardClick: (id: number) => void
}

function MoviesList(props: MoviesListProps): React.ReactElement {
  const handleMovieCardClick = (id: number) => {
    props.onMovieCardClick(id);
  }

  if (props.moviesList.length > 0) {
    return (
      <>
        <p className="movies-total">
          <span className="movies-total__count">{props.moviesList.length}</span> movies found.
            </p>
        <div className="movies-list">
          {
            props.moviesList.map(movie => <MovieCard movie={movie} key={movie.id}
              onMovieCardClick={e => handleMovieCardClick(e)}
              />)
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
