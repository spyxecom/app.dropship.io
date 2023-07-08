import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const UserDefault = ({ width, height, className, isMobile }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    className={cls(className, 'icon icon-user-default icon-user-default-bold')}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
      fill="#225aea"
    />
    <path
      d="M31.301 24.184C30.7378 23.8688 30.0306 24.0016 29.621 24.5008C28.1442 26.3056 26.1698 27.408 24.0002 27.408C21.8306 27.408 19.8562 26.3056 18.3794 24.5008C17.9714 24.0016 17.2626 23.8704 16.6994 24.184C12.6482 26.448 9.75543 30.5376 9.13623 35.3408C9.03223 36.1488 9.30103 36.96 9.86583 37.5488C13.4258 41.2576 18.4354 43.568 23.9842 43.568C29.5506 43.568 34.573 41.2448 38.1362 37.5136C38.6994 36.9248 38.9666 36.112 38.861 35.304C38.2306 30.5168 35.3426 26.4416 31.301 24.184Z"
      fill={isMobile ? '#9abffe' : 'url(#user_default_paint0_linear)'}
    />
    <path
      d="M24 22C27.3137 22 30 19.0899 30 15.5C30 11.9101 27.3137 9 24 9C20.6863 9 18 11.9101 18 15.5C18 19.0899 20.6863 22 24 22Z"
      fill={isMobile ? '#9abffe' : 'url(#user_default_paint1_linear)'}
    />

    {
      isMobile
        ? null
        : <defs>
          <linearGradient
            id="user_default_paint0_linear"
            x1="23.999"
            y1="2.9557"
            x2="23.999"
            y2="110.503"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.078125" stopColor="white"/>
            <stop offset="0.49506" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient
            id="user_default_paint1_linear"
            x1="24"
            y1="-5"
            x2="24"
            y2="66.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.078125" stopColor="white"/>
            <stop offset="0.49506" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
    }
  </svg>
);

UserDefault.defaultProps = {
  width: 48,
  height: 48,
  isMobile: false,
};

UserDefault.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  isMobile: PropTypes.bool,
};

export default UserDefault;
