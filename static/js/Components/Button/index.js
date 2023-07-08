import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';
import { Button } from 'antd';
import './styles.less';

export const ButtonComponent = ({ className, text, onClick, ...props }) => {

  return (
    <Button onClick={onClick} className={cls(className, 'btn')} {...props}>
      {text}
      {props.children}
    </Button>
  )
};

ButtonComponent.propTypes = {
  className: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
};

export default ButtonComponent;
