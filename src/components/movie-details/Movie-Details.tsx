import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FilterFieldEnum, SortingDirectionEnum, SortingFieldsEnum} from '../../models/enums/movies-list';
import {selectMovie, selectMovieId, selectMovieNotFound, selectMovieQueryParams} from '../../redux/selectors';
import {getMoviesThunk, getMovieThunk} from '../../redux/thunk';
import ErrorBoundary from '../error-boundary/Error-Boundary';
import FilterBar from '../filter-bar/Filter-Bar';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Main from '../main/Main';
import MovieInfoHeader from '../movie-info-header/Movie-Info-Header';
import MoviesList from '../movies-list/Movies-List';
import useRouter from '../../hooks/use-router';
import {setFilter, setMovieNotFound, setMovies, setQueryParams} from '../../redux/actions';
import {MovieQueryParamsDict} from '../../models/movie-query-params';

export default function MovieDetails(): React.ReactElement {
    const router = useRouter();
    const dispatch = useDispatch();
    const movieId = router.query.id as number;
    const selectedMovie = useSelector(selectMovie);
    const selectedMovieId = useSelector(selectMovieId);
    const movieNotFound = useSelector(selectMovieNotFound);
    const movieQueryParams = useSelector(selectMovieQueryParams);

    React.useEffect(() => {
        if (!movieId) {
            return;
        }
        dispatch(setQueryParams(new MovieQueryParamsDict({
            sortBy: SortingFieldsEnum.rating,
            sortOrder: SortingDirectionEnum.desc,
            search: '',
            searchBy: 'genres',
            filter: FilterFieldEnum.all,
            offset: '',
            limit: '24'
        })));
        dispatch(getMovieThunk(movieId));
    }, [movieId]);

    React.useEffect(() => {
        if (!movieNotFound) {
            return;
        }
        dispatch(setMovieNotFound(false));
        dispatch(setQueryParams(null));
        router.history.push('/error');
    }, [movieNotFound]);

    React.useEffect(() => {
        if (!selectedMovieId) {
            return;
        }
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        dispatch(setFilter(selectedMovie.genres.join(', ') || ''));
    }, [selectedMovieId]);

    React.useEffect(() => {
        if (movieQueryParams) {
            dispatch(getMoviesThunk(movieQueryParams));
        }
    }, [movieQueryParams]);

    const onFilterChange = (filter: string) => {
        let filteredGenres: string[] = [];
        if (selectedMovie && selectedMovie.genres) {
            if (filter) {
                filteredGenres = Array.from(new Set([...selectedMovie.genres, ...filter.split(', ')]));
            } else {
                filteredGenres = [...selectedMovie.genres];
            }
        }
        dispatch(setFilter(filteredGenres.join(', ')));
    };

    const onSearchClick = (): void => {
        dispatch(setMovies([]));
        dispatch(setQueryParams(null));
        router.history.push('/');
    };

    return (
        <div className="app-container">
            <ErrorBoundary>
                <div className="app-container__inner">
                    <Header>
                        {
                            selectedMovie && <MovieInfoHeader movie={selectedMovie} onSearchClick={onSearchClick}/>
                        }
                    </Header>
                    <Main>
                        <FilterBar onFilterChange={onFilterChange} notEmpty/>
                        <MoviesList/>
                    </Main>
                </div>
            </ErrorBoundary>
            <Footer/>
        </div>
    );
};
