import React from 'react';
import PropTypes from 'prop-types';

export const PortfolioMobile = ({
  width,
  height,
  className,
  fill,
  outline,
  theme,
}) =>
  outline ? (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 29.7333V22.2667C32 21.0885 31.1046 20.1333 30 20.1333H18C16.8954 20.1333 16 21.0885 16 22.2667V29.7333C16 30.9115 16.8954 31.8667 18 31.8667H30C31.1046 31.8667 32 30.9115 32 29.7333ZM18 18C15.7909 18 14 19.9103 14 22.2667V29.7333C14 32.0897 15.7909 34 18 34H30C32.2091 34 34 32.0897 34 29.7333V22.2667C34 19.9103 32.2091 18 30 18H18Z"
        fill="#6E7DAE"
      />
      <path
        d="M29 18V18C29 16.8954 28.1046 16 27 16H21C19.8954 16 19 16.8954 19 18V18"
        stroke="#6E7DAE"
        strokeWidth="2"
      />
      <rect x="23" y="25" width="2" height="3" rx="1" fill="#6E7DAE" />
      <path
        d="M15 23L20.0147 24.2537C20.634 24.4085 21.2899 24.2585 21.7802 23.8498L22.7196 23.067C23.4613 22.4489 24.5387 22.4489 25.2804 23.067L26.2198 23.8498C26.7101 24.2585 27.366 24.4085 27.9853 24.2537L33 23"
        stroke="#6E7DAE"
        strokeWidth="2"
      />
    </svg>
  ) : (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="9.33325" width="24" height="18.6667" rx="4" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.21351 8.18034C5.09912 8.48356 2.66504 11.1091 2.66504 14.3031V23.7065C2.66504 27.1042 5.41935 29.8585 8.81698 29.8585H23.1837C26.5813 29.8585 29.3356 27.1041 29.3356 23.7065V14.3031C29.3356 11.1093 26.902 8.48404 23.788 8.18043C23.7693 8.1786 23.7506 8.17687 23.7319 8.17521C23.71 7.96478 23.6742 7.75852 23.6252 7.55739C23.13 5.52433 21.297 4.01514 19.1116 4.01514H12.8899C11.9436 4.01514 11.0635 4.29807 10.3293 4.78396C9.368 5.42024 8.65714 6.40453 8.37636 7.55724C8.32736 7.75839 8.29146 7.96468 8.2696 8.17514C8.25088 8.17679 8.23218 8.17852 8.21351 8.18034ZM23.3428 10.7877H21.0552H10.9462H8.65803L8.50117 10.8015C6.70898 10.9595 5.30159 12.4684 5.30159 14.3031V23.7065C5.30159 25.648 6.87548 27.2219 8.81698 27.2219H23.1837C25.1252 27.2219 26.6991 25.648 26.6991 23.7065V14.3031C26.6991 12.4685 25.2919 10.9598 23.5 10.8015L23.3428 10.7877ZM20.431 7.14572C20.0784 6.8387 19.6177 6.65236 19.1143 6.65169C19.1134 6.65168 19.1125 6.65168 19.1116 6.65168H12.8899C12.3813 6.65168 11.9168 6.84073 11.5629 7.1524C11.2673 7.41269 11.0489 7.75849 10.9462 8.15112H12.8899H19.1116H21.0552C20.9517 7.75512 20.7304 7.40676 20.431 7.14572Z"
        fill="white"
      />
      <rect
        x="14.6665"
        y="17.3333"
        width="2.66667"
        height="4"
        rx="1.33333"
        fill="#225aea"
      />
      <path
        d="M5.3335 14.6667L10.6276 16.255C11.4847 16.5121 12.4136 16.3222 13.101 15.7494L14.293 14.756C15.2819 13.9319 16.7184 13.9319 17.7073 14.756L18.8993 15.7494C19.5867 16.3222 20.5156 16.5121 21.3727 16.255L26.6668 14.6667"
        stroke="#225aea"
        strokeWidth="2.66667"
        strokeLinecap="round"
      />
    </svg>
  );

PortfolioMobile.defaultProps = {
  width: 24,
  height: 24,
  // fill: '#6E7DAE',
  outline: true,
};

PortfolioMobile.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
  outline: PropTypes.bool,
};

export default PortfolioMobile;
