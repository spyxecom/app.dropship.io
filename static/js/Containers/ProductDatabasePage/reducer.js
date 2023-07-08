import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    deleteTrackingStoreDatabaseByIDRequest: ['payload'],
    deleteTrackingStoreDatabaseByIDSuccess: ['payload'],
    deleteTrackingStoreDatabaseByIDFailure: ['payload'],

    createTrackingStoreDatabaseRequest: ['payload'],
    createTrackingStoreDatabaseSuccess: ['payload'],
    createTrackingStoreDatabaseFailure: ['payload'],

    deleteTrackingProductDatabaseByIDRequest: ['payload'],
    deleteTrackingProductDatabaseByIDSuccess: ['payload'],
    deleteTrackingProductDatabaseByIDFailure: ['payload'],

    createTrackingProductDatabaseRequest: ['payload'],
    createTrackingProductDatabaseSuccess: ['payload'],
    createTrackingProductDatabaseFailure: ['payload'],

    getProductDatabaseFiltersRequest: null,
    getProductDatabaseFiltersSuccess: ['payload'], // payload: { data }
    getProductDatabaseFiltersFailure: ['payload'], // payload: { errors },

    getProductDatabasePresetsRequest: null,
    getProductDatabasePresetsSuccess: ['payload'],
    getProductDatabasePresetsFailure: ['payload'],

    createProductDatabasePresetRequest: ['payload'],
    createProductDatabasePresetSuccess: ['payload'],
    createProductDatabasePresetFailure: ['payload'],

    resetCreateResult: null,

    resetDeleteResult: null,

    resetCreateError: null,

    setCompetitorResearch: ['payload'],

    deleteProductDatabasePresetRequest: ['payload'],
    deleteProductDatabasePresetSuccess: ['payload'],
    deleteProductDatabasePresetFailure: ['payload'],

    cancelDeleteProductDatabasePresetRequest: ['payload'],
    cancelDeleteProductDatabasePresetSuccess: ['payload'],
    cancelDeleteProductDatabasePresetFailure: ['payload'],

    updateProductDatabasePresetRequest: ['payload'],
    updateProductDatabasePresetSuccess: ['payload'],
    updateProductDatabasePresetFailure: ['payload'],

    getProductsDatabaseRequest: ['payload'],
    getProductsDatabaseSuccess: ['payload'],
    getProductsDatabaseFailure: ['payload'],
    resetProductsDatabase: null,

    getProductChartRequest: ['payload'],
    getProductChartSuccess: ['payload'],
    getProductChartFailure: ['payload'],
  }
);

export const ProductDatabaseTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  filtersLoading: false,
  productsLoading: false,
  chartLoading: false,
  errors: false,
  createError: false,
  createResult: false,
  deleteResult: false,
  competitor: false,
  filters: {},
  presets: {},
  products: {},
  chartData: {},
  attemptsLeft: null,
});

/* ------------- Functions for reducer cases ------------- */

const deleteTrackingStoreDatabaseByIDRequest = (state) =>
  state.merge({ loading: true })

const deleteTrackingStoreDatabaseByIDSuccess = (state, { payload: data }) => {
  let newProducts = [...state?.products?.results].map(el => {
    if (+el?.store?.id === +data?.store?.id) return {...el, store: {...el?.store, is_tracked: false}}
    else return el
  });
  return state.merge({ loading: false, products: {...state?.products, results: newProducts} })
}

const deleteTrackingStoreDatabaseByIDFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors })

const createTrackingStoreDatabaseRequest = (state) =>
  state.merge({ loading: true })

const createTrackingStoreDatabaseSuccess = (state, { payload: data }) => {
  let newProducts = [...state?.products?.results].map(el => {
    if (+el?.store?.id === +data.id) return {...el, store: {...el?.store, is_tracked: true}}
    else return el
  });
  return state.merge({ loading: false, products: {...state?.products, results: newProducts} })
}

const createTrackingStoreDatabaseFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors })

const deleteTrackingProductDatabaseByIDRequest = (state) =>
  state.merge({ loading: true })

const deleteTrackingProductDatabaseByIDSuccess = (state, { payload: data }) => {
  let newProducts = [...state?.products?.results].map(el => {
    if (el.id === data.id) return {...el, is_tracked: false}
    else return el
  });
  return state.merge({ loading: false, products: {...state?.products, results: newProducts} })
}

const deleteTrackingProductDatabaseByIDFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors })

const createTrackingProductDatabaseRequest = (state) =>
  state.merge({ loading: true })

const createTrackingProductDatabaseSuccess = (state, { payload: data }) => {
  let newProducts = [...state?.products?.results].map(el => {
    if (+el.id === +data.id || +el?.product_id === +data?.product_id) return {...el, is_tracked: true}
    else return el
  });
  return state.merge({ loading: false, products: {...state?.products, results: newProducts} })
}

const createTrackingProductDatabaseFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors })


const getProductChartRequest = (state) =>
  state.merge({ chartLoading: true, chartData: {} });

const getProductChartSuccess = (state, { payload: data }) =>
  state.merge({ chartLoading: false, chartData: data });

const getProductChartFailure = (state, { payload: { errors } }) =>
  state.merge({ chartLoading: false, errors })

const getProductDatabaseFiltersRequest = (state) =>
  state.merge({ filtersLoading: true });

const getProductDatabaseFiltersSuccess = (state, { payload: data }) =>
  state.merge({ filtersLoading: false, filters: data });

const getProductDatabaseFiltersFailure = (state, { payload: { errors } }) =>
  state.merge({ filtersLoading: false, errors })


const getProductDatabasePresetsRequest = (state) =>
  state.merge({ loading: true });

const getProductDatabasePresetsSuccess = (state, { payload: data }) => {
  const {attempts_left, ...presets} = data

  return  state.merge({ loading: false, attemptsLeft: attempts_left,
    presets: { users: [...presets.users], dropship: [...presets.dropship].filter(el => el.id !== 'e6807e18-9577-47ea-afe7-52aec890999d') } });
}

const getProductDatabasePresetsFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });


const resetCreateResult = (state) =>
  state.merge({ createResult: false })

const resetCreateError = (state) =>
  state.merge({ createError: false  })

const resetDeleteResult = (state) =>
  state.merge({ deleteResult: false })

const setCompetitorResearch = (state, { payload: data }) =>
  state.merge({ competitor: data })

const createProductDatabasePresetRequest = (state) =>
  state.merge({ loading: true, createError: false, createResult: false });

const createProductDatabasePresetSuccess = (state, { payload: data }) => {
  const newUserPresets = [data, ...state.presets?.users]
  return state.merge({loading: false, presets: {...state.presets, users: newUserPresets}, createError: false, createResult: true });
}
const createProductDatabasePresetFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, createError: errors, createResult: false });


const deleteProductDatabasePresetRequest = (state) =>
  state.merge({ loading: true, deleteResult: false });

const deleteProductDatabasePresetSuccess = (state, { payload: id }) => {
  const deletePreset = [...state.presets?.users.filter(el => el.id === id)]
  const newUserPresets = [...state.presets?.users.filter(el => el.id !== id)]
  return state.merge({loading: false, presets: {...state.presets, users: newUserPresets}, deleteResult: deletePreset[0]});
}
const deleteProductDatabasePresetFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors, deleteResult: false });


const cancelDeleteProductDatabasePresetRequest = (state) =>
  state.merge({ loading: true });

const cancelDeleteProductDatabasePresetSuccess = (state, { payload: record }) => {
  const newUserPresets = [...state.presets?.users, record]
  return state.merge({loading: false, presets: {...state.presets, users: newUserPresets}, deleteResult: false });
}
const cancelDeleteProductDatabasePresetFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });

const updateProductDatabasePresetRequest = (state) =>
  state.merge({ loading: true });

const updateProductDatabasePresetSuccess = (state, { payload: data }) => {
  const newUserPresets = [...state.presets?.users.map(el => {
    if (el.id === data.id) return data
    else return el
  })]
  return state.merge({loading: false, presets: {...state.presets, users: newUserPresets} });
}
const updateProductDatabasePresetFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });


const getProductsDatabaseRequest = (state) =>
  state.merge({ productsLoading: true });

const getProductsDatabaseSuccess = (state, { payload: data }) => {
  const {attempts_left, ...products} = data
 return state.merge({ productsLoading: false, attemptsLeft: attempts_left, products: { ...products } });
}

const getProductsDatabaseFailure = (state, { payload: { errors } }) =>
  state.merge({ productsLoading: false, errors, products: {} });

const resetProductsDatabase = (state) =>
  state.merge({  products: {} });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PRODUCT_DATABASE_FILTERS_REQUEST]: getProductDatabaseFiltersRequest,
  [Types.GET_PRODUCT_DATABASE_FILTERS_SUCCESS]: getProductDatabaseFiltersSuccess,
  [Types.GET_PRODUCT_DATABASE_FILTERS_FAILURE]: getProductDatabaseFiltersFailure,

  [Types.GET_PRODUCT_DATABASE_PRESETS_REQUEST]: getProductDatabasePresetsRequest,
  [Types.GET_PRODUCT_DATABASE_PRESETS_SUCCESS]: getProductDatabasePresetsSuccess,
  [Types.GET_PRODUCT_DATABASE_PRESETS_FAILURE]: getProductDatabasePresetsFailure,

  [Types.CREATE_PRODUCT_DATABASE_PRESET_REQUEST]: createProductDatabasePresetRequest,
  [Types.CREATE_PRODUCT_DATABASE_PRESET_SUCCESS]: createProductDatabasePresetSuccess,
  [Types.CREATE_PRODUCT_DATABASE_PRESET_FAILURE]: createProductDatabasePresetFailure,

  [Types.DELETE_PRODUCT_DATABASE_PRESET_REQUEST]: deleteProductDatabasePresetRequest,
  [Types.DELETE_PRODUCT_DATABASE_PRESET_SUCCESS]: deleteProductDatabasePresetSuccess,
  [Types.DELETE_PRODUCT_DATABASE_PRESET_FAILURE]: deleteProductDatabasePresetFailure,

  [Types.CANCEL_DELETE_PRODUCT_DATABASE_PRESET_REQUEST]: cancelDeleteProductDatabasePresetRequest,
  [Types.CANCEL_DELETE_PRODUCT_DATABASE_PRESET_SUCCESS]: cancelDeleteProductDatabasePresetSuccess,
  [Types.CANCEL_DELETE_PRODUCT_DATABASE_PRESET_FAILURE]: cancelDeleteProductDatabasePresetFailure,

  [Types.UPDATE_PRODUCT_DATABASE_PRESET_REQUEST]: updateProductDatabasePresetRequest,
  [Types.UPDATE_PRODUCT_DATABASE_PRESET_SUCCESS]: updateProductDatabasePresetSuccess,
  [Types.UPDATE_PRODUCT_DATABASE_PRESET_FAILURE]: updateProductDatabasePresetFailure,

  [Types.GET_PRODUCTS_DATABASE_REQUEST]: getProductsDatabaseRequest,
  [Types.GET_PRODUCTS_DATABASE_SUCCESS]: getProductsDatabaseSuccess,
  [Types.GET_PRODUCTS_DATABASE_FAILURE]: getProductsDatabaseFailure,
  [Types.RESET_PRODUCTS_DATABASE]: resetProductsDatabase,

  [Types.GET_PRODUCT_CHART_REQUEST]: getProductChartRequest,
  [Types.GET_PRODUCT_CHART_SUCCESS]: getProductChartSuccess,
  [Types.GET_PRODUCT_CHART_FAILURE]: getProductChartFailure,

  [Types.DELETE_TRACKING_STORE_DATABASE_BY_ID_REQUEST]: deleteTrackingStoreDatabaseByIDRequest,
  [Types.DELETE_TRACKING_STORE_DATABASE_BY_ID_SUCCESS]: deleteTrackingStoreDatabaseByIDSuccess,
  [Types.DELETE_TRACKING_STORE_DATABASE_BY_ID_FAILURE]: deleteTrackingStoreDatabaseByIDFailure,

  [Types.CREATE_TRACKING_STORE_DATABASE_REQUEST]: createTrackingStoreDatabaseRequest,
  [Types.CREATE_TRACKING_STORE_DATABASE_SUCCESS]: createTrackingStoreDatabaseSuccess,
  [Types.CREATE_TRACKING_STORE_DATABASE_FAILURE]: createTrackingStoreDatabaseFailure,

  [Types.DELETE_TRACKING_PRODUCT_DATABASE_BY_ID_REQUEST]: deleteTrackingProductDatabaseByIDRequest,
  [Types.DELETE_TRACKING_PRODUCT_DATABASE_BY_ID_SUCCESS]: deleteTrackingProductDatabaseByIDSuccess,
  [Types.DELETE_TRACKING_PRODUCT_DATABASE_BY_ID_FAILURE]: deleteTrackingProductDatabaseByIDFailure,

  [Types.CREATE_TRACKING_PRODUCT_DATABASE_REQUEST]: createTrackingProductDatabaseRequest,
  [Types.CREATE_TRACKING_PRODUCT_DATABASE_SUCCESS]: createTrackingProductDatabaseSuccess,
  [Types.CREATE_TRACKING_PRODUCT_DATABASE_FAILURE]: createTrackingProductDatabaseFailure,

  [Types.RESET_CREATE_RESULT]: resetCreateResult,

  [Types.RESET_DELETE_RESULT]: resetDeleteResult,

  [Types.RESET_CREATE_ERROR]: resetCreateError,

  [Types.SET_COMPETITOR_RESEARCH]: setCompetitorResearch,

});
