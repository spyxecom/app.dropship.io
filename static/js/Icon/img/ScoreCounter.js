import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';
import {useSelector} from "react-redux";

const colors = {
  'light': {
    score: '#225aea',
    bg: '#F2F6FF'
  },
  'dark': {
    score: '#000E58',
    bg: '#225aea'
  },
}

const ScoreCounter = ({ width, height, className, outline, color }) => {
  const theme = useSelector(state => state.nav.theme)
  return (
    <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    className={cls(className, 'icon icon-score-counter')}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.23261 15.988C6.45181 13.1288 8.30461 10.6042 10.6086 8.58972L8.47741 5.64868C5.57101 8.1204 3.26222 11.2756 1.79102 14.8665L5.23261 15.988Z"
      fill={outline >= 9 ? colors[theme].score : colors[theme].bg}
    />
    <path
      d="M3.6 24C3.6 22.426 3.7848 20.8953 4.1208 19.42L0.6792 18.2985C0.2352 20.1276 0 22.0361 0 24C0 25.9639 0.2352 27.8725 0.6792 29.7016L4.1208 28.58C3.7848 27.1071 3.6 25.574 3.6 24Z"
      fill={outline >= 8 ? colors[theme].score : colors[theme].bg}
    />
    <path
      d="M5.23261 32.0144L1.79102 33.1359C3.26222 36.7268 5.57101 39.882 8.47741 42.3562L10.6086 39.4151C8.30461 37.3959 6.45181 34.8736 5.23261 32.0144Z"
      fill={outline >= 7 ? colors[theme].score : colors[theme].bg}
    />
    <path
      d="M42.7695 15.988L46.2111 14.8665C44.7399 11.2756 42.4311 8.12037 39.5247 5.64624L37.3936 8.58728C39.6976 10.6041 41.5503 13.1264 42.7695 15.988Z"
      fill={outline >= 2 ? colors[theme].score : colors[theme].bg}
    />
    <path
      d="M42.7695 32.0144C41.5503 34.8736 39.6976 37.3983 37.3936 39.4127L39.5247 42.3538C42.4311 39.8796 44.7399 36.7244 46.2111 33.1335L42.7695 32.0144Z"
      fill={outline >= 4 ? colors[theme].score : colors[theme].bg}
    />
    <path
      d="M47.3215 18.2985L43.8799 19.42C44.2183 20.8929 44.4007 22.4236 44.4007 24C44.4007 25.5764 44.2159 27.1047 43.8799 28.58L47.3215 29.7016C47.7631 27.8749 48.0007 25.9663 48.0007 24C48.0007 22.0337 47.7655 20.1276 47.3215 18.2985Z"
      fill={outline >= 3 ? colors[theme].score : colors[theme].bg}
    />
    <path
      d="M34.483 41.5403C31.903 43.0974 28.9534 44.0938 25.7998 44.373V48C29.7454 47.7064 33.427 46.4548 36.6118 44.4789L34.483 41.5403Z"
      fill={outline >= 5 ? colors[theme].score : colors[theme].bg}
    />
    <path
      d="M22.1997 44.373C19.0461 44.0962 16.0965 43.0974 13.5165 41.5403L11.3877 44.4765C14.5725 46.4524 18.2541 47.7039 22.1997 47.9976V44.373Z"
      fill={outline >= 6 ? colors[theme].score : colors[theme].bg}
    />
    <path
      d="M25.7998 3.62696C28.9534 3.90373 31.903 4.90253 34.483 6.45969L36.6118 3.52347C33.427 1.54513 29.7454 0.293622 25.7998 0V3.62696Z"
      fill={outline >= 1 ? colors[theme].score : colors[theme].bg}
    />
    <path
      d="M13.5165 6.45969C16.0965 4.90253 19.0461 3.90614 22.1997 3.62696V0C18.2541 0.293622 14.5725 1.54513 11.3877 3.52106L13.5165 6.45969Z"
      fill={outline >= 10 ? colors[theme].score : colors[theme].bg}
    />
  </svg>
);
}

ScoreCounter.defaultProps = {
  width: 48,
  height: 48,
  outline: 0,
  color: '#F2F6FF',
};

ScoreCounter.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  outline: PropTypes.number,
  color: PropTypes.string,
  // fill: PropTypes.string,
};

export default ScoreCounter;
