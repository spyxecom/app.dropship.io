import React from 'react'

const Help = (props) => (
  <svg width={props.width ? props.width : "24"}
       height={props.height ? props.height : "24"}
       fill={props.color ? props.color : "#97A3C7"}
       className={props.className ? props.className : ""}
       viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" clipRule="evenodd"
          d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
    />
    <path fillRule="evenodd" clipRule="evenodd"
          d="M11.1332 9.50073C10.8567 9.97879 10.245 10.1421 9.7669 9.86561C9.28884 9.58906 9.12548 8.97733 9.40202 8.49927C9.91923 7.60518 10.8884 7 12.0001 7C13.6569 7 15.0001 8.34315 15.0001 10C15 11.0977 14.3267 11.994 13.5001 12.5C12.8361 12.9065 13.2501 14 11.9974 14C11.4452 14 10.9974 13.5523 10.9974 13C10.9974 12.9649 10.9993 12.9302 11.0028 12.896C11.0305 12.3672 11.2663 11.9368 11.5231 11.6239C11.7943 11.2935 12.1508 11.0237 12.4234 10.8616C13.9401 9.96 12.0902 8.1154 11.1332 9.50073ZM11.9974 15C11.4452 15 10.9974 15.4477 10.9974 16C10.9974 16.5523 11.4452 17 11.9974 17C12.5497 17 12.9974 16.5523 12.9974 16C12.9974 15.4477 12.5497 15 11.9974 15Z"
    />
  </svg>
)

export default Help