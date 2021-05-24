import { MovieQueryParams } from '../../models/movie-query-params';
import { ActionTypes } from '../action-types';
import { Action } from '../actions';

export default function queryParamsReducer(state: MovieQueryParams = null, action: Action): MovieQueryParams {
  switch (action.type) {
    case ActionTypes.SET_SEARCH: {
      return {
        ...state,
        search: action.payload.search
      }
    }
    case ActionTypes.SET_FILTER: {
      return {
        ...state,
        filter: action.payload.filter
      }
    }
    case ActionTypes.SET_SORT_BY: {
      return {
        ...state,
        sortBy: action.payload.sortBy
      }
    }
    case ActionTypes.SET_SORT_ORDER: {
      return {
        ...state,
        sortOrder: action.payload.sortOrder
      }
    }
    case ActionTypes.SET_QUERY_PARAMS: {
      return action.payload || null;
    }
    default:
      return state;
  }
}
