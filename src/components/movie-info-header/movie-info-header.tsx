import * as React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Movie } from '../../models/movie';
import Logo from '../logo/logo';
import './movie-info-header.scss';

const DEFAULT_SRC = '../../assets/images/no-image.png';

interface MovieInfoHeaderProps {
  movie: Movie,
  onSearchClick: () => void
}

const MovieInfoHeader: React.FunctionComponent<MovieInfoHeaderProps> = ({ movie, onSearchClick }: MovieInfoHeaderProps): React.ReactElement => {
  const addDefaultSrc = (event: React.BaseSyntheticEvent) => {
    event.target.src = DEFAULT_SRC;
  };

  return movie &&
    <div className="movie-info-header">
      <div className="movie-info-header__top">
        <Logo />
        <button className="search-button" onClick={onSearchClick}>
          <SearchIcon className="search-button__icon" />
        </button>
      </div>
      <div className="movie-info-header__container">
        <img src={movie.poster_path || DEFAULT_SRC} alt={`${movie.title} poster`}
        className="movie-info__poster"
        onError={e => addDefaultSrc(e)}
        />
        <div className="movie-info">
          <div className="movie-info__title">
            <h1 className="movie-info__movie_title">{movie.title}</h1>
            <div className="movie-info__rating">{movie.vote_average}</div>
          </div>
          <p>{movie.genres.sort().join(', ')}</p>
          <div className="movie-info__line">
            <p>{new Date(movie.release_date).getFullYear()}</p>
            <p>{`${movie.runtime} min`}</p>
          </div>
          <p>{movie.overview}</p>
        </div>
      </div>

    </div>;
};

export default MovieInfoHeader;
