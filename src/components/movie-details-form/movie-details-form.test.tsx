import * as React from 'react';
import {render, screen, fireEvent, within, waitFor} from '@testing-library/react';
import MovieDetailsForm from './Movie-Details-Form';
import {InitialMovieRecord, InitialMovieValues} from '../../models/initial-movie-record';

const DATE_STRING = '01/01/2001';
const MOVIE: InitialMovieValues = {
    'title': 'Star Wars: The Last Jedi',
    'release_date': new Date(DATE_STRING),
    'poster_path': 'https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
    'overview': 'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
    'genres': [
        'Fantasy'
    ],
    'runtime': 152
};

const EMPTY_MOVIE = new InitialMovieRecord();

const onFormSubmit = jest.fn();

describe('MovieDetailsForm', () => {
    it('should initialize', () => {
        const {asFragment} = render(<MovieDetailsForm movieRecord={MOVIE} onFormSubmit={onFormSubmit} isEdit={false}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should display EDIT in title if isEdit is true', () => {
        render(<MovieDetailsForm movieRecord={MOVIE} onFormSubmit={onFormSubmit} isEdit/>);
        const title = screen.getByRole('heading');
        expect(title.textContent).toEqual('EDIT MOVIE');
    });

    it('should display ADD in title if isEdit is false', () => {
        render(<MovieDetailsForm movieRecord={MOVIE} onFormSubmit={onFormSubmit} isEdit={false}/>);
        const title = screen.getByRole('heading');
        expect(title.textContent).toEqual('ADD MOVIE');
    });

    it('should reset form when RESET button is clicked', () => {
        const {getByRole} = render(<MovieDetailsForm movieRecord={MOVIE} onFormSubmit={onFormSubmit} isEdit/>);
        const resetButton = getByRole('button', {name: 'RESET'});
        const nameTextField = getByRole('textbox', {name: 'TITLE'});
        const newTitle = 'New Title';
        fireEvent.change(nameTextField, {
            target: {
                value: newTitle
            }
        });
        expect(nameTextField.getAttribute('value')).toEqual(newTitle);

        fireEvent.click(resetButton);
        expect(nameTextField.getAttribute('value')).toEqual(MOVIE.title);
    });

    it('should validate TITLE', async () => {
        const {getByRole, getByText} = render(<MovieDetailsForm movieRecord={EMPTY_MOVIE} onFormSubmit={onFormSubmit}
                                                                isEdit/>);
        const nameTextField = getByRole('textbox', {name: 'TITLE'});
        expect(nameTextField.getAttribute('value')).toBeFalsy();
        const submitButton = getByRole('button', {name: 'SUBMIT'});
        fireEvent.click(submitButton);
        await waitFor(() => {
            const errorMessage = getByText((content, element) => content.includes('Title is required'));
            expect(errorMessage).toBeTruthy();
        });
    });

});

test('should call onFormSubmit with changed record when submit button is clicked', async () => {
    const {getByRole, getByPlaceholderText} = render(<MovieDetailsForm movieRecord={EMPTY_MOVIE}
                                                                       onFormSubmit={onFormSubmit} isEdit={false}/>);
    const submitButton = getByRole('button', {name: 'SUBMIT'});
    const nameTextField = getByRole('textbox', {name: 'TITLE'});
    fireEvent.change(nameTextField, {
        target: {
            value: MOVIE.title
        }
    });

    const releaseDateField = getByPlaceholderText('Select Date');
    fireEvent.change(releaseDateField, {
        target: {
            value: DATE_STRING
        }
    });

    const runtimeField = getByRole('spinbutton', {
        name: 'RUNTIME'
    });
    fireEvent.change(runtimeField, {
        target: {
            value: MOVIE.runtime
        }
    });

    const urlField = getByRole('textbox', {
        name: 'MOVIE URL'
    });
    fireEvent.change(urlField, {
        target: {
            value: MOVIE.poster_path
        }
    });

    const overviewField = getByRole('textbox', {
        name: 'OVERVIEW'
    });
    fireEvent.change(overviewField, {
        target: {
            value: MOVIE.overview
        }
    });

    const genresField = getByRole('button', {
        name: 'GENRES'
    });
    fireEvent.mouseDown(genresField);
    const listbox = within(getByRole('listbox'));
    expect(listbox).toBeTruthy();
    fireEvent.mouseDown(getByRole('option', {
        name: 'Fantasy'
    }));
    fireEvent.click(getByRole('option', {
        name: 'Fantasy'
    }));

    expect(submitButton).toBeTruthy();
    expect(submitButton.getAttribute('disabled')).toBeFalsy();
    fireEvent.click(submitButton);
    await waitFor(() =>
        expect(onFormSubmit).toHaveBeenCalledWith(MOVIE)
    )
});
