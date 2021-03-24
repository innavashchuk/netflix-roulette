import * as React from 'react';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import {
  FILTER_FIELDS,
  MoviesFilter,
  SortingDirectionEnum,
  SORTING_FIELDS,
} from '../../models/enums/movies-list';
import './filter-bar.scss';

export interface FilterBarProps {
  filter: MoviesFilter;
  onFilterChange: (filter: MoviesFilter | string) => void;
}

export interface FilterBarState {
  activeTabId: string;
  sortDirection: number;
}

export default class FilterBar extends React.Component<
  FilterBarProps,
  FilterBarState
> {
  constructor(props: FilterBarProps) {
    super(props);
    this.state = {
      activeTabId: FILTER_FIELDS[props.filter.filterField].key,
      sortDirection: props.filter.sortingDirection,
    };
  }

  onClickFilterItem = (event: React.BaseSyntheticEvent): void => {
    const { target } = event;
    const targetId = target && target.id;
    const { name } = target;
    this.setState({
      activeTabId: targetId,
    });
    this.props.onFilterChange({
      ...this.props.filter,
      filterField: name,
    });
  };

  onClickToggleSortDirection = (): void => {
    this.setState(
      {
        sortDirection:
          this.state.sortDirection === SortingDirectionEnum.asc
            ? SortingDirectionEnum.desc
            : SortingDirectionEnum.asc,
      },
      () => {
        this.props.onFilterChange({
          ...this.props.filter,
          sortingDirection: this.state.sortDirection,
        });
      }
    );
  };

  handleSortSelection = (event: React.BaseSyntheticEvent): void => {
    const { target } = event;
    const { value } = target;
    this.props.onFilterChange({
      ...this.props.filter,
      sortField: value,
    });
  };

  public render(): React.ReactNode {
    return (
      <div className="filter-tab">
        <div className="filter-tab__filters">
          {Object.values(FILTER_FIELDS).map((filter) => (
            <button
              className={`filter-tab__item button-dark ${
                filter.key === this.state.activeTabId ? "active" : ""
              }`}
              key={filter.key}
              id={filter.key}
              name={filter.name}
              onClick={this.onClickFilterItem}
            >
              {filter.name.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="filter-tab__sort">
          <p className="filter-tab__sort_lbl">SORT BY</p>
          <Select
            className="filter-tab__sort_btn button-dark"
            value={this.props.filter.sortField}
            onChange={this.handleSortSelection}
          >
            {Object.values(SORTING_FIELDS).map((sorter) => (
              <MenuItem
                value={sorter.name}
                className="button-dark"
                key={sorter.key}
              >
                {sorter.name.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
          <button
            className="filter-tab__sort_btn button-dark filter-tab__sort_direction"
            onClick={this.onClickToggleSortDirection}
          >
            <div
              className={`filter-tab__sort_direction_${
                SortingDirectionEnum[this.state.sortDirection]
              }`}
            />
          </button>
        </div>
      </div>
    );
  }
}
