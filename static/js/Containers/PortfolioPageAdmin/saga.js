/*Admin Portfolio sagas*/


import { takeLatest, put, call } from 'redux-saga/effects';

import * as services from './services';
import Creators, { PortfolioAdminTypes as constants } from './reducer';

const actions = {
  getCategoryDropsActions: {
    request: Creators.getCategoryDropsRequest,
    success: Creators.getCategoryDropsSuccess,
    errors: Creators.getCategoryDropsFailure,
  },
  getNextDropsActions: {
    request: Creators.getNextDropsRequest,
    success: Creators.getNextDropsSuccess,
    errors: Creators.getNextDropsFailure,
  },
};

const eventsOptions = {
  [constants.GET_CATEGORY_DROPS_REQUEST]: {
    api: services.getCategoryDrops,
    actions: actions.getCategoryDropsActions,
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
      yield put(provider.actions.errors({ errors: 'some error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_CATEGORY_DROPS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_NEXT_DROPS_REQUEST, apiGenerator);
}
