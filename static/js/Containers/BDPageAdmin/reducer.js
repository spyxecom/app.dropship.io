import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getBdListRequest: ['payload'],
  getBdListSuccess: ['payload'], // payload: { data }
  getBDListFailure: ['payload'], // payload: { errors }

  getBdListNextRequest: ['payload'], // payload: { link }
  getBdListNextSuccess: ['payload'], // payload: { data }
  getBdListNextFailure: ['payload'], // payload: { errors }

  getBdIconsRequest: ['payload'],
  getBdIconsSuccess: ['payload'], // payload: { data }
  getBdIconsFailure: ['payload'], // payload: { errors }

  getBdIconsNextRequest: ['payload'], // payload: { link }
  getBdIconsNextSuccess: ['payload'], // payload: { data }
  getBdIconsNextFailure: ['payload'], // payload: { errors }

  createBdCardRequest: ['payload'], // payload: { data }
  createBdCardSuccess: ['payload'], // payload: { data }
  createBdCardFailure: ['payload'], // payload: { errors }

  changeBdCardRequest: ['payload'], // payload: { id }
  changeBdCardSuccess: ['payload'], // payload: { data }
  changeBdCardFailure: ['payload'], // payload: { errors }

  deleteBdCardRequest: ['payload'], // payload: { id }
  deleteBdCardSuccess: ['payload'], // payload: { data }
  deleteBdCardFailure: ['payload'], // payload: { errors }

  bdSaveResultReset: null,
  bdErrorsReset: null,
});

export const BdTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  bdList: null,
  bdIcons: null,

  saveResult: false,
  saveFetching: false,

  fetching: false,
  fetchingIcons: false,
  errors: false,
});

/* ------------- Functions for reducer cases ------------- */

// GET BENEFITS AND DROBACKS LIST

export const getBdListRequest = (state) =>
  state.merge({ fetching: true, bdList: null });

export const getBdListSuccess = (state, { payload: data }) =>
  state.merge({ fetching: false, bdList: data });

export const getBDListFailure = (state, { payload: { errors } }) =>
  state.merge({ fetching: false, errors });

// GET BENEFITS AND DROBACKS ICONS

export const getBdIconsRequest = (state) =>
  state.merge({ fetchingIcons: true });

export const getBdIconsSuccess = (state, { payload: data }) =>
  state.merge({ fetchingIcons: false, fetching: false, bdIcons: data });

export const getBdIconsFailure = (state, { payload: { errors } }) =>
  state.merge({ fetchingIcons: false, fetching: false, errors });

// RESET RESULT AND ERRORS
export const bdSaveResultReset = (state) => {
  return state.merge({
    saveFetching: false,
    saveResult: false,
  });
};
export const bdErrorsReset = (state) => {
  return state.merge({
    saveFetching: false,
    errors: false,
  });
};

// GET BENEFITS AND DROBACKS NEXT LIST

export const getBdListNextRequest = (state) => state.merge({ fetching: true });

export const getBdListNextSuccess = (state, { payload: data }) => {
  const allData = state.bdList?.results?.concat(data.results);
  return state
    .merge({
      fetching: false,
      bdList: { ...data, results: allData },
    })
    .setIn(['bdList', 'results'], allData);
};
export const getBdListNextFailure = (state, { payload: { errors } }) =>
  state.merge({ fetching: false, errors });

// GET BENEFITS AND DROBACKS NEXT LIST

export const getBdIconsNextRequest = (state) =>
  state.merge({ fetching: false, fetchingIcons: true });

export const getBdIconsNextSuccess = (state, { payload: data }) => {
  const allData = state.bdIcons?.results?.concat(data.results);
  return state
    .merge({
      fetching: false,
      fetchingIcons: false,
      bdIcons: { ...data, results: allData },
    })
    .setIn(['bdIcons', 'results'], allData);
};
export const getBdIconsNextFailure = (state, { payload: { errors } }) =>
  state.merge({ fetching: false, fetchingIcons: false, errors });

// CREATE BENEFITS AND DROBACKS CARD

export const createBdCardRequest = (state) =>
  state.merge({ saveFetching: true });

export const createBdCardSuccess = (state, { payload: data }) =>
  state.merge({ saveFetching: false, saveResult: { value: 'added' } });

export const createBdCardFailure = (state, { payload: { errors } }) =>
  state.merge({ saveFetching: false, errors: { error: true } });

// CHANGE BENEFITS AND DROBACKS CARD

export const changeBdCardRequest = (state) =>
  state.merge({ saveFetching: true });

export const changeBdCardSuccess = (state, { payload: data }) =>
  state.merge({ saveFetching: false, saveResult: { value: 'edited' } });

export const changeBdCardFailure = (state, { payload: { errors } }) =>
  state.merge({ saveFetching: false, errors: { error: true } });

// DELETE BENEFITS AND DROBACKS CARD

export const deleteBdCardRequest = (state) =>
  state.merge({ saveFetching: true });

export const deleteBdCardSuccess = (state, { payload: data }) =>
  state.merge({ saveFetching: false, saveResult: { value: 'deleted' } });

export const deleteBdCardFailure = (state, { payload: { errors } }) =>
  state.merge({ saveFetching: false, errors: { error: true } });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_BD_LIST_REQUEST]: getBdListRequest,
  [Types.GET_BD_LIST_SUCCESS]: getBdListSuccess,
  [Types.GET_BD_LIST_FAILURE]: getBDListFailure,

  [Types.GET_BD_LIST_NEXT_REQUEST]: getBdListNextRequest,
  [Types.GET_BD_LIST_NEXT_SUCCESS]: getBdListNextSuccess,
  [Types.GET_BD_LIST_NEXT_FAILURE]: getBdListNextFailure,

  [Types.GET_BD_ICONS_REQUEST]: getBdIconsRequest,
  [Types.GET_BD_ICONS_SUCCESS]: getBdIconsSuccess,
  [Types.GET_BD_ICONS_FAILURE]: getBdIconsFailure,

  [Types.GET_BD_ICONS_NEXT_REQUEST]: getBdIconsNextRequest,
  [Types.GET_BD_ICONS_NEXT_SUCCESS]: getBdIconsNextSuccess,
  [Types.GET_BD_ICONS_NEXT_FAILURE]: getBdIconsNextFailure,

  [Types.CREATE_BD_CARD_REQUEST]: createBdCardRequest,
  [Types.CREATE_BD_CARD_SUCCESS]: createBdCardSuccess,
  [Types.CREATE_BD_CARD_FAILURE]: createBdCardFailure,

  [Types.CHANGE_BD_CARD_REQUEST]: changeBdCardRequest,
  [Types.CHANGE_BD_CARD_SUCCESS]: changeBdCardSuccess,
  [Types.CHANGE_BD_CARD_FAILURE]: changeBdCardFailure,

  [Types.DELETE_BD_CARD_REQUEST]: deleteBdCardRequest,
  [Types.DELETE_BD_CARD_SUCCESS]: deleteBdCardSuccess,
  [Types.DELETE_BD_CARD_FAILURE]: deleteBdCardFailure,

  [Types.BD_SAVE_RESULT_RESET]: bdSaveResultReset,
  [Types.BD_ERRORS_RESET]: bdErrorsReset,
});
