import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {

    getAdminSalesReportRequest: ['payload'],
    getAdminSalesReportSuccess: ['payload'],
    getAdminSalesReportFailure: ['payload'],

    getAdminRevenueReportRequest: ['payload'],
    getAdminRevenueReportSuccess: ['payload'],
    getAdminRevenueReportFailure: ['payload'],

    getAdminDetailedStoreInfoCheckRequest: ['payload'],
    getAdminDetailedStoreInfoCheckSuccess: ['payload'],
    getAdminDetailedStoreInfoCheckFailure: ['payload'],

    getAdminTrackingStoresRequest: ['payload'],
    getAdminTrackingStoresSuccess: ['payload'],
    getAdminTrackingStoresFailure: ['payload'],

    getAdminDetailedStoreInfoRequest: ['payload'],
    getAdminDetailedStoreInfoSuccess: ['payload'],
    getAdminDetailedStoreInfoFailure: ['payload'],

    getAdminProductListByStoreRequest: ['payload'],
    getAdminProductListByStoreSuccess: ['payload'],
    getAdminProductListByStoreFailure: ['payload'],

    resetIsAvailable: null,
    resetErrors: null,
    setAdminFilters: ['payload'],
    setAdminCheckedList: ['payload'],
    resetStores: null,

    getAdminExpandableChartRequest: ['payload'],
    getAdminExpandableChartSuccess: ['payload'],
    getAdminExpandableChartFailure: ['payload'],

    logout: null,
  }
);

export const AdminStoreTableTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  errors: false,
  filtersLoading: false,
  fileLoading: false,
  searchErrors: '',
  lastSuccessfulSearch: null,
  stores: {
    count: 0,
    next:null,
    previous:null,
    results: [],
  },
  selectedStore: {},
  selectedStoreTableData: {},
  selectedStoreTableDataLoading: false,
  filters: {
    report_period: {min: null, max: null}
  },
  choice_filters: {},
  checkedList: null,
  expandableChartData: {},
  expandableChartLoading: false,
  isAvailable: null,
});

/* ------------- Functions for reducer cases ------------- */

const getAdminSalesReportRequest = (state) =>
  state.merge({ fileLoading: true });

const getAdminSalesReportSuccess = (state) =>
  state.merge({ fileLoading: false });

const getAdminSalesReportFailure = (state, { payload: { errors } }) =>
  state.merge({ fileLoading: false, errors })


const getAdminRevenueReportRequest = (state) =>
  state.merge({ fileLoading: true });

const getAdminRevenueReportSuccess = (state) =>
  state.merge({ fileLoading: false });

const getAdminRevenueReportFailure = (state, { payload: { errors } }) =>
  state.merge({ fileLoading: false, errors })

const getAdminExpandableChartRequest = (state) =>
  state.merge({ expandableChartLoading: true, expandableChartData:{} });

const getAdminExpandableChartSuccess = (state, { payload: data }) =>
  state.merge({ expandableChartLoading: false, expandableChartData: data });

const getAdminExpandableChartFailure = (state, { payload: { errors } }) =>
  state.merge({ expandableChartLoading: false, errors })

const getAdminProductListByStoreRequest = (state) =>
  state.merge({ selectedStoreTableDataLoading: true });

const getAdminProductListByStoreSuccess = (state, { payload: data }) =>
  state.merge({ selectedStoreTableDataLoading: false, selectedStoreTableData: data });

const getAdminProductListByStoreFailure = (state, { payload: { errors } }) =>
  state.merge({ selectedStoreTableDataLoading: false, errors, selectedStoreTableData: [] })

const getAdminDetailedStoreInfoCheckRequest = (state) =>
  state.merge({ loading: true });

const getAdminDetailedStoreInfoCheckSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, isAvailable: data.success });

const getAdminDetailedStoreInfoCheckFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors, isAvailable: false })

const getAdminDetailedStoreInfoRequest = (state) =>
  state.merge({ loading: true });

const getAdminDetailedStoreInfoSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, selectedStore: data });

const getAdminDetailedStoreInfoFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors })

const getAdminTrackingStoresRequest = (state) =>
  state.merge({ loading: true });

const getAdminTrackingStoresSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, stores: data });

const getAdminTrackingStoresFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, searchErrors: errors })

const resetErrors = (state) =>
  state.merge({ errors: false  })

const setAdminFilters = (state, { payload: filters }) => state.merge({ filters })
const setAdminCheckedList = (state, { payload: checkedList }) => state.merge({ checkedList })

export const resetStores = (state) => state.merge({ stores: {
    count: 0,
    next:null,
    previous:null,
    results: [],
  } })

export const logout = (state) => state.merge({...INITIAL_STATE })

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_ERRORS]: resetErrors,
  [Types.RESET_STORES]: resetStores,
  [Types.SET_ADMIN_FILTERS]: setAdminFilters,
  [Types.SET_ADMIN_CHECKED_LIST]: setAdminCheckedList,

  [Types.GET_ADMIN_SALES_REPORT_REQUEST]: getAdminSalesReportRequest,
  [Types.GET_ADMIN_SALES_REPORT_SUCCESS]: getAdminSalesReportSuccess,
  [Types.GET_ADMIN_SALES_REPORT_FAILURE]: getAdminSalesReportFailure,

  [Types.GET_ADMIN_REVENUE_REPORT_REQUEST]: getAdminRevenueReportRequest,
  [Types.GET_ADMIN_REVENUE_REPORT_SUCCESS]: getAdminRevenueReportSuccess,
  [Types.GET_ADMIN_REVENUE_REPORT_FAILURE]: getAdminRevenueReportFailure,

  [Types.GET_ADMIN_TRACKING_STORES_REQUEST]: getAdminTrackingStoresRequest,
  [Types.GET_ADMIN_TRACKING_STORES_SUCCESS]: getAdminTrackingStoresSuccess,
  [Types.GET_ADMIN_TRACKING_STORES_FAILURE]: getAdminTrackingStoresFailure,

  [Types.GET_ADMIN_DETAILED_STORE_INFO_REQUEST]: getAdminDetailedStoreInfoRequest,
  [Types.GET_ADMIN_DETAILED_STORE_INFO_SUCCESS]: getAdminDetailedStoreInfoSuccess,
  [Types.GET_ADMIN_DETAILED_STORE_INFO_FAILURE]: getAdminDetailedStoreInfoFailure,

  [Types.GET_ADMIN_DETAILED_STORE_INFO_CHECK_REQUEST]: getAdminDetailedStoreInfoCheckRequest,
  [Types.GET_ADMIN_DETAILED_STORE_INFO_CHECK_SUCCESS]: getAdminDetailedStoreInfoCheckSuccess,
  [Types.GET_ADMIN_DETAILED_STORE_INFO_CHECK_FAILURE]: getAdminDetailedStoreInfoCheckFailure,

  [Types.GET_ADMIN_PRODUCT_LIST_BY_STORE_REQUEST]: getAdminProductListByStoreRequest,
  [Types.GET_ADMIN_PRODUCT_LIST_BY_STORE_SUCCESS]: getAdminProductListByStoreSuccess,
  [Types.GET_ADMIN_PRODUCT_LIST_BY_STORE_FAILURE]: getAdminProductListByStoreFailure,

  [Types.GET_ADMIN_EXPANDABLE_CHART_REQUEST]: getAdminExpandableChartRequest,
  [Types.GET_ADMIN_EXPANDABLE_CHART_SUCCESS]: getAdminExpandableChartSuccess,
  [Types.GET_ADMIN_EXPANDABLE_CHART_FAILURE]: getAdminExpandableChartFailure,

  [Types.LOGOUT]: logout,
});
