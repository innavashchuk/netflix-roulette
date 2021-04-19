import { ActionTypes } from '../action-types';
import { Action } from '../actions';

export enum AlertTypesEnum {
  error = 'error',
  success = 'success',
}

export interface AlertState {
  type: AlertTypesEnum | null;
  message: string;
}

const initialState: AlertState = {
  type: null,
  message: '',
};

export default function alertReducer(
  state: AlertState = initialState,
  action: Action
): AlertState {
  switch (action.type) {
    case ActionTypes.SET_ALERT: {
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
      };
    }
    default:
      return state;
  }
}
