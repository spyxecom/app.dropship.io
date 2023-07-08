import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const Suppliers = ({ width, height, className, outline }) =>
  outline ? (
    <svg
      width={width}
      height={height}
      className={cls(className, 'icon icon-suppliers icon-suppliers-outline')}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path fillRule="evenodd" clipRule="evenodd"
            d="M2 7C2 5.34315 3.34315 4 5 4H10C11.6569 4 13 5.34315 13 7V16C13 17.1046 12.1046 18 11 18H8V16H11V7C11 6.44772 10.5523 6 10 6H5C4.44772 6 4 6.44772 4 7V15C4 15.5523 4.44772 16 5 16H6V18H5C3.34315 18 2 16.6569 2 15V7Z"
            fill="#707BA0"/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M11 7H16.2251C16.9729 7 17.6938 7.27929 18.2464 7.78313L21.0213 10.3132C21.6447 10.8816 22 11.6863 22 12.5301V15C22 16.6569 20.6569 18 19 18H18V16H19C19.5523 16 20 15.5523 20 15V12.5301C20 12.2488 19.8816 11.9806 19.6738 11.7911L16.8989 9.26104C16.7147 9.0931 16.4744 9 16.2251 9H13V16H16V18H11V7Z"
            fill="#707BA0"/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17ZM10 17C10 18.6569 8.65685 20 7 20C5.34315 20 4 18.6569 4 17C4 15.3431 5.34315 14 7 14C8.65685 14 10 15.3431 10 17ZM18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17ZM20 17C20 18.6569 18.6569 20 17 20C15.3431 20 14 18.6569 14 17C14 15.3431 15.3431 14 17 14C18.6569 14 20 15.3431 20 17Z"
            fill="#707BA0"/>
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      className={cls(className, 'icon icon-suppliers icon-suppliers-bold')}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill='none'
    >
      <path d="M4 4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H14V6C14 4.89543 13.1046 4 12 4H4Z"
            fill="#225AEA"/>
      <path
        d="M16.6126 7H14V18H20C21.1046 18 22 17.1046 22 16V12.0886C22 11.5261 21.7631 10.9896 21.3475 10.6106L17.9601 7.52209C17.5917 7.18619 17.1111 7 16.6126 7Z"
        fill="#225AEA"/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M8.41421 19.4142C8.78929 19.0391 9 18.5304 9 18H7H5C5 18.5304 5.21071 19.0391 5.58579 19.4142C5.96086 19.7893 6.46957 20 7 20C7.53043 20 8.03914 19.7893 8.41421 19.4142ZM18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18H17H15C15 18.5304 15.2107 19.0391 15.5858 19.4142C15.9609 19.7893 16.4696 20 17 20C17.5304 20 18.0391 19.7893 18.4142 19.4142Z"
            fill="#225AEA"/>
    </svg>
  );

Suppliers.defaultProps = {
  width: 24,
  height: 24,
  // fill: '#6E7DAE',
  outline: true,
};

Suppliers.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
  outline: PropTypes.bool,
};

export default Suppliers;
