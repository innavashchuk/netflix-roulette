import * as React from 'react';
import {render, screen} from '@testing-library/react';
import Footer from './footer';

describe('Footer', () => {
    it('should initialize', () => {
        const {asFragment} = render(<Footer/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should contain logo', () => {
        render(<Footer/>);
        expect(screen.findByText('netflixroulette')).toBeTruthy();
    });
});
