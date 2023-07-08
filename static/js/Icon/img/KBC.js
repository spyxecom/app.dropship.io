import React from 'react';

export default function KBC(props) {
  return (
    <svg width={props.width ? props.width : '46'}
         height={props.height ? props.height : '21'}
         viewBox="0 0 46 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_b_19082_272188)">
        <path fillRule="evenodd" clipRule="evenodd" d="M23.2644 15.7494C27.6512 15.7494 31.2066 12.2243 31.2066 7.87482C31.2066 3.52584 27.6512 0 23.2644 0C18.8793 0 15.3229 3.52584 15.3229 7.87482C15.3229 12.2243 18.8793 15.7494 23.2644 15.7494ZM46 13.8175V20.9956L0 21V17.5194C0 17.5194 6.44889 16.2402 15.1194 15.3383C16.5743 16.4762 18.8613 17.4998 21.5178 17.4998C24.9412 17.4998 27.6098 15.8731 29.1223 14.2457C38.1182 13.7691 46 13.8175 46 13.8175Z" fill="url(#paint0_linear_19082_272188)"/>
      </g>
      <defs>
        <filter id="filter0_b_19082_272188" x="-5" y="-5" width="56" height="31" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feGaussianBlur in="BackgroundImage" stdDeviation="2.5"/>
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_19082_272188"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_19082_272188" result="shape"/>
        </filter>
        <linearGradient id="paint0_linear_19082_272188" x1="-17.6571" y1="19.8601" x2="-7.34868" y2="-11.7539" gradientUnits="userSpaceOnUse">
          <stop offset="0.12056" stopColor="white"/>
          <stop offset="1" stopColor="#E2E2E2" stopOpacity="0.46"/>
        </linearGradient>
      </defs>
    </svg>

  );
}
