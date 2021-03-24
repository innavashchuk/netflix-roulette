import * as React from 'react';
import { MoviesFilter } from '../../models/enums/movies-list';
import './search.scss';

export interface SearchPanelProps {
  onSearchValueChange: (filter: MoviesFilter | string) => void;
}

function Search(props: SearchPanelProps): React.ReactElement {
  let searchValue = '';

  const handleSearchValueChange = (e: React.BaseSyntheticEvent): void => {
    const { target } = e;
    const { value } = target;
    searchValue = value;
  };

  const handleSearchValueSubmit = (e: React.BaseSyntheticEvent): void => {
    props.onSearchValueChange(searchValue);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent): void => {
    const { key } = e;
    if (key === 'Enter') {
      props.onSearchValueChange(searchValue);
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        defaultValue=""
        placeholder="What do you want to watch?"
        onChange={(e) => handleSearchValueChange(e)}
        onKeyPress={(e) => handleSearchKeyPress(e)}
      />
      <button
        className="search__button button-primary"
        onClick={(e) => handleSearchValueSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
