import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

export const Folder = ({ width, height, className, fill, outline }) =>
  outline ? (
    <svg
      width={width}
      height={height}
      className={cls(className, 'icon icon-folder icon-folder-outline')}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.97675 13.5541L3.97675 13.5531L3.97673 13.3693V8.97687C3.97673 7.85283 3.98562 7.56887 4.02378 7.36963C4.2269 6.3089 5.05646 5.47934 6.11719 5.27622C6.31642 5.23806 6.60039 5.22917 7.72442 5.22917C8.84845 5.22917 9.13242 5.23806 9.33165 5.27622C10.0104 5.4062 10.5948 5.79239 10.9815 6.33359L11.0046 6.36587L11.0046 6.36592C11.1207 6.52855 11.2588 6.72189 11.3887 6.88001C11.5146 7.03339 11.7948 7.36256 12.2391 7.59116C12.6396 7.79725 13.0158 7.8486 13.2483 7.86756C13.4438 7.88351 13.6605 7.88336 13.815 7.88326L13.8505 7.88324H14.0794C15.6659 7.88324 16.7136 7.88543 17.5103 7.96297C18.2764 8.03754 18.5986 8.16677 18.7942 8.29025C19.126 8.49968 19.4068 8.78052 19.6163 9.11229C19.7397 9.30789 19.869 9.63012 19.9435 10.3962C20.0211 11.1929 20.0233 12.2406 20.0233 13.8271C20.0233 15.4137 20.0211 16.4614 19.9435 17.2581C19.869 18.0242 19.7397 18.3464 19.6163 18.542L20.8577 19.3257L19.6163 18.542C19.4068 18.8738 19.126 19.1546 18.7942 19.364C18.5986 19.4875 18.2764 19.6167 17.5103 19.6913C16.7136 19.7689 15.6659 19.771 14.0794 19.771H9.92063C8.33406 19.771 7.28636 19.7689 6.48967 19.6913C5.7236 19.6167 5.40138 19.4875 5.20578 19.364C4.87401 19.1546 4.59317 18.8738 4.38374 18.542L2.71178 19.5974L4.38374 18.542C4.26026 18.3464 4.13103 18.0242 4.05646 17.2581C3.97892 16.4614 3.97673 15.4137 3.97673 13.8271L3.97675 13.5541ZM1.99951 13.8271C1.99951 16.9218 1.99951 18.4691 2.71178 19.5974C3.07828 20.178 3.56975 20.6695 4.15034 21.036C5.27868 21.7483 6.82599 21.7483 9.92063 21.7483H14.0794C17.174 21.7483 18.7213 21.7483 19.8497 21.036C20.4303 20.6695 20.9217 20.178 21.2882 19.5974C22.0005 18.4691 22.0005 16.9218 22.0005 13.8271C22.0005 10.7325 22.0005 9.18519 21.2882 8.05685C20.9217 7.47626 20.4303 6.98479 19.8497 6.61829C18.7213 5.90602 17.174 5.90602 14.0794 5.90602H13.8505C13.4739 5.90602 13.2856 5.90602 13.1437 5.833C13.0018 5.75998 12.8646 5.56801 12.5902 5.18408C11.915 4.23904 10.8922 3.56191 9.70352 3.33429C9.27358 3.25195 8.75719 3.25195 7.72442 3.25195C6.69165 3.25195 6.17526 3.25195 5.74532 3.33429C3.88904 3.68975 2.43731 5.14148 2.08184 6.99776C1.99951 7.4277 1.99951 7.94409 1.99951 8.97687V13.3693L1.99953 13.5537L1.99951 13.8271ZM6.74963 16.0588C6.20364 16.0588 5.76102 16.5014 5.76102 17.0474C5.76102 17.5934 6.20364 18.036 6.74963 18.036L17.251 18.036C17.797 18.036 18.2396 17.5934 18.2396 17.0474C18.2396 16.5014 17.797 16.0588 17.251 16.0588L6.74963 16.0588Z"
      />
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      className={cls(className, 'icon icon-folder icon-folder-bold')}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 8.47708C2 7.44435 2 6.92799 2.08233 6.49807C2.43778 4.64187 3.88943 3.19022 5.74563 2.83477C6.17555 2.75244 6.69191 2.75244 7.72463 2.75244C8.75735 2.75244 9.27371 2.75244 9.70364 2.83477C10.8904 3.06202 11.9118 3.73736 12.587 4.68002C12.8639 5.06651 13.0023 5.25975 13.145 5.33307C13.2877 5.40638 13.4771 5.40638 13.8558 5.40638H14.0793C17.1738 5.40638 18.721 5.40638 19.8493 6.11861C20.4298 6.4851 20.9213 6.97654 21.2878 7.55711C22 8.68539 22 10.2326 22 13.3271C22 16.4216 22 17.9688 21.2878 19.0971C20.9213 19.6777 20.4298 20.1691 19.8493 20.5356C18.721 21.2478 17.1738 21.2478 14.0793 21.2478H9.92073C6.82625 21.2478 5.27901 21.2478 4.15073 20.5356C3.57016 20.1691 3.07872 19.6777 2.71223 19.0971C2 17.9688 2 16.4216 2 13.3271L2.00002 13.0537L2 12.8693V8.47708ZM6.74964 15.5521C6.20011 15.5521 5.75462 15.9976 5.75462 16.5472C5.75462 17.0967 6.20011 17.5422 6.74964 17.5422L17.2505 17.5422C17.8 17.5422 18.2455 17.0967 18.2455 16.5472C18.2455 15.9976 17.8 15.5521 17.2505 15.5521L6.74964 15.5521Z"
      />
    </svg>
  );

Folder.defaultProps = {
  width: 24,
  height: 24,
  // fill: '#6E7DAE',
  outline: true,
};

Folder.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
  outline: PropTypes.bool,
};

export default Folder;
