import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getTimerListRequest: null,
  getTimerListSuccess: ['payload'], // payload: { data }
  getTimerListFailure: ['payload'], // payload: { errors }

  timerUpdateRequest: ['payload'], // payload: { id },
  timerUpdateSuccess: ['payload'], // payload: { data }
  timerUpdateFailure: ['payload'], // payload: { errors }

  timerUpdatePartialRequest: ['payload'], // payload: { id },
  timerUpdatePartialSuccess: ['payload'], // payload: { data }
  timerUpdatePartialFailure: ['payload'], // payload: { errors }

  timerSaveResultReset: null,
  timerErrorsReset: null,
});

export const TimerTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  timerList: null,
  fetching: false,

  saveResult: false,
  saveFetching: false,

  errors: false,
});

/* ------------- Functions for reducer cases ------------- */

// GET TIMER LIST
export const getTimerListRequest = (state) => state.merge({ fetching: true });

export const getTimerListSuccess = (state, { payload: data }) =>
  state.merge({ fetching: false, timerList: data });

export const getTimerListFailure = (state, { payload: { errors } }) =>
  state.merge({ fetching: false, errors });

// UPDATE TIMER

export const timerUpdateRequest = (state) =>
  state.merge({ saveFetching: true });

export const timerUpdateSuccess = (state, { payload: data }) =>
  state.merge({ saveFetching: false, saveResult: true });

export const timerUpdateFailure = (state, { payload: { errors } }) =>
  state.merge({ saveFetching: false, errors: { error: true } });

// UPDATE TIMER PARTIAL

export const timerUpdatePartialRequest = (state) =>
  state.merge({ saveFetching: true });

export const timerUpdatePartialSuccess = (state, { payload: data }) =>
  state.merge({ saveFetching: false, saveResult: true });

export const timerUpdatePartialFailure = (state, { payload: { errors } }) =>
  state.merge({ saveFetching: false, errors: { error: true } });

// RESET RESULT AND ERRORS
export const timerSaveResultReset = (state) => {
  return state.merge({
    fetching: false,
    saveFetching: false,
    saveResult: false,
  });
};
export const timerErrorsReset = (state) => {
  return state.merge({
    fetching: false,
    saveFetching: false,
    errors: false,
  });
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TIMER_LIST_REQUEST]: getTimerListRequest,
  [Types.GET_TIMER_LIST_SUCCESS]: getTimerListSuccess,
  [Types.GET_TIMER_LIST_FAILURE]: getTimerListFailure,

  [Types.TIMER_UPDATE_REQUEST]: timerUpdateRequest,
  [Types.TIMER_UPDATE_SUCCESS]: timerUpdateSuccess,
  [Types.TIMER_UPDATE_FAILURE]: timerUpdateFailure,

  [Types.TIMER_UPDATE_PARTIAL_REQUEST]: timerUpdatePartialRequest,
  [Types.TIMER_UPDATE_PARTIAL_SUCCESS]: timerUpdatePartialSuccess,
  [Types.TIMER_UPDATE_PARTIAL_FAILURE]: timerUpdatePartialFailure,

  [Types.TIMER_SAVE_RESULT_RESET]: timerSaveResultReset,
  [Types.TIMER_ERRORS_RESET]: timerErrorsReset,
});
