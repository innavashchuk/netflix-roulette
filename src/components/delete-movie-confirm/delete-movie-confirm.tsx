import * as React from 'react';
import './delete-movie-confirm.scss';

interface DeleteMovieConfirmProps {
  onConfirm: () => void
}

const DeleteMovieConfirm: React.FunctionComponent<DeleteMovieConfirmProps> = (props: DeleteMovieConfirmProps) =>
  <div className="delete-movie-confirm">
    <h1>DELETE MOVIE</h1>
    <p>Are you sure you want to delete this movie?</p>
    <button className="button-primary delete-movie__btn" onClick={() => props.onConfirm()}>CONFIRM</button>
  </div>;

export default DeleteMovieConfirm;
