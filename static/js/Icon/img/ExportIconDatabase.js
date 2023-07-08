import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

const ExportIconDatabase = ({ width, height, className, outline, color }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cls(className, 'icon icon-export icon-export-database')}
  >
      <path fillRule="evenodd" clipRule="evenodd" d="M3 15.2413L3 12C3 11.4477 3.44772 11 4 11C4.55229 11 5 11.4477 5 12L5 15.2C5 16.0566 5.00078 16.6389 5.03755 17.089C5.07337 17.5274 5.1383 17.7516 5.21799 17.908C5.40973 18.2843 5.7157 18.5903 6.09202 18.782C6.24842 18.8617 6.47262 18.9266 6.91104 18.9625C7.36113 18.9992 7.94342 19 8.8 19H15.2C16.0566 19 16.6389 18.9992 17.089 18.9624C17.5274 18.9266 17.7516 18.8617 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C18.8617 17.7516 18.9266 17.5274 18.9625 17.089C18.9992 16.6389 19 16.0566 19 15.2L19 12C19 11.4477 19.4477 11 20 11C20.5523 11 21 11.4477 21 12V15.2411C21 16.0462 21 16.7106 20.9558 17.2518C20.9099 17.8139 20.8113 18.3306 20.564 18.816C20.1805 19.5686 19.5686 20.1805 18.816 20.564C18.3306 20.8113 17.8139 20.9099 17.2518 20.9558C16.7106 21 16.0463 21 15.2413 21H8.7587C7.95373 21 7.28937 21 6.74817 20.9558C6.18608 20.9099 5.66937 20.8113 5.18404 20.564C4.43139 20.1805 3.81947 19.5686 3.43597 18.816C3.18868 18.3306 3.09012 17.8139 3.04419 17.2518C2.99998 16.7106 2.99999 16.0463 3 15.2413Z"
            fill={color} />
      <path d="M9.70711 7.70711C9.31658 8.09763 8.68342 8.09763 8.29289 7.70711C7.90237 7.31658 7.90237 6.68342 8.29289 6.29289L11.2929 3.29289C11.6834 2.90237 12.3166 2.90237 12.7071 3.29289L15.7071 6.29289C16.0976 6.68342 16.0976 7.31658 15.7071 7.70711C15.3166 8.09763 14.6834 8.09763 14.2929 7.70711L13 6.41421V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V6.41421L9.70711 7.70711Z"
            fill={color} />
  </svg>
);

ExportIconDatabase.defaultProps = {
  width: 24,
  height: 24,
  outline: 0,
  color: '#707BA0',
};

ExportIconDatabase.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  outline: PropTypes.number,
  color: PropTypes.string,
  // fill: PropTypes.string,
};

export default ExportIconDatabase;