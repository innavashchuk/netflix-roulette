import * as React from 'react';
import './delete-movie.scss';

interface DeleteMovieProps {
  onConfirm: () => void;
}

const DeleteMovie: React.FunctionComponent<DeleteMovieProps> = (
  props: DeleteMovieProps
) => (
  <div className="delete-movie">
    <h1>DELETE MOVIE</h1>
    <p>Are you sure you want to delete this movie?</p>
    <button
      className="button-primary delete-movie__btn"
      onClick={() => props.onConfirm()}
    >
      CONFIRM
    </button>
  </div>
);

export default DeleteMovie;
