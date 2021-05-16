import * as React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import SearchHeader from '../search-header/Search-Header';
import Main from '../main/Main';
import ErrorBoundary from '../error-boundary/Error-Boundary';
import Search from '../search/Search';
import MoviesList from '../movies-list/Movies-List';
import FilterBar from '../filter-bar/Filter-Bar';
import './start-page.scss';

const StartPage = (): React.ReactElement => (
    <div className="app-container">
        <ErrorBoundary>
            <div className="app-container__inner">
                <Header>
                    <SearchHeader>
                        <Search initialValue=""/>
                    </SearchHeader>
                </Header>
                <Main>
                    <FilterBar/>
                    <MoviesList/>
                </Main>
            </div>
        </ErrorBoundary>
        <Footer/>
    </div>
);

export default StartPage;
