import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,
  startupSuccess: null,
  startupFailure: ['error'],
});

export const StartupTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  success: false,
  error: null,
});

export const startup = (state) => state.merge({ success: false, error: null });

export const startupSuccess = (state) =>
  state.merge({ success: true, error: null });

export const startupFailure = (state, { error }) =>
  state.merge({ success: false, error });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startup,
  [Types.STARTUP_SUCCESS]: startupSuccess,
  [Types.STARTUP_FAILURE]: startupFailure,
});
