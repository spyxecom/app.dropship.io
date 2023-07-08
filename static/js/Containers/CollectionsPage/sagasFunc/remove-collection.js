// REMOVE COLLECTION
import { call, put, select } from 'redux-saga/effects';
import { Trans } from 'react-i18next';
import React from 'react';
// eslint-disable-next-line import/named
import { openNotification } from '../notifications/remove-collection';
import Creators, {
  CollectionsSelectors,
  CollectionsTypes as constants,
} from '../reducer';
import { EventHandler } from '../../../Utils/event-handler';
import * as services from '../service';

const actions = {
  removeCollectionActions: {
    request: Creators.removeCollectionRequest,
    success: Creators.removeCollectionSuccess,
    errors: Creators.removeCollectionFailure,
  },
};

const eventsOptions = {
  [constants.REMOVE_COLLECTION_REQUEST]: {
    api: services.removeCollection,
    actions: actions.removeCollectionActions,
  },
};

export function* removeGenerator(action) {
  const provider = eventsOptions[action.type];
  const params = action.payload;

  // restoreCollectionRequest
  try {
    const response = yield call(provider.api, params);

    if (response.data) {
      const state = yield select(CollectionsSelectors.getState);
      const collectionName = state?.collection?.collectionName;
      yield put(provider.actions.success(response.data));
      yield put(Creators.getCollectionsRequest({ page_size: 40 }));

      // CALL NOTIFICATION
      yield call(openNotification, {
        text: (
          <span className="restore-modal-notification">
            {collectionName} {response.data.message}
            <span
              onClick={() => {
                EventHandler.emit('restore-modal');
              }}
            >
              <Trans i18nKey="Undo Action" />
            </span>
          </span>
        ),
      });
    } else {
      yield put(provider.actions.errors({ errors: 'removeGenerator error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default removeGenerator;
