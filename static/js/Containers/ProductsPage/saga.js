/*
 *
 * Products Page sagas
 *
 */

import { takeLatest, put, call } from 'redux-saga/effects';

import * as services from './services';
import Creators, { PortfolioTypes as constants } from './reducer';

const actions = {
  getProductsActions: {
    request: Creators.getProductsRequest,
    success: Creators.getProductsSuccess,
    errors: Creators.getProductsFailure,
  },
  getProductsNextActions: {
    request: Creators.getProductsNextRequest,
    success: Creators.getProductsNextSuccess,
    errors: Creators.getProductsNextFailure,
  },
  addProductsActions: {
    request: Creators.addProductsRequest,
    success: Creators.addProductsSuccess,
    errors: Creators.addProductsFailure,
  },
};

const eventsOptions = {
  [constants.GET_PRODUCTS_REQUEST]: {
    api: services.getProducts,
    actions: actions.getProductsActions,
  },
  [constants.GET_PRODUCTS_NEXT_REQUEST]: {
    api: services.getProductsNext,
    actions: actions.getProductsNextActions,
  },
  [constants.ADD_PRODUCTS_REQUEST]: {
    api: services.addProducts,
    actions: actions.addProductsActions,
  },
};

function* apiGenerator(action) {
  const provider = eventsOptions[action.type];

  try {
    const params = action.payload;
    const response = yield call(provider.api, params);

    if (response.ok) {
      yield put(provider.actions.success(response.data));
    } else if (response.data) {
      yield put(
        provider.actions.errors({
          errors: response.data?.message?.detail || 'some error',
        }),
      );
    } else {
      yield put(provider.actions.errors({ errors: 'some error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_PRODUCTS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_PRODUCTS_NEXT_REQUEST, apiGenerator);
  yield takeLatest(constants.ADD_PRODUCTS_REQUEST, apiGenerator);
}
