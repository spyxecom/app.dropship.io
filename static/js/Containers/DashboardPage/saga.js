/*
 *
 * Dashboard sagas
 *
 */

import { takeLatest, put, call } from 'redux-saga/effects';

import * as services from './services';
import Creators, { DashboardTypes as constants } from './reducer';

const actions = {
  getDashboardInfoActions: {
    request: Creators.getDashboardInfoRequest,
    success: Creators.getDashboardInfoSuccess,
    errors: Creators.dashboardInfoFailure,
  },
  getNewDashboardInfoActions: {
    request: Creators.getNewDashboardInfoRequest,
    success: Creators.getNewDashboardInfoSuccess,
    errors: Creators.dashboardInfoFailure,
  },
  getNextDashboardInfoActions: {
    request: Creators.getNextDashboardInfoRequest,
    success: Creators.getNextDashboardInfoSuccess,
    errors: Creators.dashboardInfoFailure,
  },
};

const eventsOptions = {
  [constants.GET_DASHBOARD_INFO_REQUEST]: {
    api: services.getDashboardInfo,
    actions: actions.getDashboardInfoActions,
  },
  [constants.GET_NEW_DASHBOARD_INFO_REQUEST]: {
    api: services.getNextDashboardInfo,
    actions: actions.getNewDashboardInfoActions,
  },
  [constants.GET_NEXT_DASHBOARD_INFO_REQUEST]: {
    api: services.getNextDashboardInfo,
    actions: actions.getNextDashboardInfoActions,
  },
};

// const events = Object.keys(eventsOptions);

function* apiGenerator(action) {
  const provider = eventsOptions[action.type];

  try {
    const params = action.payload;
    const response = yield call(provider.api, params);

    if (response.ok && response.data) {
      yield put(provider.actions.success(response.data));
    } else {
      yield put(provider.actions.errors({ errors: 'some error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_DASHBOARD_INFO_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_NEW_DASHBOARD_INFO_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_NEXT_DASHBOARD_INFO_REQUEST, apiGenerator);
}
