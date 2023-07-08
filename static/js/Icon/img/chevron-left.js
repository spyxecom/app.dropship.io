import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const ChevronLeft = ({ width, height, className /* , fill */ }) => (
  <svg
    width={width}
    height={height}
    className={cls(className, 'icon icon-chevron-left')}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#chevron-left-clip0)">
      <path d="M8.50006 11.9999C8.4993 11.8683 8.52452 11.7379 8.57429 11.616C8.62405 11.4942 8.69738 11.3834 8.79006 11.2899L12.7901 7.28994C12.8833 7.1967 12.994 7.12274 13.1158 7.07228C13.2376 7.02182 13.3682 6.99585 13.5001 6.99585C13.6319 6.99585 13.7625 7.02182 13.8843 7.07228C14.0061 7.12274 14.1168 7.1967 14.2101 7.28994C14.3033 7.38318 14.3773 7.49387 14.4277 7.61569C14.4782 7.73751 14.5042 7.86808 14.5042 7.99994C14.5042 8.1318 14.4782 8.26237 14.4277 8.38419C14.3773 8.50601 14.3033 8.6167 14.2101 8.70994L10.9001 11.9999L14.0801 15.2999C14.1823 15.3919 14.2646 15.504 14.3215 15.6293C14.3785 15.7545 14.4091 15.8901 14.4112 16.0276C14.4134 16.1652 14.3872 16.3017 14.3342 16.4287C14.2812 16.5556 14.2026 16.6703 14.1033 16.7655C14.004 16.8607 13.8861 16.9343 13.757 16.9819C13.6279 17.0294 13.4904 17.0498 13.353 17.0418C13.2157 17.0338 13.0815 16.9975 12.9588 16.9352C12.8361 16.873 12.7276 16.7861 12.6401 16.6799L8.78006 12.6799C8.60374 12.4971 8.50363 12.2539 8.50006 11.9999Z" />
    </g>
    <defs>
      <clipPath id="chevron-left-clip0">
        <rect width="24" height="24" transform="translate(24) rotate(90)" />
      </clipPath>
    </defs>
  </svg>
);

ChevronLeft.defaultProps = {
  width: 24,
  height: 24,
  // fill: '#6E7DAE',
};

ChevronLeft.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  // fill: PropTypes.string,
};

export default ChevronLeft;
