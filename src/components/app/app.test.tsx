import * as React from 'react';
import {render} from '@testing-library/react';
import App from './app';

jest.mock('../search-movies-page/search-movies-page', () => () => <div>StartPage</div>);
jest.mock('../movie-details/movie-details', () => () => <div>MovieDetails</div>);
jest.mock('../custom-alert/custom-alert', () => () => <div>CustomAlert</div>);

describe('App', () => {
    it('should initialize', () => {
        const {asFragment} = render(<App/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
