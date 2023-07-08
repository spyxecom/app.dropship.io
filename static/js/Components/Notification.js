import React from 'react';

import { notification } from 'antd';
import NotificationSuccess from '../Icon/img/NotificationSuccess';
import NotificationWarning from '../Icon/img/NotificationWarning';
import NotificationClose from '../Icon/img/NotificationClose';
import NotificationSchedule from '../Icon/img/NotificationSchedule';
import NotificationError from '../Icon/img/NotificationError';
import NotificationDelete from '../Icon/img/NotificationDelete';

import './Notification.less';

const notificationsTypes = {
  success: <NotificationSuccess />,
  warning: <NotificationWarning />,
  info: <NotificationSuccess />,
  error: <NotificationError />,
  delete: <NotificationDelete />,
  addSchedule: (
    <NotificationSchedule className="icon-notification-schedule_add" />
  ),
  deleteSchedule: (
    <NotificationSchedule className="icon-notification-schedule_delete" />
  ),
};

const openNotification = ({
  type,
  message,
  style,
  getContainer,
  className,
  ...props
}) => {

  notification.config({
    duration: 3,
    top: 24,
    icon: notificationsTypes[type] || notificationsTypes.success,
    closeIcon: <NotificationClose />,
    className: 'custom-notification',
    getContainer: () => getContainer || document.getElementById('global-wrap'),
    onClose: () => notification.destroy(),
    style: { ...style },
    maxCount: 1,
    ...props
  })

  notification['success']({
    message,
  });
};

export default openNotification;
