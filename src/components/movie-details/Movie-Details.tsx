import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortingDirectionEnum, SortingFieldsEnum } from '../../models/enums/movies-list';
import { MovieQueryParams } from '../../models/movie';
import { setMovie } from '../../redux/actions';
import { selectMovie, selectMovieId } from '../../redux/selectors';
import { getMoviesThunk } from '../../redux/thunk';
import ErrorBoundary from '../error-boundary/Error-Boundary';
import FilterBar from '../filter-bar/Filter-Bar';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Main from '../main/Main';
import MovieInfoHeader from '../movie-info-header/Movie-Info-Header';
import MoviesList from '../movies-list/Movies-List';

export default function MovieDetails(): React.ReactElement {
  const selectedMovie = useSelector(selectMovie);
  const selectedMovieId = useSelector(selectMovieId);
  const dispatch = useDispatch();
  const [movieQueryParams, setMovieQueryParams] = React.useState<MovieQueryParams>({
    sortBy: SortingFieldsEnum.rating,
    sortOrder: SortingDirectionEnum.desc,
    search: '',
    searchBy: 'genres',
    filter: '',
    offset: '',
    limit: '24'
  });

  React.useEffect(() => {
    if (!selectedMovieId) {
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setMovieQueryParams(prev => ({
      ...prev,
      searchBy: 'genres',
      filter: selectedMovie.genres.join(', ') || ''
    }));
    dispatch(getMoviesThunk(movieQueryParams));
  }, [selectedMovieId]);

  const handleFilterChange = (filter: MovieQueryParams) => {
    const filterGenre = filter.filter;
    let filteredGenres: string[] = [];
    if (selectedMovie && selectedMovie.genres) {
      if (filterGenre) {
        filteredGenres = Array.from(new Set([...selectedMovie.genres, ...filterGenre.split(', ')]));
      } else {
        filteredGenres = [...selectedMovie.genres];
      }
    }
    setMovieQueryParams(prev => ({
      ...prev,
      sortBy: filter.sortBy,
      sortOrder: filter.sortOrder,
      searchBy: 'genres',
      filter: filteredGenres.join(', ')
    }));
    dispatch(getMoviesThunk(movieQueryParams));
  };

  return (
    <div className="app-container">
      <ErrorBoundary>
        <div className="app-container__inner">
          <Header>
            {
              selectedMovie && <MovieInfoHeader movie={selectedMovie} onSearchClick={() => dispatch(setMovie(null))} />
            }
          </Header>
          <Main>
            <FilterBar filter={movieQueryParams} onFilterChange={handleFilterChange} />
            <MoviesList movieQueryParams={movieQueryParams} />
          </Main>
        </div>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

