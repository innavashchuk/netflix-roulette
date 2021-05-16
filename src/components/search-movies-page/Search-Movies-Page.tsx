import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import SearchHeader from '../search-header/Search-Header';
import Main from '../main/Main';
import ErrorBoundary from '../error-boundary/Error-Boundary';
import {Movie} from '../../models/movie';
import MoviesList from '../movies-list/Movies-List';
import FilterBar from '../filter-bar/Filter-Bar';
import {addMovieThunk, getMoviesThunk} from '../../redux/thunk';
import Search from '../search/Search';
import useRouter from '../../hooks/use-router';
import {selectMovieQueryParams} from '../../redux/selectors';
import {MovieQueryParams, MovieQueryParamsDict} from '../../models/movie-query-params';
import {setQueryParams, setSearch} from '../../redux/actions';

const SearchMoviesPage = (): React.ReactElement => {
    const dispatch = useDispatch();
    const router = useRouter();
    const params = router.query as unknown as MovieQueryParams;
    const searchParam = params.search;
    const movieQueryParams = useSelector(selectMovieQueryParams);
    const [initialLoad, setInitialLoad] = React.useState(true);

    React.useEffect(() => {
        const queryParams = new MovieQueryParamsDict(params);
        dispatch(setQueryParams(queryParams));
        if (Object.keys(params).length > 0) {
            dispatch(getMoviesThunk(queryParams));
        }
    }, [params]);

    React.useEffect(() => {
        if (movieQueryParams && Object.keys(movieQueryParams).length > 0) {
            if (initialLoad) {
                setInitialLoad(false);
            } else {
                dispatch(getMoviesThunk(movieQueryParams));
            }
        }
    }, [movieQueryParams]);

    const handleSearchValueChange = (filter: string): void => {
        dispatch(setSearch(filter));
        router.history.push({
            pathname: '/search',
            search: `?search=${filter}`
        });
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
                            <Search onSearchValueChange={handleSearchValueChange} initialValue={searchParam || ''}/>
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
