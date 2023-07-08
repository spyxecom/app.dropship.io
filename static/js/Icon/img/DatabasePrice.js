import React from 'react';
import cls from 'classname';

const DatabasePrice = (props) => (
  <svg width={props.width ? props.width : '24'}
       height={props.height ? props.height : '24'}
       fill={props.color ? props.color : '#707BA0'}
       viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg"
       className={cls(props.className, 'icon icon-database-filter')}
  >
    <path fillRule="evenodd" clipRule="evenodd"
          d="M10.4158 4.17157C11.1659 3.42143 12.1833 3 13.2442 3H18.0016C19.6584 3 21.0016 4.34315 21.0016 6V10.7574C21.0016 11.8182 20.5801 12.8356 19.83 13.5858L13.2929 20.1229C12.1213 21.2945 10.2218 21.2945 9.05025 20.1229L3.87868 14.9513C2.70711 13.7797 2.7071 11.8803 3.87868 10.7087L10.4158 4.17157ZM13.2442 5C12.7138 5 12.2051 5.21071 11.83 5.58579L5.29289 12.1229C4.90237 12.5134 4.90237 13.1466 5.29289 13.5371L10.4645 18.7087C10.855 19.0992 11.4881 19.0992 11.8787 18.7087L18.4158 12.1716C18.7909 11.7965 19.0016 11.2878 19.0016 10.7574V6C19.0016 5.44772 18.5539 5 18.0016 5H13.2442Z"
    />
    <path d="M4.58594 10.0002L6.00015 8.58594L15.4144 18.0001L14.0001 19.4144L4.58594 10.0002Z"/>
    <path d="M17 8C17 8.55228 16.5523 9 16 9C15.4477 9 15 8.55228 15 8C15 7.44772 15.4477 7 16 7C16.5523 7 17 7.44772 17 8Z"
    />
  </svg>
);
export default DatabasePrice;
