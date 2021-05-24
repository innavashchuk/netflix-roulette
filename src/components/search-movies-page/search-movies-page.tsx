import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../footer/footer';
import Header from '../header/header';
import SearchHeader from '../search-header/search-header';
import Main from '../main/main';
import ErrorBoundary from '../error-boundary/error-boundary';
import SearchPanel from '../search-panel/search-panel';
import MoviesList from '../movies-list/movies-list';
import FilterBar from '../filter-bar/filter-bar';
import useRouter from '../../hooks/use-router';
import { MovieQueryParams } from '../../models/movie-query-params';
import { getMovies } from '../../redux/actions';
import { selectMovieQueryParams } from '../../redux/selectors';

import './search-movies-page.scss';

const SearchMoviesPage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = router.query as unknown as MovieQueryParams;
  const searchParam = params.search;
  const movieQueryParams = useSelector(selectMovieQueryParams);
  if (movieQueryParams && Object.keys(movieQueryParams).length > 0) {
    dispatch(getMovies(movieQueryParams));
  }

  return (
    <div className="app-container">
      <ErrorBoundary>
        <div className="app-container__inner">
          <Header>
            <SearchHeader>
              <SearchPanel initialValue={searchParam} />
            </SearchHeader>
          </Header>
          <Main>
            <FilterBar />
            <MoviesList />
          </Main>
        </div>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default SearchMoviesPage;
