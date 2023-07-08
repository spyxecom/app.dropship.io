import React from 'react';
import cls from 'classname';

const DatabaseStoreProducts = (props) => (
  <svg width={props.width ? props.width : '24'}
       height={props.height ? props.height : '24'}
       fill={props.color ? props.color : '#707BA0'}
       viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg"
       className={cls(props.className, 'icon icon-database-filter')}
  >
    <path fillRule="evenodd" clipRule="evenodd"
          d="M11 10V20H18C19.6569 20 21 18.6569 21 17V13C21 11.3431 19.6569 10 18 10H11ZM15 12H13V18H18C18.5523 18 19 17.5523 19 17V13C19 12.4477 18.5523 12 18 12H17V13C17 13.5523 16.5523 14 16 14C15.4477 14 15 13.5523 15 13V12Z"
    />
    <path fillRule="evenodd" clipRule="evenodd"
          d="M6 10C4.34315 10 3 11.3431 3 13V17C3 18.6569 4.34315 20 6 20H13V10H6ZM7 12H6C5.44772 12 5 12.4477 5 13V17C5 17.5523 5.44772 18 6 18H11V12H9V13C9 13.5523 8.55228 14 8 14C7.44772 14 7 13.5523 7 13V12Z"
    />
    <path fillRule="evenodd" clipRule="evenodd"
          d="M10 2C8.34315 2 7 3.34315 7 5V12H17V5C17 3.34315 15.6569 2 14 2H10ZM11 4H10C9.44772 4 9 4.44772 9 5V10H15V5C15 4.44772 14.5523 4 14 4H13V5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5V4Z"
    />
  </svg>
);
export default DatabaseStoreProducts;
