import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const DatabaseMobile = ({
  width,
  height,
  className,
  fill,
  outline,
  theme,
}) =>
  outline ? (
    <svg
      width={width}
      height={height}
      className={cls(className, 'icon icon-database icon-database-bold')}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.087 12C20.087 16.4663 16.4663 20.087 12 20.087C7.53366 20.087 3.91298 16.4663 3.91298 12C3.91298 7.53366 7.53366 3.91298 12 3.91298C16.4663 3.91298 20.087 7.53366 20.087 12ZM21.9989 12C21.9989 17.5223 17.5223 21.9989 12 21.9989C6.47772 21.9989 2.00104 17.5223 2.00104 12C2.00104 6.47772 6.47772 2.00104 12 2.00104C17.5223 2.00104 21.9989 6.47772 21.9989 12ZM16.9304 9.13312C17.3933 8.03913 16.296 6.93465 15.199 7.39036L11.6723 8.85539C10.5418 9.325 9.64109 10.2199 9.1641 11.3472L7.67601 14.8643C7.21314 15.9583 8.31042 17.0628 9.40742 16.6071L12.9341 15.142C14.0646 14.6724 14.9654 13.7775 15.4423 12.6502L16.9304 9.13312ZM12.4058 10.621L14.6127 9.70425L13.6815 11.9052C13.3999 12.5708 12.8681 13.0991 12.2007 13.3764L9.9937 14.2932L10.9249 12.0923C11.2065 11.4266 11.7383 10.8983 12.4058 10.621Z"
        fill="#707BA0"
      />
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      className={cls(className, 'icon icon-database icon-database-bold')}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM14.5394 12.4962C14.171 13.2609 13.5517 13.8762 12.7846 14.2396L8.50366 16.268C8.18731 16.4179 7.85832 16.0867 8.01027 15.7713L10.0666 11.5037C10.435 10.7391 11.0544 10.1238 11.8214 9.76035L16.1023 7.73203C16.4187 7.58214 16.7477 7.91328 16.5957 8.22865L14.5394 12.4962Z"
        fill="#225aea"
      />
    </svg>
  );

DatabaseMobile.defaultProps = {
  width: 24,
  height: 24,
  // fill: '#6E7DAE',
  outline: true,
};

DatabaseMobile.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
  outline: PropTypes.bool,
};

export default DatabaseMobile;
