import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    getShopifyStoresRequest: null,
    getShopifyStoresSuccess: ['payload'], // payload: { data }
    getShopifyStoresFailure: ['payload'], // payload: { errors }

    getShopifyStoreInfoRequest: ['payload'], // // payload: { data }
    getShopifyStoreInfoSuccess: ['payload'], // payload: { data }
    getShopifyStoreInfoFailure: ['payload'], // payload: { errors }

    getBundlesRequest: null,
    getBundlesSuccess: ['payload'], // payload: { data }
    getBundlesFailure: ['payload'], // payload: { errors }

    verifyShopifyStoreRequest: ['payload'], // payload: { verify_params }
    verifyShopifyStoreSuccess: ['payload'], // payload: { data }
    verifyShopifyStoreFailure: ['payload'], // payload: { errors }
    verifyShopifyStoreReset: null,

    deleteShopifyStoreRequest: ['payload'], // payload: { store_id }
    deleteShopifyStoreSuccess: ['payload'], // payload: { data }
    deleteShopifyStoreFailure: ['payload'], // payload: { errors }
    deleteShopifyStoreReset: null,

    createChargeShopifyStoreRequest: ['payload'], // payload: { data }
    createChargeShopifyStoreSuccess: ['payload'], // payload: { data }
    createChargeShopifyStoreFailure: ['payload'], // payload: { errors }
    createChargeShopifyStoreReset: null,

    checkChargeShopifyRequest: ['payload'], // payload: { charge_id }
    checkChargeShopifySuccess: ['payload'], // payload: { data }
    checkChargeShopifyFailure: ['payload'], // payload: { errors }
    checkChargeShopifyReset: null,

    importProductShopifyStoreRequest: ['payload'], // payload: { shop_id, product_id }
    importProductShopifyStoreSuccess: ['payload'], // payload: { data }
    importProductShopifyStoreFailure: ['payload'], // payload: { errors }
    importProductShopifyStoreReset: null,

    changeVisibleModalShopify: ['payload'], // payload: { isVisibleModal, initialUrl, importProductId }
    logout: null,

    resetOauth: null,

    checkOauthRequest: ['payload'],
    checkOauthSuccess: ['payload'],
    checkOauthFailure: ['payload'],
  },
);

export const ShopifyStoreTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  loading: false,
  errors: false,
  results: [],
  bundles: [],

  checkOauth: null,
  checkOauthErrors: '',

  shopLoading: false,
  shopErrors: false,
  shop: null,

  verifyResult: false,
  verifyErrors: false,

  deleteResult: false,
  deleteErrors: false,

  createChargeResult: false,
  createChargeErrors: false,

  checkChargeResult: false,
  checkChargeErrors: false,

  importResult: false,
  importErrors: false,
  isTrial: false,

  isVisibleModal: null,
  initialUrl: null,
  importProductId: null,
});

/* ------------- Selectors ------------- */
export const ShopifyStoreSelectors = {
  getStores: (state) => state.results,
};

/* ------------- Functions for reducer cases ------------- */
const checkOauthRequest = (state) =>
  state.merge({ loading: true })

const checkOauthSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, checkOauth: data?.oauth_needed })

const checkOauthFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, checkOauthErrors: errors })

const resetOauth = (state) =>
  state.merge({ checkOauth: null, checkOauthErrors: '' })


const getShopifyStoresRequest = (state) =>
  state.merge({ loading: true, errors: false });

const getShopifyStoresSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, results: data?.results });

const getShopifyStoresFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });

const getShopifyStoreInfoRequest = (state) =>
  state.merge({ shopLoading: true, shopErrors: false });

const getShopifyStoreInfoSuccess = (state, { payload: data }) =>
  state.merge({ shopLoading: false, shop: data });

const getShopifyStoreInfoFailure = (state, { payload: { errors } }) =>
  state.merge({ shopLoading: false, shopErrors: errors });

const getBundlesRequest = (state) =>
  state.merge({ loading: true, errors: false });

const getBundlesSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, bundles: data });

const getBundlesFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });

const verifyShopifyStoreRequest = (state, { payload: verify_params }) =>
  state.merge({ loading: true, verifyErrors: false, verifyResult: false });

const verifyShopifyStoreSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, results: data?.results, verifyResult: true });

const verifyShopifyStoreFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, verifyErrors: errors });

const verifyShopifyStoreReset = (state) =>
  state.merge({ loading: false, verifyErrors: false, verifyResult: false });

const deleteShopifyStoreRequest = (state, { payload: { store_id } }) =>
  state.merge({ loading: true, deleteErrors: false, deleteResult: false });

const deleteShopifyStoreSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, results: data?.results, deleteResult: true });

const deleteShopifyStoreFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, deleteErrors: errors });

const deleteShopifyStoreReset = (state) =>
  state.merge({ loading: false, deleteErrors: false, deleteResult: false });

const importProductShopifyStoreRequest = (state, { payload: data }) =>
  state.merge({ loading: true, importErrors: false, importResult: false });

const importProductShopifyStoreSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, importResult: true, isTrial: !!data?.isTrial});

const importProductShopifyStoreFailure = (state, { payload: {errors}  }) =>
  state.merge({ loading: false, importErrors: errors });

const importProductShopifyStoreReset = (state) =>
  state.merge({ loading: false, importErrors: false, importResult: false, isTrial: false });

const createChargeShopifyStoreRequest = (state, { payload: data }) =>
  state.merge({ loading: true, createChargeErrors: false, createChargeResult: false });

const createChargeShopifyStoreSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, createChargeResult: true });

const createChargeShopifyStoreFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, createChargeErrors: errors });

const createChargeShopifyStoreReset = (state) =>
  state.merge({ loading: false, createChargeErrors: false, createChargeResult: false });

const checkChargeShopifyRequest  = (state, { payload: data }) =>
  state.merge({ loading: true, checkChargeErrors: false, checkChargeResult: false });

const checkChargeShopifySuccess  = (state, { payload: data }) =>
  state.merge({ loading: false, checkChargeResult: true });

const checkChargeShopifyFailure  = (state, { payload: errors }) =>
  state.merge({ loading: false, checkChargeErrors: errors });

const checkChargeShopifyReset  = (state, { payload: data }) =>
  state.merge({ loading: false, checkChargeErrors: false, checkChargeResult: false });

const changeVisibleModal = (state, { payload: { isVisibleModal, initialUrl, importProductId } }) =>
  state.merge({ isVisibleModal, initialUrl, importProductId });

export const logout = (state) => state.merge({ ...INITIAL_STATE });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SHOPIFY_STORES_REQUEST]: getShopifyStoresRequest,
  [Types.GET_SHOPIFY_STORES_SUCCESS]: getShopifyStoresSuccess,
  [Types.GET_SHOPIFY_STORES_FAILURE]: getShopifyStoresFailure,

  [Types.GET_SHOPIFY_STORE_INFO_REQUEST]: getShopifyStoreInfoRequest,
  [Types.GET_SHOPIFY_STORE_INFO_SUCCESS]: getShopifyStoreInfoSuccess,
  [Types.GET_SHOPIFY_STORE_INFO_FAILURE]: getShopifyStoreInfoFailure,

  [Types.GET_BUNDLES_REQUEST]: getBundlesRequest,
  [Types.GET_BUNDLES_SUCCESS]: getBundlesSuccess,
  [Types.GET_BUNDLES_FAILURE]: getBundlesFailure,

  [Types.VERIFY_SHOPIFY_STORE_REQUEST]: verifyShopifyStoreRequest,
  [Types.VERIFY_SHOPIFY_STORE_SUCCESS]: verifyShopifyStoreSuccess,
  [Types.VERIFY_SHOPIFY_STORE_FAILURE]: verifyShopifyStoreFailure,
  [Types.VERIFY_SHOPIFY_STORE_RESET]: verifyShopifyStoreReset,

  [Types.DELETE_SHOPIFY_STORE_REQUEST]: deleteShopifyStoreRequest,
  [Types.DELETE_SHOPIFY_STORE_SUCCESS]: deleteShopifyStoreSuccess,
  [Types.DELETE_SHOPIFY_STORE_FAILURE]: deleteShopifyStoreFailure,
  [Types.DELETE_SHOPIFY_STORE_RESET]: deleteShopifyStoreReset,

  [Types.CREATE_CHARGE_SHOPIFY_STORE_REQUEST]: createChargeShopifyStoreRequest,
  [Types.CREATE_CHARGE_SHOPIFY_STORE_SUCCESS]: createChargeShopifyStoreSuccess,
  [Types.CREATE_CHARGE_SHOPIFY_STORE_FAILURE]: createChargeShopifyStoreFailure,
  [Types.CREATE_CHARGE_SHOPIFY_STORE_RESET]: createChargeShopifyStoreReset,

  [Types.CHECK_CHARGE_SHOPIFY_REQUEST]: checkChargeShopifyRequest,
  [Types.CHECK_CHARGE_SHOPIFY_SUCCESS]: checkChargeShopifySuccess,
  [Types.CHECK_CHARGE_SHOPIFY_FAILURE]: checkChargeShopifyFailure,
  [Types.CHECK_CHARGE_SHOPIFY_RESET]: checkChargeShopifyReset,

  [Types.IMPORT_PRODUCT_SHOPIFY_STORE_REQUEST]: importProductShopifyStoreRequest,
  [Types.IMPORT_PRODUCT_SHOPIFY_STORE_SUCCESS]: importProductShopifyStoreSuccess,
  [Types.IMPORT_PRODUCT_SHOPIFY_STORE_FAILURE]: importProductShopifyStoreFailure,
  [Types.IMPORT_PRODUCT_SHOPIFY_STORE_RESET]: importProductShopifyStoreReset,

  [Types.CHANGE_VISIBLE_MODAL_SHOPIFY]: changeVisibleModal,
  [Types.LOGOUT]: logout,

  [Types.RESET_OAUTH]: resetOauth,

  [Types.CHECK_OAUTH_REQUEST]: checkOauthRequest,
  [Types.CHECK_OAUTH_SUCCESS]: checkOauthSuccess,
  [Types.CHECK_OAUTH_FAILURE]: checkOauthFailure,
});
