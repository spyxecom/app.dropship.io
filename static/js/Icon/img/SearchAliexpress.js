import React, {useState} from 'react';
import cls from 'classname';
import { useSelector } from 'react-redux';

export const SearchAliexpress = ({ className, width, height }) => {
  const [reversedIcon, setReversedIcon] = useState(false)
  const theme = useSelector(state => state.nav.theme)
  return (
  <svg width={width ? width : "24"}
       height={height ? height : "24"}
       viewBox="0 0 24 24"
       fill="none"
       className={cls('icon', className)} xmlns="http://www.w3.org/2000/svg"
       onMouseEnter={() => setReversedIcon(true)}
       onMouseLeave={() => setReversedIcon(false)}
  >
    <path
      d="M22 22.0527H2C1.46957 22.0527 0.960859 21.842 0.585787 21.4669C0.210714 21.0918 0 20.5831 0 20.0527V2C0 1.46957 0.210714 0.960859 0.585787 0.585787C0.960859 0.210714 1.46957 0 2 0H22C22.5304 0 23.0391 0.210714 23.4142 0.585787C23.7893 0.960859 24 1.46957 24 2V20.0527C24 20.5831 23.7893 21.0918 23.4142 21.4669C23.0391 21.842 22.5304 22.0527 22 22.0527Z"
      fill={reversedIcon ? '#225aea' : theme  === 'dark' ? '#FF9900' : '#FF9900'}/>
    <path
      d="M22 23.9999H2C1.46957 23.9999 0.960859 23.7892 0.585787 23.4141C0.210714 23.0391 0 22.5304 0 21.9999V5.33325C0 4.80282 0.210714 4.29411 0.585787 3.91904C0.960859 3.54397 1.46957 3.33325 2 3.33325H22C22.5304 3.33325 23.0391 3.54397 23.4142 3.91904C23.7893 4.29411 24 4.80282 24 5.33325V21.9999C24 22.5304 23.7893 23.0391 23.4142 23.4141C23.0391 23.7892 22.5304 23.9999 22 23.9999Z"
      fill={reversedIcon ? '#225aea' : '#E62E04'}/>
    <path
      d="M6.0013 8.66667C6.73768 8.66667 7.33463 8.06971 7.33463 7.33333C7.33463 6.59695 6.73768 6 6.0013 6C5.26492 6 4.66797 6.59695 4.66797 7.33333C4.66797 8.06971 5.26492 8.66667 6.0013 8.66667Z"
      fill={theme === 'dark' ? '#B32100' : '#F2F6FF'}/>
    <path
      d="M18.0013 8.66667C18.7377 8.66667 19.3346 8.06971 19.3346 7.33333C19.3346 6.59695 18.7377 6 18.0013 6C17.2649 6 16.668 6.59695 16.668 7.33333C16.668 8.06971 17.2649 8.66667 18.0013 8.66667Z"
      fill={theme === 'dark' ? '#B32100' : '#F2F6FF'}/>
    <path d="M18 7.33325C18 10.6473 15.314 13.3333 12 13.3333C8.686 13.3333 6 10.6473 6 7.33325"
          // stroke={theme === 'dark' ? '#030625' : '#FFFFFF'}
          stroke={'#FFFFFF'}
          strokeMiterlimit="10"
          strokeLinecap="round"/>
  </svg>
)}

export default SearchAliexpress;
