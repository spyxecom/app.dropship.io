import React from 'react';
import cls from 'classname';

const ArrowUp = ({ className }) => (
  <svg width="24"
       height="24"
       fill="#225AEA"
       viewBox="0 0 24 24"
       className={cls(className, 'icon')}
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.22981 10.64C5.31376 10.7412 5.41686 10.8249 5.5332 10.8863C5.64955 10.9476 5.77686 10.9854 5.90784 10.9975C6.03881 11.0096 6.17089 10.9957 6.29649 10.9567C6.42209 10.9176 6.53876 10.8542 6.63981 10.77L10.9998 7.13998V19C10.9998 19.2652 11.1052 19.5195 11.2927 19.7071C11.4802 19.8946 11.7346 20 11.9998 20C12.265 20 12.5194 19.8946 12.7069 19.7071C12.8945 19.5195 12.9998 19.2652 12.9998 19V7.13998L17.3598 10.77C17.4609 10.854 17.5776 10.9173 17.7032 10.9563C17.8288 10.9952 17.9608 11.0091 18.0917 10.997C18.2227 10.9849 18.3499 10.9472 18.4663 10.8859C18.5826 10.8247 18.6858 10.7411 18.7698 10.64C18.8539 10.5389 18.9172 10.4222 18.9561 10.2966C18.9951 10.171 19.0089 10.039 18.9968 9.90805C18.9848 9.77712 18.947 9.64985 18.8858 9.53351C18.8245 9.41716 18.7409 9.31402 18.6398 9.22998L12.6398 4.22998L12.4898 4.13998L12.3598 4.06998C12.1281 3.98058 11.8715 3.98058 11.6398 4.06998L11.5098 4.13998L11.3598 4.22998L5.35981 9.22998C5.25855 9.31393 5.17485 9.41703 5.11349 9.53337C5.05214 9.64972 5.01435 9.77703 5.00227 9.90801C4.99019 10.039 5.00408 10.1711 5.04312 10.2967C5.08217 10.4223 5.14561 10.5389 5.22981 10.64Z"
    />
  </svg>
);

export default ArrowUp;