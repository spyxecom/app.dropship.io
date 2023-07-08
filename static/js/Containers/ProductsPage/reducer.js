import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    getProductsRequest: ['payload'], // payload: { search, params } --> filters: month, drop_id
    getProductsSuccess: ['payload'], // payload: { data }
    getProductsFailure: ['payload'], // payload: { errors }

    updateProduct: ['payload'], // payload: { product }

    getProductsNextRequest: ['payload'], // payload: { link }
    getProductsNextSuccess: ['payload'], // payload: { data }
    getProductsNextFailure: ['payload'], // payload: { errors }

    addProductsRequest: ['payload'], // payload: { data }
    addProductsSuccess: ['payload'], // payload: { data }
    addProductsFailure: ['payload'], // payload: { errors }
    clearAddProducts: null, // payload: { errors }
  },
  { prefix: '/dropship/portfolio/product-list/' },
);

export const PortfolioTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  skeletonLoading: false,
  addProductsLoading: false,
  addProductsResult: null,
  errors: false,
  products: {},
});

/* ------------- Selectors ------------- */
export const ProductsSelectors = {
  getProducts: (state) => state.products.products?.results,
};

/* ------------- Functions for reducer cases ------------- */

const getProductsRequest = (state) =>
  state.merge({ loading: true, skeletonLoading: true });

const getProductsSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, skeletonLoading: false, products: data });

const getProductsFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, skeletonLoading: false, errors });

const getProductsNextRequest = (state) => state.merge({ loading: true });

const getProductsNextFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });

const getProductsNextSuccess = (state, { payload: data }) => {
  const allData = state.products.results.concat(data.results);
  return state
    .merge({
      loading: false,
      products: { ...data, results: allData },
    })
    .setIn(['products', 'results'], allData);
};

const updateProduct = (state, { payload: { product } }) => {
  let index;
  const products = state.products.results;

  products.forEach((value, key) => {
    if (value.product_id === product.product_id) index = key;
  });

  return state.setIn(['products', 'results', index], {...products[index], saved: product.saved });
};

const addProductsRequest = (state) =>
  state.merge({ addProductsLoading: true});

const addProductsSuccess = (state, { payload: data }) =>
  state.merge({ addProductsLoading: false, products: {...data}, addProductsResult: true });

const addProductsFailure = (state, { payload: { errors } }) =>
  state.merge({ addProductsLoading: false, errors });

const clearAddProducts = (state) =>
  state.merge({
    addProductsLoading: false,
    products: {...state.products, not_saved: [], invalid: []},
    addProductsResult: null,
    errors: null });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PRODUCTS_REQUEST]: getProductsRequest,
  [Types.GET_PRODUCTS_SUCCESS]: getProductsSuccess,
  [Types.GET_PRODUCTS_FAILURE]: getProductsFailure,

  [Types.UPDATE_PRODUCT]: updateProduct,

  [Types.GET_PRODUCTS_NEXT_REQUEST]: getProductsNextRequest,
  [Types.GET_PRODUCTS_NEXT_SUCCESS]: getProductsNextSuccess,
  [Types.GET_PRODUCTS_NEXT_FAILURE]: getProductsNextFailure,

  [Types.ADD_PRODUCTS_REQUEST]: addProductsRequest,
  [Types.ADD_PRODUCTS_SUCCESS]: addProductsSuccess,
  [Types.ADD_PRODUCTS_FAILURE]: addProductsFailure,
  [Types.CLEAR_ADD_PRODUCTS]: clearAddProducts,
});
