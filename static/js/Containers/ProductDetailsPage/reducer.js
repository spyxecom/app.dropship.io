import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    getProductDetailsRequest: ['payload'], // payload: { search } --> filters: month, drop_id
    getProductDetailsSuccess: ['payload'], // payload: { data }
    getProductDetailsFailure: ['payload'], // payload: { errors }
    exportInterestsRequest: ['payload'], // payload: { product_id }
    exportInterestsSuccess: ['payload'], // payload: { file }
    exportInterestsFailure: ['payload'], // payload: { errors }
    clearProductDetails: null, // payload: { errors }
    updateProductSaved: ['payload'], // payload: { product }
    updateProductShopifyUrl: ['payload'], // payload: { shopify_redirect_url }
  },
  { prefix: '/dropship/product/' },
);

export const ProductDetailsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  errors: false,
  productDetails: {},
  fileFetching: false,
  fileErrors: null,
});

/* ------------- Functions for reducer cases ------------- */

const getProductDetailsRequest = (state) =>
  state.merge({ loading: true });

const getProductDetailsSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, productDetails: data });

const getProductDetailsFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });

const exportInterestsRequest = (state) =>
  state.merge({ fileFetching: true });

const exportInterestsSuccess = (state) =>
  state.merge({ fileFetching: false });

const exportInterestsFailure = (state, { payload: { errors } }) =>
  state.merge({ fileFetching: false, fileErrors: errors });

const clearProductDetails = (state) =>
  state.merge({ ...INITIAL_STATE });

const updateProductSaved = (state, { payload: { product } }) => {
  return state.setIn(['productDetails', 'saved'], product.saved);
}

const updateProductShopifyUrl = (state, { payload: { shopify_redirect_url } }) => {
  return state.setIn(['productDetails', 'shopify_redirect_url'], shopify_redirect_url);
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PRODUCT_DETAILS_REQUEST]: getProductDetailsRequest,
  [Types.GET_PRODUCT_DETAILS_SUCCESS]: getProductDetailsSuccess,
  [Types.GET_PRODUCT_DETAILS_FAILURE]: getProductDetailsFailure,

  [Types.EXPORT_INTERESTS_REQUEST]: exportInterestsRequest,
  [Types.EXPORT_INTERESTS_SUCCESS]: exportInterestsSuccess,
  [Types.EXPORT_INTERESTS_FAILURE]: exportInterestsFailure,
  [Types.CLEAR_PRODUCT_DETAILS]: clearProductDetails,

  [Types.UPDATE_PRODUCT_SAVED]: updateProductSaved,
  [Types.UPDATE_PRODUCT_SHOPIFY_URL]: updateProductShopifyUrl,
});
