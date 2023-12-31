import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

const ArrowForward = ({ width, height, className, color, skipColor=false }) => (
  <svg
    width={width}
    height={height}
    className={cls(className, 'icon icon-arrow-forward')}
    viewBox="0 0 9 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.99981 14.9999C1.76615 15.0004 1.53972 14.919 1.35981 14.7699C1.25855 14.686 1.17485 14.5829 1.11349 14.4665C1.05214 14.3502 1.01435 14.2229 1.00227 14.0919C0.990194 13.9609 1.00408 13.8289 1.04312 13.7033C1.08217 13.5777 1.1456 13.461 1.22981 13.3599L5.70981 7.99994L1.38981 2.62994C1.30674 2.52765 1.24471 2.40996 1.20728 2.28362C1.16985 2.15728 1.15775 2.02479 1.17169 1.89376C1.18563 1.76273 1.22533 1.63575 1.2885 1.52011C1.35168 1.40447 1.43708 1.30246 1.53981 1.21994C1.64327 1.1289 1.76444 1.06024 1.8957 1.01825C2.02696 0.976258 2.16549 0.961855 2.30258 0.97594C2.43967 0.990024 2.57238 1.03229 2.69236 1.1001C2.81234 1.1679 2.91701 1.25977 2.99981 1.36994L7.82981 7.36994C7.97689 7.54887 8.05729 7.77332 8.05729 8.00494C8.05729 8.23657 7.97689 8.46101 7.82981 8.63994L2.82981 14.6399C2.72949 14.761 2.60206 14.8566 2.45785 14.9192C2.31364 14.9817 2.15671 15.0094 1.99981 14.9999Z"
      fill={skipColor ? 'none' : color}
    />
  </svg>
);

ArrowForward.defaultProps = {
  width: 9,
  height: 16,
  color: '#225aea',
  // fill: '#6E7DAE',
};

ArrowForward.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  // fill: PropTypes.string,
};

export default ArrowForward;
