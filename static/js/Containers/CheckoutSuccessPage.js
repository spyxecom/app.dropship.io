import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from 'antd';
import Images from '../Images';
import ButtonComponent from "../Components/Button";
import LoginHeader from "../Components/LoginHeader";
import TitleAnimationColor from "../Components/TitleAnimationColor";

function CheckoutSuccessPage() {

  let history = useHistory();
  const { t } = useTranslation();
  const userInfo = useSelector(store => store.auth.userInfo)
  const email = userInfo?.email;
  const uid = userInfo?.chargebee_customer_id;

  const addPlanToGTM = () => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
        'event': 'subscription_success',
        'gtm.newUrl': window.location.href,
        'plan_type': userInfo.subscriptions[0].plan.name,
        'user_email': userInfo.email,
      });
  }

  useEffect(() => {
    document.title = 'Success - Dropship';
    window.fpr("referral",{email: email, uid: uid});
    if (localStorage.getItem('completely_finished')) history.push('/dashboard');
    addPlanToGTM();
    let head = document.querySelector('head');
    let script = document.createElement('script')
    script.text = "!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');twq('config','oepmf');"
    head.appendChild(script)
    return () => {
      head.removeChild(script);
    }
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, []);

  function handleNavigate(path) {
    history.push(path);
    localStorage.setItem('completely_finished', 'true');
  }

  return (
    <Layout>
      <div className="login-row">
        <LoginHeader withLogout={false} />
        <div className={'login-content success success_first-time'}>
          <div className='content-title animation'>
            <TitleAnimationColor>
              <h2>{userInfo?.first_name ? t('Welcome, _name_!', { name: userInfo?.first_name }) : t('Welcome!')}</h2>
            </TitleAnimationColor>
            <div>{t('Your Dropship account has been successfully created. Good luck with your journey!')}</div>
          </div>

          <div className="page-content">
            <div dangerouslySetInnerHTML={{__html:
                `
                  <video src="${Images.videoSignUpSuccess}"
                          loop
                          muted
                          autoplay
                          playsinline
                 />
                  `
            }} />

            <ButtonComponent type="primary" className="btn-primary btn-primary_animation small" onClick={() => handleNavigate('/dashboard')}>
              {t('Go To Dashboard')}
            </ButtonComponent>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default CheckoutSuccessPage;
