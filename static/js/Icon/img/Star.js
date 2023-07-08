import React from 'react'

const Star = (props) => (
  <svg width={props.size ? props.size : "42"}
       height={props.size ? props.size : "42"}
       fill={props.color ? props.color : "#F2F6FF"}
       style={props.style}
       className={props.className}
       viewBox="0 0 30 30"
       xmlns="http://www.w3.org/2000/svg">
    <path d="M15 0L10.9486 10.9486L0 15L10.9486 19.0514L15 30L19.0514 19.0514L30 15L19.0514 10.9486L15 0Z"/>
  </svg>
)

export default Star
