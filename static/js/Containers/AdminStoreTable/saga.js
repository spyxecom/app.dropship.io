import {takeLatest, put, call} from 'redux-saga/effects';

import * as services from './services';
import Creators, {AdminStoreTableTypes as constants} from './reducer';
import FileDownload from "js-file-download";

const actions = {
  getAdminSalesReportActions: {
    request: Creators.getAdminSalesReportRequest,
    success: Creators.getAdminSalesReportSuccess,
    errors: Creators.getAdminSalesReportFailure
  },
  getAdminRevenueReportActions: {
    request: Creators.getAdminRevenueReportRequest,
    success: Creators.getAdminRevenueReportSuccess,
    errors: Creators.getAdminRevenueReportFailure
  },
  getAdminTrackingStoresActions: {
    request: Creators.getAdminTrackingStoresRequest,
    success: Creators.getAdminTrackingStoresSuccess,
    errors: Creators.getAdminTrackingStoresFailure
  },
  getAdminDetailedStoreInfoActions: {
    request: Creators.getAdminDetailedStoreInfoRequest,
    success: Creators.getAdminDetailedStoreInfoSuccess,
    errors: Creators.getAdminDetailedStoreInfoFailure
  },
  getAdminDetailedStoreInfoCheckActions: {
    request: Creators.getAdminDetailedStoreInfoCheckRequest,
    success: Creators.getAdminDetailedStoreInfoCheckSuccess,
    errors: Creators.getAdminDetailedStoreInfoCheckFailure
  },
  getAdminProductListByStoreActions: {
    request: Creators.getAdminProductListByStoreRequest,
    success: Creators.getAdminProductListByStoreSuccess,
    errors: Creators.getAdminProductListByStoreFailure
  },
  getAdminExpandableChartActions: {
    success: Creators.getAdminExpandableChartSuccess,
    errors: Creators.getAdminExpandableChartFailure,
    request: Creators.getAdminExpandableChartRequest,
  }
};

const eventsOptions = {
  [constants.GET_ADMIN_SALES_REPORT_REQUEST]: {
    api: services.getAdminSalesReport,
    actions: actions.getAdminSalesReportActions,
  },
  [constants.GET_ADMIN_REVENUE_REPORT_REQUEST]: {
    api: services.getAdminRevenueReport,
    actions: actions.getAdminRevenueReportActions,
  },
  [constants.GET_ADMIN_TRACKING_STORES_REQUEST]: {
    api: services.getAdminTrackingStores,
    actions: actions.getAdminTrackingStoresActions,
  },
  [constants.GET_ADMIN_DETAILED_STORE_INFO_REQUEST]: {
    api: services.getAdminDetailedStoreInfo,
    actions: actions.getAdminDetailedStoreInfoActions
  },
  [constants.GET_ADMIN_DETAILED_STORE_INFO_CHECK_REQUEST]: {
    api: services.getAdminDetailedStoreInfoCheck,
    actions: actions.getAdminDetailedStoreInfoCheckActions,
  },
  [constants.GET_ADMIN_PRODUCT_LIST_BY_STORE_REQUEST]: {
    api: services.getAdminProductListByStore,
    actions: actions.getAdminProductListByStoreActions
  },
  [constants.GET_ADMIN_EXPANDABLE_CHART_REQUEST]: {
    api: services.getAdminExpandableChart,
    actions: actions.getAdminExpandableChartActions,
  },
};

function* apiGenerator(action) {
  const provider = eventsOptions[action.type];

  try {
    const params = action.payload;
    const response = yield call(provider.api, params);

    if ((response?.data || response.status === 204) && response.ok) {
      yield put(provider.actions.success(response.data));
    } else {
      const error = Object.values(response.data).length
        ? Object.values(response.data)[0].detail
        : null;
      yield put(provider.actions.errors({ errors: error }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

function* exportFileGenerator(action) {
  const provider = eventsOptions[action.type];

  try {
    const params = action.payload;
    const response = yield call(provider.api, params);

    if (response.data) {
      let result = new Blob([response.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});
      FileDownload(result, `${params.name}.xlsx`);
      yield put(provider.actions.success(response.data));
    } else {
      yield put(provider.actions.errors({ errors: 'some error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_ADMIN_TRACKING_STORES_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_ADMIN_DETAILED_STORE_INFO_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_ADMIN_DETAILED_STORE_INFO_CHECK_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_ADMIN_PRODUCT_LIST_BY_STORE_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_ADMIN_EXPANDABLE_CHART_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_ADMIN_SALES_REPORT_REQUEST, exportFileGenerator);
  yield takeLatest(constants.GET_ADMIN_REVENUE_REPORT_REQUEST, exportFileGenerator);
}
