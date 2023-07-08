import React from 'react'

const CloseModal = (props) => (
  <svg width={props.width ? props.width : '14'}
       height={props.height ? props.height : '14'}
       viewBox="0 0 14 14"
       fill={props.color ? props.color : '#000000'}
       className={props.className ? props.className : ''}
       xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
          fillOpacity={props.opacity ? props.opacity : '0.3'}/>
  </svg>
)

export default CloseModal
