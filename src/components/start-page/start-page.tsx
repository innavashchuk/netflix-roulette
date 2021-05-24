import * as React from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import SearchHeader from '../search-header/search-header';
import Main from '../main/main';
import ErrorBoundary from '../error-boundary/error-boundary';
import SearchPanel from '../search-panel/search-panel';
import MoviesList from '../movies-list/movies-list';
import FilterBar from '../filter-bar/filter-bar';
import './start-page.scss';

const StartPage = (): React.ReactElement => (
    <div className="app-container">
      <ErrorBoundary>
        <div className="app-container__inner">
          <Header>
            <SearchHeader>
              <SearchPanel initialValue="" />
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

export default StartPage;
