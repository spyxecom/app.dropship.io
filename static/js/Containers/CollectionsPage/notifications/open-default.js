import React from 'react';
import { openNotificationWithIcon } from '../../../Components/Notification/index';
import Message from '../../../Components/Notification/notification-message';

const defaultKey = `open-default-${Date.now()}`;
export const openDefaultNotification = ({ params, isSave }) => {
  openNotificationWithIcon({
    key: defaultKey,
    className: 'notification notification--save notification--save__with-btn',
    message: (
      <Message
        keyForClose={defaultKey}
        text={params.productName}
        isSave={isSave}
        isRestore={params?.restore}
      />
    ),
  });
};
