import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const Trash = ({ width, height, className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 18 22"
    className={cls('icon icon-trash')}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.4633 2.60393L16.3745 2.60393C16.9952 2.60393 17.4985 3.10717 17.4985 3.72795C17.4985 4.34873 16.9952 4.85197 16.3745 4.85197L1.62402 4.85197C1.00324 4.85197 0.5 4.34873 0.5 3.72795C0.5 3.10718 1.00324 2.60393 1.62402 2.60393L5.53507 2.60393C5.96436 1.64945 6.92359 0.984863 8.03804 0.984863H9.96036C11.0748 0.984863 12.034 1.64945 12.4633 2.60393Z"
      fill="#D71313"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.4381 18.2678C15.1977 19.8477 13.8393 21.015 12.2413 21.015H6.07036C4.47233 21.015 3.11395 19.8477 2.87354 18.2678L1.33817 8.1783C1.15947 7.00399 2.06844 5.94624 3.25627 5.94624H15.0554C16.2432 5.94624 17.1522 7.00399 16.9735 8.1783L15.4381 18.2678ZM12.2413 18.767C12.7284 18.767 13.1424 18.4112 13.2157 17.9296L14.566 9.05636C14.635 8.60281 14.2839 8.19428 13.8251 8.19428H4.48653C4.02776 8.19428 3.67669 8.60281 3.74571 9.05636L5.09599 17.9296C5.16927 18.4112 5.58329 18.767 6.07036 18.767H12.2413Z"
      fill="#D71313"
    />
  </svg>
);

Trash.defaultProps = {
  width: 24,
  height: 24,
};

Trash.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default Trash;
