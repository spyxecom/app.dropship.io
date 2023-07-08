// RESTORE COLLECTION
import { call, put } from 'redux-saga/effects';
import { openNotification } from '../notifications/restore-collection';
import Creators, { CollectionsTypes as constants } from '../reducer';
import * as services from '../service';

const actions = {
  restoreCollectionActions: {
    request: Creators.restoreCollectionRequest,
    success: Creators.restoreCollectionSuccess,
    errors: Creators.restoreCollectionFailure,
  },
};

const eventsOptions = {
  [constants.RESTORE_COLLECTION_REQUEST]: {
    api: services.restoreCollection,
    actions: actions.restoreCollectionActions,
  },
};

export function* restoreGenerator(action) {
  const provider = eventsOptions[action.type];
  const params = action.payload;

  try {
    const response = yield call(provider.api, params);

    if (response.data) {
      yield put(provider.actions.success(response.data));
      yield put(Creators.getCollectionsRequest({ page_size: 40 }));

      // CALL NOTIFICATION
      yield call(openNotification, {
        text: `${response.data.message}`,
      });
    } else {
      yield put(provider.actions.errors({ errors: 'restoreGenerator error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default restoreGenerator;
