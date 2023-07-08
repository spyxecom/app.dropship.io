import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

const ArrowDownward = ({ width, height, className, outline, color}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cls(className, 'icon icon-arrow-downward')}
  >
    <path
      d="M10.6582 3.68331C11.2109 2.57772 12.7886 2.57769 13.3414 3.68325L15.9145 8.82915C16.4132 9.8265 15.688 11 14.5729 11H9.42699C8.31193 11 7.58669 9.82656 8.08534 8.82921L10.6582 3.68331Z"
    />
    <path
      d="M10.6587 20.3168C11.2115 21.4223 12.7892 21.4223 13.342 20.3167L15.9147 15.1708C16.4133 14.1734 15.6881 13 14.573 13H9.42714C8.31205 13 7.5868 14.1735 8.08552 15.1709L10.6587 20.3168Z"
      fill={outline === 2 ? '#225aea' : color}
    />
  </svg>
);

ArrowDownward.defaultProps = {
  width: 24,
  height: 24,
  outline: 0,
  color: '#E2E6F3',
};

ArrowDownward.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  outline: PropTypes.number,
  color: PropTypes.string,
  // fill: PropTypes.string,
};

export default ArrowDownward;
