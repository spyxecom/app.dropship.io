import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const Favorite = ({ width, height, className, fill, outline }) =>
  !outline ? (
    <svg
      width={width}
      height={height}
      className={cls(className, 'icon-favorite icon-favorite-outline ')}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6143 3.46781C11.7892 3.17706 12.2108 3.17706 12.3857 3.46781L14.8499 7.56234C15.1424 8.04845 15.6196 8.39515 16.1723 8.52316L20.8279 9.6014C21.1585 9.67797 21.2888 10.0789 21.0663 10.3351L17.9336 13.9439C17.5617 14.3724 17.3794 14.9333 17.4285 15.4986L17.8417 20.2595C17.871 20.5976 17.53 20.8453 17.2175 20.7129L12.8173 18.8488C12.2949 18.6275 11.7051 18.6275 11.1827 18.8488L6.78246 20.7129C6.46999 20.8453 6.12898 20.5975 6.15832 20.2595L6.5715 15.4986C6.62056 14.9333 6.43829 14.3724 6.06637 13.9439L2.9337 10.3351C2.71125 10.0789 2.84151 9.67797 3.17209 9.6014L7.82768 8.52316C8.38041 8.39515 8.85759 8.04845 9.15013 7.56234L11.6143 3.46781Z"
        stroke="#707BA0"
        strokeWidth="1.645"
      />
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      className={cls(className, 'icon-favorite icon-favorite-bold ')}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9095 3.0437C11.4042 2.22176 12.5958 2.22176 13.0905 3.0437L15.5546 7.13823C15.7323 7.43351 16.0222 7.64411 16.3579 7.72187L21.0135 8.80011C21.948 9.01656 22.3163 10.1499 21.6874 10.8743L18.5548 14.4831C18.3288 14.7434 18.2181 15.0841 18.2479 15.4274L18.6611 20.1884C18.744 21.1441 17.78 21.8445 16.8967 21.4703L12.4965 19.6061C12.1791 19.4717 11.8209 19.4717 11.5035 19.6061L7.1033 21.4703C6.22 21.8445 5.25595 21.1441 5.3389 20.1884L5.75208 15.4274C5.78188 15.0841 5.67116 14.7434 5.44525 14.4831L2.31257 10.8743C1.68372 10.1499 2.05195 9.01656 2.98651 8.80011L7.6421 7.72187C7.97785 7.64411 8.26771 7.43351 8.44541 7.13823L10.9095 3.0437Z"
        fill="#225aea"
      />
    </svg>
  );

Favorite.defaultProps = {
  width: 24,
  height: 24,
  outline: true,
};

Favorite.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
  outline: PropTypes.bool,
};

export default Favorite;
