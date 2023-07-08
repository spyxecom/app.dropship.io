import React from 'react'

const Cart = (props) => (
  <svg width={props.width ? props.width : 24}
       height={props.height ? props.height : 24}
       fill={props.color ? props.color : '#225aea'}
       onClick={props.onClick ? props.onClick : ()=>{}}
       className={props.className ? props.className : ''}
       viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" clipRule="evenodd"
          d="M3.36838 3.30087C2.95101 3.03873 2.40016 3.16458 2.13803 3.58195C1.87589 3.99932 2.00174 4.55016 2.4191 4.8123L3.97811 5.79145L4.31532 9.56052C4.32047 9.61818 4.33101 9.67406 4.34638 9.72772L4.70919 14.4807C4.84374 16.2434 6.3133 17.6051 8.08117 17.6051H16.9783C18.4744 17.6051 19.7927 16.6221 20.2195 15.1882L21.9086 9.51497C22.3165 8.14471 21.29 6.76807 19.8603 6.76807H6.40151C6.09348 6.76807 5.83639 6.53295 5.80894 6.22615L5.74267 5.48547C5.70126 5.02259 5.44586 4.60566 5.05231 4.35849L3.36838 3.30087ZM6.68877 8.55288C6.34236 8.55288 6.0692 8.84768 6.09556 9.1931L6.48882 14.3448C6.55236 15.1772 7.24633 15.8203 8.08117 15.8203H16.9783C17.6848 15.8203 18.3073 15.3561 18.5089 14.6789L20.1979 9.00569C20.2652 8.77981 20.096 8.55288 19.8603 8.55288H6.68877ZM7.40846 20.8377C8.06509 20.8377 8.59738 20.3054 8.59738 19.6488C8.59738 18.9921 8.06509 18.4598 7.40846 18.4598C6.75184 18.4598 6.21955 18.9921 6.21955 19.6488C6.21955 20.3054 6.75184 20.8377 7.40846 20.8377ZM18.276 19.6488C18.276 20.3054 17.7437 20.8377 17.0871 20.8377C16.4305 20.8377 15.8982 20.3054 15.8982 19.6488C15.8982 18.9921 16.4305 18.4598 17.0871 18.4598C17.7437 18.4598 18.276 18.9921 18.276 19.6488ZM15.1419 9.45978C14.649 9.45978 14.2495 9.85933 14.2495 10.3522C14.2495 10.845 14.649 11.2446 15.1419 11.2446H17.5399C18.0327 11.2446 18.4323 10.845 18.4323 10.3522C18.4323 9.85933 18.0327 9.45978 17.5399 9.45978H15.1419Z"
          />
  </svg>
)

export default Cart