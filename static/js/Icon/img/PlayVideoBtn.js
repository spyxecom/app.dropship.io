import React from 'react'

const PlayVideoBtn = (props) => (
  <svg width={props.width ? props.width : '63'}
       height={props.height ? props.height : '72'}
       viewBox="0 0 63 72"
       fill={props.color ? props.color : '#FFFFFF'}
       xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.9"
          d="M11.4141 70.0595C5.11052 73.7312 0 70.7233 0 63.3465V8.90882C0 1.52464 5.11052 -1.47939 11.4141 2.18888L58.2707 29.4764C64.5764 33.1494 64.5764 39.1003 58.2707 42.7724L11.4141 70.0595Z"
          />
  </svg>

)

export default PlayVideoBtn
