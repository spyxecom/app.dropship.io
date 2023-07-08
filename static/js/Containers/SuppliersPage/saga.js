import {call, put, takeLatest} from "redux-saga/effects";
import Creators, {SuppliersPageTypes as constants} from "./reducer";
import * as services from './services';

const actions = {
  getSuppliersActions: {
    request: Creators.getSuppliersRequest,
    success: Creators.getSuppliersSuccess,
    errors: Creators.getSuppliersFailure,
  },
};

const eventsOptions = {
  [constants.GET_SUPPLIERS_REQUEST]: {
    api: services.getSuppliers,
    actions: actions.getSuppliersActions
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
  yield takeLatest(constants.GET_SUPPLIERS_REQUEST, apiGenerator);
}
