import React from 'react';
import cls from 'classname';
import { notification } from 'antd';
import Icon from '../../Icon';
import NotificationSuccess from '../../Icon/img/NotificationSuccess';
import NotificationWarning from '../../Icon/img/NotificationWarning';
import NotificationClose from '../../Icon/img/NotificationClose';
import NotificationError from '../../Icon/img/NotificationError';
import NotificationDelete from '../../Icon/img/NotificationDelete';
import './styles.less';

const defaultProps = {
  duration: 3,
  top: 24,
  getContainer: () => document.getElementById('global-wrap'),
  onClose: () => {
    notification.destroy();
  },
};

const notificationsTypes = {
  success: <NotificationSuccess />,
  warning: <NotificationWarning />,
  info: <NotificationSuccess />,
  error: <NotificationError />,
  delete: <NotificationDelete />,
};

const openNotification = ({ type, message, style, getContainer, ...props }) => {
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

  notification.success({
    message,
  });
};

export const openNotificationWithIcon = ({
  icon,
  iconProps,
  message,
  style,
  className,
  ...rest
}) => {

  notification.config({
    style: { ...style },
    closeIcon: <Icon role="icon" type="notification_close" />,
    className: cls(className, 'custom-notification'),
    maxCount: 1,
    ...defaultProps,
  })

  notification.success({
    description: <div>{message}</div>,
    ...rest,
  });
};

export default openNotification;
