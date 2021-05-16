import * as React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import MovieInfoHeader from './movie-info-header';
import {MovieGenreEnum} from '../../models/enums/movie-genre';

const MOVIE = {
    'id': 181808,
    'title': 'Star Wars: The Last Jedi',
    'tagline': 'The Saga Continues',
    'vote_average': 7.1,
    'vote_count': 4732,
    'release_date': '2017-12-13',
    'poster_path': 'https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
    'overview': 'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
    'budget': 200000000,
    'revenue': 1325937250,
    'genres': [
        MovieGenreEnum.fantasy,
        MovieGenreEnum.adventure,
        MovieGenreEnum.scienceFiction
    ],
    'runtime': 152
};

const onSearchClick = jest.fn();

describe('MovieInfoHeader', () => {
    it('should initialize', () => {
        const {asFragment} = render(<MovieInfoHeader movie={MOVIE} onSearchClick={onSearchClick}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should call onSearchClick callback when search button is clicked', () => {
        render(<MovieInfoHeader movie={MOVIE} onSearchClick={onSearchClick}/>);
        const searchButton = screen.getByRole('button');
        expect(searchButton).toBeTruthy();
        fireEvent.click(searchButton);
        expect(onSearchClick).toHaveBeenCalled();
    });
});
