import React from 'react'

const StarsPath = (props) => (
  <svg width={props.width ? props.width : "272"}
       height={props.height ? props.height : "266"}
       fill={props.color ? props.color : "#F2F6FF"}
       className={props.className}
       viewBox="0 0 272 246"
       xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M-0.000622623 143.19C74.7321 130.967 209.873 121.987 268 118.5L268 125.5C137.56 129.342 33.9511 139.283 -0.000622623 143.19Z"
    />
  </svg>
)

export default StarsPath
