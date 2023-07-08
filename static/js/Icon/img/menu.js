import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const Menu = ({ width, height, className }) => (
   <svg width={width}
        //height={height}
        className={cls(className, 'icon icon-menu')}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
   >
     <path
       className="line top"
       d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"/>
     <path
       className="line middle"
       d="m 30,50 h 40"/>
     <path
       className="line bottom"
       d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"/>
   </svg>

  /*<svg width={width}
       height={height}
       className={cls(className, 'icon icon-menu')}
       viewBox="0 0 32 32"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
  >
    <rect className="line top" x="3.2002" y="6.40002" width="25.6" height="3.2" rx="1"/>
    <rect className="line middle" x="3.2002" y="14.4" width="25.6" height="3.2" rx="1"/>
    <rect className="line bottom" x="3.2002" y="22.4" width="25.6" height="3.2" rx="1"/>
  </svg>*/

);

Menu.defaultProps = {
  width: 48,
  height: 48,
  theme: 'light',
};

Menu.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  theme: PropTypes.string,
};

export default Menu;
