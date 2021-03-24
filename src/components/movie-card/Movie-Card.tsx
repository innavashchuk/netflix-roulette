import * as React from 'react';
import { Movie } from '../../models/movie';
import * as DataService from '../../services/data-service';
import Modal from '../modal/Modal';
import './movie-card.scss';
import DeleteMovie from '../delete-movie/Delete-Movie';
import MovieDetailsForm from '../movie-details-form/Movie-Details-Form';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export interface MovieCardProps {
  movie: Movie,
  onMovieCardClick: (id: number) => void
}

interface MovieCardState {
  movie: Movie,
  isMenuVisible: boolean,
  isModalVisible: boolean,
  shouldDeleteMovie: boolean
}

const DEFAULT_SRC = '';

export default class MovieCard extends React.Component<MovieCardProps, MovieCardState>{
  static defaultProps: { movie: Movie };

  constructor(props: MovieCardProps) {
    super(props);
    this.state = {
      movie: props.movie,
      isMenuVisible: false,
      isModalVisible: false,
      shouldDeleteMovie: false
    }
  }

  toggleMenuVisible(value: boolean): void {
    this.setState({
      isMenuVisible: value
    })
  }

  toggleModalVisible(value: boolean): void {
    this.setState({
      isModalVisible: value
    })
  }

  onClickMenuBtn = (e: React.SyntheticEvent): void => {
    this.toggleMenuVisible(true);
    e.stopPropagation();
  }

  onClickCloseMenuBtn = (e: React.BaseSyntheticEvent): void => {
    this.toggleMenuVisible(false);
    e.stopPropagation();
  }

  onClickEditMenuBtn = (e: React.BaseSyntheticEvent): void => {
    e.stopPropagation();
    this.toggleMenuVisible(false);
    this.toggleModalVisible(true);
  }

  onClickDeleteMenuBtn = (e: React.BaseSyntheticEvent): void => {
    e.stopPropagation();
    this.toggleMenuVisible(false);
    this.toggleModalVisible(true);
    this.setState({
      shouldDeleteMovie: true
    });
  }

  handleMovieDelete = (): void => {
    this.toggleModalVisible(false);
    this.setState({
      shouldDeleteMovie: false
    });
    DataService.deleteMovie(this.state.movie.id);
  }

  onModalClose = (): void => {
    this.toggleModalVisible(false);
  }

  handleFormSubmit = (movieRecord: Movie): void => {
    this.toggleModalVisible(false);
    DataService.updateMovie(movieRecord);
  }

  handleMovieCardClick = (e: React.BaseSyntheticEvent): void => {
    const { target } = e;
    if (this.state.isModalVisible || target.id === 'menu-button') {
      return;
    }
    this.props.onMovieCardClick(this.state.movie.id);
  }

  addDefaultSrc = (event: React.BaseSyntheticEvent): void => {
    event.target.src = DEFAULT_SRC;
  };

  render(): React.ReactElement {
    const { movie } = this.state;
    return (
      <div className="movie-card" key={movie.id} onClick={this.handleMovieCardClick}>
        <img className="movie-image"
          src={movie.poster_path }
          alt="poster"
          onError={this.addDefaultSrc}
          />
        <div className="movie-info">
          <p className="movie-title">{movie.title}</p>
          <p>{movie.genres.sort().join(', ')}</p>
          <p className="movie-release-date">{new Date(movie.release_date).getFullYear()}</p>
        </div>
        <button className="menu-button" id="menu-button" onClick={this.onClickMenuBtn}>
          <MoreVertIcon fontSize="large" />
        </button>
        {
          this.state.isMenuVisible
          && <div className="menu-display">
            <button className="menu-display__close button-dark" onClick={this.onClickCloseMenuBtn}>
              <CloseIcon fontSize="small" />
            </button>
            <button className="button-dark" onClick={this.onClickEditMenuBtn}>Edit</button>
            <button className="button-dark" onClick={this.onClickDeleteMenuBtn}>Delete</button>
          </div>
        }
        {
          this.state.isModalVisible
          && <Modal onModalClose={this.onModalClose}>
            {
              this.state.shouldDeleteMovie
              ? <DeleteMovie onConfirm={this.handleMovieDelete} />
              : <MovieDetailsForm movieRecord={this.state.movie} isEdit onFormSubmit={this.handleFormSubmit} />
            }
          </Modal>
        }
      </div>
    )
  }
}

MovieCard.defaultProps = {
  movie: {
    'id': 1,
    'title': 'No Title Provided',
    'tagline': 'No tagline provided',
    'vote_average': 0,
    'vote_count': 0,
    'release_date': '01-01-2021',
    'poster_path': '',
    'overview': 'No overview provided',
    'budget': 0,
    'revenue': 0,
    'genres': ['No genre'],
    'runtime': 0
  }
}
