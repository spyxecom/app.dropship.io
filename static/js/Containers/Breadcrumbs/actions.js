import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addBreadCrumb: ['payload'], // payload: { data }
  removeBreadCrumb: null, // payload: { data }
  clearBreadCrumbs: null,
});

export const BreadCrumbsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  totalBreadcrumbs: [],
});

/* ------------- Functions for reducer cases ------------- */

const addBreadCrumb = (state, { payload: data }) => {
  return state.merge({
    totalBreadcrumbs: [...state.totalBreadcrumbs, { ...data }],
  });
};

const removeBreadCrumb = (state) => {
  let total = [...state?.totalBreadcrumbs];
  if (total.length >= 1) {
    total = total?.slice(0, -1);
  }
  return state.merge({ totalBreadcrumbs: total });
};

const clearBreadCrumbs = (state) => state.merge({ totalBreadcrumbs: [] });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_BREAD_CRUMB]: addBreadCrumb,
  [Types.REMOVE_BREAD_CRUMB]: removeBreadCrumb,
  [Types.CLEAR_BREAD_CRUMBS]: clearBreadCrumbs,
});
