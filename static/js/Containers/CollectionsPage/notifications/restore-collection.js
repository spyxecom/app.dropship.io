import React from 'react';
import { openNotificationWithIcon } from '../../../Components/Notification/index';
import { DefaultMsg } from '../../../Components/Notification/notification-message';

const key = `open${Date.now()}`;
export const openNotification = ({ text }) => {
  openNotificationWithIcon({
    key,
    className: 'notification notification--restore',
    style: { minWidth: '716px' },
    message: <DefaultMsg text={text} />,
  });
};
