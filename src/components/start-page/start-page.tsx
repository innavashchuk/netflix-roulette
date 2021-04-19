import * as React from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import Main from '../main/main';
import ErrorBoundary from '../error-boundary/error-boundary';
import { Movie, MovieQueryParams } from '../../models/movie';
import MoviesList from '../movies-list/movies-list';
import FilterBar from '../filter-bar/filter-bar';
import { SortingDirectionEnum, SortingFieldsEnum } from '../../models/enums/movies-list';
import SearchHeader from '../search-header/Search-Header';
import Search from '../search/Search';

export interface StartPageProps {
  onClickMovieCard: (id: number) => void
}

const StartPage = ({ onClickMovieCard }: StartPageProps): React.ReactElement => {
  
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
            <MoviesList movieQueryParams={movieQueryParams} onMovieCardClick={onClickMovieCard} />
          </Main>
        </div>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default StartPage;
