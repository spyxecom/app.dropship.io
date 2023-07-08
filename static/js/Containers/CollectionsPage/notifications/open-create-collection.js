import React from 'react';
import { openNotificationWithIcon } from '../../../Components/Notification/index';
import { DefaultMsg } from '../../../Components/Notification/notification-message';
import { EventHandler } from '../../../Utils/event-handler';

const createCollectionKey = `open-create-${Date.now()}`;
export const openCreateCollectionNotification = ({ message, collection }) => {
  openNotificationWithIcon({
    key: createCollectionKey,
    className: 'notification notification--create-collection',
    message: (
      <DefaultMsg
        text={
          <>
            {collection?.products?.length ? (
              <span className="notification__action">{message}</span>
            ) : null}
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
              {collection?.name}{' '}
            </span>
            {!collection?.products?.length ? (
              <span className="notification__action">{message}</span>
            ) : null}
          </>
        }
      />
    ),
  });
};
