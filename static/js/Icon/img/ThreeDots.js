import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const ThreeDots = ({ width, height, className, color }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    className={cls(className, 'icon icon-three-dots')}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="6" r="2" fill={color ? color : "#707BA0"} />
    <circle cx="12" cy="12" r="2" fill={color ? color : "#707BA0"} />
    <circle cx="12" cy="18" r="2" fill={color ? color : "#707BA0"} />
  </svg>
);

ThreeDots.defaultProps = {
  width: 24,
  height: 24,
};

ThreeDots.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default ThreeDots;
