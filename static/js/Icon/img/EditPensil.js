import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

const EditPensil = ({ width, height, className, color }) => (
  <svg
    width={width}
    height={height}
    className={cls(className, 'icon icon-edit-pencil')}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.4003 7.33986L16.6603 4.59986C16.3027 4.26395 15.8341 4.07122 15.3436 4.05831C14.8532 4.0454 14.3751 4.21323 14.0003 4.52986L5.0003 13.5299C4.67706 13.8558 4.4758 14.2831 4.4303 14.7399L4.0003 18.9099C3.98683 19.0563 4.00583 19.204 4.05596 19.3422C4.10608 19.4805 4.1861 19.606 4.2903 19.7099C4.38374 19.8025 4.49455 19.8759 4.61639 19.9256C4.73823 19.9754 4.86869 20.0006 5.0003 19.9999H5.0903L9.2603 19.6199C9.71709 19.5744 10.1443 19.3731 10.4703 19.0499L19.4703 10.0499C19.8196 9.68083 20.0084 9.18837 19.9953 8.68039C19.9822 8.17242 19.7682 7.69037 19.4003 7.33986ZM9.0803 17.6199L6.0803 17.8999L6.3503 14.8999L12.0003 9.31986L14.7003 12.0199L9.0803 17.6199ZM16.0003 10.6799L13.3203 7.99986L15.2703 5.99986L18.0003 8.72986L16.0003 10.6799Z"
      fill="#C5CCE3"
    />
  </svg>
);

EditPensil.defaultProps = {
  width: 16,
  height: 16,
  color: '#225aea',
};

EditPensil.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default EditPensil;
