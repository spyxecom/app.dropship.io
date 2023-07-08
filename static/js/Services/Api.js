import apisauce, { CancelToken } from 'apisauce';
import fernet  from 'fernet';

const secret = new fernet.Secret(process.env.REACT_APP_FERNET_SECRET_KEY)
const token = new fernet.Token({secret})

export const encryptedData = (data) => {
  let encrypted = token.encode(JSON.stringify(data))
  return ({encrypted})
}

export const encryptedDataOTP = (data) => {
  let data_t = {email: data?.email, password: data?.password}
  let encrypted = token.encode(JSON.stringify(data?.otp_pass ?  data : data_t))
  return ({encrypted})
}

export class API {
  constructor() {
    this.baseURL = process.env.REACT_APP_BASE_API_ROUTE;

    if (!API.instance) {
      this.create();
      this.createInterceptor();

      API.instance = this;
    }

    return API.instance;
  }

  create() {
    this.api = apisauce.create({
      // base URL is read from the 'constructor'
      baseURL: this.baseURL,
      // here are some default headers
      headers: {
        'Content-Type': 'application/json',
      },
      cancelToken: new CancelToken((cancel) => {
        this.source = cancel;
      }),
      // 60 second timeout...
      timeout: 60000,
    });
  }

  cancelAllRequest() {
    API.instance.source();
  }

  createInterceptor() {
    this.interceptors = this.api.axiosInstance.interceptors;
  }
}

const create = (baseURL = process.env.REACT_APP_BASE_API_ROUTE) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const accessData = { accessToken: null };

  const api = apisauce.create({
    // base URL is read from the 'constructor'
    baseURL,
    // here are some default headers
    headers: {
      'Content-Type': 'application/json',
    },
    // 60 second timeout...
    timeout: 60000,
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than 'get', 'post' and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const updateAccessToken = (accessToken, refreshToken) => {
    accessData.accessToken = accessToken;
    accessData.refreshToken = refreshToken;

    if (accessToken) {
      api.setHeader('Authorization', `JWT ${accessToken}`);
    } else {
      api.setHeader('Authorization', null);
    }
  };

  const getCategories = () => api.get(`/onboarding/category/`);

  const getCategory = (id) => api.get(`/onboarding/category/${id}/`);

  const getPlans = () => api.get(`/onboarding/plan/`);

  const getPlan = (id) => api.get(`/onboarding/plan/${id}/`);

  const getCountries = () => api.get(`/user/country-list/`);

  const checkDiscountCode = (code) => api.get(`/discount/check`, { code });

  const saveSubscription = (data) => api.post(`/subscription/`, data);

  const updateSubscription = (data) => api.post(`/subscription/update/`, data);

  const deleteSubscription = (subscriptionId) =>
    api.delete(`/subscription/${subscriptionId}/`);

  const undoDeleteSubscription = ({deletedSubscriptionId, oldSchedule }) =>
    api.post(`/subscription/${deletedSubscriptionId}/`, {old_schedule: oldSchedule});

  const cancelSub = (subscriptionId) =>
    api.delete(`/subscription/manage/${subscriptionId}/`);

  const cancelTrial = (data) =>
    api.post(`/subscription/trial-management/force_activate/`, data);

  const undoCancelSub = (subscriptionId) =>
    api.post(`/subscription/manage/${subscriptionId}/`);

  const undoPauseSub = (subscriptionId) =>
    api.post(`/subscription/pause/${subscriptionId}/`);

  const getQuestionsData = () => api.get('user/question-form/');

  const createIntent = (data) => api.post('/payments/create_intent/', data)

  const saveFrontLogs = (data) => api.post('/frontend_logs/', data)

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    api,
    // a list of the API functions from step 2
    updateAccessToken,

    getCategories,
    getCategory,

    getPlans,
    getPlan,

    getCountries,
    checkDiscountCode,
    saveSubscription,
    updateSubscription,
    deleteSubscription,
    undoDeleteSubscription,
    getQuestionsData,
    createIntent,
    cancelSub,
    cancelTrial,
    undoCancelSub,
    undoPauseSub,
    saveFrontLogs,
  };
};

// let's return back our create method as the default.
export default create();
