import React, {useState} from 'react';
import cls from 'classname';

const UnavailableStoreTriangle = ({width, height, color, className, style,isNote=false, ...props}) => {
  const [reversedIcon, setReversedIcon] = useState(false)
  return (
  <svg width={width ? width : '24'}
       height={height ? height : '24'}
       viewBox="0 0 24 24"
       fill={'none'}
       style={style}
       className={cls(className, 'icon')}
       xmlns="http://www.w3.org/2000/svg"
       onMouseEnter={() => setReversedIcon(true)}
       onMouseLeave={() => setReversedIcon(false)}
  >
    <path fillRule="evenodd" clipRule="evenodd"
          d="M18.7824 16.1069L13.7896 6.10365C13.053 4.62789 10.9472 4.62788 10.2106 6.10364L5.21763 16.1069C4.55392 17.4366 5.52095 19.0001 7.0071 19.0001L16.9929 19.0001C18.479 19.0001 19.4461 17.4366 18.7824 16.1069ZM15.579 5.21049C14.1059 2.25895 9.89432 2.25894 8.42112 5.21046L3.42816 15.2137C2.10074 17.8731 4.03478 21.0001 7.0071 21.0001L16.9929 21.0001C19.9652 21.0001 21.8992 17.8732 20.5719 15.2137L15.579 5.21049Z"
          fill={isNote ? '#F6B60E' : reversedIcon ? '#A07401' : '#F6B60E'}/>
    <path
      d="M13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12V8Z"
      fill={isNote ? '#F6B60E' : reversedIcon ? '#A07401' : '#F6B60E'}/>
    <path
      d="M12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15Z"
      fill={isNote ? '#F6B60E' : reversedIcon ? '#A07401' : '#F6B60E'}/>
  </svg>
)}

export default UnavailableStoreTriangle;
