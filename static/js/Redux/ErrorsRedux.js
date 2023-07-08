import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  errorSave: ['data'],
  errorReset: null,
});

export const ErrorsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
});

/* ------------- Selectors ------------- */
export const ErrorsSelectors = {
  getState: (state) => state.errors,
};

/* ------------- Reducers ------------- */

export const errorSave = (state, { data }) => state.merge({ data });

export const errorReset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ERROR_SAVE]: errorSave,
  [Types.ERROR_RESET]: errorReset,
});
