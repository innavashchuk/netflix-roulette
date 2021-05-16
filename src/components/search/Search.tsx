import * as React from 'react';
import './search.scss';

export interface SearchProps {
    initialValue: string,
    onSearchValueChange: (param: string) => void
}

function Search(props: SearchProps): React.ReactElement {
    let searchValue = props.initialValue || '';

    const handleSearchValueChange = (e: React.BaseSyntheticEvent): void => {
        const {target} = e;
        const {value} = target;
        searchValue = value;
    }

    const handleSearchValueSubmit = (e: React.BaseSyntheticEvent): void => {
        props.onSearchValueChange(searchValue);
    }

    const handleSearchKeyPress = (e: React.KeyboardEvent): void => {
        const {key} = e;
        if (key === 'Enter') {
            props.onSearchValueChange(searchValue);
        }
    }

    return (
        <div className="search">
            <input
                type="text"
                className="search__input"
                defaultValue={searchValue}
                placeholder="What do you want to watch?"
                onChange={e => handleSearchValueChange(e)}
                onKeyPress={e => handleSearchKeyPress(e)}
            />
            <button className="button-primary" onClick={e => handleSearchValueSubmit(e)}>SEARCH</button>
        </div>
    );
}

export default Search;
