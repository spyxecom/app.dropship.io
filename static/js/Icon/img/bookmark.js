import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const Home = ({ className, outline }) =>
  !outline ? (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      className={cls(className, 'icon icon-bookmark icon-bookmark-bold bookmark')}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.49854 18.5985V4.5411C1.49854 2.4596 3.29404 0.772217 5.50884 0.772217H12.491C14.7058 0.772217 16.5013 2.4596 16.5013 4.5411L16.5012 18.5984C16.5012 19.1123 15.8804 19.4088 15.4387 19.1058L9.78807 15.2291C9.3185 14.9069 8.68132 14.9069 8.21175 15.2291L2.56103 19.1058C2.1194 19.4088 1.49854 19.1123 1.49854 18.5985Z"
        stroke="#6E7DAE"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className='bookmark'
      />
    </svg>
  ) : (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      className={cls(className, 'icon icon-bookmark icon-bookmark-outline bookmark')}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.498596 18.5985V4.5411C0.498596 2.4596 2.2941 0.772217 4.5089 0.772217H11.491C13.7058 0.772217 15.5013 2.4596 15.5013 4.5411L15.5012 18.5984C15.5012 19.1123 14.8805 19.4088 14.4387 19.1058L8.78813 15.2291C8.31856 14.9069 7.68138 14.9069 7.21181 15.2291L1.56109 19.1058C1.11946 19.4088 0.498596 19.1123 0.498596 18.5985Z"
        fill="#225aea"
        className='bookmark'
      />
    </svg>
  );

Home.defaultProps = {
  // width: 16,
  // height: 20,
  // fill: '#6E7DAE',
  outline: true,
};

Home.propTypes = {
  // width: PropTypes.number,
  // height: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
  outline: PropTypes.bool,
};

export default Home;
