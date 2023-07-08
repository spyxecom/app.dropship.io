import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const University = ({ width, height, className, fill, outline }) =>
  outline ? (
    <svg
      width={width}
      height={height}
      className={cls(className, 'icon icon-university icon-university-outline')}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M10.05 2.53004L4.03002 6.46004C2.10002 7.72004 2.10002 10.54 4.03002 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73004 19.98 6.47004L13.99 2.54004C12.91 1.82004 11.13 1.82004 10.05 2.53004Z"
        stroke="#707BA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path
        d="M5.63012 13.0801L5.62012 17.7701C5.62012 19.0401 6.60012 20.4001 7.80012 20.8001L10.9901 21.8601C11.5401 22.0401 12.4501 22.0401 13.0101 21.8601L16.2001 20.8001C17.4001 20.4001 18.3801 19.0401 18.3801 17.7701V13.1301"
        stroke="#707BA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21.3999 15V9" stroke="#707BA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      className={cls(className, 'icon icon-university icon-university-bold')}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill='none'
    >
      <path
        d="M16.8301 15.6399C17.5001 15.1999 18.3801 15.6799 18.3801 16.4799V17.7699C18.3801 19.0399 17.3901 20.3999 16.2001 20.7999L13.0101 21.8599C12.4501 22.0499 11.5401 22.0499 10.9901 21.8599L7.80012 20.7999C6.60012 20.3999 5.62012 19.0399 5.62012 17.7699V16.4699C5.62012 15.6799 6.50012 15.1999 7.16012 15.6299L9.22012 16.9699C10.0101 17.4999 11.0101 17.7599 12.0101 17.7599C13.0101 17.7599 14.0101 17.4999 14.8001 16.9699L16.8301 15.6399Z"
      />
      <path
        d="M19.98 6.46006L13.99 2.53006C12.91 1.82006 11.13 1.82006 10.05 2.53006L4.03002 6.46006C2.10002 7.71006 2.10002 10.5401 4.03002 11.8001L5.63002 12.8401L10.05 15.7201C11.13 16.4301 12.91 16.4301 13.99 15.7201L18.38 12.8401L19.75 11.9401V15.0001C19.75 15.4101 20.09 15.7501 20.5 15.7501C20.91 15.7501 21.25 15.4101 21.25 15.0001V10.0801C21.65 8.79006 21.24 7.29006 19.98 6.46006Z"
        />
    </svg>
  );

University.defaultProps = {
  width: 24,
  height: 24,
  // fill: '#6E7DAE',
  outline: true,
};

University.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
  outline: PropTypes.bool,
};

export default University;
