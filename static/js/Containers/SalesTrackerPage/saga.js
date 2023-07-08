import {takeLatest, put, call, delay} from 'redux-saga/effects';

import {push} from "connected-react-router";
import * as services from './services';
import Creators, {SalesTrackerTypes as constants} from './reducer';
import openNotification, {openNotificationWithIcon} from "../../Components/Notification/index";
import {DefaultMsg, DefaultMsgSalesTracker} from "../../Components/Notification/notification-message";
import React from "react";
import FileDownload from "js-file-download";
import { sendExtensionMessage } from '../../Utils/extension';

const actions = {
  createTrackingTopStoreActions: {
    request: Creators.createTrackingTopStoreRequest,
    success: Creators.createTrackingTopStoreSuccess,
    errors: Creators.createTrackingTopStoreFailure
  },
  createTrackingTopProductActions: {
    request: Creators.createTrackingTopProductRequest,
    success: Creators.createTrackingTopProductSuccess,
    errors: Creators.createTrackingTopProductFailure
  },
  deleteTrackingTopStoreByIDActions: {
    request: Creators.deleteTrackingTopStoreByIDRequest,
    success: Creators.deleteTrackingTopStoreByIDSuccess,
    errors: Creators.deleteTrackingTopStoreByIDFailure
  },
  deleteTrackingTopProductByIDActions: {
    request: Creators.deleteTrackingTopProductByIDRequest,
    success: Creators.deleteTrackingTopProductByIDSuccess,
    errors: Creators.deleteTrackingTopProductByIDFailure
  },
  getTopStoresFiltersActions: {
    request: Creators.getTopStoresFiltersRequest,
    success: Creators.getTopStoresFiltersSuccess,
    errors: Creators.getTopStoresFiltersFailure
  },
  getTopProductsFiltersActions: {
    request: Creators.getTopProductsFiltersRequest,
    success: Creators.getTopProductsFiltersSuccess,
    errors: Creators.getTopProductsFiltersFailure
  },
  getTopStoresActions: {
    request: Creators.getTopStoresRequest,
    success: Creators.getTopStoresSuccess,
    errors: Creators.getTopStoresFailure
  },
  getTopProductsActions: {
    request: Creators.getTopProductsRequest,
    success: Creators.getTopProductsSuccess,
    errors: Creators.getTopProductsFailure
  },
  getTopStoresCountActions: {
    request: Creators.getTopStoresCountRequest,
    success: Creators.getTopStoresCountSuccess,
    errors: Creators.getTopStoresCountFailure
  },
  getTopProductsCountActions: {
    request: Creators.getTopProductsCountRequest,
    success: Creators.getTopProductsCountSuccess,
    errors: Creators.getTopProductsCountFailure
  },
  getSalesReportActions: {
    request: Creators.getSalesReportRequest,
    success: Creators.getSalesReportSuccess,
    errors: Creators.getSalesReportFailure
  },
  getRevenueReportActions: {
    request: Creators.getRevenueReportRequest,
    success: Creators.getRevenueReportSuccess,
    errors: Creators.getRevenueReportFailure
  },
  getProductReportActions: {
    request: Creators.getProductReportRequest,
    success: Creators.getProductReportSuccess,
    errors: Creators.getProductReportFailure
  },
  getTrackingStoresActions: {
    request: Creators.getTrackingStoresRequest,
    success: Creators.getTrackingStoresSuccess,
    errors: Creators.getTrackingStoresFailure
  },
  getTrackingStoresNextActions: {
    request: Creators.getTrackingStoresNextRequest,
    success: Creators.getTrackingStoresNextSuccess,
    errors: Creators.getTrackingStoresNextFailure
  },
  getTrackingStoreByIDActions: {
    request: Creators.getTrackingStoreByIDRequest,
    success: Creators.getTrackingStoreByIDSuccess,
    errors: Creators.getTrackingStoreByIDFailure
  },
  deleteTrackingStoreByIDActions: {
    request: Creators.deleteTrackingStoreByIDRequest,
    success: Creators.deleteTrackingStoreByIDSuccess,
    errors: Creators.deleteTrackingStoreByIDFailure
  },
  createTrackingStoreActions: {
    request: Creators.createTrackingStoreRequest,
    success: Creators.createTrackingStoreSuccess,
    errors: Creators.createTrackingStoreFailure
  },
  createTrackingStoreNewActions: {
    request: Creators.createTrackingStoreNewRequest,
    success: Creators.createTrackingStoreNewSuccess,
    errors: Creators.createTrackingStoreNewFailure
  },
  getTrackingProductsActions: {
    request: Creators.getTrackingProductsRequest,
    success: Creators.getTrackingProductsSuccess,
    errors: Creators.getTrackingProductsFailure
  },
  getTrackingProductsNextActions: {
    request: Creators.getTrackingProductsNextRequest,
    success: Creators.getTrackingProductsNextSuccess,
    errors: Creators.getTrackingProductsNextFailure
  },
  getTrackingProductByIDActions: {
    request: Creators.getTrackingProductByIDRequest,
    success: Creators.getTrackingProductByIDSuccess,
    errors: Creators.getTrackingProductByIDFailure
  },
  deleteTrackingProductByIDActions: {
    request: Creators.deleteTrackingProductByIDRequest,
    success: Creators.deleteTrackingProductByIDSuccess,
    errors: Creators.deleteTrackingProductByIDFailure
  },
  createTrackingProductActions: {
    request: Creators.createTrackingProductRequest,
    success: Creators.createTrackingProductSuccess,
    errors: Creators.createTrackingProductFailure
  },
  createTrackingProductNewActions: {
    request: Creators.createTrackingProductNewRequest,
    success: Creators.createTrackingProductNewSuccess,
    errors: Creators.createTrackingProductNewFailure
  },
  deleteTrackingProductByIDFromStoreActions: {
    request: Creators.deleteTrackingProductByIDFromStoreRequest,
    success: Creators.deleteTrackingProductByIDFromStoreSuccess,
    errors: Creators.deleteTrackingProductByIDFromStoreFailure
  },
  createTrackingProductFromStoreActions: {
    request: Creators.createTrackingProductFromStoreRequest,
    success: Creators.createTrackingProductFromStoreSuccess,
    errors: Creators.createTrackingProductFromStoreFailure
  },
  getDetailedStoreInfoActions: {
    request: Creators.getDetailedStoreInfoRequest,
    success: Creators.getDetailedStoreInfoSuccess,
    errors: Creators.getDetailedStoreInfoFailure
  },
  getDetailedProductInfoActions: {
    request: Creators.getDetailedProductInfoRequest,
    success: Creators.getDetailedProductInfoSuccess,
    errors: Creators.getDetailedProductInfoFailure
  },
  getDetailedStoreInfoCheckActions: {
    request: Creators.getDetailedStoreInfoCheckRequest,
    success: Creators.getDetailedStoreInfoCheckSuccess,
    errors: Creators.getDetailedStoreInfoCheckFailure
  },
  getDetailedProductInfoCheckActions: {
    request: Creators.getDetailedProductInfoCheckRequest,
    success: Creators.getDetailedProductInfoCheckSuccess,
    errors: Creators.getDetailedProductInfoCheckFailure
  },
  getProductListByStoreActions: {
    request: Creators.getProductListByStoreRequest,
    success: Creators.getProductListByStoreSuccess,
    errors: Creators.getProductListByStoreFailure
  },
  getStoreProductsModalActions: {
    request: Creators.getStoreProductsModalRequest,
    success: Creators.getStoreProductsModalSuccess,
    errors: Creators.getStoreProductsModalFailure
  },
  getStoreProductsModalNextActions: {
    request: Creators.getStoreProductsModalNextRequest,
    success: Creators.getStoreProductsModalNextSuccess,
    errors: Creators.getStoreProductsModalNextFailure
  },
  getExpandableChartActions: {
    success: Creators.getExpandableChartSuccess,
    errors: Creators.getExpandableChartFailure,
    request: Creators.getExpandableChartRequest,
  }
};

const notificationWithIcon = (error) => openNotificationWithIcon({
  style: { minWidth: '716px' },
  className: 'notification notification--save notification-rename-error',
  message: (
    <DefaultMsg
      text={
        <span className="preset-notification-block">
                {error}
              </span>
      }
      icon="alert_triangle_error"
      iconWidth={24}
      iconHeight={24}
    />
  ),
});

const notification = () => openNotificationWithIcon({
  style: { minWidth: '716px' },
  className: 'notification notification--save',
  message: (
    <DefaultMsgSalesTracker
      icon="notification_success"
      iconOutline={true}
    />
  ),
});

const eventsOptions = {
  [constants.DELETE_TRACKING_TOP_STORE_BY_ID_REQUEST]: {
    api: services.deleteTrackingStoreByID,
    actions: actions.deleteTrackingTopStoreByIDActions,
    openNotification: (data) => {
      openNotificationWithIcon({
        style: { minWidth: '716px' },
        className: 'notification notification--save',
        message: (
          <DefaultMsgSalesTracker
            icon="notification_success"
            iconOutline={true}
            name={data.title}
            disconnect={true}
          />
        ),
      });
    },
    openErrorNotification: (error) => {
      openNotificationWithIcon({
        style: {minWidth: '716px'},
        className: 'notification notification--save notification-rename-error',
        message: (
          <DefaultMsg
            text={
              <span className="preset-notification-block">
                {error}
              </span>
            }
            icon="alert_triangle_error"
            iconWidth={24}
            iconHeight={24}
          />
        ),
      });
    }
  },
  [constants.CREATE_TRACKING_TOP_STORE_REQUEST]: {
    api: services.createTrackingStoreNew,
    actions: actions.createTrackingTopStoreActions,
    openNotification: (data) => {
      openNotificationWithIcon({
        style: { minWidth: '716px' },
        className: 'notification notification--save',
        message: (
          <DefaultMsgSalesTracker
            icon="notification_success"
            iconOutline={true}
            name={data.title}
          />
        ),
      });
    },
    openErrorNotification: (error) => {
      notificationWithIcon(error)
    }
  },
  [constants.DELETE_TRACKING_TOP_PRODUCT_BY_ID_REQUEST]: {
    api: services.deleteTrackingProductByID,
    actions: actions.deleteTrackingTopProductByIDActions,
    openNotification: () => {
      notification()
    },
    openErrorNotification: (error) => {
      openNotificationWithIcon({
        style: {minWidth: '716px'},
        className: 'notification notification--save notification-rename-error',
        message: (
          <DefaultMsg
            text={
              <span className="preset-notification-block">
                {error}
              </span>
            }
            icon="alert_triangle_error"
            iconWidth={24}
            iconHeight={24}
          />
        ),
      });
    }
  },
  [constants.CREATE_TRACKING_TOP_PRODUCT_REQUEST]: {
    api: services.createTrackingProductNew,
    actions: actions.createTrackingTopProductActions,
    openNotification: () => {
      openNotificationWithIcon({
        style: { minWidth: '716px' },
        className: 'notification notification--save',
        message: (
          <DefaultMsgSalesTracker
            icon="notification_success"
            iconOutline={true}
            connect={true}
          />
        ),
      });
    },
    openErrorNotification: (error) => {
      notificationWithIcon(error)
    }
  },
  [constants.GET_TOP_STORES_FILTERS_REQUEST]: {
    api: services.getTopStoresFilters,
    actions: actions.getTopStoresFiltersActions,
  },
  [constants.GET_TOP_PRODUCTS_FILTERS_REQUEST]: {
    api: services.getTopProductsFilters,
    actions: actions.getTopProductsFiltersActions,
  },
  [constants.GET_TOP_STORES_REQUEST]: {
    api: services.getTopStores,
    actions: actions.getTopStoresActions,
  },
  [constants.GET_TOP_PRODUCTS_REQUEST]: {
    api: services.getTopProducts,
    actions: actions.getTopProductsActions,
  },
  [constants.GET_TOP_STORES_COUNT_REQUEST]: {
    api: services.getTopStoresCount,
    actions: actions.getTopStoresCountActions,
  },
  [constants.GET_TOP_PRODUCTS_COUNT_REQUEST]: {
    api: services.getTopProductsCount,
    actions: actions.getTopProductsCountActions,
  },
  [constants.GET_SALES_REPORT_REQUEST]: {
    api: services.getSalesReport,
    actions: actions.getSalesReportActions,
  },
  [constants.GET_PRODUCT_REPORT_REQUEST]: {
    api: services.getProductReport,
    actions: actions.getProductReportActions,
  },
  [constants.GET_REVENUE_REPORT_REQUEST]: {
    api: services.getRevenueReport,
    actions: actions.getRevenueReportActions,
  },
  [constants.GET_TRACKING_STORES_REQUEST]: {
    api: services.getTrackingStores,
    actions: actions.getTrackingStoresActions,
  },
  [constants.GET_TRACKING_STORES_NEXT_REQUEST]: {
    api: services.getTrackingStoresNext,
    actions: actions.getTrackingStoresNextActions,
  },
  [constants.GET_TRACKING_STORE_BY_ID_REQUEST]: {
    api: services.getTrackingStoreByID,
    actions: actions.getTrackingStoreByIDActions,
  },
  [constants.DELETE_TRACKING_STORE_BY_ID_REQUEST]: {
    api: services.deleteTrackingStoreByID,
    actions: actions.deleteTrackingStoreByIDActions,
    openNotification: (data) => {
      openNotificationWithIcon({
        style: { minWidth: '716px' },
        className: 'notification notification--save',
        message: (
          <DefaultMsgSalesTracker
            icon="notification_success"
            iconOutline={true}
            name={data.title}
            disconnect={true}
          />
        ),
      });
    },
  },
  [constants.CREATE_TRACKING_STORE_REQUEST]: {
    api: services.createTrackingStore,
    actions: actions.createTrackingStoreActions,
    openNotification: (data) => {
      openNotificationWithIcon({
        style: { minWidth: '716px' },
        className: 'notification notification--save',
        message: (
          <DefaultMsgSalesTracker
            icon="notification_success"
            iconOutline={true}
            name={data.title}
          />
        ),
      });
    },
    openErrorNotification: (error) => {
      notificationWithIcon(error)
    }
  },

  [constants.GET_TRACKING_PRODUCTS_REQUEST]: {
    api: services.getTrackingProducts,
    actions: actions.getTrackingProductsActions,
  },
  [constants.GET_TRACKING_PRODUCTS_NEXT_REQUEST]: {
    api: services.getTrackingProductsNext,
    actions: actions.getTrackingProductsNextActions,
  },
  [constants.GET_TRACKING_PRODUCT_BY_ID_REQUEST]: {
    api: services.getTrackingProductByID,
    actions: actions.getTrackingProductByIDActions,
  },
  [constants.DELETE_TRACKING_PRODUCT_BY_ID_REQUEST]: {
    api: services.deleteTrackingProductByID,
    actions: actions.deleteTrackingProductByIDActions,
    openNotification: () => {
      notification()
    },
  },
  [constants.DELETE_TRACKING_PRODUCT_BY_ID_FROM_STORE_REQUEST]: {
    api: services.deleteTrackingProductByID,
    actions: actions.deleteTrackingProductByIDFromStoreActions,
    openNotification: () => {
      notification()
    },
  },
  [constants.CREATE_TRACKING_PRODUCT_REQUEST]: {
    api: services.createTrackingProduct,
    actions: actions.createTrackingProductActions,
    openNotification: () => {
      openNotificationWithIcon({
        style: { minWidth: '716px' },
        className: 'notification notification--save',
        message: (
          <DefaultMsgSalesTracker
            icon="notification_success"
            iconOutline={true}
            connect={true}
          />
        ),
      });
    },
    openErrorNotification: (error) => {
      notificationWithIcon(error)
    }
  },
  [constants.CREATE_TRACKING_PRODUCT_FROM_STORE_REQUEST]: {
    api: services.createTrackingProductNew,
    actions: actions.createTrackingProductFromStoreActions,
    openNotification: () => {
      openNotificationWithIcon({
        style: { minWidth: '716px' },
        className: 'notification notification--save',
        message: (
          <DefaultMsgSalesTracker
            icon="notification_success"
            iconOutline={true}
            connect={true}
          />
        ),
      });
    },
    openErrorNotification: (error) => {
      openNotificationWithIcon({
        style: { minWidth: '716px' },
        className: 'notification notification--save notification-rename-error',
        message: (
          <DefaultMsg
            text={
              error?.includes('Free trial') ?
                (<span className="preset-notification-block">Free trial users can track up to 5 Stores and 5 Products. To track more, activate your membership <a
                  href="/setting/plan">here.</a></span>)
                :
                (<span className="preset-notification-block">
                {error}
              </span>)
            }
            icon="alert_triangle_error"
            iconWidth={24}
            iconHeight={24}
          />
        ),
      });
    }
  },
  [constants.GET_DETAILED_STORE_INFO_REQUEST]: {
    api: services.getDetailedStoreInfo,
    actions: actions.getDetailedStoreInfoActions
  },
  [constants.GET_DETAILED_PRODUCT_INFO_REQUEST]: {
    api: services.getDetailedProductInfo,
    actions: actions.getDetailedProductInfoActions
  },
  [constants.GET_DETAILED_STORE_INFO_CHECK_REQUEST]: {
    api: services.getDetailedStoreInfoCheck,
    actions: actions.getDetailedStoreInfoCheckActions,
  },
  [constants.GET_DETAILED_PRODUCT_INFO_CHECK_REQUEST]: {
    api: services.getDetailedProductInfoCheck,
    actions: actions.getDetailedProductInfoCheckActions,
  },
  [constants.GET_PRODUCT_LIST_BY_STORE_REQUEST]: {
    api: services.getProductListByStore,
    actions: actions.getProductListByStoreActions
  },
  [constants.GET_STORE_PRODUCTS_MODAL_REQUEST]: {
    api: services.getStoreProductsModal,
    actions: actions.getStoreProductsModalActions
  },
  [constants.GET_STORE_PRODUCTS_MODAL_NEXT_REQUEST]: {
    api: services.getStoreProductsModal,
    actions: actions.getStoreProductsModalNextActions
  },
  [constants.GET_EXPANDABLE_CHART_REQUEST]: {
    api: services.getExpandableChart,
    actions: actions.getExpandableChartActions,
  },
};

function* apiGenerator(action) {
  const provider = eventsOptions[action.type];

  try {
    const params = action.payload;
    const response = yield call(provider.api, params);

    if ((response?.data || response.status === 204) && response.ok) {
      if (Boolean(params?.search)) yield put(provider.actions.success({...response.data, search: params?.search}));
      else yield put(provider.actions.success(response.data));
    } else {
      const error = Object.values(response.data).length
        ? Object.values(response.data)[0].detail
        : null;
      if (action.type === 'GET_DETAILED_STORE_INFO_CHECK_REQUEST' ||
        action.type === 'GET_DETAILED_PRODUCT_INFO_CHECK_REQUEST') {
        action.type === 'GET_DETAILED_STORE_INFO_CHECK_REQUEST' ?
          yield put(push('/sales-tracker/stores'))
          :
          yield put(push('/sales-tracker/products'))
        openNotification({
          type: 'warning',
          message: error ? error : 'Data is being collected and will be displayed within 24 hours',
          style: { minWidth: '716px' },
        });
      }
      yield put(provider.actions.errors({ errors: error }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

function* apiGeneratorWithNotification(action) {
  const provider = eventsOptions[action.type];
  const params = action.payload;
  const isDeleteAction = action.type.includes('DELETE')

  try {
    const response = yield call(provider.api, params);

    if ((response?.data || response.status === 204) && response.ok) {
      yield delay(500);

      if (isDeleteAction) {
        yield put(provider.actions.success(params || true));
        yield call(provider.openNotification, params);
      } else {
        yield put(provider.actions.success(response?.data || true));
        yield call(provider.openNotification, response?.data);
      }

      sendExtensionMessage({
        action: action.type.includes('PRODUCT') ? 'setProductsLimits': 'setStoresLimits',
        data: { isIncrease: !isDeleteAction }
      })

      sendExtensionMessage({
        action: `${isDeleteAction ? 'delete': 'create'}Tracking${action.type.includes('PRODUCT') ? 'Product' : 'Store'}`,
        data: { id: isDeleteAction ? params.id : response?.data?.id }
      })

    } else {
      const error = Object.values(response.data).length
        ? Object.values(response.data)[0].detail
        : null;
      if (response.status === 426 && isDeleteAction) {
        yield put(provider.actions.errors({ errors: response }));
      } else if (
        action.type === 'CREATE_TRACKING_PRODUCT_FROM_STORE_REQUEST'
        || action.type === 'CREATE_TRACKING_TOP_PRODUCT_REQUEST'
        || action.type === 'CREATE_TRACKING_TOP_STORE_REQUEST'
        || action.type === 'DELETE_TRACKING_TOP_STORE_BY_ID_REQUEST'
        || action.type === 'DELETE_TRACKING_TOP_PRODUCT_BY_ID_REQUEST'
      ) {
        yield put(provider.actions.errors({ errors: error }));
        yield call(provider.openErrorNotification, error);
      } else yield put(provider.actions.errors({ errors: error }));
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
  yield takeLatest(constants.GET_TOP_STORES_FILTERS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_TOP_PRODUCTS_FILTERS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_TOP_STORES_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_TOP_PRODUCTS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_TOP_STORES_COUNT_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_TOP_PRODUCTS_COUNT_REQUEST, apiGenerator);
  yield takeLatest(constants.DELETE_TRACKING_TOP_STORE_BY_ID_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.CREATE_TRACKING_TOP_STORE_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.CREATE_TRACKING_TOP_PRODUCT_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.DELETE_TRACKING_TOP_PRODUCT_BY_ID_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.GET_TRACKING_STORES_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_TRACKING_STORES_NEXT_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_TRACKING_STORE_BY_ID_REQUEST, apiGenerator);
  yield takeLatest(constants.DELETE_TRACKING_STORE_BY_ID_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.CREATE_TRACKING_STORE_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.CREATE_TRACKING_STORE_NEW_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.GET_TRACKING_PRODUCTS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_TRACKING_PRODUCTS_NEXT_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_TRACKING_PRODUCT_BY_ID_REQUEST, apiGenerator);
  yield takeLatest(constants.CREATE_TRACKING_PRODUCT_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.CREATE_TRACKING_PRODUCT_NEW_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.CREATE_TRACKING_PRODUCT_FROM_STORE_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.GET_DETAILED_STORE_INFO_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_DETAILED_PRODUCT_INFO_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_DETAILED_STORE_INFO_CHECK_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_DETAILED_PRODUCT_INFO_CHECK_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_PRODUCT_LIST_BY_STORE_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_STORE_PRODUCTS_MODAL_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_STORE_PRODUCTS_MODAL_NEXT_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_EXPANDABLE_CHART_REQUEST, apiGenerator);
  yield takeLatest(constants.DELETE_TRACKING_PRODUCT_BY_ID_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.DELETE_TRACKING_PRODUCT_BY_ID_FROM_STORE_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.GET_SALES_REPORT_REQUEST, exportFileGenerator);
  yield takeLatest(constants.GET_PRODUCT_REPORT_REQUEST, exportFileGenerator);
  yield takeLatest(constants.GET_REVENUE_REPORT_REQUEST, exportFileGenerator);
}
