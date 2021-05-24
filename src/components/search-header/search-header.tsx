import * as React from 'react';
import Logo from '../logo/logo';
import './search-header.scss';

export interface SearchHeaderProps {
  children: React.ReactNode
}

function SearchHeader(props: SearchHeaderProps): React.ReactElement {

  return (
    <>
    <div className="search-header">
      <div className="search-header__top">
        <Logo />
        <button className="add-movie-btn">+ ADD MOVIE</button>
      </div>
      <h1 className="search-header__title">FIND YOUR MOVIE</h1>
      {props.children}
    </div>
    </>
  );
}

export default SearchHeader;
