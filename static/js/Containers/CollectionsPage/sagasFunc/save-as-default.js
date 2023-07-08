// SET AS DEFAULT COLLECTION
import { call, put } from 'redux-saga/effects';
import React from 'react';
import { openNotificationWithIcon } from '../../../Components/Notification/index';
import { DefaultMsg } from '../../../Components/Notification/notification-message';
import { EventHandler } from '../../../Utils/event-handler';
import Creators, { CollectionsTypes as constants } from '../reducer';
import * as services from '../service';

const actions = {
  setCollectionAsDefaultActions: {
    request: Creators.setCollectionAsDefaultRequest,
    success: Creators.setCollectionAsDefaultSuccess,
    errors: Creators.setCollectionAsDefaultFailure,
  },
};

const eventsOptions = {
  [constants.SET_COLLECTION_AS_DEFAULT_REQUEST]: {
    api: services.setCollectionAsDefault,
    actions: actions.setCollectionAsDefaultActions,
  },
};

export function* saveAsDefaultGenerator(action) {
  const provider = eventsOptions[action.type];
  const params = action.payload;

  const key = `open${Date.now()}`;
  const openNotification = ({ text }) => {

    openNotificationWithIcon({
      key,
      className: 'notification notification--save-to-default',
      message: <DefaultMsg text={text} />,
    });
  };

  try {
    const response = yield call(provider.api, params);

    if (response.data) {
      yield put(provider.actions.success(response.data));

      // CALL NOTIFICATION
      yield call(openNotification, {
        text: (
          <>
            <span
              className="blue-text"
              onClick={() => {
                EventHandler.emit('push-to-modal', {
                  name: params.collectionName,
                  link: `/collections/product-list/${params.collectionID}`,
                  search: { collection_id: params.collectionID },
                  from: window.location.pathname
                });
              }}
            >
              {params.collectionName}
            </span>{' '}
            {response.data.message}
          </>
        ),
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

export default saveAsDefaultGenerator;
