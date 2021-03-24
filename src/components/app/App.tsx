import * as React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import SearchHeader from '../search-header/Search-Header';
import Search from '../search/Search';
import MoviesList from '../movies-list/Movies-List';
import ErrorBoundary from '../error-boundary/Error-Boundary';
import Main from '../main/Main';
import './app.scss';
import { Movie } from '../../models/movie';
import {
  FilterFieldEnum,
  MoviesFilter,
  SortingDirectionEnum,
  SortingFieldsEnum,
} from '../../models/enums/movies-list';
import * as DataService from '../../services/data-service';
import MovieInfoHeader from '../movie-info-header/Movie-Info-Header';

export interface AppState {
  filter: MoviesFilter;
  movies: Movie[];
  selectedMovie: Movie;
  displaySelectedMovie: boolean;
}

class App extends React.Component<Record<string, unknown>, AppState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      filter: {
        filterField: FilterFieldEnum.all,
        searchValue: '',
        sortingDirection: SortingDirectionEnum.asc,
        sortField: SortingFieldsEnum.releaseDate,
      },
      movies: [],
      selectedMovie: null,
      displaySelectedMovie: false
    };
  }

  componentDidMount(): void {
    this.setState({
      movies: DataService.filterMovies(this.state.filter),
    });
  }

  shouldComponentUpdate(prevProps: undefined, prevState: AppState): boolean {
    console.log('shouldComponentUpdate works');
    return true;
  }

  handleFilterChange = (filter: MoviesFilter | string): void => {
    if (typeof filter === 'string' || !filter) {
      this.setState(
        {
          filter: {
            ...this.state.filter,
            searchValue: (filter as string) || '',
          },
        },
        this.updateMovies
      );
      return;
    }

    this.setState(
      {
        filter: {
          ...filter,
        },
      },
      this.updateMovies
    );
  };

  updateMovies = (): void => {
    this.setState({
      movies: DataService.filterMovies(this.state.filter),
    });
  };

  handleMovieCardClick = (id: number): void => {
    if (!id) {
      return;
    }
    this.setState(
      {
        selectedMovie: DataService.getMovieCardById(id),
        displaySelectedMovie: true,
      },
      () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    );
  };

  handleAddMovie = (movieRecord: Movie): void => {
    if (!movieRecord) {
      return;
    }
    DataService.addMovie(movieRecord);
    this.updateMovies();
  };

  handleSearchButtonClick = (): void => {
    this.setState({
      selectedMovie: null,
      displaySelectedMovie: false,
    });
  };

  render(): React.ReactElement {
    return (
      <div className="app-container">
        <ErrorBoundary>
          <div className="app-container__inner">
            <Header>
              {this.state.displaySelectedMovie ? (
                <MovieInfoHeader
                  movie={this.state.selectedMovie}
                  onSearchClick={this.handleSearchButtonClick}
                />
              ) : (
                <SearchHeader onAddMovie={this.handleAddMovie}>
                  <Search onSearchValueChange={this.handleFilterChange} />
                </SearchHeader>
              )}
            </Header>
            <Main
              filter={this.state.filter}
              onFilterChange={this.handleFilterChange}
            >
              <MoviesList
                moviesList={this.state.movies}
                onMovieCardClick={this.handleMovieCardClick}
              />
            </Main>
          </div>
        </ErrorBoundary>
        <Footer />
      </div>
    );
  }
}

export default App;
