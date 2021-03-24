import * as React from 'react';
import Logo from '../logo/Logo';
import './search-header.scss';
import { Movie, MovieRecord } from '../../models/movie';
import Modal from '../modal/Modal';
import MovieDetailsForm from '../movie-details-form/Movie-Details-Form';

export interface SearchHeaderProps {
  children: React.ReactNode,
  onAddMovie: (movieRecord: Movie) => void
}

function SearchHeader(props: SearchHeaderProps): React.ReactElement {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [movie, setMovie] = React.useState(null);

  const onModalClose = (): void => {
    setIsModalVisible(false);
  }

  const handleAddClick = (): void => {
    setMovie(new MovieRecord());
    setIsModalVisible(true);
  }

  const handleFormSubmit = (movieRecord: Movie): void => {
    props.onAddMovie(movieRecord);
    setIsModalVisible(false);
  }

  return (
    <>
    <div className="search-header">
      <div className="search-header__top">
        <Logo />
        <button className="add-movie-btn" onClick={() => handleAddClick()}>+ ADD MOVIE</button>
      </div>
      <h1 className="search-header__title">FIND YOUR MOVIE</h1>
      {props.children}
    </div>
    {
        isModalVisible
        && <Modal onModalClose={() => onModalClose()}>
          <MovieDetailsForm movieRecord={movie} isEdit={false} onFormSubmit={e => handleFormSubmit(e)} />
        </Modal>
      }
    </>
  );
}

export default SearchHeader;