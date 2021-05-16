import * as React from 'react';
import './search.scss';

export interface SearchProps {
    initialValue: string
}

function SearchPanel(props: SearchProps): React.ReactElement {
    let searchValue = props.initialValue || '';

    const handleSearchValueChange = (e: React.BaseSyntheticEvent): void => {
        const {target} = e;
        const {value} = target;
        searchValue = value;
    }
    return (
        <div className="search">
            <input
                type="text"
                id="search__input"
                className="search__input"
                defaultValue={searchValue}
                placeholder="What do you want to watch?"
                onChange={e => handleSearchValueChange(e)}
            />
            <button className="button-primary">SEARCH</button>
        </div>
    );
}

export default SearchPanel;
