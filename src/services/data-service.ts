import { Movie, MovieQueryParams } from '../models/movie';

const BASE_ROUTE = 'http://localhost:4000/movies';

export const getMovies = async (queryParams: MovieQueryParams): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_ROUTE}?${new URLSearchParams(queryParams)}`, {
      method: 'GET'
    });
    const rawData: { data: Movie[] } = await response.json();
    return rawData.data;
  }
  catch (error) {
    throw new Error(`Failed loading movies. Error: ${error}`);
  }
};

export const updateMovie = async (movieRecord: Movie): Promise<Movie> => {
  if (!movieRecord) {
    throw new Error('No movie record available.');
  }
  try {
    const response = await fetch(`${BASE_ROUTE}`, {
      method: 'PUT',
      body: JSON.stringify(movieRecord),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 200) {
      const rawData: Movie = await response.json();
      return rawData;
    }
    const rawData: {messages: string[]} = await response.json();
    throw new Error(rawData.messages && rawData.messages.join('; ') || rawData.toString());
  }
  catch (error) {
    throw new Error(`Failed to update a movie. Error: ${error}`);
  }
};

export const addMovie = async (movieRecord: Movie): Promise<Movie> => {
  if (!movieRecord) {
    throw new Error('No movie record available.');
  }
  try {
    const response = await fetch(`${BASE_ROUTE}`, {
      method: 'POST',
      body: JSON.stringify(movieRecord),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 201) {
      const rawData: Movie = await response.json();
      return rawData;
    }
      const rawData: {messages: string[]} = await response.json();
      throw new Error(rawData.messages && rawData.messages.join('; '));
  }
  catch (error) {
    throw new Error(`Failed adding a movie. Error: ${error}`);
  }
};

export const deleteMovie = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_ROUTE}/${id}`, {
      method: 'DELETE'
    });
    if (response.status === 204) {
      return true;
    }
    throw new Error('Movie not found');
  }
  catch (error) {
    throw new Error(`Failed loading a movie. Error: ${error}`);
  }
};

export const getMovie = async (id: number): Promise<Movie> => {
  try {
    const response = await fetch(`${BASE_ROUTE}/${id}`, {
      method: 'GET'
    });
    if (response.status === 200) {
      const rawData: Movie = await response.json();
      return rawData;
    }
    const rawData: {messages: string[]} = await response.json();
    throw new Error(rawData.messages.join(', '));
  }
  catch (error) {
    throw new Error(`Failed loading a movie. Error: ${error}`);
  }
};

