import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    getCategoryDropsRequest: null,
    getCategoryDropsSuccess: ['payload'], // payload: { data }
    getCategoryDropsFailure: ['payload'], // payload: { errors }

    getNextDropsRequest: ['payload'], // payload: { link }
    getNextDropsSuccess: ['payload'], // payload: { data }
    getNextDropsFailure: ['payload'], // payload: { errors }
  },
  { prefix: '/dropship/admin-panel/portfolio/' },
);

export const PortfolioAdminTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  dropsLoading: false,
  errors: false,
  result: {},
});

/* ------------- Functions for reducer cases ------------- */

const getCategoryDropsRequest = (state) =>
  state.merge({ loading: true});

const getCategoryDropsSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, result: data });

const getCategoryDropsFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });

const getNextDropsRequest = (state) => state.merge({ dropsLoading: true });

const getNextDropsFailure = (state, { payload: { errors } }) =>
  state.merge({ dropsLoading: false, errors });

const getNextDropsSuccess = (state, { payload: data }) => {
  const allData = state.result.results.concat(data.results);

  return state
    .merge({
      dropsLoading: false,
      result: { ...state.result, ...data, results: allData },
    })
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CATEGORY_DROPS_REQUEST]: getCategoryDropsRequest,
  [Types.GET_CATEGORY_DROPS_SUCCESS]: getCategoryDropsSuccess,
  [Types.GET_CATEGORY_DROPS_FAILURE]: getCategoryDropsFailure,

  [Types.GET_NEXT_DROPS_REQUEST]: getNextDropsRequest,
  [Types.GET_NEXT_DROPS_SUCCESS]: getNextDropsSuccess,
  [Types.GET_NEXT_DROPS_FAILURE]: getNextDropsFailure,
});
