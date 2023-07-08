// RENAME COLLECTION
import { call, put } from 'redux-saga/effects';
import { openNotification } from '../notifications/rename-collection';
import Creators, { CollectionsTypes as constants } from '../reducer';
import * as services from '../service';

const actions = {
  renameCollectionActions: {
    request: Creators.renameCollectionRequest,
    success: Creators.renameCollectionSuccess,
    errors: Creators.renameCollectionFailure,
  },
};

const eventsOptions = {
  [constants.RENAME_COLLECTION_REQUEST]: {
    api: services.renameCollection,
    actions: actions.renameCollectionActions,
  },
};

export function* renameGenerator(action) {
  const provider = eventsOptions[action.type];
  const params = action.payload;

  try {
    const response = yield call(provider.api, params);

    if (response.data) {
      yield put(provider.actions.success(response.data));
      // CALL NOTIFICATION
      yield call(openNotification, {
        text: `${response.data.collection.name} ${response.data.message}`,
      });
    } else {
      yield put(
        provider.actions.errors({ errors: 'saveAsDefaultGenerator error' }),
      );
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default renameGenerator;
