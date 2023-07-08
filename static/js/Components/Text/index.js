import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';
import cls from 'classname';

export const IconWithText = ({ icon: Icon, text, className, ...props }) => (
  <Space {...props} className={cls('text-with-icon', className)}>
    {Icon()}
    <span>{text}</span>
  </Space>
);

IconWithText.defaultProps = {};

IconWithText.propTypes = {
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default IconWithText;
