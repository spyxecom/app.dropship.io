import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const Home = ({ width, height, className, fill, outline }) =>
  outline ? (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={cls(className, 'icon icon-home icon-home-outline')}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 19.7662V12.2654C3 11.187 3.46765 10.1616 4.28192 9.45454L10.373 4.16541C11.3064 3.35489 12.694 3.35489 13.6274 4.1654L19.7185 9.45454C20.5328 10.1616 21.0005 11.187 21.0005 12.2654V19.7662C21.0005 21.1368 19.8893 22.248 18.5186 22.248H16.3593C15.674 22.248 15.1184 21.6924 15.1184 21.0071V17.6326C15.1184 16.9473 14.5628 16.3917 13.8775 16.3917H10.3256C9.64028 16.3917 9.0847 16.9473 9.0847 17.6326V21.0071C9.0847 21.6924 8.52913 22.248 7.84379 22.248H5.48182C4.11115 22.248 3 21.1368 3 19.7662Z"
        // stroke="#200E32"
        strokeWidth="1.86137"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={cls(className, 'icon icon-home icon-home-bold')}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 20.1258V11.7919C2 10.5937 2.51959 9.45438 3.42431 8.66877L10.192 2.79211C11.2291 1.89156 12.7708 1.89156 13.8079 2.79211L20.5757 8.66877C21.4804 9.45438 22 10.5937 22 11.7919V20.1258C22 21.6488 20.7654 22.8833 19.2425 22.8833H16.8433C16.0818 22.8833 15.4645 22.2661 15.4645 21.5046V17.7553C15.4645 16.9938 14.8472 16.3765 14.0858 16.3765H10.1394C9.37789 16.3765 8.7606 16.9938 8.7606 17.7553V21.5046C8.7606 22.2661 8.14332 22.8833 7.38185 22.8833H4.75751C3.23458 22.8833 2 21.6488 2 20.1258Z"
        // fill="#200E32"
      />
    </svg>
  );

Home.defaultProps = {
  width: 24,
  height: 24,
  // fill: '#6E7DAE',
  outline: true,
};

Home.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
  outline: PropTypes.bool,
};

export default Home;
