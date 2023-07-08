import React from 'react'

const ResendEmailLoader = (props) => (
  <svg width="16"
       height="16"
       fill={props.color ? props.color : '#225aea'}
       className={props.className ? props.className : ''}
       viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">

    <rect x="7.25" width="1.5" height="4" rx="0.75" >
      <animate attributeName="fill" values="#C5CCE3" id="loader_1" begin="0s;loader_8.end" dur="0.2s" />
    </rect>

    <rect x="13.127" y="1.81274" width="1.5" height="4" rx="0.75" transform="rotate(45 13.127 1.81274)" >
      <animate attributeName="fill" values="#C5CCE3" id="loader_2" begin="0s;loader_8.end" dur="0.2s" />
    </rect>

    <rect x="12" y="8.75" width="1.5" height="4" rx="0.75" transform="rotate(-90 12 8.75)" >
       <animate attributeName="fill" values="#C5CCE3" id="loader_3" begin="loader_2.end" dur="0.2s" />
    </rect>

    <rect x="14.1875" y="13.1265" width="1.5" height="4" rx="0.75" transform="rotate(135 14.1875 13.1265)" >
      <animate attributeName="fill" values="#C5CCE3" id="loader_4" begin="loader_2.end" dur="0.2s" />
    </rect>

    <rect x="7.25" y="12" width="1.5" height="4" rx="0.75" >
      <animate attributeName="fill" values="#C5CCE3" id="loader_5" begin="loader_4.end" dur="0.2s" />
    </rect>

    <rect x="4.64062" y="10.2981" width="1.5" height="4" rx="0.75" transform="rotate(45 4.64062 10.2981)" >
      <animate attributeName="fill" values="#C5CCE3" id="loader_6" begin="loader_4.end" dur="0.2s" />
    </rect>

    <rect y="8.75" width="1.5" height="4" rx="0.75" transform="rotate(-90 0 8.75)" >
      <animate attributeName="fill" values="#C5CCE3" id="loader_7" begin="loader_6.end" dur="0.2s" />
    </rect>

    <rect x="5.70117" y="4.64136" width="1.5" height="4" rx="0.75" transform="rotate(135 5.70117 4.64136)" >
      <animate attributeName="fill" values="#C5CCE3" id="loader_8" begin="loader_6.end" dur="0.2s" />
    </rect>
  </svg>
)

export default ResendEmailLoader
