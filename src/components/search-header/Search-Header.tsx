import * as React from 'react';
import Logo from '../logo/Logo';
import './search-header.scss';
import { Movie, MovieRecord } from '../../models/movie';
import Modal from '../modal/Modal';
import MovieDetailsForm from '../movie-details-form/Movie-Details-Form';
import useToggle from '../../hooks/use-toggle';
import { InitialMovieRecord, InitialMovieValues } from '../../models/initial-movie-record';

export interface SearchHeaderProps {
  children: React.ReactNode,
  onAddMovie: (movieRecord: Movie) => void
}

function SearchHeader(props: SearchHeaderProps): React.ReactElement {
  const [isModalVisible, toggleIsModalVisible] = useToggle();
  const [movie, setMovie] = React.useState(null);

  const onModalClose = (): void => {
    toggleIsModalVisible();
  }

  const handleAddClick = (): void => {
    setMovie(new InitialMovieRecord());
    toggleIsModalVisible();
  }

  const handleFormSubmit = (movieRecord: InitialMovieValues): void => {
    props.onAddMovie(new MovieRecord(movieRecord));
    toggleIsModalVisible();
  }

  return (
      <>
        <div className="search-header">
          <div className="search-header__top">
            <Logo />
            <button className="add-movie-btn" onClick={handleAddClick}>+ ADD MOVIE</button>
          </div>
          <h1 className="search-header__title">FIND YOUR MOVIE</h1>
          {props.children}
        </div>
        {
          isModalVisible
          && <Modal onModalClose={onModalClose}>
            <MovieDetailsForm movieRecord={movie} isEdit={false} onFormSubmit={handleFormSubmit} />
          </Modal>
        }
      </>
  );
}

export default SearchHeader;
