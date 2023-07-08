/*
 *
 * Portfolio sagas
 *
 */

import { takeLatest, put, call } from 'redux-saga/effects';

import * as services from './services';
import Creators, { PortfolioTypes as constants } from './reducer';

const actions = {
  getCategoryActions: {
    request: Creators.getCategoryStatusRequest,
    success: Creators.getCategoryStatusSuccess,
    errors: Creators.getCategoryStatusFailure,
  },
  getUserCategoryDataActions: {
    request: Creators.getUserCategoryDataRequest,
    success: Creators.getUserCategoryDataSuccess,
    errors: Creators.getUserCategoryDataFailure,
  },
  getNextDropsActions: {
    request: Creators.getNextDropsRequest,
    success: Creators.getNextDropsSuccess,
    errors: Creators.getNextDropsFailure,
  },
};

const eventsOptions = {
  [constants.GET_CATEGORY_STATUS_REQUEST]: {
    api: services.getStatusCategory,
    actions: actions.getCategoryActions,
  },
  [constants.GET_USER_CATEGORY_DATA_REQUEST]: {
    api: services.getUserCategoryData,
    actions: actions.getUserCategoryDataActions,
  },
  [constants.GET_NEXT_DROPS_REQUEST]: {
    api: services.getNextDrops,
    actions: actions.getNextDropsActions,
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
      yield put(provider.actions.errors({ errors: response?.data?.message || 'some error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_CATEGORY_STATUS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_USER_CATEGORY_DATA_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_NEXT_DROPS_REQUEST, apiGenerator);
}
