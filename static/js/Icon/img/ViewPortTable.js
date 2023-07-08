import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

const ViewPortTable = ({ width, height, className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    className={cls(className, 'icon icon-view-port-table')}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width="47"
      height="47"
      rx="6"
      // fill={color}
      stroke="#225aea"
    />
    <path
      d="M16 20C16.5523 20 17 19.5523 17 19C17 18.4477 16.5523 18 16 18C15.4477 18 15 18.4477 15 19C15 19.5523 15.4477 20 16 20Z"
      fill="#225aea"
    />
    <path
      d="M16 25C16.5523 25 17 24.5523 17 24C17 23.4477 16.5523 23 16 23C15.4477 23 15 23.4477 15 24C15 24.5523 15.4477 25 16 25Z"
      fill="#225aea"
    />
    <path
      d="M16 30C16.5523 30 17 29.5523 17 29C17 28.4477 16.5523 28 16 28C15.4477 28 15 28.4477 15 29C15 29.5523 15.4477 30 16 30Z"
      fill="#225aea"
    />
    <path
      d="M32.06 23H19.94C19.4209 23 19 23.4209 19 23.94V24.06C19 24.5791 19.4209 25 19.94 25H32.06C32.5791 25 33 24.5791 33 24.06V23.94C33 23.4209 32.5791 23 32.06 23Z"
      fill="#225aea"
    />
    <path
      d="M32.06 28H19.94C19.4209 28 19 28.4209 19 28.94V29.06C19 29.5791 19.4209 30 19.94 30H32.06C32.5791 30 33 29.5791 33 29.06V28.94C33 28.4209 32.5791 28 32.06 28Z"
      fill="#225aea"
    />
    <path
      d="M32.06 18H19.94C19.4209 18 19 18.4209 19 18.94V19.06C19 19.5791 19.4209 20 19.94 20H32.06C32.5791 20 33 19.5791 33 19.06V18.94C33 18.4209 32.5791 18 32.06 18Z"
      fill="#225aea"
    />
  </svg>
);

ViewPortTable.defaultProps = {
  width: 48,
  height: 48,
  color: '#F2F6FF',
};

ViewPortTable.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  // fill: PropTypes.string,
};

export default ViewPortTable;
