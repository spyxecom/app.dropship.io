import React from 'react'

const PlayVideoBtnSmall = (props) => (
  <svg width={props.width ? props.width : '16'}
       height={props.height ? props.height : '16'}
       style={props.style}
       viewBox="0 0 16 16"
       xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M3.40396 0.352788C1.96147 -0.474645 0.791992 0.203198 0.791992 1.86558V14.1332C0.791992 15.7973 1.96147 16.4743 3.40396 15.6476L14.1265 9.4983C15.5695 8.67057 15.5695 7.32953 14.1265 6.502L3.40396 0.352788Z"
        fill={props.color ? props.color : '#225aea'}/>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="16" height="16" fill="white"/>
      </clipPath>
    </defs>
  </svg>

)

export default PlayVideoBtnSmall
