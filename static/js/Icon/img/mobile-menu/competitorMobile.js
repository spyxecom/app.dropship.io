import React from 'react';
import PropTypes from 'prop-types';

export const CompetitorMobile = (
  {
    width,
    height,
    className,
    fill,
    outline,
    theme,
  }) =>
  outline ? (
    <svg width="48"
         height="48"
         viewBox="0 0 48 48"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd"
            clipRule="evenodd"
            d="M22.6642 13.9939C17.8683 13.9939 13.9995 17.9205 13.9995 22.7405C13.9995 27.5606 17.8683 31.4872 22.6642 31.4872C27.4601 31.4872 31.3288 27.5606 31.3288 22.7405C31.3288 20.4244 30.4187 18.2008 28.795 16.5597C27.1709 14.9182 24.9658 13.9939 22.6642 13.9939ZM16.0898 22.7405C16.0898 19.0537 19.0437 16.0841 22.6642 16.0841C24.4042 16.0841 26.0752 16.7827 27.3091 18.0298C28.5433 19.2773 29.2386 20.9716 29.2386 22.7405C29.2386 26.4273 26.2846 29.397 22.6642 29.397C19.0437 29.397 16.0898 26.4273 16.0898 22.7405ZM31.1106 29.6387C30.7024 29.2305 30.0407 29.2305 29.6326 29.6387C29.2244 30.0468 29.2244 30.7085 29.6326 31.1167L32.2159 33.7C32.624 34.1082 33.2858 34.1082 33.6939 33.7C34.1021 33.2919 34.1021 32.6302 33.6939 32.222L31.1106 29.6387Z"
            fill="#6E7DAE"
      />
    </svg>
  ) : (
    <svg width="32"
         height="32"
         viewBox="0 0 32 32"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.6665 14C2.6665 7.73367 7.69229 2.65381 13.8919 2.65381C16.8691 2.65381 19.7243 3.84921 21.8295 5.97703C23.9347 8.10485 25.1173 10.9908 25.1173 14C25.1173 20.2663 20.0915 25.3462 13.8919 25.3462C7.69229 25.3462 2.6665 20.2663 2.6665 14Z"
        fill="white"/>
      <path
        d="M25.3975 23.3989C24.8419 22.8433 23.9411 22.8433 23.3855 23.3989C22.8299 23.9545 22.8299 24.8553 23.3855 25.4109L26.9045 28.9299C27.4601 29.4854 28.3609 29.4855 28.9165 28.9299C29.4721 28.3743 29.4721 27.4735 28.9165 26.9179L25.3975 23.3989Z"
        fill="white"/>
    </svg>
  );

CompetitorMobile.defaultProps = {
  width: 24,
  height: 24,
  // fill: '#6E7DAE',
  outline: true,
};

CompetitorMobile.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
  outline: PropTypes.bool,
};

export default CompetitorMobile;
