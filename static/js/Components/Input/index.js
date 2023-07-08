import React from 'react';
import {useSelector} from "react-redux";
import cls from 'classname';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import './styles.less';

export const InputComponent = React.forwardRef(({
  placeholder,
  onChange,
  className,
  ...props
}, ref) => {

  const isDisabledTransition = useSelector(state => state.nav.disabledTransition);

  return (
    <Input
      placeholder={placeholder}
      onChange={onChange}
      className={cls(className, 'input', {
        'disabled-transition': isDisabledTransition
      })}
      ref={ref || null}
      {...props}
    />
  )
});

InputComponent.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default InputComponent;
