import * as React from 'react';
import './search-panel.scss';

export interface SearchPanelProps {
  initialValue: string
}

function SearchPanel(props: SearchPanelProps): React.ReactElement {
  let searchValue = props.initialValue || '';

  const handleSearchValueChange = (e: React.BaseSyntheticEvent): void => {
    const { target } = e;
    const { value } = target;
    searchValue = value;
  }
  return (
    <div className="search-panel">
      <input
        type="text"
        id="search-panel__input"
        className="search-panel__input"
        defaultValue={searchValue}
        placeholder="What do you want to watch?"
        onChange={e => handleSearchValueChange(e)}
        />
        <button className="button-primary">SEARCH</button>
    </div>
  );
}

export default SearchPanel;
