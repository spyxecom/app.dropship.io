import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getLanguagesListRequest: null,
  getLanguagesListSuccess: ['payload'], // payload: { data }
  getLanguagesListFailure: ['payload'], // payload: { errors }

  settingsSaveResultReset: null,
  settingsErrorsReset: null,

  getNotificationsListRequest: null,
  getNotificationsListSuccess: ['payload'], // payload: { data }
  getNotificationsListFailure: ['payload'], // payload: { errors }

  changeNotificationsListRequest: ['payload'], // payload: { data },
  changeNotificationsListSuccess: ['payload'], // payload: { data }
  changeNotificationsListFailure: ['payload'], // payload: { errors }

  getSubscriptionsListRequest: ['payload'], // payload: { filter },
  getSubscriptionsListSuccess: ['payload'], // payload: { data }
  getSubscriptionsListFailure: ['payload'], // payload: { errors }

  saveDeleteSubscribe: ['payload'], // payload: { data },

  addCompanyDetailsRequest: ['payload'], // payload: { data },
  addCompanyDetailsSuccess: ['payload'], // payload: { data },
  addCompanyDetailsFailure: ['payload'], // payload: { errors },

  changeCompanyDetailsRequest: ['payload'], // payload: { data },
  changeCompanyDetailsSuccess: ['payload'], // payload: { data },
  changeCompanyDetailsFailure: ['payload'], // payload: { errors },

  changeBillingAddressRequest: ['payload'], // payload: { data },
  changeBillingAddressSuccess: ['payload'], // payload: { data },
  changeBillingAddressFailure: ['payload'], // payload: { errors },

  getPaymentsRequest: null,
  getPaymentsSuccess: ['payload'], // payload: { data },
  getPaymentsFailure: ['payload'], // payload: { errors },

  changePaymentsRequest: ['payload'], // payload: { data },
  changePaymentsSuccess: ['payload'], // payload: { data },
  changePaymentsFailure: ['payload'], // payload: { errors },

  getPaymentsNextRequest: ['payload'], // payload: { link }
  getPaymentsNextSuccess: ['payload'], // payload: { data }
  getPaymentsNextFailure: ['payload'], // payload: { errors }

  getPaymentDetailsRequest: ['payload'], // payload: { id }
  getPaymentDetailsSuccess: ['payload'], // payload: { data }
  getPaymentDetailsFailure: ['payload'], // payload: { errors }

  getUserCountryRequest: null,
  getUserCountrySuccess: ['payload'],
  getUserCountryFailure: ['payload'], // payload: { errors }

  setLastLanguagePlanPage: ['payload'],
});

export const SettingTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  languages: [],
  notifications: {},
  billing: {},
  subscriptions: [],
  payments: [],
  paymentDetailsResult: null,
  paymentDetailsFetching: false,
  subscribe: null,
  userCountry: null,

  saveResult: false,
  saveFetching: false,

  fetching: false,
  errors: false,

  lastLanguage: ''
});

/* ------------- Functions for reducer cases ------------- */

// GET LANGUAGES LIST

const getLanguagesListRequest = (state) => state.merge({ fetching: true });

const getLanguagesListSuccess = (state, { payload: data }) =>
  state.merge({ fetching: false, languages: data });

const getLanguagesListFailure = (state, { payload: { errors } }) =>
  state.merge({ fetching: false, errors });

// RESET RESULT AND ERRORS
export const settingsSaveResultReset = (state) => {
  return state.merge({
    fetching: false,
    saveFetching: false,
    saveResult: null,
  });
};
export const settingsErrorsReset = (state) => {
  return state.merge({ fetching: false, saveFetching: false, errors: false });
};

// GET NOTIFICATIONS

export const getNotificationsListRequest = (state) =>
  state.merge({ fetching: true });

export const getNotificationsListSuccess = (state, { payload: data }) =>
  state.merge({ fetching: false, saveFetching: false, notifications: data });

export const getNotificationsListFailure = (state, { payload: { errors } }) =>
  state.merge({ fetching: false, saveFetching: false, errors });

// CHANGE NOTIFICATIONS LIST

export const changeNotificationsListRequest = (state) =>
  state.merge({ saveFetching: true });

export const changeNotificationsListSuccess = (state, { payload: data }) => {
  return state.merge({
    notifications: data,
    saveFetching: false,
    saveResult: true,
  });
};

export const changeNotificationsListFailure = (
  state,
  { payload: { errors } },
) => state.merge({ saveFetching: false, errors });

// GET USER SUBSCRIPTIONS
export const getSubscriptionsListRequest = (state) =>
  state.merge({ fetching: true });

export const getSubscriptionsListSuccess = (state, { payload: data }) => {
  return state.merge({
    subscriptions: data?.subscriptions || [],
    fetching: false,
    saveResult: true,
  });
};

export const getSubscriptionsListFailure = (state, { payload: { errors } }) =>
  state.merge({ fetching: false, errors });

// SAVE/DELETE SUBSCRIPTION TO STATE

export const saveDeleteSubscribe = (state, { payload }) => {
  return state.merge({
    subscribe: payload,
  });
};

// ADD COMPANY DETAILS
export const addCompanyDetailsRequest = (state) =>
  state.merge({ saveFetching: true });

export const addCompanyDetailsSuccess = (state, { payload }) => {
  return state.merge({
    saveFetching: false,
    saveResult: { add_company_details: true },
  });
};

export const addCompanyDetailsFailure = (state, { payload: { errors } }) =>
  state.merge({ saveFetching: false, errors: { add_company_details: errors } });

// CHANGE COMPANY DETAILS
export const changeCompanyDetailsRequest = (state) =>
  state.merge({ saveFetching: true });

export const changeCompanyDetailsSuccess = (state, { payload }) => {
  return state.merge({
    saveFetching: false,
    saveResult: { change_company_details: true },
  });
};

export const changeCompanyDetailsFailure = (state, { payload: { errors } }) =>
  state.merge({
    saveFetching: false,
    errors: { change_company_details: errors },
  });

// CHANGE BILLING ADDRESS
export const changeBillingAddressRequest = (state) =>
  state.merge({ saveFetching: true });

export const changeBillingAddressSuccess = (state, { payload }) => {
  return state.merge({
    saveFetching: false,
    saveResult: { change_billing_address: true },
  });
};

export const changeBillingAddressFailure = (state, { payload: { errors } }) =>
  state.merge({
    saveFetching: false,
    errors: { change_billing_address: errors },
  });

// GET PAYMENT LIST
export const getPaymentsRequest = (state) => state.merge({ fetching: true });

export const getPaymentsSuccess = (state, { payload: data }) =>
  state.merge({ fetching: false, payments: data });

export const getPaymentsFailure = (state, { payload: { errors } }) =>
  state.merge({ fetching: false, errors });

// CHANGE PAYMENT
export const changePaymentsRequest = (state) =>
  state.merge({ saveFetching: true });

export const changePaymentsSuccess = (state, { payload }) => {
  return state.merge({
    saveFetching: false,
    saveResult: { change_payments: true },
  });
};

export const changePaymentsFailure = (state, { payload: { errors } }) =>
  state.merge({
    saveFetching: false,
    errors: { change_payments: errors },
  });

// GET NEXT PAYMENT LIST
const getPaymentsNextRequest = (state) => state.merge({ saveFetching: true });

const getPaymentsNextFailure = (state, { payload: { errors } }) =>
  state.merge({ saveFetching: false, errors });

const getPaymentsNextSuccess = (state, { payload: data }) => {
  const allData = state.payments.results.concat(data.results);
  return state
    .merge({
      saveFetching: false,
      payments: { ...data, results: allData },
    })
    .setIn(['payments', 'results'], allData);
};

// GET PAYMENT DETAILS
export const getPaymentDetailsRequest = (state) => state.merge({
  paymentDetailsFetching: true,
  paymentDetailsResult: null,
});

export const getPaymentDetailsSuccess = (state, { payload: data }) =>
  state.merge({ paymentDetailsFetching: false, paymentDetailsResult: data });

export const getPaymentDetailsFailure = (state, { payload: { errors } }) =>
  state.merge({ paymentDetailsFetching: false, errors });

export const getUserCountryRequest = (state) =>
  state.merge({ fetching: true });
export const getUserCountrySuccess = (state, { payload }) =>
  state.merge({ fetching: false, userCountry: {...payload} });
export const getUserCountryFailure = (state, { payload: { errors } }) =>
  state.merge({ fetching: false, errors });

const setLastLanguagePlanPage = (state, { payload: data }) =>
  state.merge({ lastLanguage: data })

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LANGUAGES_LIST_REQUEST]: getLanguagesListRequest,
  [Types.GET_LANGUAGES_LIST_SUCCESS]: getLanguagesListSuccess,
  [Types.GET_LANGUAGES_LIST_FAILURE]: getLanguagesListFailure,

  [Types.SETTINGS_SAVE_RESULT_RESET]: settingsSaveResultReset,
  [Types.SETTINGS_ERRORS_RESET]: settingsErrorsReset,

  [Types.GET_NOTIFICATIONS_LIST_REQUEST]: getNotificationsListRequest,
  [Types.GET_NOTIFICATIONS_LIST_SUCCESS]: getNotificationsListSuccess,
  [Types.GET_NOTIFICATIONS_LIST_FAILURE]: getNotificationsListFailure,

  [Types.CHANGE_NOTIFICATIONS_LIST_REQUEST]: changeNotificationsListRequest,
  [Types.CHANGE_NOTIFICATIONS_LIST_SUCCESS]: changeNotificationsListSuccess,
  [Types.CHANGE_NOTIFICATIONS_LIST_FAILURE]: changeNotificationsListFailure,

  [Types.GET_SUBSCRIPTIONS_LIST_REQUEST]: getSubscriptionsListRequest,
  [Types.GET_SUBSCRIPTIONS_LIST_SUCCESS]: getSubscriptionsListSuccess,
  [Types.GET_SUBSCRIPTIONS_LIST_FAILURE]: getSubscriptionsListFailure,

  [Types.SAVE_DELETE_SUBSCRIBE]: saveDeleteSubscribe,

  [Types.ADD_COMPANY_DETAILS_REQUEST]: addCompanyDetailsRequest,
  [Types.ADD_COMPANY_DETAILS_SUCCESS]: addCompanyDetailsSuccess,
  [Types.ADD_COMPANY_DETAILS_FAILURE]: addCompanyDetailsFailure,

  [Types.CHANGE_COMPANY_DETAILS_REQUEST]: changeCompanyDetailsRequest,
  [Types.CHANGE_COMPANY_DETAILS_SUCCESS]: changeCompanyDetailsSuccess,
  [Types.CHANGE_COMPANY_DETAILS_FAILURE]: changeCompanyDetailsFailure,

  [Types.CHANGE_BILLING_ADDRESS_REQUEST]: changeBillingAddressRequest,
  [Types.CHANGE_BILLING_ADDRESS_SUCCESS]: changeBillingAddressSuccess,
  [Types.CHANGE_BILLING_ADDRESS_FAILURE]: changeBillingAddressFailure,

  [Types.GET_PAYMENTS_REQUEST]: getPaymentsRequest,
  [Types.GET_PAYMENTS_SUCCESS]: getPaymentsSuccess,
  [Types.GET_PAYMENTS_FAILURE]: getPaymentsFailure,

  [Types.CHANGE_PAYMENTS_REQUEST]: changePaymentsRequest,
  [Types.CHANGE_PAYMENTS_SUCCESS]: changePaymentsSuccess,
  [Types.CHANGE_PAYMENTS_FAILURE]: changePaymentsFailure,

  [Types.GET_PAYMENTS_NEXT_REQUEST]: getPaymentsNextRequest,
  [Types.GET_PAYMENTS_NEXT_SUCCESS]: getPaymentsNextSuccess,
  [Types.GET_PAYMENTS_NEXT_FAILURE]: getPaymentsNextFailure,

  [Types.GET_PAYMENT_DETAILS_REQUEST]: getPaymentDetailsRequest,
  [Types.GET_PAYMENT_DETAILS_SUCCESS]: getPaymentDetailsSuccess,
  [Types.GET_PAYMENT_DETAILS_FAILURE]: getPaymentDetailsFailure,

  [Types.GET_USER_COUNTRY_REQUEST]: getUserCountryRequest,
  [Types.GET_USER_COUNTRY_SUCCESS]: getUserCountrySuccess,
  [Types.GET_USER_COUNTRY_FAILURE]: getUserCountryFailure,

  [Types.SET_LAST_LANGUAGE_PLAN_PAGE]: setLastLanguagePlanPage,
});
