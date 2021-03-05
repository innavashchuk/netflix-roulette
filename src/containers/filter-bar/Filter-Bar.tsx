import * as React from 'react';
import { FilterFieldEnum, FILTER_FIELDS, SortingDirectionEnum, SortingFieldsEnum, SORTING_FIELDS } from '../../models/enums/movies-list';
import './filter-bar.scss';

export interface FilterBarProps {
  filterField: FilterFieldEnum,
  sortField: SortingFieldsEnum
}

export interface FilterBarState {
  filterField?: FilterFieldEnum,
  sortField?: SortingFieldsEnum,
  activeTabId: string,
  sortDirection: SortingDirectionEnum
}

export default class FilterBar extends React.Component<FilterBarProps, FilterBarState> {
  constructor(props: FilterBarProps) {
    super(props);
    this.state = {
      activeTabId: FILTER_FIELDS[props.filterField].key,
      sortDirection: SortingDirectionEnum.desc
    }
  }

  onClickFilterItem = (event: React.BaseSyntheticEvent): void => {
    const { target } = event;
    const targetId = target && target.id;
    this.setState({
      activeTabId: targetId
    });
  }

  onClickToggleSortDirection = (): void => {
    this.setState({
      sortDirection: this.state.sortDirection === SortingDirectionEnum.asc
        ? SortingDirectionEnum.desc
        : SortingDirectionEnum.asc
    });
  }

  public render(): React.ReactNode {
    return (
      <div className="filter-tab">
        <div className="filter-tab__filters">
          {
            Object.values(FILTER_FIELDS).map(filter => 
              <button className={`filter-tab__item button-dark ${filter.key === this.state.activeTabId ? 'active' : ''}`}
                key={filter.key}
                id={filter.key}
                onClick={this.onClickFilterItem}>
                {filter.name.toUpperCase()}
              </button>
            )
          }
        </div>
        <div className="filter-tab__sort">
          <p className="filter-tab__sort_lbl">SORT BY</p>
          <select className="filter-tab__sort_btn button-dark" defaultValue={this.state.sortField}>
            {Object.values(SORTING_FIELDS).map(sorter => 
              <option
                value={sorter.name}
                className="button-dark"
                key={sorter.key}>
                {sorter.name.toUpperCase()}
              </option>
            )}
          </select>
          <button className="filter-tab__sort_btn button-dark" onClick={this.onClickToggleSortDirection}>
            <div className={`filter-tab__sort_direction_${this.state.sortDirection}`} />
          </button>
        </div>
      </div>
    );
  }
}
