/* eslint-disable import/no-named-as-default-member */
/* User sagas */

import { takeLatest, put, call } from 'redux-saga/effects';
import AuthActions from '../LoginPage/reducer';

import * as services from './services';
import UserActions, { UserTypes as constants } from './reducer';
import { sendExtensionMessage } from '../../Utils/extension';

const actions = {
  getUserInfoActions: {
    request: UserActions.userRequest,
    success: UserActions.userSuccess,
    errors: UserActions.userFailure,
  },
  updateUserInfoActions: {
    request: UserActions.userSaveRequest,
    success: UserActions.userSaveSuccess,
    errors: UserActions.userSaveFailure,
  },
  updateUserAvatarInfoActions: {
    request: UserActions.userSaveAvatarRequest,
    success: UserActions.userSaveAvatarSuccess,
    errors: UserActions.userSaveAvatarFailure,
  },
  changePasswordActions: {
    request: UserActions.changePasswordRequest,
    success: UserActions.changePasswordSuccess,
    errors: UserActions.changePasswordFailure,
  },
  sendCodePasswordActions: {
    request: UserActions.sendCodePasswordRequest,
    success: UserActions.sendCodePasswordSuccess,
    errors: UserActions.sendCodePasswordFailure,
  },
  confirmCodePasswordActions: {
    request: UserActions.confirmCodePasswordRequest,
    success: UserActions.confirmCodePasswordSuccess,
    errors: UserActions.confirmCodePasswordFailure,
  },
  createNewPasswordActions: {
    request: UserActions.createNewPasswordRequest,
    success: UserActions.createNewPasswordSuccess,
    errors: UserActions.createNewPasswordFailure,
  },
  setPasswordActions: {
    request: UserActions.setPasswordRequest,
    success: UserActions.setPasswordSuccess,
    errors: UserActions.setPasswordFailure,
  },
  changeEmailsActions: {
    request: UserActions.changeEmailsRequest,
    success: UserActions.changeEmailsSuccess,
    errors: UserActions.changeEmailsFailure,
  },
  confirmEmailsActions: {
    request: UserActions.confirmEmailsRequest,
    success: UserActions.confirmEmailsSuccess,
    errors: UserActions.confirmEmailsFailure,
  },
  changeLanguageActions: {
    request: UserActions.changeLanguageRequest,
    success: UserActions.changeLanguageSuccess,
    errors: UserActions.changeLanguageFailure,
  },
};

const eventsOptions = {
  [constants.USER_REQUEST]: {
    api: services.getUserInfo,
    actions: actions.getUserInfoActions,
  },
  [constants.USER_SAVE_REQUEST]: {
    api: services.updateUserInfo,
    actions: actions.updateUserInfoActions,
  },
  [constants.USER_SAVE_AVATAR_REQUEST]: {
    api: services.updateUserInfo,
    actions: actions.updateUserAvatarInfoActions,
  },
  [constants.CHANGE_PASSWORD_REQUEST]: {
    api: services.changePassword,
    actions: actions.changePasswordActions,
  },
  [constants.SEND_CODE_PASSWORD_REQUEST]: {
    api: services.sendCodePassword,
    actions: actions.sendCodePasswordActions,
  },
  [constants.CONFIRM_CODE_PASSWORD_REQUEST]: {
    api: services.confirmCodePassword,
    actions: actions.confirmCodePasswordActions,
  },
  [constants.CREATE_NEW_PASSWORD_REQUEST]: {
    api: services.createNewPassword,
    actions: actions.createNewPasswordActions,
  },
  [constants.SET_PASSWORD_REQUEST]: {
    api: services.createNewPassword,
    actions: actions.setPasswordActions,
  },
  [constants.CHANGE_EMAILS_REQUEST]: {
    api: services.changeEmails,
    actions: actions.changeEmailsActions,
  },
  [constants.CONFIRM_EMAILS_REQUEST]: {
    api: services.confirmEmails,
    actions: actions.confirmEmailsActions,
  },
  [constants.CHANGE_LANGUAGE_REQUEST]: {
    api: services.changeLanguage,
    actions: actions.changeLanguageActions,
  },
};

// const events = Object.keys(eventsOptions);

function* apiGenerator(action) {
  const provider = eventsOptions[action.type];

  try {
    const params = action.payload;
    const response = yield call(provider.api, params);
    if (response.data) {
      if (response.data?.message && response.ok) {
        yield put(provider.actions.success(response?.data?.message));
      } else if (response.data?.message && !response.ok) {
        yield put(provider.actions.errors({ errors: response.data?.message }));
      } else if (response.data && !response.ok) {
        const error = Object.values(response.data).length
          ? Object.values(response.data)[0]
          : null;
        yield put(provider.actions.errors({ errors: error }));
      } else {
        yield put(provider.actions.success(response.data));
        yield put(AuthActions.updateProfile(response.data));
        sendExtensionMessage({
          action: 'updateProfile',
          data: { ...response.data }
        })
      }
    } else {
      yield put(provider.actions.errors({ errors: 'some error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}
function* apiSetPassword(action) {
  const provider = eventsOptions[action.type];

  try {
    const params = action.payload;
    const response = yield call(provider.api, params);
    if (response.data) {
      if (response.ok) {
        yield put(provider.actions.success(response.data));
        yield put(UserActions.userRequest());
      } else {
        const error = Object.values(response.data).length
          ? Object.values(response.data)[0]
          : null;
        yield put(provider.actions.errors({ errors: error }));
      }
    } else {
      yield put(provider.actions.errors({ errors: 'some error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.USER_REQUEST, apiGenerator);
  yield takeLatest(constants.USER_SAVE_REQUEST, apiGenerator);
  yield takeLatest(constants.USER_SAVE_AVATAR_REQUEST, apiGenerator);
  yield takeLatest(constants.CHANGE_PASSWORD_REQUEST, apiGenerator);
  yield takeLatest(constants.SEND_CODE_PASSWORD_REQUEST, apiGenerator);
  yield takeLatest(constants.CONFIRM_CODE_PASSWORD_REQUEST, apiGenerator);
  yield takeLatest(constants.CREATE_NEW_PASSWORD_REQUEST, apiGenerator);
  yield takeLatest(constants.SET_PASSWORD_REQUEST, apiSetPassword);
  yield takeLatest(constants.CHANGE_EMAILS_REQUEST, apiGenerator);
  yield takeLatest(constants.CONFIRM_EMAILS_REQUEST, apiGenerator);
  yield takeLatest(constants.CHANGE_LANGUAGE_REQUEST, apiGenerator);
}
