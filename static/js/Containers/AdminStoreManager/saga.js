import {takeLatest, put, call, delay} from 'redux-saga/effects';
import React from "react";
import * as services from './services';
import Creators, {AdminStoreManagerTypes as constants} from './reducer';
import {openNotificationWithIcon} from "../../Components/Notification/index";
import {DefaultMsg, DefaultMsgSalesTracker} from "../../Components/Notification/notification-message";



const actions = {
  getSearchStoreActions: {
    request: Creators.getSearchStoreRequest,
    success: Creators.getSearchStoreSuccess,
    errors: Creators.getSearchStoreFailure
  },
  deleteStoreActions: {
    request: Creators.deleteStoreRequest,
    success: Creators.deleteStoreSuccess,
    errors: Creators.deleteStoreFailure
  }
};

const eventsOptions = {
  [constants.GET_SEARCH_STORE_REQUEST]: {
    api: services.getSearchStore,
    actions: actions.getSearchStoreActions,
  },
  [constants.DELETE_STORE_REQUEST]: {
    api: services.deleteStore,
    actions: actions.deleteStoreActions,
    openNotification: (data) => {
      openNotificationWithIcon({
        style: { minWidth: '716px' },
        className: 'notification notification--save',
        message: (
          <DefaultMsgSalesTracker
            icon="notification_success"
            iconOutline={true}
            name={data?.record?.title}
            disconnect={true}
            admin={true}
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
  }
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

function* apiGeneratorWithNotification(action) {
  const provider = eventsOptions[action.type];
  const params = action.payload;

  try {
    const response = yield call(provider.api, params);

    if ((response?.data || response.status === 204) && response.ok) {
      yield delay(500);

      if (action.type === 'DELETE_STORE_REQUEST') {
        yield put(provider.actions.success(params || true));
        yield call(provider.openNotification, params);
      }
      else {
        yield put(provider.actions.success(response?.data || true));
        yield call(provider.openNotification, response?.data);
      }
    } else {
      const error = Object.values(response.data).length
        ? Object.values(response.data)[0].detail
        : null;
      yield put(provider.actions.errors({ errors: error }));
      yield call(provider.openErrorNotification,error);
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_SEARCH_STORE_REQUEST, apiGenerator);
  yield takeLatest(constants.DELETE_STORE_REQUEST, apiGeneratorWithNotification);
}
