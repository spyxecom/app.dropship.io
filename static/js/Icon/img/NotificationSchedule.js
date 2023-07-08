import React from 'react'
import cls from 'classname'

const NotificationSchedule = (props) => (
  <svg
    width={props.width ? props.width : '48'}
    height={props.height ? props.height : '48'}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cls(props.className, 'icon')}
  >
    <rect width="48" height="48" rx="6" fill="#FFF4F4"/>
    <path fillRule="evenodd" clipRule="evenodd"
          d="M19.2723 14C16.3605 14 14 16.3605 14 19.2723V28.7277C14 31.6395 16.3605 34 19.2723 34H28.7277C31.6395 34 34 31.6395 34 28.7277V19.2723C34 16.3605 31.6395 14 28.7277 14H19.2723ZM24.9886 20.2646C24.9886 19.7186 24.546 19.276 24 19.276C23.4541 19.276 23.0115 19.7186 23.0115 20.2646V24.2246C23.0115 24.9292 23.3335 25.5952 23.8859 26.0327L27.0139 28.5104C27.4418 28.8493 28.0636 28.7772 28.4026 28.3492C28.7416 27.9213 28.6695 27.2995 28.2415 26.9605L25.1135 24.4829C25.0346 24.4204 24.9886 24.3252 24.9886 24.2246V20.2646Z"
          fill="#D71313"/>
  </svg>
)

export default NotificationSchedule
