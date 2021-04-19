import * as React from 'react';
import MovieDetails from '../movie-details/Movie-Details';
import StartPage from '../start-page/Start-Page';
import { useSelector } from 'react-redux';
import { CustomAlert } from '../custom-alert/Custom-Alert';
import { selectMovie } from '../../redux/selectors';

const App: React.FunctionComponent<Record<string, unknown>> = () => {
  const selectedMovie = useSelector(selectMovie);

  return (
    <>
    <CustomAlert />
    {
      selectedMovie
      ? <MovieDetails />
      : <StartPage />
    }
    </>
  );
};

export default App;