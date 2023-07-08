import React from 'react';
import PropTypes from 'prop-types';

export const DashboardMobile = ({
  width,
  height,
  className,
  fill,
  outline,
  theme,
}) =>
  outline ? (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 31.2659L15 23.7652C15 22.6868 15.4676 21.6614 16.2819 20.9543L22.373 15.6652C23.3064 14.8546 24.694 14.8546 25.6274 15.6652L31.7185 20.9543C32.5328 21.6614 33.0005 22.6868 33.0005 23.7652V31.2659C33.0005 32.6366 31.8893 33.7477 30.5186 33.7477H28.3593C27.674 33.7477 27.1184 33.1922 27.1184 32.5068L27.1184 29.1324C27.1184 28.447 26.5628 27.8915 25.8775 27.8915H22.3256C21.6403 27.8915 21.0847 28.447 21.0847 29.1324V32.5068C21.0847 33.1922 20.5291 33.7477 19.8438 33.7477H17.4818C16.1111 33.7477 15 32.6366 15 31.2659Z"
        stroke="#6E7DAE"
        strokeWidth="1.86137"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.6665 26.1677V15.0558C2.6665 13.4582 3.35929 11.9391 4.56559 10.8916L13.5892 3.05607C14.972 1.85534 17.0276 1.85533 18.4104 3.05606L27.4341 10.8916C28.6404 11.9391 29.3332 13.4582 29.3332 15.0558V26.1677C29.3332 28.1983 27.6871 29.8444 25.6565 29.8444H22.4575C21.4422 29.8444 20.6192 29.0213 20.6192 28.006V23.007C20.6192 21.9917 19.7961 21.1686 18.7809 21.1686H13.519C12.5037 21.1686 11.6806 21.9917 11.6806 23.007V28.006C11.6806 29.0213 10.8576 29.8444 9.84231 29.8444H6.34318C4.31261 29.8444 2.6665 28.1983 2.6665 26.1677Z"
        fill="white"
      />
    </svg>
  );

DashboardMobile.defaultProps = {
  width: 24,
  height: 24,
  // fill: '#6E7DAE',
  outline: true,
};

DashboardMobile.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
  outline: PropTypes.bool,
};

export default DashboardMobile;
