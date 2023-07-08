// CREATE COLLECTION
import { call, put } from 'redux-saga/effects';
import { EventHandler } from '../../../Utils/event-handler';
import Creators, { CollectionsTypes as constants } from '../reducer';
import { openCreateCollectionNotification } from '../notifications/open-create-collection';
import * as services from '../service';

const actions = {
  createCollectionActions: {
    request: Creators.createCollectionRequest,
    success: Creators.createCollectionSuccess,
    errors: Creators.createCollectionFailure,
  },
};

const eventsOptions = {
  [constants.CREATE_COLLECTION_REQUEST]: {
    api: services.createCollection,
    actions: actions.createCollectionActions,
  },
};

export function* createCollectionGenerator(action) {
  const provider = eventsOptions[action.type];
  const params = action.payload;

  try {
    const response = yield call(provider.api, params);

    if (response.data) {
      yield put(provider.actions.success(response.data));

      // GET COLLECTIONS
      yield put(Creators.getCollectionsRequest({ page_size: 40 }));

      // CLOSE CREATE MODAL
      yield call(EventHandler.emit, 'close-create-modal');

      // OPEN NOTIFICATION
      yield call(openCreateCollectionNotification, response.data);

      if (response.data?.collection) {
        yield put(
          Creators.saveCollection({
            collectionID: response.data?.collection?.id,
            collectionName: response.data?.collection?.name,
          }),
        );
      }
    } else {
      yield put(
        provider.actions.errors({ errors: 'createCollectionGenerator error' }),
      );
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default createCollectionGenerator;
