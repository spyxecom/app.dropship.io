import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    getSearchStoreRequest: ['payload'],
    getSearchStoreSuccess: ['payload'],
    getSearchStoreFailure: ['payload'],

    deleteStoreRequest: ['payload'],
    deleteStoreSuccess: ['payload'],
    deleteStoreFailure: ['payload'],

    resetSearchErrors: null,
    resetErrors: null,
    resetLastSuccessfulSearch: null,
    resetResults: null,
  }
);

export const AdminStoreManagerTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  errors: false,
  searchErrors: '',
  lastSuccessfulSearch: null,
  results: []
});

/* ------------- Functions for reducer cases ------------- */

const getSearchStoreRequest = (state) =>
  state.merge({ loading: true });

const getSearchStoreSuccess = (state, {payload: data}) =>
  state.merge({ loading: false, results: data });

const getSearchStoreFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, searchErrors: errors })

const deleteStoreRequest = (state) =>
  state.merge({ loading: true });

const deleteStoreSuccess = (state, {payload: data}) => {
  const newResults = [...state.results.results].filter(el => el.id !== data?.record?.id);
  return state.merge({loading: false, results: {...state.results, results: newResults}});
}

const deleteStoreFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors })

const resetErrors = (state) =>
  state.merge({ errors: false  })

const resetSearchErrors = (state) =>
  state.merge({ searchErrors: ''  })

const resetLastSuccessfulSearch = (state) =>
  state.merge({ lastSuccessfulSearch: null })

const resetResults = (state) =>
  state.merge({ results: [] })
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {

  [Types.RESET_ERRORS]: resetErrors,
  [Types.RESET_RESULTS]: resetResults,
  [Types.RESET_SEARCH_ERRORS]: resetSearchErrors,
  [Types.RESET_LAST_SUCCESSFUL_SEARCH]: resetLastSuccessfulSearch,

  [Types.GET_SEARCH_STORE_REQUEST]: getSearchStoreRequest,
  [Types.GET_SEARCH_STORE_SUCCESS]: getSearchStoreSuccess,
  [Types.GET_SEARCH_STORE_FAILURE]: getSearchStoreFailure,

  [Types.DELETE_STORE_REQUEST]: deleteStoreRequest,
  [Types.DELETE_STORE_SUCCESS]: deleteStoreSuccess,
  [Types.DELETE_STORE_FAILURE]: deleteStoreFailure,
});
