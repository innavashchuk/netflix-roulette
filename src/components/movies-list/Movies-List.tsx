import * as React from 'react';
import './movies-list.scss';
import MovieCard from '../movie-card/Movie-Card';
import { Movie, MovieQueryParams } from '../../models/movie';
import { useCallback } from 'react';
import useFetch from '../../hooks/use-fetch';

export interface MoviesListProps {
  onMovieCardClick: (id: number) => void,
  movieQueryParams: MovieQueryParams
}

function MoviesList({ onMovieCardClick, movieQueryParams }: MoviesListProps): React.ReactElement {
  const [url, setUrl] = React.useState('');
  const [init, setInit] = React.useState(null);
  const [status, moviesList] = useFetch<Array<Movie>>({ url, init });

  React.useEffect(() => {
    setUrl(`http://localhost:4000/movies?${new URLSearchParams(movieQueryParams)}`);
    setInit({
      method: 'GET'
    });
  }, [movieQueryParams]);

  const handleMovieCardClick = useCallback(
    (id: number) => {
      onMovieCardClick(id)
    }, [moviesList]
  );

  return (
    Array.isArray(moviesList) && moviesList.length !== 0
      ? <>
        <p className="movies-total">
          <span className="movies-total__count">{moviesList.length}</span> movies found.
            </p>
        <div className="movies-list">
          {
            moviesList.map(movie => <MovieCard movie={movie} key={movie.id}
              onMovieCardClick={e => handleMovieCardClick(e)}
              />)
          }
        </div>
      </>
      : <div className="movies-not-found-message">
        <p>No Movies Found</p>
      </div>
    );
}

export default MoviesList;