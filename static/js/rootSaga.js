import { takeLatest, all, call } from 'redux-saga/effects';
import AuthAPI from './Services/AuthApi';
import API from './Services/Api';

// sagas
import PortfolioSagas from './Containers/PortfolioPage/saga';
import ProductsSagas from './Containers/ProductsPage/saga';
import UserSagas from './Containers/User/saga';
import SettingSagas from './Containers/SettingPage/saga';
import CollectionsModal from './Containers/CollectionsPage/saga';
import DashboardSagas from './Containers/DashboardPage/saga';
import ProductDetailsSagas from './Containers/ProductDetailsPage/saga';
import BenefitsDrawbacksSagas from './Containers/BDPageAdmin/saga';
import DropTimesSagas from './Containers/DropTimesPageAdmin/saga';
import ShopifySearchSagas from './Containers/ShopifySearch/saga';
import PortfolioAdminSagas from './Containers/PortfolioPageAdmin/saga';
import ProductDetailsAdminSagas from './Containers/ProductDetailsPageAdmin/saga';
import ShopifyStoreSagas from './Containers/ShopifyStore/saga';
import ProductDatabaseSagas from './Containers/ProductDatabasePage/saga';
import SalesTrackerSagas from './Containers/SalesTrackerPage/saga';
import UniversityPageSagas from './Containers/UniversityPage/saga';
import ChargebeeSagas from './Components/PlanCardUpcomingNew/saga';
import SuppliersPageSagas from './Containers/SuppliersPage/saga';
import AdminStoreManager from './Containers/AdminStoreManager/saga';
import AdminStoreTable from './Containers/AdminStoreTable/saga';

/* ------------- Types ------------- */
import { StartupTypes } from './Redux/StartupRedux';
import { AuthTypes } from './Containers/LoginPage/reducer';
import { CategoryTypes } from './Redux/CategoryRedux';
import { PlanTypes } from './Redux/PlanRedux';
import { OnboardingTypes } from './Redux/OnboardingRedux';

/* ------------- Sagas ------------- */

import { startup } from './Sagas/StartupSagas';

import {
  signIn,
  createUserPassword,
  socialAuth,
  checkEmail,
  changeEmail,
  confirmEmail,
  confirmEmailInit,
  checkPassword,
  confirmPassword,
  logout,
  socialAuthDelete,
  socialAuthConnect,
  apiAuthSaga,
} from './Containers/LoginPage/saga';

import { getCategories } from './Sagas/CategorySagas';

import { getPlans } from './Sagas/PlanSagas';

import {
  getCountries,
  checkDiscountCode,
  saveSubscription,
  updateSubscription,
  deleteSubscription,
  undoDeleteSubscription,
  getQuestionsData,
  createIntent, undoCancelSub, cancelSub, cancelTrial, undoPauseSub
} from './Sagas/OnboardingSaga';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const authApi = AuthAPI;
const api = API;

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn, authApi),
    takeLatest(AuthTypes.SIGN_UP_REQUEST, createUserPassword, authApi),
    takeLatest(AuthTypes.SOCIAL_AUTH_REQUEST, socialAuth, authApi),
    takeLatest(AuthTypes.CHECK_EMAIL_REQUEST, checkEmail, authApi),
    takeLatest(AuthTypes.CHANGE_EMAIL_REQUEST, changeEmail, authApi),
    takeLatest(AuthTypes.CONFIRM_EMAIL_REQUEST, confirmEmail, authApi),
    takeLatest(AuthTypes.CONFIRM_EMAIL_INIT_REQUEST, confirmEmailInit, authApi),
    takeLatest(AuthTypes.CHECK_PASSWORD_REQUEST, checkPassword, authApi),
    takeLatest(AuthTypes.CONFIRM_PASSWORD_REQUEST, confirmPassword, authApi),
    takeLatest(AuthTypes.LOGOUT, logout, authApi),
    takeLatest(AuthTypes.SOCIAL_AUTH_DELETE_REQUEST, socialAuthDelete, authApi),
    takeLatest(
      AuthTypes.SOCIAL_AUTH_CONNECT_REQUEST,
      socialAuthConnect,
      authApi,
    ),

    takeLatest(CategoryTypes.CATEGORIES_REQUEST, getCategories, api, authApi),

    takeLatest(PlanTypes.PLANS_REQUEST, getPlans, api, authApi),

    takeLatest(OnboardingTypes.COUNTRIES_REQUEST, getCountries, api, authApi),
    takeLatest(
      OnboardingTypes.CHECK_DISCOUNT_CODE_REQUEST,
      checkDiscountCode,
      api,
      authApi,
    ),
    takeLatest(
      OnboardingTypes.SAVE_SUBSCRIPTION_REQUEST,
      saveSubscription,
      api,
      authApi,
    ),
    takeLatest(
      OnboardingTypes.UPDATE_SUBSCRIPTION_REQUEST,
      updateSubscription,
      api,
      authApi,
    ),
    takeLatest(
      OnboardingTypes.CANCEL_SUB_REQUEST,
      cancelSub,
      api,
      authApi,
    ),
    takeLatest(
      OnboardingTypes.CANCEL_TRIAL_REQUEST,
      cancelTrial,
      api,
      authApi,
    ),
    takeLatest(
      OnboardingTypes.UNDO_CANCEL_SUB_REQUEST,
      undoCancelSub,
      api,
      authApi,
    ),
    takeLatest(
      OnboardingTypes.UNDO_PAUSE_SUB_REQUEST,
      undoPauseSub,
      api,
      authApi,
    ),
    takeLatest(
      OnboardingTypes.DELETE_SUBSCRIPTION_REQUEST,
      deleteSubscription,
      api,
      authApi,
    ),
    takeLatest(
      OnboardingTypes.UNDO_DELETE_SUBSCRIPTION_REQUEST,
      undoDeleteSubscription,
      api,
      authApi,
    ),
    takeLatest(
      OnboardingTypes.QUESTIONS_DATA_REQUEST,
      getQuestionsData,
      api,
      authApi,
    ),
    takeLatest(
      OnboardingTypes.CREATE_INTENT_REQUEST,
      createIntent,
      api,
      authApi,
    ),
    call(apiAuthSaga),
    call(CollectionsModal),
    call(PortfolioSagas),
    call(ProductsSagas),
    call(UserSagas),
    call(SettingSagas),
    call(DashboardSagas),
    call(ProductDetailsSagas),
    call(BenefitsDrawbacksSagas),
    call(DropTimesSagas),
    call(ShopifySearchSagas),
    call(PortfolioAdminSagas),
    call(ProductDetailsAdminSagas),
    call(ShopifyStoreSagas),
    call(ProductDatabaseSagas),
    call(SalesTrackerSagas),
    call(UniversityPageSagas),
    call(SuppliersPageSagas),
    call(ChargebeeSagas),
    call(AdminStoreManager),
    call(AdminStoreTable),
  ]);
}
