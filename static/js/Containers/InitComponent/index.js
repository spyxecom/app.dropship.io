import React, {useEffect, Suspense, lazy, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Layout, Spin } from 'antd';
import { withResizeDetector } from 'react-resize-detector';
import { history } from '../../Utils/utils';
import i18n from '../../i18n';
import dayjs from 'dayjs';
import { PrivateRoute } from '../../Components/PrivateRoute';
import StartupPage from '../StartupPage';
import LoginPage from '../LoginPage';
import SignUpPage from '../SignUpPage';
import NotFoundPage from '../NotFoundPage';
import CheckoutSuccessPage from '../CheckoutSuccessPage';
import InvoicePage from '../InvoicePage/index';
import Collections from '../CollectionsModals';
import openNotification from '../../Components/Notification';
import NotificationError from '../../Icon/img/NotificationError';
import ExternalPages from './ExternalPages';
// REDUCERS
import NavActions from '../../Redux/NavRedux';
import ErrorsActions from '../../Redux/ErrorsRedux';
import AuthActions from '../LoginPage/reducer';
import StartupCreators from '../../Redux/StartupRedux';
// HOC
import useWindowSize from '../../hooks/use-window-size';
import withAuth from '../../hoc/withAuth';
import Spinner from '../../Components/Spinner';
import TrialFinished from "../../Components/Modal/TrialFinished";
import SettingCreators from "../SettingPage/reducer";
import GettingStartedButton from "../../Components/Button/GettingStartedButton";
import utc from "dayjs/plugin/utc";

const InternalPages = lazy(() => import('./InternalPages'));

dayjs.extend(utc)

function Routes(props) {
  const {
    width,
    auth,
    theme,
    navSetProp,
    userInfo,
    isAdmin,
    isMobile,
    error,
    verifyToken,
    startup,
    dispatch,
    isPasswordCreated,
    checkOauth
  } = props;

  const [, innerHeight] = useWindowSize();
  const { pathname, search } = useLocation();
  const [visible, setVisible] = useState(false);
  const [visibleGettingStarted, setVisibleGettingStarted] = useState(false);

  let deadline = userInfo?.subscriptions?.[0]?.expire_date ? dayjs(userInfo?.subscriptions?.[0]?.expire_date) : null;

  let timer = useRef(null);

  // STARTUP
  useEffect(() => {
    dispatch(StartupCreators.startup());

    window.Intercom("boot", {
      api_base: "https://api-iam.intercom.io",
      app_id: process.env.REACT_APP_INTERCOM_APP_ID,
    });

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'dark' ? '#030625' : '#ffffff');
    document.body.style.backgroundColor = theme === 'dark' ? '#030625' : '#ffffff';
  }, [theme])

  useEffect(() => {
    if (innerHeight) document.documentElement.style.setProperty('--app-height', `${innerHeight}px`);
  }, [innerHeight]);

  // REFRESH TOKEN
  useEffect(() => {
    if (auth?.accessToken && auth?.userInfo?.onboarding_finished) {
      verifyToken(auth.accessToken, search.includes('extension') ? 'extension' : null);
    }
    if(auth?.accessToken && auth?.userInfo){
      window.Intercom("boot", {
        api_base: "https://api-iam.intercom.io",
        app_id: process.env.REACT_APP_INTERCOM_APP_ID,
        name: `${auth?.userInfo?.first_name} ${auth?.userInfo?.last_name}`, // Full name
        email: auth?.userInfo?.email, // Email address
        created_at: dayjs().unix(), // Signup date as a Unix timestamp
      });
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [auth?.accessToken, auth?.refreshToken]);

  // ERRORS
  useEffect(() => {
    if (error) {
      if (error.message) {
        for (const i in error.message) {
          //message.error(`${i}: ${error.message[i]}`, 5);
          openNotification({
            type: 'error',
            icon: <NotificationError />,
            message: `${i}: ${error.message[i]}`,
            style: { minWidth: '716px' },
            getContainer: userInfo?.onboarding_finished ? document.getElementById('global-wrap') : document.body,
            duration: 3,
            key: i,
          });
        }
      } else if (typeof error === 'string') {
        //message.error(error, 5);
        openNotification({
          type: 'error',
          icon: <NotificationError />,
          message: error,
          style: { minWidth: '716px' },
          getContainer: userInfo?.onboarding_finished ? document.getElementById('global-wrap') : document.body,
          duration: 3,
          key: 'error notification',
        });
      } else {
        for (const i in error) {
          openNotification({
            type: 'error',
            icon: <NotificationError />,
            message: `${i}: ${error[i]}`,
            style: { minWidth: '716px' },
            getContainer: userInfo?.onboarding_finished ? document.getElementById('global-wrap') : document.body,
            duration: 3,
            key: i,
          });
        }
      }
      props.errorReset();
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [!!error]);

  // RESIZE
  useEffect(() => {
    const correctWidth = width || window.innerWidth;
    if (correctWidth > 768) {
      navSetProp('isDesktop', true);
      navSetProp('isMobile', false);
    } else {
      navSetProp('isDesktop', false);
      navSetProp('isMobile', true);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [width, !!userInfo]);

  useEffect(() => {
    if (userInfo?.show_intercom_tutorial && userInfo?.onboarding_finished && !window.location.pathname.includes('checkout/success')) setVisibleGettingStarted(true)
    else setVisibleGettingStarted(false);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [userInfo?.show_intercom_tutorial, userInfo?.onboarding_finished, window.location.pathname])

  // SET LANGUAGE
  useEffect(() => {
    i18n.changeLanguage(userInfo?.language || 'en');
    dayjs.locale(userInfo?.language === 'zh-hans' ? 'zh-cn' : (userInfo?.language || 'en'));
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [userInfo?.language]);

  useEffect(() => {
    window.Intercom("update");
    if (!pathname.includes('setting') && (!Boolean(userInfo?.subscriptions?.[0]) || userInfo?.subscriptions?.[0]?.payment_status?.id === 7)
      && !isAdmin && userInfo?.onboarding_finished && !checkOauth) {
      setVisible(true)
    } else {
      setVisible(false)
    }
    if (deadline && !pathname.includes('setting') && dayjs(deadline).diff(dayjs.utc(dayjs()), 'hours') < 1) {
      timer.current && clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        props.getSubscriptionsList('active');
      }, dayjs(deadline).diff(dayjs.utc(dayjs()), 'milliseconds'))
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  },[pathname, isPasswordCreated])

  if (startup?.success === false && !auth.isValidRefreshToken) {
    return (
      <Layout>
        <Route path="*" component={StartupPage}/>
      </Layout>
    );
  }

  Spin.setDefaultIndicator(<Spinner/>);

  return (
    <Router history={history}>
      <Layout className="main-layout">
        <Switch>
          <Route exact path="/invoice/:hash" component={InvoicePage}/>
          <Route exact path="/" component={StartupPage}/>
          <Route exact path={["/login", "/login/:hash"]} component={LoginPage}/>
          <Route exact path={["/sign-up", "/sign-up/:hash"]} component={SignUpPage}/>
          <Route path="/add-email" component={SignUpPage}/>

          <PrivateRoute
            exact
            path="/onboarding/checkout/success"
            redirectPath="/login"
            auth={!!auth?.accessToken && userInfo?.['onboarding_finished'] && !isAdmin}
            component={CheckoutSuccessPage}
          />

          <Route
            path={[
              '/check-mailbox',
              '/sign-up/confirm/:hash',
              '/sign-up/confirm-email/:hash',
              '/restore-password',
              '/verify-code',
              '/restore-password/:hash',
              // '/success/:hash',
              // '/success',
              '/expired',
              '/already-registered',
              '/onboarding/plan',
              '/onboarding/checkout/:mode/:intentId',
              '/onboarding/checkout/:mode',
            ]}
            component={ExternalPages}
          />

          <Suspense fallback={null}>
            <Route
              path={[
                '/portfolio',
                '/dashboard/product-list',
                '/portfolio/product-list',
                '/collections/product-list',
                '/portfolio/product/:product_id',
                '/dashboard/product/:product_id',
                '/collections/product/:product_id',
                "/collections",
                '/portfolio/product-list/:id',
                '/dashboard/product-list/:id',
                '/collections/product-list/:id',
                '/dashboard',
                "/competitor-research",
                "/product-database",
                "/sales-tracker/stores/store/:id/:report",
                "/sales-tracker/stores/store/:id",
                "/sales-tracker/products/product/:id",
                "/sales-tracker/:view",
                "/sales-tracker/top/stores",
                "/sales-tracker/top/products",
                "/dropship-university",
                "/dropship-university/:course",
                "/dropship-university/:course/:chapter",
                "/dropship-university/:course/:chapter/:video",
                "/suppliers",
                "/setting",
                "/setting/:hash",
                "/admin/portfolio/product/:product_id",
                "/admin/portfolio",
                "/admin/portfolio/product-list",
                "/admin/alidrops",
                "/admin/database",
                "/admin/droptimes",
                "/admin/bd",
                "/admin/shopify",
                "/admin/store-manager",
                "/admin/store-manager/store/:id/:report",
                "/admin/store-manager/store/:id",
                "/admin/store-table",
                "/connect-shopify/verify",
              ]}
              component={InternalPages}
            />
          </Suspense>
          <Route path="/*" component={NotFoundPage}/>
        </Switch>
        <Collections auth={!!auth?.accessToken && userInfo?.onboarding_finished && !isAdmin}/>

        <TrialFinished visible={visible}
                       isMobile={isMobile}
                       theme={theme}
                       callBack={() => {
                         setVisible(false);
                         history.push('/setting/plan')
                       }}
        />
        {
          visibleGettingStarted ?
            <GettingStartedButton />
            :
            null
        }
      </Layout>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  theme: state.nav.theme,
  userInfo: state.auth.userInfo,
  isPasswordCreated: state.auth.isPasswordCreated,
  startup: state.startup,
  isDesktop: state.nav.isDesktop,
  isMobile: state.nav.isMobile,
  isAdmin: state.auth.isAdmin,
  error: state.errors.data,
  checkOauth: state.shopifyStore.checkOauth
});

const mapDispatchToProps = (dispatch) => ({
  navSetProp: (key, value) => dispatch(NavActions.navSetProp(key, value)),
  errorReset: () => dispatch(ErrorsActions.errorReset()),
  refreshToken: (token) => dispatch(AuthActions.refreshTokenRequest({ token })),
  refreshTokenFailure: (data) => dispatch(AuthActions.refreshTokenFailure(data)),
  logout: () => dispatch(AuthActions.logout()),
  verifyToken: (token, isExtension) => dispatch(AuthActions.verifyTokenRequest({ token, isExtension})),
  getSubscriptionsList: (filter) =>
    dispatch(SettingCreators.getSubscriptionsListRequest(filter)),
  dispatch,
});

Routes.propTypes = {
  auth: PropTypes.shape({
    accessToken: PropTypes.string,
    refreshToken: PropTypes.string,
    isValidRefreshToken: PropTypes.bool,
  }),
  userInfo: PropTypes.shape({
    onboarding_finished: PropTypes.bool,
    language: PropTypes.string,
  }),
  startup: PropTypes.shape({
    success: PropTypes.bool,
  }),
  isDesktop: PropTypes.bool,
  isMobile: PropTypes.bool,
  isAdmin: PropTypes.bool,
  error: PropTypes.any,
  dispatch: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(compose(withResizeDetector, withAuth)(Routes));
