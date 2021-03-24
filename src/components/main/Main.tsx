import * as React from 'react';
import { MoviesFilter } from '../../models/enums/movies-list';
import FilterBar from '../filter-bar/Filter-Bar';
import './main.scss';

export interface MainProps {
  children: React.ReactNode,
  filter: MoviesFilter,
  onFilterChange: (filter: MoviesFilter | string) => void
}

export default class Main extends React.Component<MainProps, Record<string, unknown>> {
  
  handleFilterChange = (filter: MoviesFilter): void => {
    this.props.onFilterChange(filter);
  }

  public render(): React.ReactElement {
    return (
      <main className="main-container">
        <FilterBar filter={this.props.filter} onFilterChange={this.handleFilterChange} />
        {this.props.children}
      </main>
    );
  }
}

