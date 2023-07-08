import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const MethodDatabase = ({ width, height, className, color }) => (
  <svg width={width}
       height={height}
       fill={color}
       viewBox="0 0 64 64"
       xmlns="http://www.w3.org/2000/svg"
       className={cls(className, 'icon ')}
  >
    <path fillRule="evenodd" clipRule="evenodd"
          d="M56 12.6452C40.64 6.4516 23.36 6.4516 8 12.6452V24.2582C23.36 30.4518 40.64 30.4518 56 24.2582V12.6452ZM10 13.6126C24.2115 8.6115 39.7885 8.6115 54 13.6126C39.7885 18.6138 24.2115 18.6138 10 13.6126ZM8 26.1934C23.36 32.3869 40.64 32.3869 56 26.1934V37.8063C40.64 43.9999 23.36 43.9999 8 37.8063V26.1934ZM56 39.7418C40.64 45.9354 23.36 45.9354 8 39.7418V51.3548C23.36 57.5484 40.64 57.5484 56 51.3548V39.7418Z"
    />
  </svg>
);

MethodDatabase.defaultProps = {
  width: 64,
  height: 64,
  color: '#225aea',
};

MethodDatabase.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default MethodDatabase;
