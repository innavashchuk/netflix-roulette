import * as React from 'react';
import { useState } from 'react';
import useFetch from '../../hooks/use-fetch';
import { SortingDirectionEnum, SortingFieldsEnum } from '../../models/enums/movies-list';
import { Movie, MovieQueryParams } from '../../models/movie';
import ErrorBoundary from '../error-boundary/Error-Boundary';
import FilterBar from '../filter-bar/Filter-Bar';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Main from '../main/Main';
import MovieInfoHeader from '../movie-info-header/Movie-Info-Header';
import MoviesList from '../movies-list/Movies-List';

interface MovieDetailsProps {
  movieId: number,
  onClickSearch: () => void,
  onClickMovieCard: (id: number) => void
}

export default function MovieDetails({ movieId, onClickSearch, onClickMovieCard }: MovieDetailsProps): React.ReactElement {
  const [movieUrl, setMovieUrl] = React.useState('');
  const [movieInit, setMovieInit] = useState(null);
  const [movieRequestStatus, selectedMovie] = useFetch<Movie>({ url: movieUrl, init: movieInit });
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
    if (!selectedMovie || selectedMovie && movieId !== selectedMovie.id) {
      setMovieUrl(`http://localhost:4000/movies/${movieId}`);
      setMovieInit({
        method: 'GET'
      });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [movieId]);
  React.useEffect(() => {
    if (selectedMovie) {
      setMovieQueryParams(prev => ({
        ...prev,
        searchBy: 'genres',
        filter: selectedMovie.genres.join(', ') || ''
      }));
    }
  }, [selectedMovie]);

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
  };

  return (
    <div className="app-container">
      <ErrorBoundary>
        <div className="app-container__inner">
          <Header>
            {
              selectedMovie
                ? <MovieInfoHeader movie={selectedMovie} onSearchClick={onClickSearch} />
                : <div>Loading...</div>
            }
          </Header>
          <Main>
            <FilterBar filter={movieQueryParams} onFilterChange={handleFilterChange} />
            <MoviesList onMovieCardClick={onClickMovieCard} movieQueryParams={movieQueryParams} />
          </Main>
        </div>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

