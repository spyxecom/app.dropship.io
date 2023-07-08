import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {push, goBack} from "connected-react-router"
import {useHistory} from 'react-router-dom';
import {useParams} from "react-router";
import {useTranslation} from 'react-i18next';
import AuthActions from './LoginPage/reducer';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import AppleSignin from 'react-apple-signin-auth';
import {useGoogleLogin} from '@react-oauth/google';
import {Layout, Card, Spin, Modal} from 'antd'
import SignUpEmailForm from '../Components/Forms/SignUpEmailForm'
import AddEmailForm from '../Components/Forms/AddEmailForm'
import LoginHeader from '../Components/LoginHeader'
import Images from '../Images'
import ButtonComponent from "../Components/Button";
import Icon from "../Icon";
import SignUpModal from "./SignUpModal";

function SignUpPage(props) {

  const {match, auth: {error, fetching, userInfo, isAdmin, emailSent}, isMobile, setEmailSent} = props;

  const {path} = match

  const history = useHistory();
  const {hash} = useParams();
  const {t} = useTranslation()

  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({});

  function handleSubmit(data) {
    setValues(data)
    props.checkEmail(data, true);
  }

  const responseFacebook = (response) => {
    if (response && response.accessToken) {
      props.socialAuth(response.accessToken, 'facebook');
    }
  }

  const responseGoogle = useGoogleLogin({
    onSuccess: (response) => {
      if (response && response?.access_token) {
        props.socialAuth(response?.access_token, 'google');
      }
    },
    onFailure: (response) => {
      if (response && response?.access_token) {
        props.socialAuth(response?.access_token, 'google');
      }
    }
  });

  const responseApple = (response) => {
    if (response && response.authorization) {
      if (response.user) {
        props.socialAuth(response.authorization.id_token, 'apple', response.user)
      } else {
        props.socialAuth(response.authorization.id_token, 'apple')
      }
    }
  }

  useEffect(() => {
    if (emailSent) {
      if (!visible) {
        setVisible(true);
        setEmailSent(false);
      }
    }
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [emailSent])

  useEffect(() => {
    if (hash) localStorage.setItem('ref_link_info', hash);
    if (userInfo && !isAdmin) {
      if (userInfo?.onboarding_finished) {
        history.push('/dashboard');
      } else {
        history.push('/onboarding/plan')
      }
    } else if (userInfo && isAdmin) {
      history.push('/admin/portfolio');
    } else {
      document.title = 'Sign Up - Dropship';
    }
    let head = document.querySelector('head');
    let script = document.createElement('script')
    script.text = "!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');twq('config','oepmf');"
    head.appendChild(script)
    return () => {
      head.removeChild(script);
    }
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [])

  useEffect(() => {
    if (error) {
      props.resetError();
    }
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [error])

  return (
    <Layout>
      <Spin size="large" spinning={fetching}>
        <div className="login-row">
          <LoginHeader/>
          <div className="login-content">
            <div className="content-main sign-up">
              <div className={'bg-img _1 rotate_animation'}
                   style={{backgroundImage: `url(${isMobile ? Images.signUpImg1Mobile : Images.signUpImg1})`}}
              />
              <div className={'bg-img _2 rotate_animation'}
                   style={{backgroundImage: `url(${isMobile ? Images.signUpImg2Mobile : Images.signUpImg2})`}}
              />
              <div className={'bg-img _3 rotate_animation'}
                   style={{backgroundImage: `url(${isMobile ? Images.signUpImg3Mobile : Images.signUpImg3})`}}
              />
              <div className={'bg-img _4 rotate_animation'}
                   style={{backgroundImage: `url(${isMobile ? Images.signUpImg4Mobile : Images.signUpImg4})`}}
              />
              <div className={'bg-img _5 rotate_animation'}
                   style={{backgroundImage: `url(${isMobile ? Images.signUpImg5Mobile : Images.signUpImg5})`}}
              />
              <div className={'bg-img _6 rotate_animation'}
                   style={{backgroundImage: `url(${isMobile ? Images.signUpImg6Mobile : Images.signUpImg6})`}}
              />
              {
                path === "/add-email"
                  ? (
                    <Card className="login-card" style={{minHeight: '208px'}}>
                      <h2 className='card-title'>{t('Enter Your Email')}</h2>
                      <AddEmailForm
                        onSubmit={handleSubmit}
                        error={error?.message}
                      />
                    </Card>)
                  : (
                    <Card className="login-card">
                      <h2 className='card-title'>{t('Try Dropship.io For Free')}</h2>
                      <h4 className='card-subtitle-signup'>{t("Get started - it's quick")}</h4>
                      <SignUpEmailForm
                        onSubmit={handleSubmit}
                        error={error?.message}
                      >
                        <div className="social-btn-block">
                          <ButtonComponent
                            className="btn-primary"
                            type="primary white"
                            onClick={responseGoogle}
                          >
                            <img
                              className="btn-icon icon-space"
                              src={Images.google}
                              alt=""
                            />
                            Google
                          </ButtonComponent>
                          <FacebookLogin
                            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                            scope="public_profile,email"
                            textButton
                            cssClass="my-social-btn"
                            callback={responseFacebook}
                            disableMobileRedirect={true}
                            render={renderProps => (
                              <ButtonComponent className="btn-primary" type="primary white" onClick={renderProps.onClick}>
                                <img className="btn-icon icon-space" src={Images.facebook} alt=""/>
                                Facebook
                              </ButtonComponent>
                            )}
                          />
                          <AppleSignin
                            authOptions={{
                              clientId: process.env.REACT_APP_APPLE_CLIENT_ID,
                              scope: 'email name',
                              redirectURI: process.env.REACT_APP_BASE_URI + '/sign-up',
                              state: 'state',
                              nonce: 'nonce',
                              usePopup: true,
                            }}
                            className="apple-auth-btn"
                            noDefaultStyle={false}
                            onSuccess={responseApple}
                            onError={responseApple}
                            skipScript={false}
                            render={renderProps => (
                              <ButtonComponent className="btn-primary" type="primary white" onClick={renderProps.onClick}>
                                <img className="btn-icon icon-space" src={Images.apple} alt=""/>
                                Apple
                              </ButtonComponent>
                            )}
                          />
                        </div>
                        <div className="social-title" style={{margin: '12px 0 0'}}>
                          <div className="middle-line"/>
                          <span style={{fontSize: 14, lineHeight: '16px', margin: '0 16px'}}>{t('or sign up with')}</span>
                          <div className="middle-line"/>
                        </div>
                      </SignUpEmailForm>
                    </Card>)
              }
            </div>
          </div>
          <Modal
            className={"sign-up-modal"}
            getContainer={() => document.getElementById('root')}
            open={visible}
            centered={!isMobile}
            closeIcon={
              <Icon role="icon" type="close_modal" color="#707BA0" opacity={1}/>
            }
            width={648}
            footer={null}
            closable="true"
            onCancel={() => {
              setVisible(false);
            }}
            destroyOnClose
          >
            <SignUpModal data={values} onSubmit={handleSubmit} />
          </Modal>
        </div>
      </Spin>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isMobile: state.nav.isMobile,
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  navPush: (path, state) => dispatch(push(path, state)),
  navGoBack: () => dispatch(goBack()),
  checkEmail: (data, isSignUp) => dispatch(AuthActions.checkEmailRequest(data, isSignUp)),
  resetError: () => dispatch(AuthActions.authErrorReset()),
  setEmailSent: (data) => dispatch(AuthActions.setEmailSent(data)),
  socialAuth: (accessToken, type, user) => dispatch(AuthActions.socialAuthRequest(accessToken, type, user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
