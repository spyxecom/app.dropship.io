import React, {useState} from 'react';
import cls from 'classname';

export const SearchFacebook = ({ className, width=24, height=24, isDark=false }) => {
  const [reversedIcon, setReversedIcon] = useState(false)

  return (
  <svg width={width}
       height={height}
       fill="none"
       className={cls('icon', className)}
       viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg"
       onMouseEnter={() => setReversedIcon(true)}
       onMouseLeave={() => setReversedIcon(false)}
  >
    <g clipPath="url(#clip0_21907_242975)">
      <path d="M9.99821 23.8675C4.33309 22.8696 0 17.9335 0 12.0005C0 5.40002 5.40002 0 12.0005 0C18.6009 0 24 5.40002 24 12.0005C24 17.9335 19.6669 22.8677 13.9999 23.8675L13.3334 23.3363H10.6666L9.99821 23.8675Z" fill={isDark ? '#151E3A' : reversedIcon ? '#003E8E' : '#1877F2'}/>
      <path d="M16.6668 15.334L17.1998 12.0007H14V9.66705C14 8.7336 14.3332 7.99991 15.7997 7.99991H17.3333V4.93351C16.4661 4.80003 15.5336 4.66748 14.6655 4.66748C11.9324 4.66748 9.99825 6.33463 9.99825 9.33474V12.0016H7V15.335H9.99825V23.8033C11.3182 24.0699 12.6781 24.0699 13.9981 23.8033V15.3368L16.6668 15.334Z" fill='white'/>
    </g>
    <defs>
      <linearGradient id="paint0_linear_21907_242975" x1="12.0145" y1="22.946" x2="12.0145" y2="-0.224832" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0062E0"/>
        <stop offset="1" stopColor="#19AFFF"/>
      </linearGradient>
      <clipPath id="clip0_21907_242975">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)}

export default SearchFacebook;
