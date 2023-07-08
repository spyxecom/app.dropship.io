import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

const DollarIcon = ({ width, height, className, color }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cls(className, 'icon icon-dollar')}
  >
    <path
      d="M16.9999 15.7074C17.0105 14.1251 16.4382 12.8738 15.2966 11.9901C14.4149 11.3097 13.3449 10.9547 12.3101 10.6137C10.1542 9.89941 9.52884 9.52319 9.52884 8.39648C9.52884 7.14146 11.0212 6.69492 12.2988 6.69492C13.2293 6.69492 14.2997 7.01108 14.9645 7.47962L16.2825 5.24886C15.4136 4.63329 14.2245 4.21342 13.0503 4.0831V2H10.6191V4.22917C8.45789 4.74875 7.09647 6.29244 7.09647 8.39648C7.09647 9.87003 7.65675 11.0386 8.75857 11.8629C9.59659 12.4921 10.6186 12.83 11.6059 13.1571C13.7205 13.8556 14.5792 14.2813 14.5694 15.6909L14.5694 15.7013C14.5694 16.8845 13.1347 17.3051 11.9056 17.3051C10.7445 17.3051 9.48193 16.749 8.76624 15.9222L7 17.748C7.90636 18.7957 9.2232 19.5364 10.619 19.8267V22H13.0503V19.8735C15.4518 19.4978 16.9975 17.9177 16.9999 15.7074Z"
      fill={color}
    />
  </svg>
);

DollarIcon.defaultProps = {
  width: 24,
  height: 24,
  color: '#C5CCE3',
};

DollarIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default DollarIcon;
