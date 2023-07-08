import React from 'react'

const ArrowSelectDown = (props) => (
  <svg width={props.width ? props.width : '24'}
       height={props.height ? props.height : '24'}
       fill={props.color ? props.color : '#707BA0'}
       viewBox="0 0 24 24"

       xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.0002 15.5002C11.8686 15.5009 11.7381 15.4757 11.6163 15.426C11.4944 15.3762 11.3836 15.3029 11.2902 15.2102L7.29019 11.2102C7.19695 11.1169 7.12299 11.0063 7.07253 10.8844C7.02207 10.7626 6.99609 10.632 6.99609 10.5002C6.99609 10.3683 7.02207 10.2378 7.07253 10.1159C7.12299 9.99411 7.19695 9.88342 7.29019 9.79018C7.38342 9.69695 7.49411 9.62299 7.61594 9.57253C7.73776 9.52206 7.86833 9.49609 8.00019 9.49609C8.13204 9.49609 8.26261 9.52206 8.38444 9.57253C8.50626 9.62299 8.61695 9.69695 8.71019 9.79018L12.0002 13.1002L15.3002 9.92019C15.3922 9.8179 15.5043 9.73569 15.6295 9.6787C15.7547 9.62171 15.8903 9.59118 16.0279 9.589C16.1654 9.58682 16.302 9.61304 16.4289 9.66603C16.5559 9.71903 16.6705 9.79764 16.7657 9.89697C16.8609 9.99629 16.9346 10.1142 16.9821 10.2433C17.0297 10.3724 17.0501 10.5099 17.042 10.6472C17.034 10.7846 16.9977 10.9188 16.9355 11.0414C16.8732 11.1641 16.7863 11.2726 16.6802 11.3602L12.6802 15.2202C12.4973 15.3965 12.2542 15.4966 12.0002 15.5002Z"
    />
  </svg>
)

export default ArrowSelectDown
