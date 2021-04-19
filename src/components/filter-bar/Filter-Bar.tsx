import * as React from 'react';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import {
  FilterFieldEnum,
  FILTER_FIELDS,
  SortingDirectionEnum,
  SORTING_FIELDS,
} from '../../models/enums/movies-list';
import './filter-bar.scss';
import { MovieQueryParams } from '../../models/movie';
import { useEffect, useState } from 'react';

export interface FilterBarProps {
  filter: MovieQueryParams,
  onFilterChange: (filter: MovieQueryParams) => void
}

const FilterBar: React.FunctionComponent<FilterBarProps> = (props: FilterBarProps) => {
  const [activeTabId, setActiveTabId] = useState(FILTER_FIELDS[FilterFieldEnum.all].key);
  const [sortDirection, setSortDirection] = useState(props.filter.sortOrder);

  const onClickFilterItem = (event: React.BaseSyntheticEvent): void => {
    const { target } = event;
    const targetId = target && target.id;
    const { name } = target;
    setActiveTabId(targetId);
    props.onFilterChange({
      ...props.filter,
      searchBy: 'genres',
      filter: name === FilterFieldEnum.all ? '' : name
    });
  }

  const onClickToggleSortDirection = (): void => {
    setSortDirection(prevSortDirection => prevSortDirection === SortingDirectionEnum.asc
      ? SortingDirectionEnum.desc
      : SortingDirectionEnum.asc
    );
  }

  useEffect(() => {
    props.onFilterChange({
      ...props.filter,
      sortOrder: sortDirection
    });
  }, [sortDirection]);

  const handleSortSelection = (event: React.BaseSyntheticEvent): void => {
    const { target } = event;
    const { value } = target;
    props.onFilterChange({
      ...props.filter,
      sortBy: value
    });
  }

  return (
    <div className="filter-tab">
      <div className="filter-tab__filters">
        {
          Object.values(FILTER_FIELDS).map(filter =>
            <button className={`filter-tab__item button-dark ${filter.key === activeTabId ? 'active' : ''}`}
              key={filter.key}
              id={filter.key}
              name={filter.name}
              onClick={onClickFilterItem}>
              {filter.name.toUpperCase()}
            </button>
          )
        }
      </div>
      <div className="filter-tab__sort">
        <p className="filter-tab__sort_lbl">SORT BY</p>
        <Select
          className="filter-tab__sort_btn button-dark"
          value={props.filter.sortBy}
          onChange={handleSortSelection}>
          {Object.values(SORTING_FIELDS).map(sorter =>
            <MenuItem
              value={sorter.name}
              className="button-dark"
              key={sorter.key}>
              {sorter.label.toUpperCase()}
            </MenuItem>
          )}
        </Select>
        <button className="filter-tab__sort_btn button-dark filter-tab__sort_direction" onClick={onClickToggleSortDirection}>
          <div className={`filter-tab__sort_direction_${props.filter.sortOrder}`} />
        </button>
      </div>
    </div >
  );
};

export default FilterBar;

