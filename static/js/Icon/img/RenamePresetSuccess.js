import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const RenamePresetSuccess = ({width, height, className}) =>
  <svg
    width={width}
    height={height}
    className={cls(className, 'icon icon-rename-preset icon-rename-preset-outline')}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" clipRule="evenodd"
          d="M22.7071 16.2929C23.0976 16.6834 23.0976 17.3166 22.7071 17.7071L18.7071 21.7071C18.3166 22.0976 17.6834 22.0976 17.2929 21.7071L15.2929 19.7071C14.9024 19.3166 14.9024 18.6834 15.2929 18.2929C15.6834 17.9024 16.3166 17.9024 16.7071 18.2929L18 19.5858L21.2929 16.2929C21.6834 15.9024 22.3166 15.9024 22.7071 16.2929Z"
          fill="#225AEA"/>
    <path
      d="M4 6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H12.2C12.48 2 12.62 2 12.727 2.0545C12.8211 2.10243 12.8976 2.17892 12.9455 2.273C13 2.37996 13 2.51997 13 2.8V5C13 7.20914 14.7909 9 17 9H19.2C19.48 9 19.62 9 19.727 9.0545C19.8211 9.10243 19.8976 9.17892 19.9455 9.273C20 9.37996 20 9.51997 20 9.8V12.2C20 12.48 20 12.62 19.9455 12.727C19.8976 12.8211 19.8211 12.8976 19.727 12.9455C19.62 13 19.48 13 19.2 13H19C15.6863 13 13 15.6863 13 19V21.2C13 21.48 13 21.62 12.9455 21.727C12.8976 21.8211 12.8211 21.8976 12.727 21.9455C12.62 22 12.48 22 12.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8Z"
      fill="#225AEA"/>
    <path
      d="M15 2.70711C15 2.31658 15.3166 2 15.7071 2C15.8946 2 16.0745 2.0745 16.2071 2.20711L19.7929 5.79289C19.9255 5.9255 20 6.10536 20 6.29289C20 6.68342 19.6834 7 19.2929 7H17C15.8954 7 15 6.10457 15 5V2.70711Z"
      fill="#225AEA"/>
  </svg>

RenamePresetSuccess.defaultProps = {
  width: 24,
  height: 24,
};

RenamePresetSuccess.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default RenamePresetSuccess;
