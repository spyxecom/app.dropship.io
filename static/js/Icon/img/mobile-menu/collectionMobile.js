import React from 'react';
import PropTypes from 'prop-types';

export const CollectionMobile = ({
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
        d="M15.9767 25.3022L15.9767 25.3011L15.9767 25.1173L15.9767 20.7249C15.9767 19.6009 15.9856 19.3169 16.0238 19.1177C16.2269 18.0569 17.0565 17.2274 18.1172 17.0243C18.3164 16.9861 18.6004 16.9772 19.7244 16.9772C20.8485 16.9772 21.1324 16.9861 21.3317 17.0243C22.0104 17.1542 22.5948 17.5404 22.9815 18.0816L23.0046 18.1139L23.0046 18.114C23.1207 18.2766 23.2588 18.4699 23.3887 18.6281C23.5146 18.7814 23.7948 19.1106 24.2391 19.3392C24.6396 19.5453 25.0158 19.5966 25.2483 19.6156C25.4438 19.6316 25.6605 19.6314 25.815 19.6313L25.8505 19.6313H26.0794C27.6659 19.6313 28.7136 19.6335 29.5103 19.711C30.2764 19.7856 30.5986 19.9148 30.7942 20.0383C31.126 20.2477 31.4068 20.5286 31.6163 20.8603C31.7397 21.0559 31.869 21.3782 31.9435 22.1442C32.0211 22.9409 32.0233 23.9886 32.0233 25.5752C32.0233 27.1618 32.0211 28.2095 31.9435 29.0061C31.869 29.7722 31.7397 30.0944 31.6163 30.29L32.8577 31.0737L31.6163 30.29C31.4068 30.6218 31.126 30.9027 30.7942 31.1121C30.5986 31.2356 30.2764 31.3648 29.5103 31.4394C28.7136 31.5169 27.6659 31.5191 26.0794 31.5191L21.9206 31.5191C20.3341 31.5191 19.2864 31.5169 18.4897 31.4394C17.7236 31.3648 17.4014 31.2356 17.2058 31.1121C16.874 30.9027 16.5932 30.6218 16.3837 30.29L14.7118 31.3455L16.3837 30.29C16.2603 30.0944 16.131 29.7722 16.0565 29.0061C15.9789 28.2095 15.9767 27.1618 15.9767 25.5752L15.9767 25.3022ZM13.9995 25.5752C13.9995 28.6698 13.9995 30.2171 14.7118 31.3455C15.0783 31.9261 15.5698 32.4175 16.1503 32.784C17.2787 33.4963 18.826 33.4963 21.9206 33.4963H26.0794C29.174 33.4963 30.7213 33.4963 31.8497 32.784C32.4303 32.4175 32.9217 31.9261 33.2882 31.3455C34.0005 30.2171 34.0005 28.6698 34.0005 25.5752C34.0005 22.4806 34.0005 20.9332 33.2882 19.8049C32.9217 19.2243 32.4303 18.7328 31.8497 18.3663C30.7213 17.6541 29.174 17.6541 26.0794 17.6541H25.8505C25.4739 17.6541 25.2856 17.6541 25.1437 17.581C25.0018 17.508 24.8646 17.3161 24.5902 16.9321C23.915 15.9871 22.8922 15.31 21.7035 15.0823C21.2736 15 20.7572 15 19.7244 15C18.6916 15 18.1753 15 17.7453 15.0823C15.889 15.4378 14.4373 16.8895 14.0818 18.7458C13.9995 19.1758 13.9995 19.6921 13.9995 20.7249V25.1173L13.9995 25.3017L13.9995 25.5752ZM18.7496 27.8068C18.2036 27.8068 17.761 28.2494 17.761 28.7954C17.761 29.3414 18.2036 29.784 18.7496 29.784L29.251 29.784C29.797 29.784 30.2396 29.3414 30.2396 28.7954C30.2396 28.2494 29.797 27.8068 29.251 27.8068L18.7496 27.8068Z"
        fill="#707BA0"
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.6665 11.3025C2.6665 9.92556 2.6665 9.23707 2.77627 8.66384C3.25021 6.18892 5.18575 4.25338 7.66067 3.77945C8.2339 3.66968 8.92238 3.66968 10.2993 3.66968C11.6763 3.66968 12.3648 3.66968 12.938 3.77945C14.6161 4.1008 16.0462 5.0941 16.9409 6.47189C17.1901 6.85562 17.3147 7.04748 17.4627 7.12787C17.6108 7.20826 17.8049 7.20826 18.1933 7.20826H18.7722C22.8982 7.20826 24.9612 7.20826 26.4655 8.1579C27.2396 8.64655 27.8949 9.30181 28.3835 10.0759C29.3332 11.5803 29.3332 13.6433 29.3332 17.7692C29.3332 21.8952 29.3332 23.9582 28.3835 25.4626C27.8949 26.2367 27.2396 26.8919 26.4655 27.3806C24.9612 28.3302 22.8982 28.3302 18.7722 28.3302H13.2275C9.1015 28.3302 7.03851 28.3302 5.53414 27.3806C4.76005 26.8919 4.10479 26.2367 3.61615 25.4626C2.6665 23.9582 2.6665 21.8952 2.6665 17.7692L2.66653 17.4047L2.6665 17.1588V11.3025ZM8.99947 21.0676C8.44994 21.0676 8.00446 21.5131 8.00446 22.0626C8.00446 22.6122 8.44994 23.0576 8.99947 23.0576H23.0006C23.5501 23.0576 23.9956 22.6122 23.9956 22.0626C23.9956 21.5131 23.5501 21.0676 23.0006 21.0676L8.99947 21.0676Z"
        fill="white"
      />
    </svg>
  );

CollectionMobile.defaultProps = {
  width: 24,
  height: 24,
  // fill: '#6E7DAE',
  outline: true,
};

CollectionMobile.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
  outline: PropTypes.bool,
};

export default CollectionMobile;
