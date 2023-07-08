/*
 *
 * CollectionsModals Modal sagas
 *
 */

import { takeLatest, put, call } from 'redux-saga/effects';
import * as services from './service';
import Creators, { CollectionsTypes as constants } from './reducer';

// SAGA GENERATORS
import {
  saveUnsaveGenerator,
  removeGenerator,
  restoreGenerator,
  renameGenerator,
  saveAsDefaultGenerator,
  createCollectionGenerator,
} from './sagasFunc';

const actions = {
  addToCollectionActions: {
    request: Creators.addToCollectionRequest,
    success: Creators.addToCollectionSuccess,
    errors: Creators.addToCollectionFailure,
  },
  setCollectionAsDefaultActions: {
    request: Creators.setCollectionAsDefaultRequest,
    success: Creators.setCollectionAsDefaultSuccess,
    errors: Creators.setCollectionAsDefaultFailure,
  },
  removeFromCollectionActions: {
    request: Creators.removeFromCollectionRequest,
    success: Creators.removeFromCollectionSuccess,
    errors: Creators.removeFromCollectionFailure,
  },
  renameCollectionActions: {
    request: Creators.renameCollectionRequest,
    success: Creators.renameCollectionSuccess,
    errors: Creators.renameCollectionFailure,
  },
  removeCollectionActions: {
    request: Creators.removeCollectionRequest,
    success: Creators.removeCollectionSuccess,
    errors: Creators.removeCollectionFailure,
  },
  restoreCollectionActions: {
    request: Creators.restoreCollectionRequest,
    success: Creators.restoreCollectionSuccess,
    errors: Creators.restoreCollectionFailure,
  },
  getCollectionsActions: {
    request: Creators.getCollectionsRequest,
    success: Creators.getCollectionsSuccess,
    errors: Creators.getCollectionsFailure,
  },
  getNextCollectionsActions: {
    request: Creators.getNextCollectionsRequest,
    success: Creators.getNextCollectionsSuccess,
    errors: Creators.getNextCollectionsFailure,
  },
  createCollectionActions: {
    request: Creators.createCollectionRequest,
    success: Creators.createCollectionSuccess,
    errors: Creators.createCollectionFailure,
  },
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
};

const eventsOptions = {
  [constants.ADD_TO_COLLECTION_REQUEST]: {
    api: services.addToCollection,
    actions: actions.addToCollectionActions,
  },
  [constants.REMOVE_FROM_COLLECTION_REQUEST]: {
    api: services.removeFromCollection,
    actions: actions.removeFromCollectionActions,
  },
  [constants.RENAME_COLLECTION_REQUEST]: {
    api: services.renameCollection,
    actions: actions.renameCollectionActions,
  },
  [constants.REMOVE_COLLECTION_REQUEST]: {
    api: services.removeCollection,
    actions: actions.removeCollectionActions,
  },
  [constants.RESTORE_COLLECTION_REQUEST]: {
    api: services.restoreCollection,
    actions: actions.restoreCollectionActions,
  },
  [constants.SET_COLLECTION_AS_DEFAULT_REQUEST]: {
    api: services.setCollectionAsDefault,
    actions: actions.setCollectionAsDefaultActions,
  },
  [constants.GET_COLLECTIONS_REQUEST]: {
    api: services.getCollections,
    actions: actions.getCollectionsActions,
  },
  [constants.GET_NEXT_COLLECTIONS_REQUEST]: {
    api: services.getNextCollections,
    actions: actions.getNextCollectionsActions,
  },
  [constants.CREATE_COLLECTION_REQUEST]: {
    api: services.createCollection,
    actions: actions.createCollectionActions,
  },
  [constants.GET_PRODUCTS_REQUEST]: {
    api: services.getProducts,
    actions: actions.getProductsActions,
  },
  [constants.GET_PRODUCTS_NEXT_REQUEST]: {
    api: services.getProductsNext,
    actions: actions.getProductsNextActions,
  },
};

// COMMON HANDLER
function* apiGenerator(action) {
  const provider = eventsOptions[action.type];

  try {
    const params = action.payload;
    const response = yield call(provider.api, params);

    if (response.ok && response.data) {
      yield put(provider.actions.success(response.data));
    } else {
      yield put(
        provider.actions.errors({ errors: response?.data?.message || 'common apiGenerator error' }),
      );
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.ADD_TO_COLLECTION_REQUEST, saveUnsaveGenerator);
  yield takeLatest(constants.GET_PRODUCTS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_PRODUCTS_NEXT_REQUEST, apiGenerator);
  yield takeLatest(
    constants.REMOVE_FROM_COLLECTION_REQUEST,
    saveUnsaveGenerator,
  );
  yield takeLatest(constants.RENAME_COLLECTION_REQUEST, renameGenerator);
  yield takeLatest(constants.REMOVE_COLLECTION_REQUEST, removeGenerator);
  yield takeLatest(constants.RESTORE_COLLECTION_REQUEST, restoreGenerator);
  yield takeLatest(constants.GET_COLLECTIONS_REQUEST, apiGenerator);
  yield takeLatest(
    constants.SET_COLLECTION_AS_DEFAULT_REQUEST,
    saveAsDefaultGenerator,
  );
  yield takeLatest(constants.GET_NEXT_COLLECTIONS_REQUEST, apiGenerator);
  yield takeLatest(
    constants.CREATE_COLLECTION_REQUEST,
    createCollectionGenerator,
  );
}
