import React from 'react';
import { openNotificationWithIcon } from '../../../Components/Notification/index';
import { DefaultMsg } from '../../../Components/Notification/notification-message';

const key = `open${Date.now()}`;
export const openNotification = ({ text }) => {
  openNotificationWithIcon({
    key,
    style: { minWidth: '716px' },
    className: 'notification notification--rename',
    message: <DefaultMsg text={text} />,
  });
};

export default openNotification;
