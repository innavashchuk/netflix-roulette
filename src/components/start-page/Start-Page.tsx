import * as React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Main from '../main/Main';
import ErrorBoundary from '../error-boundary/Error-Boundary';
import { Movie, MovieQueryParams } from '../../models/movie';
import MoviesList from '../movies-list/Movies-List';
import FilterBar from '../filter-bar/Filter-Bar';
import { SortingDirectionEnum, SortingFieldsEnum } from '../../models/enums/movies-list';
import SearchHeader from '../search-header/Search-Header';
import { useDispatch } from 'react-redux';
import { addMovieThunk } from '../../redux/thunk';
import Search from '../search/Search';

const StartPage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [movieQueryParams, setMovieQueryParams] = React.useState<MovieQueryParams>({
    sortBy: SortingFieldsEnum.rating,
    sortOrder: SortingDirectionEnum.desc,
    search: '',
    searchBy: '',
    filter: '',
    offset: '',
    limit: '24'
  });

  const handleSearchValueChange = (filter: string): void => {
    setMovieQueryParams(prev => ({
      ...prev,
      search: filter,
      searchBy: 'title'
    }));
  };

  const handleFilterChange = (filter: MovieQueryParams) => {
    setMovieQueryParams(prev => ({
      ...prev,
      sortBy: filter.sortBy,
      sortOrder: filter.sortOrder,
      searchBy: filter.searchBy,
      filter: filter.filter
    }));
  };

  const handleAddMovie = (movieRecord: Movie): void => {
    dispatch(addMovieThunk(movieRecord));
  };

  return (
    <div className="app-container">
      <ErrorBoundary>
        <div className="app-container__inner">
          <Header>
            <SearchHeader onAddMovie={handleAddMovie}>
              <Search onSearchValueChange={handleSearchValueChange} />
            </SearchHeader>
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

export default StartPage;