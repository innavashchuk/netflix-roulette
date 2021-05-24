import { call, put, all, takeLatest } from 'redux-saga/effects';
import { Movie } from '../models/movie';
import { MovieQueryParamsDict } from '../models/movie-query-params';
import { Action, setLoading, setMovies } from './actions';

const BASE_ROUTE = 'http://localhost:4000/movies';
export function* getMoviesSaga({ payload: { queryParams } }: Action): Generator {
  yield put(setLoading(true));
  try {
    const response: any = yield call(fetch, `${BASE_ROUTE}?${MovieQueryParamsDict.toQueryString(queryParams)}`);
    const moviesResponse: any = yield response.json();
    const movies = yield moviesResponse.data;
    yield put(setMovies(movies as Movie[]));
  }
  catch (error) {
    console.error(error);
  }
  yield put(setLoading(false));
};

export function* watchGetMovies(): Generator {
  yield takeLatest('GET_MOVIES', getMoviesSaga);
}

export function* rootSaga(): Generator {
  yield all([
    watchGetMovies(),
  ]);
}



