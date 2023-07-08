import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const Gps = ({ width, height, className, color='#6e7dae', outline }) =>
  outline ? (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={cls(className, 'icon icon-gps icon-gps-outline')}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd"
            d="M11 3C11 2.44772 11.4477 2 12 2C12.5523 2 13 2.44772 13 3V4.06189C16.6187 4.51314 19.4869 7.38128 19.9381 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H19.9381C19.4869 16.6187 16.6187 19.4869 13 19.9381V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V19.9381C7.38128 19.4869 4.51314 16.6187 4.06189 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H4.06189C4.51314 7.38128 7.38128 4.51314 11 4.06189V3ZM6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12Z"
            fill={color}/>
      <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
            fill={color}/>
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={cls(className, 'icon icon-gps icon-gps-bold')}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd"
            d="M12 2C11.4477 2 11 2.44772 11 3V4.06189C7.38128 4.51314 4.51314 7.38128 4.06189 11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H4.06189C4.51314 16.6187 7.38128 19.4869 11 19.9381V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V19.9381C16.6187 19.4869 19.4869 16.6187 19.9381 13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H19.9381C19.4869 7.38128 16.6187 4.51314 13 4.06189V3C13 2.44772 12.5523 2 12 2ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
            fill={'#225AEA'}/>
    </svg>
  );

Gps.defaultProps = {
  width: 24,
  height: 24,
  // fill: '#6E7DAE',
  outline: true,
};

Gps.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
  outline: PropTypes.bool,
};

export default Gps;
