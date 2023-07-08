import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {useParams} from "react-router";
import { push, goBack } from 'connected-react-router';
import { useTranslation } from 'react-i18next';
import {Layout, Card, Spin, Carousel} from 'antd';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useGoogleLogin } from '@react-oauth/google';
import AppleSignin from 'react-apple-signin-auth';
import LoginForm from '../../Components/Forms/LoginForm';
import LoginHeader from '../../Components/LoginHeader';
import Images from '../../Images';
import AuthActions from './reducer';
import ButtonComponent from "../../Components/Button";

function LoginPage(props) {
  const { auth, error, fetching, rememberMe, isMobile } = props;

  const history = useHistory();
  const {hash} = useParams();
  const { t } = useTranslation();

  const otpRequired = error?.otp_required

  function handleSubmit(data) {
    if (otpRequired) props.signIn(data.email, data.password, data?.otp_pass)
    else props.signIn(data.email, data.password)
  }

  const responseFacebook = (response) => {
    if (response && response.accessToken) {
      props.socialAuth(response.accessToken, 'facebook');
    }
  };

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
      if(response?.user){
        props.socialAuth(response.authorization.id_token, 'apple', response?.user);
      }else{
        props.socialAuth(response.authorization.id_token, 'apple');
      }
    }
  };

  useEffect(() => {
    if (hash) localStorage.setItem('ref_link_info', hash);
    if (auth.userInfo && !auth.isAdmin) {
      if(auth.userInfo?.onboarding_finished){
        history.push('/dashboard');
      }else{
        history.push('/onboarding/plan')
      }
    } else if (auth.userInfo && auth.isAdmin) {
      history.push('/admin/portfolio');
    }else{
      document.title = 'Login - Dropship';
    }
    if(error) props.resetError()
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, []);

  const handleClearError =()=>{
    if(error) props.resetError()
  }

  return (
    <Layout>
      <Spin size="large" spinning={fetching}>
        <div className="login-row">
          <LoginHeader />
          {(error && (typeof error === 'string' || otpRequired)) && (
            <div className={'force-logout-error'}>
              {typeof error === 'string' ? error : 'OTP is required'}
            </div>
          )}
          <div className="login-content">
            <div className="content-main">
              <div className="content-left">
                <Card className="login-card">
                  <h2 className="card-title" style={{ marginBottom: 0 }}>
                    {t('Sign In')}
                  </h2>
                  <LoginForm
                    rememberMe={rememberMe}
                    setRemember={props.setRemember}
                    onSubmit={handleSubmit}
                    error={error?.message}
                    otpRequired={otpRequired}
                  >
                    <div className="social-title">
                      <span>{t('Sign In With')}</span>
                      <div className="middle-line" />
                    </div>
                    <div className="social-btn-block social-btn-block-login">
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
                        returnScopes={true}
                        textButton
                        cssClass="my-social-btn"
                        callback={responseFacebook}
                        disableMobileRedirect={true}
                        render={(renderProps) => (
                          <ButtonComponent
                            className="btn-primary"
                            type="primary white"
                            onClick={renderProps.onClick}
                          >
                            <img
                              className="btn-icon icon-space"
                              src={Images.facebook}
                              alt=""
                            />
                            Facebook
                          </ButtonComponent>
                        )}
                      />

                      <AppleSignin
                        authOptions={{
                          clientId: process.env.REACT_APP_APPLE_CLIENT_ID,
                          scope: 'email name',
                          redirectURI: process.env.REACT_APP_BASE_URI + '/login',
                          state: 'state',
                          nonce: 'nonce',
                          usePopup: true,
                        }}
                        className="apple-auth-btn"
                        noDefaultStyle={false}
                        onSuccess={responseApple}
                        onError={responseApple}
                        skipScript={false}
                        render={(renderProps) => (
                          <ButtonComponent
                            className="btn-primary"
                            type="primary white"
                            onClick={renderProps.onClick}
                          >
                            <img
                              className="btn-icon icon-space"
                              src={Images.apple}
                              alt=""
                            />
                            Apple
                          </ButtonComponent>
                        )}
                      />
                    </div>

                    <div className="sign-up-link sign-up-link_12">
                      {t('New to Dropship?')}{' '}
                      <Link to="/sign-up" onClick={handleClearError}>{t('Get Started')}</Link>
                    </div>
                  </LoginForm>
                </Card>
              </div>
              <div className="content-right" style={{width: 1}}>
                <div className="bg-wrapper">
                {!isMobile && <div className="bg">
                  <Carousel autoplay autoplaySpeed={5000}>
                    <div className="bg-card">
                      <h2 className="bg-card-title">
                        Discover What Other Sellers Make
                      </h2>
                      <p className="bg-card-description">
                        Add stores and products to Sales Tracker to track performance over time, monitor sales, and spot
                        the next big opportunity before others.
                      </p>
                      <div className="bg-card-image bg-card-image--1"/>
                    </div>

                    <div className="bg-card">
                      <h2 className="bg-card-title">
                        Analyze Data And Make Informed Decisions
                      </h2>
                      <p className="bg-card-description">
                        We provide all the data you need to uncover potential best-selling products in different niches
                        with minimal effort.
                      </p>
                      <div className="bg-card-image bg-card-image--2"/>
                    </div>

                    <div className="bg-card">
                      <h2 className="bg-card-title">
                        Find Winning Products With Smart Filters
                      </h2>
                      <p className="bg-card-description">
                        Using smart filters, you can find winning products that are tailored to your specific
                        requirements, niche, and preferences.
                      </p>
                      <div className="bg-card-image bg-card-image--3"/>
                    </div>

                  </Carousel>
                </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.auth.error,
  fetching: state.auth.fetching,
  rememberMe: state.auth.rememberMe,
  isMobile: state.nav.isMobile,
});

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  navPush: (path, state) => dispatch(push(path, state)),
  navGoBack: () => dispatch(goBack()),
  signIn: (email, password, otp_pass) =>
    dispatch(AuthActions.signInRequest(email, password, otp_pass)),
  resetError: () => dispatch(AuthActions.authErrorReset()),
  setRemember: (data) => dispatch(AuthActions.setRemember(data)),
  socialAuth: (accessToken, type, user) =>
    dispatch(AuthActions.socialAuthRequest(accessToken, type, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
