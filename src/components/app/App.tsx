import * as React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import './app.scss';
import MovieDetails from '../movie-details/movie-details';
import StartPage from '../start-page/start-page';

const App: React.FunctionComponent<Record<string, unknown>> = () => {
  const [selectedMovieId, setSelectedMovieId] = React.useState(0);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');

  const handleMovieCardClick = (id: number): void => {
    setSelectedMovieId(id);
  };

  const handleClickSearch = (): void => {
    setSelectedMovieId(0);
  };

  const handleAlertClose = (): void => {
    setShowAlert(false);
  };

  return (
    <>
    {
      showAlert
      && <Alert onClose={() => handleAlertClose()}>
        <AlertTitle>componentDidUpdate worked!</AlertTitle>
        {alertText}
      </Alert>
    }
    {
      selectedMovieId !== 0
      ? <MovieDetails movieId={selectedMovieId} onClickSearch={handleClickSearch} onClickMovieCard={handleMovieCardClick} />
      : <StartPage onClickMovieCard={handleMovieCardClick} />
    }
    </>
  );
};

export default App;
