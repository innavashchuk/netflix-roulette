import { DispatchWithoutAction, useReducer } from 'react';

export default function useToggle(initialValue = false): [boolean, DispatchWithoutAction] {
  // Returns the tuple [state, dispatch]
  // Normally with useReducer you pass a value to dispatch to indicate what action to
  // take on the state, but in this case there's only one action.
  return useReducer(state => !state, initialValue);
};
