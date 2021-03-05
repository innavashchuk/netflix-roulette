import * as React from 'react';
import Search from '../../components/search/Search';
import Logo from '../../components/logo/Logo';
import './search-header.scss';

function SearchHeader(): React.ReactElement {
  return (
    <div className="search-header">
      <div className="search-header__top">
        <Logo />
        <button className="add-movie-btn">+ ADD MOVIE</button>
      </div>
      <h1 className="search-header__title">FIND YOUR MOVIE</h1>
      <Search />
    </div>
  );
}

export default SearchHeader;
