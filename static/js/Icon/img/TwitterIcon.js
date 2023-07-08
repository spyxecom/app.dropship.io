import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

const TwitterIcon = ({ width, height, className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cls(className, 'icon icon-twitter')}
  >
    <path
      d="M13.4665 33.3332C15.931 33.4157 18.387 33.0033 20.6894 32.1204C22.9918 31.2375 25.0938 29.902 26.8713 28.1929C28.6488 26.4838 30.0656 24.4357 31.0381 22.1697C32.0106 19.9037 32.5189 17.4657 32.5332 14.9999C33.6626 13.6022 34.5012 11.9929 34.9998 10.2665C35.037 10.1301 35.034 9.98589 34.9912 9.85116C34.9483 9.71643 34.8674 9.59696 34.7582 9.50715C34.649 9.41733 34.5162 9.36099 34.3757 9.34491C34.2353 9.32884 34.0931 9.35371 33.9665 9.41654C33.3756 9.70096 32.7104 9.79283 32.0646 9.67921C31.4187 9.56559 30.8248 9.25221 30.3665 8.7832C29.7814 8.1425 29.0737 7.62575 28.2852 7.26358C27.4968 6.90141 26.6437 6.70118 25.7764 6.67476C24.9092 6.64834 24.0454 6.79626 23.2364 7.10976C22.4274 7.42327 21.6895 7.89597 21.0665 8.49987C20.2135 9.32597 19.5887 10.3587 19.2528 11.4977C18.917 12.6366 18.8815 13.8431 19.1498 14.9999C13.5665 15.3332 9.73316 12.6832 6.66649 9.04987C6.57436 8.94554 6.45385 8.87029 6.31966 8.83332C6.18548 8.79635 6.04343 8.79925 5.91087 8.84167C5.7783 8.88409 5.66096 8.96419 5.57317 9.0722C5.48538 9.1802 5.43093 9.31144 5.41649 9.44987C4.83227 12.6906 5.25371 16.0324 6.62419 19.0267C7.99467 22.0209 10.2486 24.524 13.0832 26.1999C11.1826 28.3796 8.51351 29.741 5.63316 29.9999C5.47885 30.0255 5.33639 30.0987 5.22574 30.2092C5.11509 30.3198 5.04178 30.4622 5.01606 30.6165C4.99035 30.7708 5.01352 30.9292 5.08233 31.0697C5.15114 31.2102 5.26215 31.3256 5.39982 31.3999C7.90569 32.6521 10.6652 33.3135 13.4665 33.3332Z"
      fill="#41ABE1"
    />
  </svg>
);

TwitterIcon.defaultProps = {
  width: 40,
  height: 40,
};

TwitterIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default TwitterIcon;
