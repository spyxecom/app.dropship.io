import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// REDUCER FUNCTIONS
import {
  verifyTokenFailure,
  verifyTokenSuccess,
  verifyTokenRequest,
  refreshTokenRequest,
  refreshTokenSuccess,
  refreshTokenFailure,
} from './reducerFunc';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signInRequest: ['email', 'password', 'otp_pass'],
  signInSuccess: ['userInfo', 'accessToken', 'refreshToken'],
  signInFailure: ['error'],

  checkEmailInitSuccess: ['code_valid'],

  refreshTokenRequest: ['payload'], // payload: { token }
  refreshTokenSuccess: ['payload'], // payload: { data }
  refreshTokenFailure: ['payload'], // payload: { errors }

  verifyTokenRequest: ['payload'], // payload: { token, isExtension }
  verifyTokenSuccess: ['payload'], // payload: { data }
  verifyTokenFailure: ['payload'], // payload: { errors }

  authErrorReset: null,

  updateTokens: ['accessToken', 'refreshToken'],

  checkEmailRequest: ['data', 'isSignUp'],
  changeEmailRequest: ['data'],
  confirmEmailRequest: ['hash', 'redirect'],
  confirmEmailInitRequest: ['hash', 'redirect'],

  checkPasswordRequest: ['email'],
  confirmPasswordRequest: ['code'],

  logout: null,
  clearState: null,

  updateProfile: ['data'],

  signUpRequest: ['password', 'isNewUserCheck'],
  signUpSuccess: null,
  signUpFailure: ['error'],

  socialAuthRequest: ['accessToken', 'socialType', 'user'],
  socialAuthSuccess: ['userInfo', 'accessToken', 'refreshToken'],
  socialAuthFailure: ['error'],

  socialAuthConnectRequest: ['accessToken', 'socialType', 'user'],
  socialAuthConnectReset: null,

  socialAccountSave: ['name'],

  socialAuthDeleteRequest: ['socialType'],
  socialAuthDeleteSuccess: ['userInfo'],
  socialAuthDeleteFailure: ['error'],

  socialAuthReset: null,

  setRemember: ['data'],

  setEmailSent: ['data'],

  authFetchingReset: null,

  setIsPasswordCreated: ['payload'],
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userInfo: null,
  codeValid: false,
  isPasswordCreated: false,
  accessToken: null,
  refreshToken: null,
  isValidRefreshToken: false,
  error: null,
  fetching: false,

  updateFetching: false,
  updateErrors: false,

  socialAccount: '',

  socialAuthConnectResult: null,
  socialAuthDeleteResult: null,

  isAdmin: false,
  role: null,

  emailSent: false,

  rememberMe: null,
});

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getUserInfo: (state) => state.auth.userInfo,
  getAccessToken: (state) => state.auth.accessToken,
  getRefreshToken: (state) => state.auth.refreshToken,
};

/* ------------- Reducers ------------- */

export const setIsPasswordCreated = (state, { payload: data }) =>
  state.merge({ isPasswordCreated: data });

export const signInRequest = (state, { email, password, otp_pass }) => {
  const prevErrors = state?.error
  return state.merge({fetching: true, error: {...prevErrors}});
}

export const signInSuccess = (
  state,
  { userInfo, accessToken, refreshToken },
) => {
  const isAdmin = userInfo?.role?.id === 2;
  const role = userInfo?.role?.id;
  return state.merge({
    fetching: false,
    error: null,
    userInfo,
    accessToken,
    refreshToken,
    isAdmin,
    role,
  });
};

export const checkEmailInitSuccess = (state, {code_valid}) =>
  state.merge({fetching: false, error: null, codeValid: code_valid})

export const signInFailure = (state, { error }) => {
  const prevErrors = state?.error
  return state.merge({error: {...prevErrors, ...error}, fetching: false});
}

export const authErrorReset = (state) =>
  state.merge({ error: null, fetching: false });

export const updateTokens = (state, { accessToken, refreshToken }) =>
  state.merge({ accessToken, refreshToken });

export const checkEmailRequest = (state, { data, isSignUp }) =>
  state.merge({ fetching: true, error: null });

export const setEmailSent = (state, { data }) =>
  state.merge({ fetching: false, emailSent: data })

export const changeEmailRequest = (state, { data }) =>
  state.merge({ fetching: true, error: null });

export const confirmEmailRequest = (state, { hash, redirect }) =>
  state.merge({ fetching: true, error: null });

export const confirmEmailInitRequest = (state, { hash, redirect }) =>
  state.merge({ fetching: true, error: null });

export const checkPasswordRequest = (state, { email }) =>
  state.merge({ fetching: true, error: null });

export const confirmPasswordRequest = (state, { code }) =>
  state.merge({ fetching: true, error: null });

export const logout = (state) => {
  localStorage.removeItem('completely_finished');
  return state.merge({...INITIAL_STATE, error: state.error, rememberMe: state.rememberMe});
}

export const clearState = (state) => state.merge({ ...INITIAL_STATE, isPasswordCreated: state.isPasswordCreated });

export const updateProfile = (state, { data }) => {
  let userInfo = {};
  if (data?.user) {
    userInfo = { ...state.userInfo, ...data.user };
  } else {
    userInfo = { ...state.userInfo, ...data };
  }

  return state.merge({ userInfo });
};

export const signUpRequest = (state, { password, isNewUserCheck }) =>
  state.merge({ fetching: true, error: null });

export const signUpSuccess = (state) =>
  state.merge({ fetching: false, error: null, isPasswordCreated: false });

export const signUpFailure = (state, { error }) =>
  state.merge({ error, fetching: false });

export const socialAuthRequest = (state, { accessToken, socialType, user }) =>
  state.merge({ fetching: true, error: null });

export const socialAuthConnectRequest = (state, { accessToken, socialType, user }) =>
  state.merge({ fetching: true, error: null });

export const socialAuthFailure = (state, { error }) =>
  state.merge({ error, fetching: false });

export const socialAuthSuccess = (
  state,
  { userInfo, accessToken, refreshToken },
) => {
  const isAdmin = userInfo?.role?.id === 2;
  const role = userInfo?.role?.id;
  return state.merge({
    fetching: false,
    error: null,
    ...(userInfo?.onboarding_finished && { socialAuthConnectResult: true }),
    userInfo,
    accessToken,
    refreshToken,
    isAdmin,
    role,
  });
};

export const socialAccountSave = (state, { name }) =>
  state.merge({ socialAccount: name });

export const socialAuthReset = (state) =>
  state.merge({
    fetching: false,
    error: null,
    socialAuthConnectResult: null,
    socialAuthDeleteResult: null,
    socialAccount: '',
  });

export const socialAuthDeleteRequest = (state, { socialType }) =>
  state.merge({ fetching: true, error: null });
export const socialAuthDeleteSuccess = (state, { userInfo }) => {
  const isAdmin = userInfo?.role?.id === 2;
  const role = userInfo?.role?.id;
  return state.merge({
    fetching: false,
    error: null,
    socialAuthDeleteResult: true,
    userInfo,
    isAdmin,
    role,
  });
};

export const socialAuthDeleteFailure = (state, { error }) =>
  state.merge({ error, fetching: false });

export const setRemember = (state, { data }) =>
  state.merge({ rememberMe: data });

export const authFetchingReset = (state) =>
  state.merge({
    fetching: false,
    updateFetching: false,
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_REQUEST]: signInRequest,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILURE]: signInFailure,

  [Types.AUTH_ERROR_RESET]: authErrorReset,

  [Types.UPDATE_TOKENS]: updateTokens,

  [Types.CHECK_EMAIL_REQUEST]: checkEmailRequest,
  [Types.CHANGE_EMAIL_REQUEST]: changeEmailRequest,
  [Types.CONFIRM_EMAIL_REQUEST]: confirmEmailRequest,
  [Types.CONFIRM_EMAIL_INIT_REQUEST]: confirmEmailInitRequest,
  [Types.CHECK_EMAIL_INIT_SUCCESS]: checkEmailInitSuccess,

  [Types.CHECK_PASSWORD_REQUEST]: checkPasswordRequest,
  [Types.CONFIRM_PASSWORD_REQUEST]: confirmPasswordRequest,

  [Types.LOGOUT]: logout,
  [Types.CLEAR_STATE]: clearState,

  [Types.SET_EMAIL_SENT]: setEmailSent,

  [Types.UPDATE_PROFILE]: updateProfile,

  [Types.SIGN_UP_REQUEST]: signUpRequest,
  [Types.SIGN_UP_SUCCESS]: signUpSuccess,
  [Types.SIGN_UP_FAILURE]: signUpFailure,

  [Types.SOCIAL_AUTH_REQUEST]: socialAuthRequest,
  [Types.SOCIAL_AUTH_SUCCESS]: socialAuthSuccess,
  [Types.SOCIAL_AUTH_FAILURE]: socialAuthFailure,

  [Types.SOCIAL_AUTH_DELETE_REQUEST]: socialAuthDeleteRequest,
  [Types.SOCIAL_AUTH_DELETE_SUCCESS]: socialAuthDeleteSuccess,
  [Types.SOCIAL_AUTH_DELETE_FAILURE]: socialAuthDeleteFailure,

  [Types.SET_REMEMBER]: setRemember,

  [Types.AUTH_FETCHING_RESET]: authFetchingReset,

  [Types.SOCIAL_AUTH_CONNECT_REQUEST]: socialAuthConnectRequest,
  [Types.SOCIAL_AUTH_RESET]: socialAuthReset,

  [Types.SOCIAL_ACCOUNT_SAVE]: socialAccountSave,

  [Types.SET_IS_PASSWORD_CREATED]: setIsPasswordCreated,

  [Types.REFRESH_TOKEN_REQUEST]: refreshTokenRequest,
  [Types.REFRESH_TOKEN_SUCCESS]: refreshTokenSuccess,
  [Types.REFRESH_TOKEN_FAILURE]: refreshTokenFailure,

  [Types.VERIFY_TOKEN_REQUEST]: verifyTokenRequest,
  [Types.VERIFY_TOKEN_SUCCESS]: verifyTokenSuccess,
  [Types.VERIFY_TOKEN_FAILURE]: verifyTokenFailure,
});
