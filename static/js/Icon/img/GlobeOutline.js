import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

const GlobeOutline = ({ width, height, className, color }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cls(className, 'icon icon-globe-outline')}
  >
    <path
      d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2C9.34784 2 6.8043 3.05357 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C6.8043 20.9464 9.34784 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12ZM19.93 11H17C16.8351 8.64814 16.0293 6.38635 14.67 4.46C16.0665 4.95597 17.2977 5.83007 18.2265 6.98484C19.1553 8.13962 19.745 9.52967 19.93 11ZM9.08 13H15C14.7441 15.4706 13.6911 17.7908 12 19.61C10.3101 17.7984 9.28119 15.4693 9.08 13ZM9.08 11C9.31289 8.54183 10.3376 6.22572 12 4.4C13.7047 6.20612 14.7601 8.52804 15 11H9.08ZM9.44 4.43C8.07355 6.36702 7.2548 8.63672 7.07 11H4.07C4.2589 9.5115 4.86261 8.10612 5.81217 6.94437C6.76172 5.78262 8.01886 4.91133 9.44 4.43ZM4.07 13H7.07C7.23469 15.3613 8.04788 17.6313 9.42 19.56C8.00397 19.0763 6.75199 18.2052 5.80627 17.0456C4.86055 15.886 4.25902 14.4844 4.07 13ZM14.62 19.55C15.9884 17.6207 16.8107 15.3577 17 13H19.95C19.7609 14.4802 19.1615 15.8781 18.2196 17.0356C17.2778 18.193 16.0309 19.064 14.62 19.55Z"
      fill={color}
    />
  </svg>
);

GlobeOutline.defaultProps = {
  width: 24,
  height: 24,
  color: '#6E7DAE',
};

GlobeOutline.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default GlobeOutline;