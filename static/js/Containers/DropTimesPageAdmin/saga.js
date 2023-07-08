import { takeLatest, put, call } from 'redux-saga/effects';

import * as services from './services';
import Creators, { TimerTypes as constants } from './reducer';

const actions = {
  getTimerListActions: {
    request: Creators.getTimerListRequest,
    success: Creators.getTimerListSuccess,
    errors: Creators.getTimerListFailure,
  },
  timerUpdateActions: {
    request: Creators.timerUpdateRequest,
    success: Creators.timerUpdateSuccess,
    errors: Creators.timerUpdateFailure,
  },
  timerUpdatePartialActions: {
    request: Creators.timerUpdatePartialRequest,
    success: Creators.timerUpdatePartialSuccess,
    errors: Creators.timerUpdatePartialFailure,
  },
};

const eventsOptions = {
  [constants.GET_TIMER_LIST_REQUEST]: {
    api: services.getTimerList,
    actions: actions.getTimerListActions,
  },
  [constants.TIMER_UPDATE_REQUEST]: {
    api: services.timerUpdate,
    actions: actions.timerUpdateActions,
  },
  [constants.TIMER_UPDATE_PARTIAL_REQUEST]: {
    api: services.timerUpdatePartial,
    actions: actions.timerUpdatePartialActions,
  },
};

// const events = Object.keys(eventsOptions);

function* apiGenerator(action) {
  const provider = eventsOptions[action.type];
  const params = action.payload;

  try {
    const response = yield call(provider.api, params);

    if (response.data && response.ok) {
      yield put(provider.actions.success(response.data));
    } else if (!response.data && response.ok) {
      yield put(provider.actions.success(response.data));
    } else {
      yield put(provider.actions.errors({ errors: 'Server response error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_TIMER_LIST_REQUEST, apiGenerator);
  yield takeLatest(constants.TIMER_UPDATE_REQUEST, apiGenerator);
  yield takeLatest(constants.TIMER_UPDATE_PARTIAL_REQUEST, apiGenerator);
}
