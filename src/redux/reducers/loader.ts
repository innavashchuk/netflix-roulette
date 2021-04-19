import { ActionTypes } from '../action-types';
import { Action } from '../actions';

export interface LoaderState {
  isLoading: boolean;
}

const initialState: LoaderState = {
  isLoading: false,
};

export default function loaderReducer(
  state: LoaderState = initialState,
  action: Action
): LoaderState {
  switch (action.type) {
    case ActionTypes.SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }
    default:
      return state;
  }
}
