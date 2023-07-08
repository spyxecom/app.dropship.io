import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    deleteTrackingStoreCompetitorsByIDRequest: ['payload'],
    deleteTrackingStoreCompetitorsByIDSuccess: ['payload'],
    deleteTrackingStoreCompetitorsByIDFailure: ['payload'],

    createTrackingStoreCompetitorsRequest: ['payload'],
    createTrackingStoreCompetitorsSuccess: ['payload'],
    createTrackingStoreCompetitorsFailure: ['payload'],

    deleteTrackingProductCompetitorsByIDRequest: ['payload'],
    deleteTrackingProductCompetitorsByIDSuccess: ['payload'],
    deleteTrackingProductCompetitorsByIDFailure: ['payload'],

    createTrackingProductCompetitorsRequest: ['payload'],
    createTrackingProductCompetitorsSuccess: ['payload'],
    createTrackingProductCompetitorsFailure: ['payload'],

    getCompetitorsFiltersRequest: null,
    getCompetitorsFiltersSuccess: ['payload'], // payload: { data }
    getCompetitorsFiltersFailure: ['payload'], // payload: { errors },

    getCompetitorsPresetsRequest: null,
    getCompetitorsPresetsSuccess: ['payload'],
    getCompetitorsPresetsFailure: ['payload'],

    createCompetitorsPresetRequest: ['payload'],
    createCompetitorsPresetSuccess: ['payload'],
    createCompetitorsPresetFailure: ['payload'],

    resetCreateResult: null,

    resetDeleteResult: null,

    resetCreateError: null,

    deleteCompetitorsPresetRequest: ['payload'],
    deleteCompetitorsPresetSuccess: ['payload'],
    deleteCompetitorsPresetFailure: ['payload'],

    cancelDeleteCompetitorsPresetRequest: ['payload'],
    cancelDeleteCompetitorsPresetSuccess: ['payload'],
    cancelDeleteCompetitorsPresetFailure: ['payload'],

    updateCompetitorsPresetRequest: ['payload'],
    updateCompetitorsPresetSuccess: ['payload'],
    updateCompetitorsPresetFailure: ['payload'],

    getCompetitorsRequest: ['payload'],
    getCompetitorsSuccess: ['payload'],
    getCompetitorsFailure: ['payload'],

    getShopifyCountRequest: ['payload'],
    getShopifyCountSuccess: ['payload'],
    getShopifyCountFailure: ['payload'],
  }
);

export const CompetitorsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  filtersLoading: false,
  productsLoading: false,
  errors: false,
  createError: false,
  createResult: false,
  deleteResult: false,
  filters: {},
  presets: {},
  products: {},
  count: null,
  attemptsLeft: null,
});

/* ------------- Functions for reducer cases ------------- */

const deleteTrackingStoreCompetitorsByIDRequest = (state) =>
  state.merge({ loading: true })

const deleteTrackingStoreCompetitorsByIDSuccess = (state, { payload: data }) => {
  let newProducts = [...state?.products?.results].map(el => {
    if (+el?.store?.id === +data?.store?.id) return {...el, store: {...el?.store, is_tracked: false}}
    else return el
  });
  return state.merge({ loading: false, products: {...state?.products, results: newProducts} })
}

const deleteTrackingStoreCompetitorsByIDFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors })

const createTrackingStoreCompetitorsRequest = (state) =>
  state.merge({ loading: true })

const createTrackingStoreCompetitorsSuccess = (state, { payload: data }) => {
  let newProducts = [...state?.products?.results].map(el => {
    if (+el?.store?.id === +data.id) return {...el, store: {...el?.store, is_tracked: true}}
    else return el
  });
  return state.merge({ loading: false, products: {...state?.products, results: newProducts} })
}

const createTrackingStoreCompetitorsFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors })

const deleteTrackingProductCompetitorsByIDRequest = (state) =>
  state.merge({ loading: true })

const deleteTrackingProductCompetitorsByIDSuccess = (state, { payload: data }) => {
  let newProducts = [...state?.products?.results].map(el => {
    if (el.id === data.id) return {...el, is_tracked: false}
    else return el
  });
  return state.merge({ loading: false, products: {...state?.products, results: newProducts} })
}

const deleteTrackingProductCompetitorsByIDFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors })

const createTrackingProductCompetitorsRequest = (state) =>
  state.merge({ loading: true })

const createTrackingProductCompetitorsSuccess = (state, { payload: data }) => {
  let newProducts = [...state?.products?.results].map(el => {
    if (+el.id === +data.id || +el?.id === +data?.product_id) return {...el, is_tracked: true}
    else return el
  });
  return state.merge({ loading: false, products: {...state?.products, results: newProducts} })
}

const createTrackingProductCompetitorsFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors })


const getShopifyCountRequest = (state) => state.merge({ countLoading: true });

const getShopifyCountSuccess = (state, { payload: data }) =>
  state.merge({ countLoading: false, count: data });

const getShopifyCountFailure = (state, { payload: { errors } }) =>
  state.merge({ countLoading: false, errors });

const getCompetitorsFiltersRequest = (state) =>
  state.merge({ filtersLoading: true });

const getCompetitorsFiltersSuccess = (state, { payload: data }) =>
  state.merge({ filtersLoading: false, filters: data });

const getCompetitorsFiltersFailure = (state, { payload: { errors } }) =>
  state.merge({ filtersLoading: false, errors })



const getCompetitorsPresetsRequest = (state) =>
  state.merge({ loading: true });

const getCompetitorsPresetsSuccess = (state, { payload: data }) => {
  const {attempts_left, ...presets} = data
  return  state.merge({ loading: false, attemptsLeft: attempts_left, presets: { ...presets } });
}

const getCompetitorsPresetsFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });


const resetCreateResult = (state) =>
  state.merge({createResult: false})

const resetCreateError = (state) =>
  state.merge({createError: false})

const resetDeleteResult = (state) =>
  state.merge({deleteResult: false})

const createCompetitorsPresetRequest = (state) =>
  state.merge({ loading: true, createError: false, createResult: false });

const createCompetitorsPresetSuccess = (state, { payload: data }) => {
  const newUserPresets = [data, ...state.presets?.users]
  return state.merge({loading: false, presets: {...state.presets, users: newUserPresets}, createError: false, createResult: true });
}
const createCompetitorsPresetFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, createError: errors, createResult: false });



const deleteCompetitorsPresetRequest = (state) =>
  state.merge({ loading: true, deleteResult: false });

const deleteCompetitorsPresetSuccess = (state, { payload: id }) => {
  const deletePreset = [...state.presets?.users.filter(el => el.id === id)]
  const newUserPresets = [...state.presets?.users.filter(el => el.id !== id)]
  return state.merge({loading: false, presets: {...state.presets, users: newUserPresets}, deleteResult: deletePreset[0]});
}
const deleteCompetitorsPresetFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors, deleteResult: false });



const cancelDeleteCompetitorsPresetRequest = (state) =>
  state.merge({ loading: true });

const cancelDeleteCompetitorsPresetSuccess = (state, { payload: record }) => {
  const newUserPresets = [...state.presets?.users, record]
  return state.merge({loading: false, presets: {...state.presets, users: newUserPresets}, deleteResult: false });
}
const cancelDeleteCompetitorsPresetFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });



const updateCompetitorsPresetRequest = (state) =>
  state.merge({ loading: true });

const updateCompetitorsPresetSuccess = (state, { payload: data }) => {
  const newUserPresets = [...state.presets?.users.map(el => {
    if (el.id === data.id) return data
    else return el
  })]
  return state.merge({loading: false, presets: {...state.presets, users: newUserPresets} });
}
const updateCompetitorsPresetFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });



const getCompetitorsRequest = (state) =>
  state.merge({ productsLoading: true });

const getCompetitorsSuccess = (state, { payload: data }) => {
  const {attempts_left, ...products} = data
  return state.merge({ productsLoading: false, attemptsLeft: attempts_left, products: { ...products}});
}

const getCompetitorsFailure = (state, { payload: { errors } }) =>
  state.merge({ productsLoading: false, errors, products: [] });
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {

  [Types.DELETE_TRACKING_STORE_COMPETITORS_BY_ID_REQUEST]: deleteTrackingStoreCompetitorsByIDRequest,
  [Types.DELETE_TRACKING_STORE_COMPETITORS_BY_ID_SUCCESS]: deleteTrackingStoreCompetitorsByIDSuccess,
  [Types.DELETE_TRACKING_STORE_COMPETITORS_BY_ID_FAILURE]: deleteTrackingStoreCompetitorsByIDFailure,

  [Types.CREATE_TRACKING_STORE_COMPETITORS_REQUEST]: createTrackingStoreCompetitorsRequest,
  [Types.CREATE_TRACKING_STORE_COMPETITORS_SUCCESS]: createTrackingStoreCompetitorsSuccess,
  [Types.CREATE_TRACKING_STORE_COMPETITORS_FAILURE]: createTrackingStoreCompetitorsFailure,

  [Types.DELETE_TRACKING_PRODUCT_COMPETITORS_BY_ID_REQUEST]: deleteTrackingProductCompetitorsByIDRequest,
  [Types.DELETE_TRACKING_PRODUCT_COMPETITORS_BY_ID_SUCCESS]: deleteTrackingProductCompetitorsByIDSuccess,
  [Types.DELETE_TRACKING_PRODUCT_COMPETITORS_BY_ID_FAILURE]: deleteTrackingProductCompetitorsByIDFailure,

  [Types.CREATE_TRACKING_PRODUCT_COMPETITORS_REQUEST]: createTrackingProductCompetitorsRequest,
  [Types.CREATE_TRACKING_PRODUCT_COMPETITORS_SUCCESS]: createTrackingProductCompetitorsSuccess,
  [Types.CREATE_TRACKING_PRODUCT_COMPETITORS_FAILURE]: createTrackingProductCompetitorsFailure,

  [Types.GET_COMPETITORS_FILTERS_REQUEST]: getCompetitorsFiltersRequest,
  [Types.GET_COMPETITORS_FILTERS_SUCCESS]: getCompetitorsFiltersSuccess,
  [Types.GET_COMPETITORS_FILTERS_FAILURE]: getCompetitorsFiltersFailure,

  [Types.GET_COMPETITORS_PRESETS_REQUEST]: getCompetitorsPresetsRequest,
  [Types.GET_COMPETITORS_PRESETS_SUCCESS]: getCompetitorsPresetsSuccess,
  [Types.GET_COMPETITORS_PRESETS_FAILURE]: getCompetitorsPresetsFailure,

  [Types.CREATE_COMPETITORS_PRESET_REQUEST]: createCompetitorsPresetRequest,
  [Types.CREATE_COMPETITORS_PRESET_SUCCESS]: createCompetitorsPresetSuccess,
  [Types.CREATE_COMPETITORS_PRESET_FAILURE]: createCompetitorsPresetFailure,

  [Types.DELETE_COMPETITORS_PRESET_REQUEST]: deleteCompetitorsPresetRequest,
  [Types.DELETE_COMPETITORS_PRESET_SUCCESS]: deleteCompetitorsPresetSuccess,
  [Types.DELETE_COMPETITORS_PRESET_FAILURE]: deleteCompetitorsPresetFailure,

  [Types.CANCEL_DELETE_COMPETITORS_PRESET_REQUEST]: cancelDeleteCompetitorsPresetRequest,
  [Types.CANCEL_DELETE_COMPETITORS_PRESET_SUCCESS]: cancelDeleteCompetitorsPresetSuccess,
  [Types.CANCEL_DELETE_COMPETITORS_PRESET_FAILURE]: cancelDeleteCompetitorsPresetFailure,

  [Types.UPDATE_COMPETITORS_PRESET_REQUEST]: updateCompetitorsPresetRequest,
  [Types.UPDATE_COMPETITORS_PRESET_SUCCESS]: updateCompetitorsPresetSuccess,
  [Types.UPDATE_COMPETITORS_PRESET_FAILURE]: updateCompetitorsPresetFailure,

  [Types.GET_COMPETITORS_REQUEST]: getCompetitorsRequest,
  [Types.GET_COMPETITORS_SUCCESS]: getCompetitorsSuccess,
  [Types.GET_COMPETITORS_FAILURE]: getCompetitorsFailure,

  [Types.RESET_CREATE_RESULT]: resetCreateResult,

  [Types.RESET_DELETE_RESULT]: resetDeleteResult,

  [Types.RESET_CREATE_ERROR]: resetCreateError,

  [Types.GET_SHOPIFY_COUNT_REQUEST]: getShopifyCountRequest,
  [Types.GET_SHOPIFY_COUNT_SUCCESS]: getShopifyCountSuccess,
  [Types.GET_SHOPIFY_COUNT_FAILURE]: getShopifyCountFailure,

});
