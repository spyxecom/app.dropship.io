/* eslint-disable no-empty-pattern */
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  categorySetProp: ['key', 'value'],

  categoriesRequest: null,
  categoriesSuccess: ['categories'],

  categoryFetchingReset: null,
});

export const CategoryTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  categories: null,
  categoriesMap: null,
  categoriesFetching: false,
});

/* ------------- Selectors ------------- */
export const getState = (state) => state.category;

export const categorySetProp = (state, { key, value }) => state.set(key, value);

export const categoriesRequest = (state, {}) =>
  state.merge({ categoriesFetching: true });
export const categoriesSuccess = (state, { categories }) => {
  const categoriesMap = categories.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.id]: { ...currentValue },
    }),
    {},
  );
  return state.merge({ categoriesFetching: false, categories, categoriesMap });
};

export const categoryFetchingReset = (state) =>
  state.merge({
    categoriesFetching: false,
  });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.CATEGORY_SET_PROP]: categorySetProp,

  [Types.CATEGORIES_REQUEST]: categoriesRequest,
  [Types.CATEGORIES_SUCCESS]: categoriesSuccess,

  [Types.CATEGORY_FETCHING_RESET]: categoryFetchingReset,
});
