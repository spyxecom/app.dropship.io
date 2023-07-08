import React from 'react';

const ArrowPlan = ({ width, height, color, ...other }) => (
  <svg width={width ? width : '10'}
       height={height ? height : '9'}
       fill={color ? color : '#D71313'}
       viewBox="0 0 10 9"
       xmlns="http://www.w3.org/2000/svg"
       {...other}
  >
    <path
      d="M3.26795 0.999999C4.03775 -0.333334 5.96225 -0.333333 6.73205 1L9.33013 5.5C10.0999 6.83333 9.13768 8.5 7.59808 8.5H2.40192C0.862322 8.5 -0.0999273 6.83333 0.669873 5.5L3.26795 0.999999Z"
    />
  </svg>
);

export default ArrowPlan;
