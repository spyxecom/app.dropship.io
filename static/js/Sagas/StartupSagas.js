import { put, select } from 'redux-saga/effects';
import { push, replace } from 'connected-react-router';
import StartupActions from '../Redux/StartupRedux';
import { AuthSelectors } from '../Containers/LoginPage/reducer';
import AuthApi from '../Services/AuthApi';

import utils from '../Utils/utils';

const registrationPages = [
  'sign-up',
  'add-email',
  'restore-password',
  'check-mailbox',
  'expired',
  'already-registered',
  'verify-code',
  'success',
];
const innerPages = [
  'onboarding',
  'portfolio',
  'setting',
  /*'upcoming-drops',*/
  'dashboard',
  'collections',
  'success',
  'admin',
  'competitor-research',
  'connect-shopify',
  'product-database',
  'sales-tracker',
  'dropship-university',
  'suppliers'
];

// process STARTUP actions
export function* startup() {
  const userInfo = yield select(AuthSelectors.getUserInfo);
  const accessToken = yield select(AuthSelectors.getAccessToken);
  const refreshToken = yield select(AuthSelectors.getRefreshToken);
  const { pathname, search } = document.location;

  if(accessToken) AuthApi.updateAccessToken(accessToken, refreshToken);
  if (accessToken && userInfo) {
    if (utils.includeCurrentLocation(pathname, 'sign-up') && pathname !== '/sign-up') {
      yield put(push(pathname));
    } else if (
      pathname !== '/' &&
      innerPages.some((el) => utils.includeCurrentLocation(pathname, el))
    ) {
      yield put(push(search ? pathname + search : pathname));
    } else if (pathname.slice(0, 8) === '/invoice') {
      yield put(push(pathname));
    } else if (
      userInfo.onboarding_finished &&
      userInfo?.role?.name !== 'Admin'
    ) {
      // yield put(push('/portfolio'));
      yield put(push('/dashboard'));
    } else if (userInfo?.role?.name === 'Admin') {
      yield put(push('/admin/portfolio'));
    } else if (userInfo.email_added) {
      yield put(push('/onboarding/plan'));
    } else {
      yield put(push('/add-email'));
    }
  } else if (
    registrationPages.some((el) => utils.includeCurrentLocation(pathname, el))
  ) {
    if(pathname === '/sign-up'){
      yield put(push(`/sign-up${search || ''}`));
    }else{
      yield put(push(pathname));
    }
  } else if (pathname.slice(0, 8) === '/invoice') {
    yield put(push(pathname));
  } else {
    if(!['/', '/login'].includes(pathname) && innerPages.some((el) => utils.includeCurrentLocation(pathname, el))) {
      if(pathname.includes('/sales-tracker/stores/store/')){
        yield put(replace('/login',{ reference: '/sales-tracker/stores' }));
      }else if(pathname.includes('/sales-tracker/products/product/')){
        yield put(replace('/login',{ reference: '/sales-tracker/products' }));
      }else{
        yield put(replace('/login', { reference: search ? pathname + search : pathname }));
      }
    }else{
      yield put(push(pathname === '/' ? '/login' : pathname));
      // yield put(push('/login'));
    }
  }

  yield put(StartupActions.startupSuccess());
}
