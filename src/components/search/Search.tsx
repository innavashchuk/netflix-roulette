import * as React from 'react';
import './search.scss';

function Search(): React.ReactElement {
  return (
    <div className="search">
      <input type="text" className="search__input" placeholder="What do you want to watch?" />
      <button className="search__button button-primary">Search</button>
    </div>
  );
}

export default Search;
