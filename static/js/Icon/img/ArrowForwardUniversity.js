import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';

const ArrowForwardUniversity = ({ width, height, className, color, skipColor=false }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={width}
         height={height}
         className={cls(className, 'icon icon-arrow-forward')}
         viewBox="0 0 9 16"
         fill="none"
    >
      <path
        d="M8.00546 6.97391C8.00647 6.79926 7.97284 6.62614 7.90648 6.46446C7.84013 6.30278 7.74236 6.15572 7.61879 6.03173L2.28546 0.723679C2.16114 0.599951 2.01355 0.501805 1.85112 0.434843C1.68869 0.367882 1.5146 0.333417 1.33879 0.333417C1.16298 0.333417 0.988885 0.367882 0.826456 0.434843C0.664026 0.501805 0.51644 0.599951 0.392122 0.723679C0.267804 0.847408 0.169189 0.994295 0.101908 1.15595C0.0346279 1.31761 -2.6198e-09 1.49088 0 1.66586C2.61981e-09 1.84084 0.0346279 2.0141 0.101908 2.17576C0.169189 2.33742 0.267804 2.48431 0.392122 2.60804L4.80546 6.97391L0.565455 11.353C0.429069 11.4751 0.319457 11.6239 0.243476 11.79C0.167494 11.9562 0.126778 12.1362 0.123872 12.3187C0.120966 12.5012 0.155933 12.6824 0.226588 12.8509C0.297243 13.0194 0.402065 13.1715 0.534498 13.2978C0.66693 13.4241 0.824125 13.5219 0.99625 13.585C1.16838 13.6481 1.35173 13.6751 1.53484 13.6645C1.71796 13.6538 1.8969 13.6057 2.06046 13.5231C2.22403 13.4405 2.36871 13.3251 2.48545 13.1843L7.63212 7.87627C7.86721 7.6336 8.00069 7.31097 8.00546 6.97391Z"
        fill={skipColor ? 'none' : color}
      />
    </svg>
  );
};

ArrowForwardUniversity.defaultProps = {
  width: 9,
  height: 16,
  color: '#225aea',
  // fill: '#6E7DAE',
};

ArrowForwardUniversity.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  // fill: PropTypes.string,
};

export default ArrowForwardUniversity;
