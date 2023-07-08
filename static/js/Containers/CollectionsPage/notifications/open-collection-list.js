import React from 'react';
import { openNotificationWithIcon } from '../../../Components/Notification/index';
import { DefaultMsg } from '../../../Components/Notification/notification-message';
import { EventHandler } from '../../../Utils/event-handler';

const fromCollectionListKey = `open-create-${Date.now()}`;
export const openCollectionListNotification = ({ message, collection }) => {
  openNotificationWithIcon({
    key: fromCollectionListKey,
    className: 'notification notification--create-collection',
    message: (
      <DefaultMsg
        text={
          <>
            <span className="notification__action">{message}</span>
            <span
              className="notification__link"
              onClick={() => {
                EventHandler.emit('push-to-modal', {
                  link: `/collections/product-list/${collection?.id}`,
                  name: collection?.name,
                  from: window.location.pathname
                });
              }}
            >
              {' '}
              {collection?.name}
            </span>
          </>
        }
      />
    ),
  });
};
