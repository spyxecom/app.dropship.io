import { Trans } from 'react-i18next';
import React from 'react';
import { openNotificationWithIcon } from '../../../Components/Notification/index';
import { DefaultMsg } from '../../../Components/Notification/notification-message';
import { EventHandler } from '../../../Utils/event-handler';

const unSaveKey = `unsave-${Date.now()}`;
export const unSaveNotification = ({ message }) => {
  openNotificationWithIcon({
    key: unSaveKey,
    className: 'notification notification--create-collection',
    message: (
      <DefaultMsg
        icon="notification_delete"
        text={
          <span className="restore-modal-notification">
            {message}
            <span
              onClick={() => {
                EventHandler.emit('restore-product');
              }}
            >
              <Trans i18nKey="Undo Action" />
            </span>
          </span>
        }
      />
    ),
  });
};
