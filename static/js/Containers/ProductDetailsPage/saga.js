/*ProductDetails Page sagas*/

import { takeLatest, put, call } from 'redux-saga/effects';

import * as services from './services';
import Creators, { ProductDetailsTypes as constants } from './reducer';
import {connectRouter, push} from "connected-react-router";
import {history} from "../../Utils/utils";

const FileDownload = require('js-file-download')

const actions = {
  getProductDetailsActions: {
    request: Creators.getProductDetailsRequest,
    success: Creators.getProductDetailsSuccess,
    errors: Creators.getProductDetailsFailure,
  },
  exportInterestsActions: {
    request: Creators.exportInterestsRequest,
    success: Creators.exportInterestsSuccess,
    errors: Creators.exportInterestsFailure,
  },
};

const eventsOptions = {
  [constants.GET_PRODUCT_DETAILS_REQUEST]: {
    api: services.getProductDetails,
    actions: actions.getProductDetailsActions,
  },
  [constants.EXPORT_INTERESTS_REQUEST]: {
    api: services.exportInterests,
    actions: actions.exportInterestsActions,
  },
};

function* apiGenerator(action) {
  const provider = eventsOptions[action.type];

  try {
    const params = action.payload;
    const response = yield call(provider.api, params);
    let historyLocal = connectRouter(history)();

    if (response.data && response?.ok) {
      yield put(provider.actions.success(response.data));
    } else {
      if (response?.status === 404) {
        yield put(push(`/${historyLocal?.location?.pathname?.split('/')?.[1]}`));
      }
      yield put(provider.actions.errors({ errors: response?.data?.message?.detail || 'some error' }));
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
      FileDownload(response.data, `Interests report (product_${params.product_id}).csv`)
      yield put(provider.actions.success(response.data));
    } else {
      yield put(provider.actions.errors({ errors: 'some error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_PRODUCT_DETAILS_REQUEST, apiGenerator);
  yield takeLatest(constants.EXPORT_INTERESTS_REQUEST, exportFileGenerator);
}
