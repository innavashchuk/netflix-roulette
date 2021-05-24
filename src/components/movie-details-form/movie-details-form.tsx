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
import { useState } from 'react';
import { Formik, FormikProps, Form } from 'formik';
import * as Yup from 'yup';
import { MOVIE_GENRES_LIST } from '../../models/enums/movie-genre';
import { Movie } from '../../models/movie';
import { InitialMovieRecord, InitialMovieValues } from '../../models/initial-movie-record';
import { InputTextField } from '../input-text-field/input-text-field';

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
  movieRecord: InitialMovieValues,
  isEdit: boolean,
  onFormSubmit: (movieRecord: InitialMovieValues) => void
}

const MOVIE_SCHEMA = Yup.object().shape({
  id: Yup.number(),
  title: Yup.string()
    .required('Title is required'),
  poster_path: Yup.string()
    .url('Invalid URL')
    .required('URL is required'),
  release_date: Yup
    .date()
    .nullable()
    .required('Release Date is required'),
  overview: Yup.string()
    .required('Overview is required'),
  genres: Yup.array()
    .defined()
    .min(1, 'Choose at least one genre')
    .required(),
  runtime: Yup.number()
    .integer('Runtime must be an integer')
    .min(0, 'Runtime must not be less than 0')
    .required('Runtime is required')
});

const MovieDetailsForm: React.FunctionComponent<MovieDetailsFormProps> = (props: MovieDetailsFormProps) => {
  const initialValues = {...props.movieRecord};

  return initialValues && 
    <div className="movie-details">
      <h1>{`${props.isEdit ? 'EDIT' : 'ADD'} MOVIE`}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={MOVIE_SCHEMA}
        onSubmit={(values: InitialMovieValues) => {
          props.onFormSubmit(values);
        }}
        validateOnMount>
        {({handleSubmit, handleReset, handleChange, setFieldTouched, isValid, errors, touched, values}: FormikProps<InitialMovieValues>) =>
        <Form className="movie-details__form" onSubmit={handleSubmit} autoComplete="off">
          {
            props.isEdit && <InputTextField name="title" type="text" value={values.id} disabled label="ID" />
          }
          <InputTextField
            name="title"
            type="text"
            value={values.title}
            placeholder="Title here"
            onChange={handleChange}
            label="TITLE"
            />
          
          <label htmlFor="release_date" className="form-label">RELEASE DATE</label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="release_date"
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              value={values.release_date}
              onChange={e => handleChange({target: {
                value: e,
                name: 'release_date'
              }})}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              placeholder="Select Date"
              className={`${errors.release_date ? 'invalid-field' : ''}`}
              />
          </MuiPickersUtilsProvider>
          {errors.release_date && <p className="validation-error-diplay">{errors.release_date}</p>}

          <InputTextField
            name="poster_path"
            type="text"
            value={values.poster_path}
            placeholder="Movie URL here"
            onChange={handleChange}
            label="MOVIE URL"
            />
          
          <label htmlFor="genres" className="form-label">GENRE</label>
          <Select
            id="genres"
            name="genres"
            multiple
            displayEmpty
            value={values.genres}
            onChange={e => {
              setFieldTouched('genres', true);
              handleChange(e);
            }}
            onBlur={() => setFieldTouched('genres', true)}
            input={<Input className={`form-input ${errors.genres && touched.genres ? ' invalid-field' : ''}`} />}
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
                <Checkbox checked={values.genres.indexOf(genre) > -1} />
                <ListItemText primary={genre} />
              </MenuItem>
            )}
          </Select>
          {errors.genres && touched.genres && <p className="validation-error-diplay">{errors.genres}</p>}

          <label htmlFor="overview" className="form-label">OVERVIEW</label>
          <TextareaAutosize
            className={`form-input ${errors.overview && touched.overview ? ' invalid-field' : ''}`}
            name="overview"
            value={values.overview}
            placeholder="Overview here"
            onChange={e => {
              setFieldTouched('overview', true);
              handleChange(e);
            }}
            onBlur={() => setFieldTouched('overview', true)}
            />
          {errors.overview && touched.overview && <p className="validation-error-diplay">{errors.overview}</p>}
          
          <InputTextField
            name="runtime"
            type="number"
            value={values.runtime}
            placeholder="Runtime here"
            onChange={handleChange}
            label="RUNTIME"
            />

          <div className="movie-details__btns">
            <button className="button-secondary" type="reset" onClick={handleReset}>RESET</button>
            <button className={`button-primary${!isValid ? ' button-invalid' : ''}`} type="submit">SUBMIT</button>
          </div>
        </Form>}
      </Formik>
    </div>
  ;
};

export default MovieDetailsForm;
