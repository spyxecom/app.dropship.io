import {call, put, takeLatest} from "redux-saga/effects";
import Creators, {ChargebeeTypes as constants} from "./reducer";
import * as services from './services';

const actions = {
  getChargeActions: {
    request: Creators.getChargeRequest,
    success: Creators.getChargeSuccess,
    errors: Creators.getChargeFailure,
  },
};

const eventsOptions = {
  [constants.GET_CHARGE_REQUEST]: {
    api: services.getCharge,
    actions: actions.getChargeActions
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
      yield put(provider.actions.errors({errors: error}));
    }
  } catch (errors) {
    yield put(provider.actions.errors({errors}));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_CHARGE_REQUEST, apiGenerator);
}
