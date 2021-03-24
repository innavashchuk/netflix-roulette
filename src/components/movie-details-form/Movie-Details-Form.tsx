/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import './movie-details-form.scss';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { Input, TextareaAutosize } from '@material-ui/core';
import { MOVIE_GENRES_LIST } from '../../models/enums/movie-genre';
import { Movie } from '../../models/movie';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export interface MovieDetailsFormProps {
  movieRecord: Movie,
  isEdit: boolean,
  onFormSubmit: (movieRecord: Movie) => void
}

export interface MovieDetailsFormState {
  movieRecord: Movie
}

export default class MovieDetailsForm extends React.Component<MovieDetailsFormProps, MovieDetailsFormState> {
  constructor(props: MovieDetailsFormProps) {
    super(props);

    this.state = {
      movieRecord: { ...this.props.movieRecord }
    }
  }

  handleChange = (event: React.BaseSyntheticEvent): void => {
    const { target } = event;
    if (!target) {
      return;
    }
    const { value, name } = target;
    this.setState({
      movieRecord: {
        ...this.state.movieRecord,
        [name]: value
      }
    });
  }

  handleDateChange = (date: Date | null): void => {
    this.setState({
      movieRecord: {
        ...this.state.movieRecord,
        release_date: date && date.toLocaleDateString() || ''
      }
    });
  }

  handleReset = (): void => {
    this.setState({
      movieRecord: { ...this.props.movieRecord }
    });
  }

  handleSubmit = (event: React.BaseSyntheticEvent): void => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.movieRecord);
  }

  public render(): React.ReactElement {
    const { movieRecord } = this.state;
    return (
      <div className="movie-details">
        <h1>{`${this.props.isEdit ? 'EDIT' : 'ADD'} MOVIE`}</h1>
        <form className="movie-details__form">
          {
            this.props.isEdit
            && <><label htmlFor="id" className="movie-details__form_label">
              MOVIE ID
            </label>
              <input
                className="movie-details__form_input disabled"
                name="title"
                type="text"
                value={movieRecord.id}
                disabled
                />
            </>
          }
          <label htmlFor="title" className="movie-details__form_label">
            TITLE
          </label>
          <input
            className="movie-details__form_input"
            name="title"
            type="text"
            value={movieRecord.title}
            placeholder="Title here"
            onChange={this.handleChange}
            />
          <label htmlFor="release_date" className="movie-details__form_label">
            RELEASE DATE
          </label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="release_date"
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              value={movieRecord.release_date && new Date(movieRecord.release_date) || new Date()}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              placeholder="Select Date"
              />
          </MuiPickersUtilsProvider>
          <label htmlFor="poster_path" className="movie-details__form_label">
            MOVIE URL
          </label>
          <input
            className="movie-details__form_input"
            name="poster_path"
            type="text"
            value={movieRecord.poster_path}
            placeholder="Movie URL here"
            onChange={this.handleChange}
            />
          <label htmlFor="genres" className="movie-details__form_label">
            GENRE
          </label>
          <Select
            id="genres"
            name="genres"
            multiple
            displayEmpty
            value={movieRecord.genres}
            onChange={this.handleChange}
            input={<Input className="movie-details__form_input" />}
            renderValue={(selected: string[]) => {
              if (selected.length === 0) {
                return <em>Select Genre</em>;
              }

              return selected.join(', ');
            }}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}>
            {MOVIE_GENRES_LIST.map(genre =>
              <MenuItem key={genre} value={genre}>
                <Checkbox checked={movieRecord.genres.indexOf(genre) > -1} />
                <ListItemText primary={genre} />
              </MenuItem>
            )}
          </Select>
          <label htmlFor="overview" className="movie-details__form_label">
            OVERVIEW
          </label>
          <TextareaAutosize
            className="movie-details__form_input"
            name="overview"
            value={movieRecord.overview}
            placeholder="Overview here"
            onChange={this.handleChange}
            />
          <label htmlFor="runtime" className="movie-details__form_label">
            RUNTIME
          </label>
          <input
            className="movie-details__form_input"
            name="runtime"
            type="number"
            value={movieRecord.runtime}
            placeholder="Runtime here"
            onChange={this.handleChange}
            />
        </form>
        <div className="movie-details__btns">
          <button className="button-secondary" onClick={this.handleReset}>RESET</button>
          <button className="button-primary" onClick={this.handleSubmit}>
            SUBMIT
            </button>
        </div>
      </div>
    );
  }
}
