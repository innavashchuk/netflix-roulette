import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterFieldEnum, FILTER_FIELDS, SortingDirectionEnum, SortingFieldsEnum, SORTING_FIELDS } from '../../models/enums/movies-list';
import { setFilter, setSortBy, setSortOrder } from '../../redux/actions';
import { selectFilterParam, selectSortOrderParam } from '../../redux/selectors';
import './filter-bar.scss';

export interface FilterBarProps {
  onFilterChange?: (filter: string) => void,
  notEmpty?: boolean
}
const FilterBar: React.FunctionComponent<FilterBarProps> = (props: FilterBarProps) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilterParam);
  const sortOrder = useSelector(selectSortOrderParam) || SortingDirectionEnum.desc;
  const defaultSortBy = props.notEmpty ? SortingFieldsEnum.rating : '';
  const filterKey = filter && FILTER_FIELDS[filter] && FILTER_FIELDS[filter].key || props.notEmpty ? FILTER_FIELDS[FilterFieldEnum.all].key : '';
  const [activeTabId, setActiveTabId] = useState(filterKey || '');
  const [sortDirection, setSortDirection] = useState(sortOrder);

  const onClickFilterItem = (event: React.BaseSyntheticEvent): void => {
    const { target } = event;
    const targetId = target && target.id;
    const { name } = target;
    setActiveTabId(targetId);
    const filterName = name === FilterFieldEnum.all ? '' : name;
    if (props.onFilterChange) {
      props.onFilterChange(filterName);
      return;
    }
    dispatch(setFilter(filterName));
  };

  const onClickToggleSortDirection = (): void => {
    setSortDirection(prevSortDirection => prevSortDirection === SortingDirectionEnum.asc
      ? SortingDirectionEnum.desc
      : SortingDirectionEnum.asc
    );
  }

  useEffect(() => {
    if (sortDirection && sortDirection !== sortOrder) {
      dispatch(setSortOrder(sortDirection));
    }
  }, [sortDirection]);

  const handleSortSelection = (event: React.BaseSyntheticEvent): void => {
    const { target } = event;
    const { value } = target;
    dispatch(setSortBy(value));
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
          defaultValue={defaultSortBy}
          displayEmpty
          onChange={handleSortSelection}>
          <MenuItem value="" className="button-dark" disabled>
            Select...
          </MenuItem>
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
          <div className={`filter-tab__sort_direction_${sortOrder}`} />
        </button>
      </div>
    </div >
  );
};

export default FilterBar;

