import React from 'react';

export default function Paypal(props) {
  return (
    <svg width={props.width ? props.width : '35'}
         height={props.height ? props.height : '35'}
         viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_b_19082_272243)">
        <path fillRule="evenodd" clipRule="evenodd" d="M15.178 11.2227H22.2894C26.1075 11.2227 27.5449 13.168 27.3228 16.0261C26.9556 20.7445 24.1214 23.355 20.3619 23.355H18.4639C17.948 23.355 17.6011 23.6986 17.4616 24.6298L16.6557 30.0429C16.6025 30.3939 16.4189 30.5971 16.1436 30.6248H11.6756C11.2552 30.6248 11.1065 30.3015 11.2167 29.6013L13.9408 12.248C14.0473 11.5534 14.4254 11.2227 15.178 11.2227Z" fill="url(#paint0_linear_19082_272243)"/>
      </g>
      <g filter="url(#filter1_b_19082_272243)">
        <path fillRule="evenodd" clipRule="evenodd" d="M11.0116 4.375H17.8478C19.7728 4.375 22.0575 4.44056 23.5841 5.87351C24.6048 6.83069 25.1407 8.35355 25.0173 9.99442C24.5977 15.5408 21.4757 18.6483 17.2873 18.6483H13.9167C13.342 18.6483 12.963 19.0529 12.8009 20.1468L11.8595 26.5155C11.7978 26.9276 11.6303 27.1711 11.3307 27.2011H7.11221C6.64506 27.2011 6.47935 26.8265 6.60098 25.9985L9.63305 5.58505C9.75468 4.76461 10.1795 4.375 11.0116 4.375Z" fill="white" fillOpacity="0.3"/>
        <path d="M23.4472 6.01934L23.4473 6.0194C24.4164 6.92825 24.9375 8.38798 24.8178 9.97934C24.6106 12.7192 23.7375 14.8362 22.4186 16.2656C21.102 17.6926 19.3287 18.4483 17.2873 18.4483H13.9167C13.5737 18.4483 13.275 18.5733 13.0468 18.8638C12.8283 19.1421 12.6861 19.5574 12.603 20.1175L12.603 20.1176L11.6617 26.4859C11.6617 26.4859 11.6617 26.486 11.6617 26.486C11.6334 26.6749 11.5837 26.8024 11.5243 26.8816C11.4719 26.9516 11.408 26.9902 11.3197 27.0011H7.11221C7.02171 27.0011 6.96211 26.983 6.92177 26.9586C6.88314 26.9351 6.84792 26.8974 6.81959 26.8314C6.75797 26.6878 6.73912 26.4343 6.79884 26.0277C6.79885 26.0277 6.79885 26.0276 6.79886 26.0276L9.83088 5.61443L9.83089 5.61438C9.88774 5.23089 10.0109 4.97965 10.1886 4.82198C10.3654 4.66516 10.6255 4.575 11.0116 4.575H17.8478C19.7868 4.575 21.987 4.64876 23.4472 6.01934Z" stroke="url(#paint1_linear_19082_272243)" strokeWidth="0.4"/>
      </g>
      <defs>
        <filter id="filter0_b_19082_272243" x="6.18164" y="6.22266" width="26.1641" height="29.4023" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feGaussianBlur in="BackgroundImage" stdDeviation="2.5"/>
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_19082_272243"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_19082_272243" result="shape"/>
        </filter>
        <filter id="filter1_b_19082_272243" x="2.5625" y="0.375" width="26.4727" height="30.8262" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feGaussianBlur in="BackgroundImage" stdDeviation="2"/>
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_19082_272243"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_19082_272243" result="shape"/>
        </filter>
        <linearGradient id="paint0_linear_19082_272243" x1="16" y1="33.5" x2="20" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="#E2E2E2" stopOpacity="0.46"/>
        </linearGradient>
        <linearGradient id="paint1_linear_19082_272243" x1="12.5781" y1="30.0781" x2="20.0131" y2="11.0882" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.52"/>
          <stop offset="0.913238" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>

  );
}
