/* eslint-disable no-empty-pattern */
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  planSetProp: ['key', 'value'],

  plansRequest: null,
  plansSuccess: ['plans'],

  planFetchingReset: null,
});

export const PlanTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  plans: null,
  plansMap: null,
  maxProducts: 0,
  plansFetching: false,
});

/* ------------- Selectors ------------- */
export const getState = (state) => state.plan;

export const planSetProp = (state, { key, value }) => state.set(key, value);

export const plansRequest = (state, {}) => state.merge({ plansFetching: true });
export const plansSuccess = (state, { plans }) => {
  const activePlans = plans.filter((plan) => plan?.status);
  const plansMap = plans.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.id]: { ...currentValue },
    }),
    {},
  );
  const maxProducts = Math.max(
    ...activePlans.map((plan) => plan.amount_products_per_week),
  );
  return state.merge({
    plansFetching: false,
    plans: activePlans,
    plansMap,
    maxProducts,
  });
};

export const planFetchingReset = (state) =>
  state.merge({
    plansFetching: false,
  });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.PLAN_SET_PROP]: planSetProp,

  [Types.PLANS_REQUEST]: plansRequest,
  [Types.PLANS_SUCCESS]: plansSuccess,

  [Types.PLAN_FETCHING_RESET]: planFetchingReset,
});
