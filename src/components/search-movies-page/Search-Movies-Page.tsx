import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import SearchHeader from '../search-header/Search-Header';
import Main from '../main/Main';
import ErrorBoundary from '../error-boundary/Error-Boundary';
import MoviesList from '../movies-list/Movies-List';
import FilterBar from '../filter-bar/Filter-Bar';
import Search from '../search/Search';
import useRouter from '../../hooks/use-router';
import {selectMovieQueryParams} from '../../redux/selectors';
import {MovieQueryParams} from '../../models/movie-query-params';
import {getMovies} from '../../services/data-service';

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
                            <Search initialValue={searchParam}/>
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
};

export default SearchMoviesPage;
