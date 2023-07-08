import {takeLatest, put, call, delay} from 'redux-saga/effects';

import * as services from './services';
import Creators, {CompetitorsTypes as constants} from './reducer';
import { openNotificationWithIcon } from '../../Components/Notification/index';
import {DefaultMsg, DefaultMsgSaga, DefaultMsgSalesTracker} from "../../Components/Notification/notification-message";
import React from "react";
import { sendExtensionMessage } from '../../Utils/extension';

const actions = {
  deleteTrackingStoreCompetitorsByIDActions: {
    request: Creators.deleteTrackingStoreCompetitorsByIDRequest,
    success: Creators.deleteTrackingStoreCompetitorsByIDSuccess,
    errors: Creators.deleteTrackingStoreCompetitorsByIDFailure
  },
  createTrackingStoreCompetitorsActions: {
    request: Creators.createTrackingStoreCompetitorsRequest,
    success: Creators.createTrackingStoreCompetitorsSuccess,
    errors: Creators.createTrackingStoreCompetitorsFailure
  },
  deleteTrackingProductCompetitorsByIDActions: {
    request: Creators.deleteTrackingProductCompetitorsByIDRequest,
    success: Creators.deleteTrackingProductCompetitorsByIDSuccess,
    errors: Creators.deleteTrackingProductCompetitorsByIDFailure
  },
  createTrackingProductCompetitorsActions: {
    request: Creators.createTrackingProductCompetitorsRequest,
    success: Creators.createTrackingProductCompetitorsSuccess,
    errors: Creators.createTrackingProductCompetitorsFailure
  },
  getCompetitorsFiltersActions: {
    request: Creators.getCompetitorsFiltersRequest,
    success: Creators.getCompetitorsFiltersSuccess,
    errors: Creators.getCompetitorsFiltersFailure,
  },
  getCompetitorsPresetsActions: {
    request: Creators.getCompetitorsPresetsRequest,
    success: Creators.getCompetitorsPresetsSuccess,
    errors: Creators.getCompetitorsPresetsFailure,
  },
  createCompetitorsPresetActions: {
    request: Creators.createCompetitorsPresetRequest,
    success: Creators.createCompetitorsPresetSuccess,
    errors: Creators.createCompetitorsPresetFailure,
  },
  deleteCompetitorsPresetActions: {
    request: Creators.deleteCompetitorsPresetRequest,
    success: Creators.deleteCompetitorsPresetSuccess,
    errors: Creators.deleteCompetitorsPresetFailure,
  },
  cancelDeleteCompetitorsPresetActions: {
    request: Creators.cancelDeleteCompetitorsPresetRequest,
    success: Creators.cancelDeleteCompetitorsPresetSuccess,
    errors: Creators.cancelDeleteCompetitorsPresetFailure,
  },
  updateCompetitorsPresetActions: {
    request: Creators.updateCompetitorsPresetRequest,
    success: Creators.updateCompetitorsPresetSuccess,
    errors: Creators.updateCompetitorsPresetFailure,
  },
  getCompetitorsActions: {
    success: Creators.getCompetitorsSuccess,
    errors: Creators.getCompetitorsFailure,
    request: Creators.getCompetitorsRequest,
  },
  getShopifyCountActions: {
    request: Creators.getShopifyCountRequest,
    success: Creators.getShopifyCountSuccess,
    errors: Creators.getShopifyCountFailure,
  },
};

const notificationWithIcon = (error) => {
  openNotificationWithIcon({
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
}

const eventsOptions = {
  [constants.GET_COMPETITORS_FILTERS_REQUEST]: {
    api: services.getCompetitorsFilters,
    actions: actions.getCompetitorsFiltersActions,
  },
  [constants.GET_COMPETITORS_PRESETS_REQUEST]: {
    api: services.getCompetitorsPresets,
    actions: actions.getCompetitorsPresetsActions,
  },
  [constants.CREATE_COMPETITORS_PRESET_REQUEST]: {
    api: services.createCompetitorsPreset,
    actions: actions.createCompetitorsPresetActions,
    openNotification: (name) => {
      openNotificationWithIcon({
        style: { minWidth: '716px' },
        className: 'notification notification--save',
        message: (
          <DefaultMsgSaga
            text={
              <span className="preset-notification-block">
                preset_create_name_
              </span>
            }
            icon="bookmark_preset"
            iconOutline={true}
            withTranslate={true}
            preset={name}
          />
        ),
      });
    },
  },
  [constants.DELETE_COMPETITORS_PRESET_REQUEST]: {
    api: services.deleteCompetitorsPreset,
    actions: actions.deleteCompetitorsPresetActions,
  },
  [constants.DELETE_TRACKING_PRODUCT_COMPETITORS_BY_ID_REQUEST]: {
    api: services.deleteTrackingProductByID,
    actions: actions.deleteTrackingProductCompetitorsByIDActions,
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
      notificationWithIcon(error)
    }
  },
  [constants.CANCEL_DELETE_COMPETITORS_PRESET_REQUEST]: {
    api: services.cancelDeleteCompetitorsPreset,
    actions: actions.cancelDeleteCompetitorsPresetActions,
    openNotification: (name) => {
      openNotificationWithIcon({
        style: { minWidth: '716px' },
        className: 'notification notification--save',
        message: (
          <DefaultMsgSaga
            text={
              <span className="preset-notification-block">
                preset_restore_name_
              </span>
            }
            icon="bookmark_preset"
            iconOutline={true}
            withTranslate={true}
            preset={name}
          />
        ),
      });
    },
  },
  [constants.CREATE_TRACKING_PRODUCT_COMPETITORS_REQUEST]: {
    api: services.createTrackingProduct,
    actions: actions.createTrackingProductCompetitorsActions,
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
  [constants.GET_COMPETITORS_REQUEST]: {
    api: services.getCompetitors,
    actions: actions.getCompetitorsActions,
  },
  [constants.GET_SHOPIFY_COUNT_REQUEST]: {
    api: services.getShopifyCount,
    actions: actions.getShopifyCountActions,
  },
  [constants.UPDATE_COMPETITORS_PRESET_REQUEST]: {
    api: services.updateCompetitorsPreset,
    actions: actions.updateCompetitorsPresetActions,
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
      notificationWithIcon(error)
    }
  },
  [constants.CREATE_TRACKING_STORE_COMPETITORS_REQUEST]: {
    api: services.createTrackingStore,
    actions: actions.createTrackingStoreCompetitorsActions,
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
  [constants.DELETE_TRACKING_STORE_COMPETITORS_BY_ID_REQUEST]: {
    api: services.deleteTrackingStoreByID,
    actions: actions.deleteTrackingStoreCompetitorsByIDActions,
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
      notificationWithIcon(error)
    }
  },
};

function* apiGenerator(action) {
  const provider = eventsOptions[action.type];

  try {
    const params = action.payload;
    const response = yield call(provider.api, params);

    if ((response?.data || response.status === 204) && response.ok) {
      if (action.type === 'DELETE_COMPETITORS_PRESET_REQUEST') {
        yield put(provider.actions.success(params.id || true));
      } else yield put(provider.actions.success(response.data));
    } else {
      yield put(provider.actions.errors({ errors: 'some error' }));
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

      if (['DELETE_TRACKING_STORE_COMPETITORS_BY_ID_REQUEST', 'DELETE_TRACKING_PRODUCT_COMPETITORS_BY_ID_REQUEST'].includes(action.type)) {
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
        (response.status === 426 && ['DELETE_TRACKING_STORE_COMPETITORS_BY_ID_REQUEST', 'DELETE_TRACKING_PRODUCT_COMPETITORS_BY_ID_REQUEST'].includes(action.type))
        || ['CREATE_TRACKING_PRODUCT_COMPETITORS_REQUEST', 'CREATE_TRACKING_STORE_COMPETITORS_REQUEST'].includes(action.type)
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

function* apiGeneratorWithNotification(action) {
  const provider = eventsOptions[action.type];
  const params = action.payload;

  try {
    const response = yield call(provider.api, params);

    if ((response?.data || response.status === 204) && response.ok) {
      yield delay(500);

      if (action.type === 'CANCEL_DELETE_COMPETITORS_PRESET_REQUEST') {
        yield put(provider.actions.success(params || true));
        yield call(provider.openNotification, params.name);
      }
      else if (action.type === 'UPDATE_COMPETITORS_PRESET_REQUEST') {
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
      if (action.type === 'UPDATE_COMPETITORS_PRESET_REQUEST') {
        yield call(provider.openErrorNotification, error);
      }
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_COMPETITORS_FILTERS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_COMPETITORS_PRESETS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_COMPETITORS_REQUEST, apiGenerator);
  yield takeLatest(constants.CREATE_COMPETITORS_PRESET_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.DELETE_COMPETITORS_PRESET_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_SHOPIFY_COUNT_REQUEST, apiGenerator);
  yield takeLatest(constants.CANCEL_DELETE_COMPETITORS_PRESET_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.UPDATE_COMPETITORS_PRESET_REQUEST, apiGeneratorWithNotification);

  yield takeLatest(constants.DELETE_TRACKING_STORE_COMPETITORS_BY_ID_REQUEST, apiGeneratorWithNotificationNew);
  yield takeLatest(constants.CREATE_TRACKING_STORE_COMPETITORS_REQUEST, apiGeneratorWithNotificationNew);
  yield takeLatest(constants.CREATE_TRACKING_PRODUCT_COMPETITORS_REQUEST, apiGeneratorWithNotificationNew);
  yield takeLatest(constants.DELETE_TRACKING_PRODUCT_COMPETITORS_BY_ID_REQUEST, apiGeneratorWithNotificationNew);
}
