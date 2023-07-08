import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: null,
  userSuccess: ['payload'], // payload: { userData }
  userFailure: ['payload'], // payload: { errors }

  userSaveRequest: ['payload'], // payload: { data }
  userSaveSuccess: ['payload'], // payload: { saveResult }
  userSaveFailure: ['payload'], // payload: { errors }

  userSaveResultReset: null,

  userSaveAvatarRequest: ['payload'], // payload: { data }
  userSaveAvatarSuccess: ['payload'], // payload: { saveResult }
  userSaveAvatarFailure: ['payload'], // payload: { errors }

  changePasswordRequest: ['payload'], // payload: { data }
  changePasswordSuccess: ['payload'], // payload: { message }
  changePasswordFailure: ['payload'], // payload: { errors }

  sendCodePasswordRequest: ['payload'], // payload: { mail }
  sendCodePasswordSuccess: ['payload'], // payload: { saveResult }
  sendCodePasswordFailure: ['payload'], // payload: { errors }

  confirmCodePasswordRequest: ['payload'], // payload: { code }
  confirmCodePasswordSuccess: ['payload'], // payload: { saveResult }
  confirmCodePasswordFailure: ['payload'], // payload: { errors }

  createNewPasswordRequest: ['payload'], // payload: { new_password }
  createNewPasswordSuccess: ['payload'], // payload: { saveResult }
  createNewPasswordFailure: ['payload'], // payload: { errors }

  setPasswordRequest: ['payload'], // payload: { new_password }
  setPasswordSuccess: ['payload'], // payload: { saveResult }
  setPasswordFailure: ['payload'], // payload: { errors }

  changeEmailsRequest: ['payload'], // payload: { data }
  changeEmailsSuccess: ['payload'], // payload: { message }
  changeEmailsFailure: ['payload'], // payload: { errors }

  confirmEmailsRequest: ['payload'], // payload: { hash }
  confirmEmailsSuccess: ['payload'], // payload: { message }
  confirmEmailsFailure: ['payload'], // payload: { errors }

  changeLanguageRequest: ['payload'],
  changeLanguageSuccess: ['payload'], // payload: { data }
  changeLanguageFailure: ['payload'], // payload: { errors }

  userErrorsReset: null,
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  errors: false,

  saveResult: null,
  saveFetching: false,

  saveAvatarFetching: false,
});

/* ------------- Selectors ------------- */
export const UserSelectors = {
  getState: (state) => state.users,
};

/* ------------- Reducers ------------- */

//GET USER DATA
export const userRequest = (state) => {
  return state.merge({ fetching: true });
};
export const userSuccess = (state, { payload: userInfo }) => {
  // return state.merge({
  //   fetching: false,
  //   userInfo: { ...state.userInfo, ...userInfo },
  // });
  return state.merge({ fetching: false });
};
export const userFailure = (state, { payload: errors }) =>
  state.merge({ fetching: false, errors });

// CHANGE USER DATA
export const userSaveRequest = (state, { payload: data }) => {
  return state.merge({ saveFetching: true });
};
export const userSaveSuccess = (state, { payload: saveResult }) => {
  return state.merge({ saveFetching: false, saveResult: true });
};

export const userSaveFailure = (state, { payload: errors }) => {
  return state.merge({
    saveAvatarFetching: false,
    errors: { userPersonalError: errors },
  });
};

// RESET ERRORS
export const userSaveResultReset = (state, { payload: saveResult }) => {
  return state.merge({ saveFetching: false, saveResult: null });
};
export const userErrorsReset = (state) => {
  return state.merge({ errors: false });
};

// CHANGE USER AVATAR
export const userSaveAvatarRequest = (state, { payload: data }) => {
  return state.merge({ saveAvatarFetching: true });
};

export const userSaveAvatarSuccess = (state, { payload: saveResult }) => {
  return state.merge({ saveAvatarFetching: false, saveResult: true });
};
export const userSaveAvatarFailure = (state, { payload: errors }) => {
  return state.merge({ saveAvatarFetching: false, errors });
};

// CHANGE PASSWORD
export const changePasswordRequest = (state) =>
  state.merge({ saveFetching: true });

export const changePasswordSuccess = (state, { payload }) =>
  state.merge({ saveFetching: false, saveResult: { create: true } });

export const changePasswordFailure = (state, { payload: { errors } }) =>
  state.merge({ saveFetching: false, errors });

// SEND CODE TO MAIL FOR CHANGE PASSWORD
export const sendCodePasswordRequest = (state, { payload: email }) => {
  return state.merge({ saveFetching: true });
};
export const sendCodePasswordSuccess = (state, { payload }) => {
  return state.merge({ saveFetching: false, saveResult: true });
};
export const sendCodePasswordFailure = (state, { payload: { errors } }) =>
  state.merge({ fetching: false, saveFetching: false, errors });

// CONFIRM CODE FROM MAIL TO CHANGE PASSWORD
export const confirmCodePasswordRequest = (state, { payload }) => {
  return state.merge({ saveFetching: true });
};
export const confirmCodePasswordSuccess = (state, { payload }) => {
  return state.merge({ saveFetching: false, saveResult: { confirm: true } });
};
export const confirmCodePasswordFailure = (state, { payload: { errors } }) =>
  state.merge({ fetching: false, saveFetching: false, errors });

// CREATE NEW PASSWORD
export const createNewPasswordRequest = (state, { payload }) => {
  return state.merge({ saveFetching: true });
};
export const createNewPasswordSuccess = (state, { payload }) => {
  return state.merge({ saveFetching: false, saveResult: { create: true } });
};
export const createNewPasswordFailure = (state, { payload: { errors } }) =>
  state.merge({ fetching: false, saveFetching: false, errors });

// SET PASSWORD
export const setPasswordRequest = (state, { payload }) => {
  return state.merge({ saveFetching: true });
};
export const setPasswordSuccess = (state, { payload }) => {
  return state.merge({
    saveFetching: false,
    saveResult: { setPassword: true },
  });
};
export const setPasswordFailure = (state, { payload: { errors } }) =>
  state.merge({ fetching: false, saveFetching: false, errors });

// CHANGE EMAIL
export const changeEmailsRequest = (state) =>
  state.merge({ saveFetching: true });

export const changeEmailsSuccess = (state, { payload }) =>
  state.merge({ saveFetching: false, saveResult: { confirm: true } });

export const changeEmailsFailure = (state, { payload: { errors } }) =>
  state.merge({ saveFetching: false, errors });

//CONFIRM EMAIL

export const confirmEmailsRequest = (state) =>
  state.merge({ saveFetching: true });

export const confirmEmailsSuccess = (state, { payload }) =>
  state.merge({ saveFetching: false, saveResult: { confirmEmail: true } });

export const confirmEmailsFailure = (state, { payload: { errors } }) =>
  state.merge({
    saveFetching: false,
    errors: { confirmError: errors },
  });

// CHANGE LANGUAGE

const changeLanguageRequest = (state, { lang }) =>
  state.merge({ saveFetching: true });

const changeLanguageSuccess = (state, { payload }) =>
  state.merge({ saveFetching: false, saveResult: { changeLanguage: true } });

const changeLanguageFailure = (state, { payload: { errors } }) =>
  state.merge({ saveFetching: false, errors });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: userRequest,
  [Types.USER_SUCCESS]: userSuccess,
  [Types.USER_FAILURE]: userFailure,

  [Types.USER_SAVE_REQUEST]: userSaveRequest,
  [Types.USER_SAVE_SUCCESS]: userSaveSuccess,
  [Types.USER_SAVE_FAILURE]: userSaveFailure,

  [Types.USER_SAVE_RESULT_RESET]: userSaveResultReset,
  [Types.USER_ERRORS_RESET]: userErrorsReset,

  [Types.USER_SAVE_AVATAR_REQUEST]: userSaveAvatarRequest,
  [Types.USER_SAVE_AVATAR_SUCCESS]: userSaveAvatarSuccess,
  [Types.USER_SAVE_AVATAR_FAILURE]: userSaveAvatarFailure,

  [Types.CHANGE_PASSWORD_REQUEST]: changePasswordRequest,
  [Types.CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,
  [Types.CHANGE_PASSWORD_FAILURE]: changePasswordFailure,

  [Types.SEND_CODE_PASSWORD_REQUEST]: sendCodePasswordRequest,
  [Types.SEND_CODE_PASSWORD_SUCCESS]: sendCodePasswordSuccess,
  [Types.SEND_CODE_PASSWORD_FAILURE]: sendCodePasswordFailure,

  [Types.CONFIRM_CODE_PASSWORD_REQUEST]: confirmCodePasswordRequest,
  [Types.CONFIRM_CODE_PASSWORD_SUCCESS]: confirmCodePasswordSuccess,
  [Types.CONFIRM_CODE_PASSWORD_FAILURE]: confirmCodePasswordFailure,

  [Types.CREATE_NEW_PASSWORD_REQUEST]: createNewPasswordRequest,
  [Types.CREATE_NEW_PASSWORD_SUCCESS]: createNewPasswordSuccess,
  [Types.CREATE_NEW_PASSWORD_FAILURE]: createNewPasswordFailure,

  [Types.SET_PASSWORD_REQUEST]: setPasswordRequest,
  [Types.SET_PASSWORD_SUCCESS]: setPasswordSuccess,
  [Types.SET_PASSWORD_FAILURE]: setPasswordFailure,

  [Types.CHANGE_EMAILS_REQUEST]: changeEmailsRequest,
  [Types.CHANGE_EMAILS_SUCCESS]: changeEmailsSuccess,
  [Types.CHANGE_EMAILS_FAILURE]: changeEmailsFailure,

  [Types.CONFIRM_EMAILS_REQUEST]: confirmEmailsRequest,
  [Types.CONFIRM_EMAILS_SUCCESS]: confirmEmailsSuccess,
  [Types.CONFIRM_EMAILS_FAILURE]: confirmEmailsFailure,

  [Types.CHANGE_LANGUAGE_REQUEST]: changeLanguageRequest,
  [Types.CHANGE_LANGUAGE_SUCCESS]: changeLanguageSuccess,
  [Types.CHANGE_LANGUAGE_FAILURE]: changeLanguageFailure,
});
