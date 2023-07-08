/* eslint-disable import/no-named-as-default-member */
/* Setting sagas */

import { takeLatest, put, call, select } from 'redux-saga/effects';
import AuthActions, { AuthSelectors } from '../LoginPage/reducer';

import * as services from './services';
import Creators, { SettingTypes as constants } from './reducer';
import { sendExtensionMessage } from '../../Utils/extension';

const actions = {
  getLanguagesListActions: {
    request: Creators.getLanguagesListRequest,
    success: Creators.getLanguagesListSuccess,
    errors: Creators.getLanguagesListFailure,
  },
  getNotificationsListActions: {
    request: Creators.getNotificationsListRequest,
    success: Creators.getNotificationsListSuccess,
    errors: Creators.getNotificationsListFailure,
  },

  changeNotificationsListActions: {
    request: Creators.changeNotificationsListRequest,
    success: Creators.changeNotificationsListSuccess,
    errors: Creators.changeNotificationsListFailure,
  },

  getSubscriptionsListActions: {
    request: Creators.getSubscriptionsListRequest,
    success: Creators.getSubscriptionsListSuccess,
    errors: Creators.getSubscriptionsListFailure,
  },
  addCompanyDetailsActions: {
    request: Creators.addCompanyDetailsRequest,
    success: Creators.addCompanyDetailsSuccess,
    errors: Creators.addCompanyDetailsFailure,
  },
  changeCompanyDetailsActions: {
    request: Creators.changeCompanyDetailsRequest,
    success: Creators.changeCompanyDetailsSuccess,
    errors: Creators.changeCompanyDetailsFailure,
  },
  changeBillingAddressActions: {
    request: Creators.changeBillingAddressRequest,
    success: Creators.changeBillingAddressSuccess,
    errors: Creators.changeBillingAddressFailure,
  },
  getPaymentsActions: {
    request: Creators.getPaymentsRequest,
    success: Creators.getPaymentsSuccess,
    errors: Creators.getPaymentsFailure,
  },
  changePaymentsActions: {
    request: Creators.changePaymentsRequest,
    success: Creators.changePaymentsSuccess,
    errors: Creators.changePaymentsFailure,
  },
  getPaymentsNextActions: {
    request: Creators.getPaymentsNextRequest,
    success: Creators.getPaymentsNextSuccess,
    errors: Creators.getPaymentsNextFailure,
  },
  getPaymentDetailsActions: {
    request: Creators.getPaymentDetailsRequest,
    success: Creators.getPaymentDetailsSuccess,
    errors: Creators.getPaymentDetailsFailure,
  },
  getUserCountryActions: {
    request: Creators.getUserCountryRequest,
    success: Creators.getUserCountrySuccess,
    errors: Creators.getUserCountryFailure,
  },
};

const eventsOptions = {
  [constants.GET_LANGUAGES_LIST_REQUEST]: {
    api: services.getLanguagesList,
    actions: actions.getLanguagesListActions,
  },
  [constants.GET_NOTIFICATIONS_LIST_REQUEST]: {
    api: services.getNotificationsList,
    actions: actions.getNotificationsListActions,
  },
  [constants.CHANGE_NOTIFICATIONS_LIST_REQUEST]: {
    api: services.changeNotificationsList,
    actions: actions.changeNotificationsListActions,
  },
  [constants.GET_SUBSCRIPTIONS_LIST_REQUEST]: {
    api: services.getSubscriptionsList,
    actions: actions.getSubscriptionsListActions,
  },
  [constants.ADD_COMPANY_DETAILS_REQUEST]: {
    api: services.addCompanyDetails,
    actions: actions.addCompanyDetailsActions,
  },
  [constants.CHANGE_COMPANY_DETAILS_REQUEST]: {
    api: services.addCompanyDetails,
    actions: actions.changeCompanyDetailsActions,
  },
  [constants.CHANGE_BILLING_ADDRESS_REQUEST]: {
    api: services.changeBillingAddress,
    actions: actions.changeBillingAddressActions,
  },
  [constants.GET_PAYMENTS_REQUEST]: {
    api: services.getPayments,
    actions: actions.getPaymentsActions,
  },
  [constants.CHANGE_PAYMENTS_REQUEST]: {
    api: services.changePayments,
    actions: actions.changePaymentsActions,
  },
  [constants.GET_PAYMENTS_NEXT_REQUEST]: {
    api: services.getPaymentsNext,
    actions: actions.getPaymentsNextActions,
  },
  [constants.GET_PAYMENT_DETAILS_REQUEST]: {
    api: services.getPaymentDetails,
    actions: actions.getPaymentDetailsActions,
  },
  [constants.GET_USER_COUNTRY_REQUEST]: {
    api: services.getUserCountry,
    actions: actions.getUserCountryActions,
  },
};

// const events = Object.keys(eventsOptions);

function* apiGenerator(action) {
  const provider = eventsOptions[action.type];

  try {
    const params = action.payload;
    const response = yield call(provider.api, params);
    const userInfo = yield select(AuthSelectors.getUserInfo);

    if (response.data) {
      response.ok
        ? yield put(provider.actions.success(response.data))
        : yield put(provider.actions.errors({ errors: response.data }));

      if(action.type === constants.GET_SUBSCRIPTIONS_LIST_REQUEST){
        let newSubscriptions = response?.data?.subscriptions ? [...response.data.subscriptions] : []
        yield put(
          AuthActions.updateProfile({
            subscriptions: newSubscriptions,
          }),
        );
        sendExtensionMessage({
          action: 'updateProfile',
          data: { subscriptions: newSubscriptions }
        })
      }

      if (response?.data?.id) {
        if(action.type === constants.GET_USER_COUNTRY_REQUEST){
          yield put(AuthActions.updateProfile({ userCountry: response.data }));
        }else{
          yield put(AuthActions.updateProfile(response.data));
          sendExtensionMessage({
            action: 'updateProfile',
            data: { ...response.data }
          })
        }
      }
      if (response?.data?.subscription) {
        yield put(
          AuthActions.updateProfile({
            subscriptions: [
             /* ...userInfo?.subscriptions,*/
              { ...response?.data?.subscription },
            ],
          }),
        );

        sendExtensionMessage({
          action: 'updateProfile',
          data: { subscriptions: [{ ...response?.data?.subscription }] }
        })
      } else if(response?.data?.payment_source){
        const {
          brand,
          expiry_month,
          expiry_year,
          first_name,
          last_name,
          last4
        } = response?.data?.payment_source?.card
        yield put(
          AuthActions.updateProfile({
              ...userInfo,
              card: {
                ...userInfo.card,
                card_holder_first_name: first_name,
                card_holder_last_name: last_name,
                card_type: brand,
                expire_month: expiry_month,
                expire_year: `${expiry_year}`,
                last_4: last4,
              },
          }),
        );
      }
    } else {
      yield put(provider.actions.errors({ errors: 'some error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_LANGUAGES_LIST_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_NOTIFICATIONS_LIST_REQUEST, apiGenerator);
  yield takeLatest(constants.CHANGE_NOTIFICATIONS_LIST_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_SUBSCRIPTIONS_LIST_REQUEST, apiGenerator);
  yield takeLatest(constants.ADD_COMPANY_DETAILS_REQUEST, apiGenerator);
  yield takeLatest(constants.CHANGE_COMPANY_DETAILS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_PAYMENTS_REQUEST, apiGenerator);
  yield takeLatest(constants.CHANGE_PAYMENTS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_PAYMENTS_NEXT_REQUEST, apiGenerator);
  yield takeLatest(constants.CHANGE_BILLING_ADDRESS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_PAYMENT_DETAILS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_USER_COUNTRY_REQUEST, apiGenerator);
}
