import * as React from 'react';
import { FilterFieldEnum, SortingFieldsEnum } from '../../models/enums/movies-list';
import MoviesList from '../movies-list/Movies-List';
import { MOVIES } from '../../data/movies';
import FilterBar from '../filter-bar/Filter-Bar';
import './main.scss';

export interface MainProps {
  searchValue: string
}

export interface MainState {
  filterField: FilterFieldEnum,
  sortField: SortingFieldsEnum,
  searchValue: string
}

export default class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);

    this.state = {
      filterField: FilterFieldEnum.all,
      sortField: SortingFieldsEnum.releaseDate,
      searchValue: props.searchValue
    }
  }

  public render(): React.ReactElement {
    const movies = Array.isArray(MOVIES) && MOVIES.filter(
      movie => !this.state.searchValue || movie.title?.toLowerCase().includes(this.state.searchValue.toLocaleLowerCase())
    ) || [];
    return (
      <main className="main-container">
        <FilterBar filterField={this.state.filterField} sortField={this.state.sortField} />
        <MoviesList moviesList={movies} />
      </main>
    );
  }
}
