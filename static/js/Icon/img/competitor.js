import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const Competitor = ({ width, height, className, fill, outline }) =>
  outline ? (
    <svg width={width}
         height={height}
         viewBox="0 0 24 24"
         fill="none"
         className={cls(className, 'icon icon-competitor icon-competitor-outline')}
         xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
            d="M10.6642 1.9939C5.8683 1.9939 1.99951 5.92048 1.99951 10.7405C1.99951 15.5606 5.8683 19.4872 10.6642 19.4872C15.4601 19.4872 19.3288 15.5606 19.3288 10.7405C19.3288 8.42438 18.4187 6.20085 16.795 4.5597C15.1709 2.91816 12.9658 1.9939 10.6642 1.9939ZM4.08975 10.7405C4.08975 7.05374 7.04374 4.08414 10.6642 4.08414C12.4042 4.08414 14.0752 4.78269 15.3091 6.02979C16.5433 7.27727 17.2386 8.97157 17.2386 10.7405C17.2386 14.4273 14.2846 17.397 10.6642 17.397C7.04374 17.397 4.08975 14.4273 4.08975 10.7405ZM19.1106 17.6387C18.7024 17.2305 18.0407 17.2305 17.6326 17.6387C17.2244 18.0468 17.2244 18.7085 17.6326 19.1167L20.2159 21.7C20.624 22.1082 21.2858 22.1082 21.6939 21.7C22.1021 21.2919 22.1021 20.6302 21.6939 20.222L19.1106 17.6387Z"
            fill={ fill ? fill : '#707BA0'}
      />
    </svg>
  ) : (
    <svg width={width}
         height={height}
         viewBox="0 0 24 24"
         fill="none"
         className={cls(className, 'icon icon-competitor icon-home-competitor')}
         xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 10.4999C2 5.80013 5.76934 1.99023 10.4191 1.99023C12.6519 1.99023 14.7934 2.88678 16.3722 4.48265C17.9511 6.07852 18.8381 8.24298 18.8381 10.4999C18.8381 15.1996 15.0688 19.0095 10.4191 19.0095C5.76934 19.0095 2 15.1996 2 10.4999Z"
        fill={'#225aea'}
      />
      <path
        d="M19.0483 17.5491C18.6316 17.1324 17.956 17.1324 17.5393 17.5491C17.1226 17.9658 17.1226 18.6413 17.5393 19.058L20.1785 21.6973C20.5952 22.114 21.2708 22.114 21.6875 21.6973C22.1042 21.2806 22.1042 20.605 21.6875 20.1883L19.0483 17.5491Z"
        fill={'#225aea'}
      />
    </svg>
  );

Competitor.defaultProps = {
  width: 24,
  height: 24,
  // fill: '#707BA0',
  outline: true,
};

Competitor.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
  outline: PropTypes.bool,
};

export default Competitor;
