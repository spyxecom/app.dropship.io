import {takeLatest, put, call, delay} from 'redux-saga/effects';

import * as services from './services';
import Creators, {ProductDatabaseTypes as constants} from './reducer';
import { openNotificationWithIcon } from '../../Components/Notification/index';
import {DefaultMsg, DefaultMsgSaga, DefaultMsgSalesTracker} from "../../Components/Notification/notification-message";
import React from "react";
import { sendExtensionMessage } from '../../Utils/extension';

const actions = {
  deleteTrackingStoreDatabaseByIDActions: {
    request: Creators.deleteTrackingStoreDatabaseByIDRequest,
    success: Creators.deleteTrackingStoreDatabaseByIDSuccess,
    errors: Creators.deleteTrackingStoreDatabaseByIDFailure
  },
  createTrackingStoreDatabaseActions: {
    request: Creators.createTrackingStoreDatabaseRequest,
    success: Creators.createTrackingStoreDatabaseSuccess,
    errors: Creators.createTrackingStoreDatabaseFailure
  },
  deleteTrackingProductDatabaseByIDActions: {
    request: Creators.deleteTrackingProductDatabaseByIDRequest,
    success: Creators.deleteTrackingProductDatabaseByIDSuccess,
    errors: Creators.deleteTrackingProductDatabaseByIDFailure
  },
  createTrackingProductDatabaseActions: {
    request: Creators.createTrackingProductDatabaseRequest,
    success: Creators.createTrackingProductDatabaseSuccess,
    errors: Creators.createTrackingProductDatabaseFailure
  },
  getProductDatabaseFiltersActions: {
    request: Creators.getProductDatabaseFiltersRequest,
    success: Creators.getProductDatabaseFiltersSuccess,
    errors: Creators.getProductDatabaseFiltersFailure,
  },
  getProductDatabasePresetsActions: {
    request: Creators.getProductDatabasePresetsRequest,
    success: Creators.getProductDatabasePresetsSuccess,
    errors: Creators.getProductDatabasePresetsFailure,
  },
  createProductDatabasePresetActions: {
    request: Creators.createProductDatabasePresetRequest,
    success: Creators.createProductDatabasePresetSuccess,
    errors: Creators.createProductDatabasePresetFailure,
  },
  deleteProductDatabasePresetActions: {
    request: Creators.deleteProductDatabasePresetRequest,
    success: Creators.deleteProductDatabasePresetSuccess,
    errors: Creators.deleteProductDatabasePresetFailure,
  },
  cancelDeleteProductDatabasePresetActions: {
    request: Creators.cancelDeleteProductDatabasePresetRequest,
    success: Creators.cancelDeleteProductDatabasePresetSuccess,
    errors: Creators.cancelDeleteProductDatabasePresetFailure,
  },
  updateProductDatabasePresetActions: {
    request: Creators.updateProductDatabasePresetRequest,
    success: Creators.updateProductDatabasePresetSuccess,
    errors: Creators.updateProductDatabasePresetFailure,
  },
  getProductsDatabaseActions: {
    success: Creators.getProductsDatabaseSuccess,
    errors: Creators.getProductsDatabaseFailure,
    request: Creators.getProductsDatabaseRequest,
  },
  getProductChartActions: {
    success: Creators.getProductChartSuccess,
    errors: Creators.getProductChartFailure,
    request: Creators.getProductChartRequest,
  }
};

const notification = (error) => openNotificationWithIcon({
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

const presetNotification = (name, type) => openNotificationWithIcon({
  style: { minWidth: '716px' },
  className: 'notification notification--save',
  message: (
    <DefaultMsgSaga
      text={
        <span className="preset-notification-block">
                {type}
              </span>
      }
      icon="bookmark_preset"
      iconOutline={true}
      withTranslate={true}
      preset={name}
    />
  ),
});

const eventsOptions = {
  [constants.GET_PRODUCT_DATABASE_FILTERS_REQUEST]: {
    api: services.getProductDatabaseFilters,
    actions: actions.getProductDatabaseFiltersActions,
  },
  [constants.GET_PRODUCT_DATABASE_PRESETS_REQUEST]: {
    api: services.getProductDatabasePresets,
    actions: actions.getProductDatabasePresetsActions,
  },
  [constants.CREATE_PRODUCT_DATABASE_PRESET_REQUEST]: {
    api: services.createProductDatabasePreset,
    actions: actions.createProductDatabasePresetActions,
    openNotification: (name) => {
      presetNotification(name, 'preset_create_name_')
    },
  },
  [constants.DELETE_PRODUCT_DATABASE_PRESET_REQUEST]: {
    api: services.deleteProductDatabasePreset,
    actions: actions.deleteProductDatabasePresetActions,
  },
  [constants.CANCEL_DELETE_PRODUCT_DATABASE_PRESET_REQUEST]: {
    api: services.cancelDeleteProductDatabasePreset,
    actions: actions.cancelDeleteProductDatabasePresetActions,
    openNotification: (name) => {
      presetNotification(name, 'preset_restore_name_')
    },
  },
  [constants.UPDATE_PRODUCT_DATABASE_PRESET_REQUEST]: {
    api: services.updateProductDatabasePreset,
    actions: actions.updateProductDatabasePresetActions,
    openNotification: (name) => {
      openNotificationWithIcon({
        name,
        style: { minWidth: '716px' },
        className: 'notification notification--save',
        message: (
          <DefaultMsgSaga
            text={
              <span className="preset-notification-block">
                preset_update_name_
              </span>
            }
            icon="rename_preset_success"
            iconOutline={true}
            withTranslate={true}
            preset={name}
          />
        ),
      });
    },
    openErrorNotification: (error) => {
      notification(error)
    }
  },
  [constants.GET_PRODUCTS_DATABASE_REQUEST]: {
    api: services.getProductsDatabase,
    actions: actions.getProductsDatabaseActions,
  },
  [constants.GET_PRODUCT_CHART_REQUEST]: {
    api: services.getProductChart,
    actions: actions.getProductChartActions,
  },
  [constants.CREATE_TRACKING_STORE_DATABASE_REQUEST]: {
    api: services.createTrackingStore,
    actions: actions.createTrackingStoreDatabaseActions,
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
  [constants.CREATE_TRACKING_PRODUCT_DATABASE_REQUEST]: {
    api: services.createTrackingProduct,
    actions: actions.createTrackingProductDatabaseActions,
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
  [constants.DELETE_TRACKING_STORE_DATABASE_BY_ID_REQUEST]: {
    api: services.deleteTrackingStoreByID,
    actions: actions.deleteTrackingStoreDatabaseByIDActions,
    openNotification: (data) => {
      openNotificationWithIcon({
        style: { minWidth: '716px' },
        className: 'notification notification--save',
        message: (
          <DefaultMsgSalesTracker
            icon="notification_success"
            iconOutline={true}
            name={data?.store?.title}
            disconnect={true}
          />
        ),
      });
    },
    openErrorNotification: (error) => {
      notification(error)
    }
  },
  [constants.DELETE_TRACKING_PRODUCT_DATABASE_BY_ID_REQUEST]: {
    api: services.deleteTrackingProductByID,
    actions: actions.deleteTrackingProductDatabaseByIDActions,
    openNotification: () => {
      openNotificationWithIcon({
        style: { minWidth: '716px' },
        className: 'notification notification--save',
        message: (
          <DefaultMsgSalesTracker
            icon="notification_success"
            iconOutline={true}
          />
        ),
      });
    },
    openErrorNotification: (error) => {
      notification(error)
    }
  },
};

function* apiGenerator(action) {
  const provider = eventsOptions[action.type];

  try {
    const params = action.payload;
    const response = yield call(provider.api, params);

    if ((response?.data || response.status === 204) && response.ok) {
      if (action.type === 'DELETE_PRODUCT_DATABASE_PRESET_REQUEST') {
        yield put(provider.actions.success(params.id || true));
      } else yield put(provider.actions.success(response.data));
    } else {
      yield put(provider.actions.errors({ errors: 'some error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

function* apiGeneratorWithNotification(action) {
  const provider = eventsOptions[action.type];
  const params = action.payload;

  try {
    const response = yield call(provider.api, params);

    if ((response?.data || response.status === 204) && response.ok) {
      yield delay(500);

      if (action.type === 'CANCEL_DELETE_PRODUCT_DATABASE_PRESET_REQUEST') {
        yield put(provider.actions.success(params || true));
        yield call(provider.openNotification, params.name);
      }
      else if (action.type === 'UPDATE_PRODUCT_DATABASE_PRESET_REQUEST') {
        yield put(provider.actions.success(response?.data || true));
        yield call(provider.openNotification, response?.data?.name);
      }
      else {
        yield put(provider.actions.success(response?.data || true));
        yield call(provider.openNotification, response?.data?.name);
      }
    } else {
      const error = Object.values(response.data).length
        ? Object.values(response.data)[0].detail
        : null;
      yield put(provider.actions.errors({ errors: error }));
      if (action.type === 'UPDATE_PRODUCT_DATABASE_PRESET_REQUEST') {
        yield call(provider.openErrorNotification, error);
      }
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

function* apiGeneratorWithNotificationNew(action) {
  const provider = eventsOptions[action.type];
  const params = action.payload;
  const isDeleteAction = action.type.includes('DELETE')

  try {
    const response = yield call(provider.api, params);

    if ((response?.data || response.status === 204) && response.ok) {
      yield delay(500);

      if (['DELETE_TRACKING_STORE_DATABASE_BY_ID_REQUEST', 'DELETE_TRACKING_PRODUCT_DATABASE_BY_ID_REQUEST'].includes(action.type)) {
        yield put(provider.actions.success(params || true));
        yield call(provider.openNotification, params);
      }
      else {
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
      const error = response.data?.message?.detail || null;
      if (
        (response.status === 426 && ['DELETE_TRACKING_STORE_DATABASE_BY_ID_REQUEST', 'DELETE_TRACKING_PRODUCT_DATABASE_BY_ID_REQUEST'].includes(action.type))
        || ['CREATE_TRACKING_PRODUCT_DATABASE_REQUEST', 'CREATE_TRACKING_STORE_DATABASE_REQUEST'].includes(action.type)
      ) {
        yield put(provider.actions.errors({ errors: response }));
        yield call(provider.openErrorNotification, error);
      } else {
        yield put(provider.actions.errors({ errors: error }));
      }
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_PRODUCT_DATABASE_FILTERS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_PRODUCT_DATABASE_PRESETS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_PRODUCTS_DATABASE_REQUEST, apiGenerator);
  yield takeLatest(constants.CREATE_PRODUCT_DATABASE_PRESET_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.DELETE_PRODUCT_DATABASE_PRESET_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_PRODUCT_CHART_REQUEST, apiGenerator);
  yield takeLatest(constants.CANCEL_DELETE_PRODUCT_DATABASE_PRESET_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.UPDATE_PRODUCT_DATABASE_PRESET_REQUEST, apiGeneratorWithNotification);

  yield takeLatest(constants.DELETE_TRACKING_STORE_DATABASE_BY_ID_REQUEST, apiGeneratorWithNotificationNew);
  yield takeLatest(constants.CREATE_TRACKING_STORE_DATABASE_REQUEST, apiGeneratorWithNotificationNew);
  yield takeLatest(constants.CREATE_TRACKING_PRODUCT_DATABASE_REQUEST, apiGeneratorWithNotificationNew);
  yield takeLatest(constants.DELETE_TRACKING_PRODUCT_DATABASE_BY_ID_REQUEST, apiGeneratorWithNotificationNew);
}
