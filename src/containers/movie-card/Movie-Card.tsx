import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Movie } from '../../models/interfaces/movie';
import './movie-card.scss';

export interface MovieCardProps {
  movie: Movie
}

interface MovieCardState {
  movie: Movie,
  isMenuVisible: boolean
}

export default class MovieCard extends React.Component<MovieCardProps, MovieCardState>{
  constructor(props: MovieCardProps) {
    super(props);
    this.state = {
      movie: props.movie,
      isMenuVisible: false
    }
  }

  toggleMenuVisible(value: boolean): void {
    this.setState({
      isMenuVisible: value
    })
  }

  onClickMenuBtn = (): void => {
    this.toggleMenuVisible(true);
  }

  onClickCloseMenuBtn = (): void => {
    this.toggleMenuVisible(false);
  }

  onClickEditMenuBtn = (): void => {
    this.toggleMenuVisible(false);
  }

  onClickDeleteMenuBtn = (): void => {
    this.toggleMenuVisible(false);
  }

  render(): React.ReactElement {
    const {movie} = this.state;
    return (
      <div className="movie-card" key={movie.id}>
        <img className="movie-image" src={movie.poster_path} alt="poster" />
        <div className="movie-info">
          <p className="movie-title">{movie.title}</p>
          <p>{movie.genres.join(', ')}</p>
          <p className="movie-release-date">{new Date(movie.release_date).getFullYear()}</p>
        </div>
        <button className="menu-button" onClick={this.onClickMenuBtn}>
          <span className="menu-button__dot" />
          <span className="menu-button__dot" />
          <span className="menu-button__dot" />
        </button>
        {
          this.state.isMenuVisible
          && <div className="menu-display">
            <button className="menu-display__close button-dark" onClick={this.onClickCloseMenuBtn}>x</button>
            <button className="button-dark" onClick={this.onClickEditMenuBtn}>Edit</button>
            <button className="button-dark" onClick={this.onClickDeleteMenuBtn}>Delete</button>
          </div>
        }
      </div>
    )
  }
}
