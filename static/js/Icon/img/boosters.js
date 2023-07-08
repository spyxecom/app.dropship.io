import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const Boosters = ({ width, height, className, fill, outline, theme }) =>
  outline ? (
    <svg
      width={width}
      height={height}
      className={cls(className, 'icon icon-boosters icon-boosters-bold')}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.54654 5.9754C8.54654 6.77853 8.05068 7.48338 7.38378 7.93088C5.24958 9.36292 3.79993 11.9806 3.79993 14.8397C3.79993 19.3586 7.56707 22.9 11.9052 22.9C16.9052 22.9 20.2001 19 20.2001 14.8397C20.2001 11.9632 18.7328 9.25744 16.3942 7.81032C15.6898 7.3744 15.1638 6.65305 15.1638 5.82463V2.04932H8.54654C8.54654 2.04932 8.54654 4.18734 8.54654 5.9754Z"
        stroke="#6E7DAE"
        strokeWidth="1.98"
      />
      <path
        d="M6.8032 14.4124C8.17881 16.2283 11.2828 16.1606 11.9604 13.7806C12.9343 10.3595 17.4206 10.9408 17.4206 14.4992C17.4206 17.5171 15.5001 19.9602 11.9604 19.9602C8.94287 19.9602 6.50012 17.5171 6.50012 14.4992C6.50012 14.356 6.71674 14.2983 6.8032 14.4124Z"
        fill="#6E7DAE"
      />
      <rect
        x="6.70593"
        y="0.857178"
        width="10.4575"
        height="2.08696"
        rx="1"
        fill="#6E7DAE"
      />
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      className={cls(className, 'icon icon-boosters icon-boosters-bold')}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.54641 5.9754C8.54641 6.77853 8.05056 7.48338 7.38365 7.93088C5.24946 9.36292 3.7998 11.9806 3.7998 14.8397C3.7998 19.3586 7.56695 22.9 11.9051 22.9C16.9051 22.9 20.2 19 20.2 14.8397C20.2 11.9632 18.7327 9.25744 16.3941 7.81032C15.6896 7.3744 15.1636 6.65305 15.1636 5.82463V2.04932H8.54641C8.54641 2.04932 8.54641 4.18734 8.54641 5.9754Z"
        fill="#225aea"
        stroke="#225aea"
      />
      <path
        d="M6.80307 14.4124C8.17869 16.2283 11.2827 16.1606 11.9603 13.7806C12.9342 10.3595 17.4205 10.9408 17.4205 14.4992C17.4205 17.5171 15.5 19.9602 11.9603 19.9602C8.94275 19.9602 6.5 17.5171 6.5 14.4992C6.5 14.356 6.71661 14.2983 6.80307 14.4124Z"
        fill={theme === 'light' ? '#F2F6FF' : '#000E58'}
      />
      <rect
        x="6.70587"
        y="0.857178"
        width="10.4575"
        height="2.08696"
        rx="1"
        fill="#225aea"
      />
    </svg>
  );

Boosters.defaultProps = {
  width: 24,
  height: 24,
  // fill: '#6E7DAE',
  outline: true,
};

Boosters.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
  outline: PropTypes.bool,
};

export default Boosters;
