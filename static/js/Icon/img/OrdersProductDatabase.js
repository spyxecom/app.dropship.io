import React from 'react';
import cls from 'classname';

const OrdersProductDatabase = ({className}) => (
  <svg width="24"
       height="24"
       fill="#225aea"
       className={cls('icon icon-orders', className)}
       viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" clipRule="evenodd"
          d="M3.02594 11.4505C2.75707 9.07808 4.61293 7 7.00049 7H17.0021C19.3896 7 21.2455 9.07808 20.9766 11.4505L20.2966 17.4504C20.0675 19.4723 18.3569 21 16.3221 21H7.68049C5.64565 21 3.93508 19.4724 3.70593 17.4504L3.02594 11.4505ZM7.00049 9C5.80671 9 4.87878 10.039 5.01321 11.2252L5.69321 17.2252C5.80779 18.2362 6.66307 19 7.68049 19H16.3221C17.3395 19 18.1948 18.2362 18.3094 17.2252L18.9894 11.2252C19.1238 10.039 18.1959 9 17.0021 9H7.00049Z"
          fill="#707BA0"/>
    <path fillRule="evenodd" clipRule="evenodd"
          d="M8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10C16 10.5523 15.5523 11 15 11C14.4477 11 14 10.5523 14 10V7C14 5.89543 13.1046 5 12 5C10.8954 5 10 5.89543 10 7V10C10 10.5523 9.55228 11 9 11C8.44772 11 8 10.5523 8 10V7Z"
          fill="#707BA0"/>
  </svg>
);

export default OrdersProductDatabase;
