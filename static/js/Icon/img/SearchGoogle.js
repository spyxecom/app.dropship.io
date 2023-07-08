import React, {useState} from 'react';
import cls from 'classname';

export const SearchGoogle = ({ className, theme }) => {
  const [reversedIcon, setReversedIcon] = useState(false)

  return (
  <svg width="25"
       height="24"
       fill="none"
       className={cls('icon', className)}
       viewBox="0 0 25 24"
       xmlns="http://www.w3.org/2000/svg"
       onMouseEnter={() => setReversedIcon(true)}
       onMouseLeave={() => setReversedIcon(false)}
  >
    <path
      d="M24.0015 12.2755C24.0015 11.4598 23.934 10.6397 23.79 9.83716H12.2422V14.4581H18.8551C18.5807 15.9485 17.699 17.2669 16.4079 18.1047V21.103H20.3531C22.6699 19.013 24.0015 15.9264 24.0015 12.2755Z"
      fill={reversedIcon ? '#225aea' : '#4280EF'}/>
    <path
      d="M12.2414 24.0001C15.5433 24.0001 18.328 22.9374 20.3568 21.1032L16.4116 18.1048C15.3139 18.8368 13.8968 19.2512 12.2459 19.2512C9.05186 19.2512 6.34371 17.1392 5.37201 14.2996H1.30078V17.3905C3.37913 21.4427 7.61231 24.0001 12.2414 24.0001Z"
      fill={reversedIcon ? '#225aea' : '#34A353'}/>
    <path
      d="M5.36907 14.2995C4.85623 12.8091 4.85623 11.1953 5.36907 9.70496V6.61401H1.30234C-0.434114 10.0048 -0.434114 13.9996 1.30234 17.3904L5.36907 14.2995Z"
      fill={reversedIcon ? '#225aea' : '#F6B704'}/>
    <path
      d="M12.2414 4.74917C13.9868 4.72272 15.6738 5.36648 16.9379 6.54818L20.4333 3.12213C18.22 1.08502 15.2824 -0.0349543 12.2414 0.000320385C7.61231 0.000320385 3.37913 2.55773 1.30078 6.61432L5.36751 9.70526C6.33471 6.86124 9.04736 4.74917 12.2414 4.74917Z"
      fill={reversedIcon ? '#225aea' : '#E54335'}/>
  </svg>
)}

export default SearchGoogle;
