import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

const Edit = ({ width, height, className, color }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cls(className, 'icon icon-edit')}
  >
    <path
      d="M12.9335 4.89324L11.1069 3.06657C10.8685 2.84264 10.5561 2.71414 10.2291 2.70554C9.90211 2.69694 9.58339 2.80882 9.33353 3.01991L3.33353 9.01991C3.11804 9.23722 2.98387 9.52204 2.95353 9.82657L2.66686 12.6066C2.65788 12.7042 2.67055 12.8026 2.70397 12.8948C2.73739 12.987 2.79073 13.0707 2.8602 13.1399C2.92249 13.2017 2.99637 13.2506 3.07759 13.2838C3.15882 13.3169 3.24579 13.3337 3.33353 13.3332H3.39353L6.17353 13.0799C6.47806 13.0496 6.76289 12.9154 6.9802 12.6999L12.9802 6.69991C13.2131 6.45388 13.3389 6.12558 13.3302 5.78693C13.3214 5.44828 13.1788 5.12691 12.9335 4.89324ZM6.05353 11.7466L4.05353 11.9332L4.23353 9.93324L8.0002 6.21324L9.8002 8.01324L6.05353 11.7466ZM10.6669 7.11991L8.8802 5.33324L10.1802 3.99991L12.0002 5.81991L10.6669 7.11991Z"
      fill={color}
    />
  </svg>
);

Edit.defaultProps = {
  width: 16,
  height: 16,
  color: '#225aea',
};

Edit.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default Edit;
