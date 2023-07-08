import React from 'react';
import cls from 'classname';

export const SpeedometerArrow = ({ className, style }) => (
  <svg width="28"
       height="89"
       fill="none"
       className={cls('icon icon-speedometer-arrow', className)}
       viewBox="0 0 28 89"
       xmlns="http://www.w3.org/2000/svg"
       style={style}
  >
    <path d="M13.4035 2.67498C13.5996 1.22507 15.7016 1.24075 15.876 2.69343L26 87L14.6661 86.9999L2 86.9936L13.4035 2.67498Z"
          fill="#151E3A" stroke="white" strokeWidth="2.49265" strokeMiterlimit="10"/>
  </svg>
);

export default SpeedometerArrow;
