import React, {useEffect, useRef, useState} from 'react';
import Icon from '../Icon';
import {Spin} from "antd";
import './SignUpModal.less';

const ResendLoadingBlock = ({delay}) => {

  const [seconds, setSeconds] = useState(delay / 1000);

  useEffect(() => {
    if (seconds > 0) setTimeout(() => setSeconds(prev => prev - 1), 1000);
  }, [seconds])

  return (
    <div className={'sign-up-modal-content-timer'}>
      <Spin spinning={true}/> <span>Resend again in {seconds} seconds</span>
    </div>
  )
}

const ResendBlock = ({onSubmit, data}) => {

  const delay = 30000;

  const [loading, setLoading] = useState(false);

  return (
    <div className='sign-up-modal-content-timer-wrapper'>
      {
        loading ?
          <ResendLoadingBlock delay={delay} />
          :
          <>
            Didn’t receive the email? <span onClick={() => {
              setLoading(true)
            setTimeout(() => {
              setLoading(false)
            }, delay)
            onSubmit(data)
          }}>Resend</span>
          </>
      }
    </div>
  )
}

const SignUpModal = ({data, onSubmit}) => {

  const mail = useRef(null)

  useEffect(() => {
    let mailContent = mail.current;
    if (mailContent) {
      if (mailContent.scrollWidth > mailContent.clientWidth) {
        mailContent.style.fontSize = 26 / (mailContent.scrollWidth / mailContent.clientWidth) + 'px';
      }
    }
  }, [])

  const mailServices = [
    {
      name: 'google',
      link: 'https://mail.google.com/mail/u/1/#search/in%3Aanywhere+from%3ADropship'
    },
    {
      name: 'apple',
      link: 'https://www.icloud.com/email'
    },
    {
      name: 'microsoft',
      link: 'https://outlook.live.com/mail/0/'
    },
    {
      name: 'yahoo',
      link: 'https://mail.yahoo.com/d/search/keyword=from%253ADropship'
    },
  ]

  return (
    <div className={'load-filter-preset-wrapper sign-up-modal-wrapper'}>
      <div className="sign-up-modal-image" />
      <div className="sign-up-modal-content">
        <h4 style={{marginTop: 32}} className="sign-up-modal-content-title">
          Confirm your email
        </h4>
        <p ref={mail} className="sign-up-modal-content-mail">
          {data?.email}
        </p>

        <ResendBlock onSubmit={onSubmit} data={data} />

        <h4 style={{marginTop: 48}} className="sign-up-modal-content-title">
          Open Mail Service
        </h4>
        <div className="sign-up-modal-content-mail-service-wrapper">
          {mailServices.map(el => (
            <div key={el?.name}
                 className="sign-up-modal-content-mail-service"
                 onClick={() => window.open(el?.link, '_blank')}
            >
              <Icon rol={'icon'} type={`search_${el?.name}_mail`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
