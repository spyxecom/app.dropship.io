import { takeLatest, call, put, delay, select } from 'redux-saga/effects';
import { push, connectRouter, replace } from 'connected-react-router';
import AuthActions, { AuthSelectors, AuthTypes } from './reducer';
import NavActions from '../User/actions';
import ErrorsActions from '../../Redux/ErrorsRedux';
import { history } from '../../Utils/utils';
//import { API } from '../../Services/Api';
import * as services from './services';
import { sendExtensionMessage } from '../../Utils/extension';

export function* signIn(authApi, { email, password, otp_pass = null }) {
  try {
    const response = yield call(authApi.signIn, email, password, otp_pass);
    let historyLocal = connectRouter(history)();
    if (response && response.access && response.userInfo) {
      yield put(
        AuthActions.signInSuccess(
          response.userInfo,
          response.access,
          response.refresh,
        ),
      );

      if(response.userInfo?.onboarding_finished){
        sendExtensionMessage({
          action: 'signInSuccess',
          reload: true,
          data: {
            userInfo: response.userInfo,
            access: response.access,
            refresh: response.refresh,
          },
        })
      }

      yield delay(500);

      if (
        response.userInfo?.onboarding_finished &&
        response.userInfo?.role?.name !== 'Admin'
      ) {
        if(historyLocal?.location?.state?.reference) {
          yield put(replace(historyLocal?.location?.state?.reference));
        }else{
          yield put(push('/dashboard'));
        }
      } else if (response.userInfo?.role?.name === 'Admin') {
        yield put(NavActions.changeTheme('theme', 'light'));
        yield put(push('/admin/portfolio'));
      } else {
        yield put(
          push('/onboarding/plan'),
        );
      }
    } else if (response && response.data) {
      if (response.status === 401) {
        yield put(AuthActions.signInFailure(response.data));
      } else if (response.status === 500) {
        yield put(AuthActions.signInFailure('Server response error'));
      } else {
        yield put(AuthActions.signInFailure(response.data));
      }
    } else {
      yield put(AuthActions.signInFailure('Server response error'));
    }
  } catch (e) {
    if (e?.status === 200 && e?.data?.otp_required) yield put(AuthActions.signInFailure(e?.data))
    else yield put(AuthActions.signInFailure(`Unknown error: ${e}`));
  }
}

export function* checkEmail(authApi, { data, isSignUp }) {
  try {
    const response = yield call(authApi.checkEmail, data);
    if (response && response.ok) {
      if (isSignUp) {
        yield put(AuthActions.setEmailSent(true));
      } else {
        yield put(
          push({
            pathname: '/check-mailbox',
            state: data,
          }),
        );
      }
      yield put(AuthActions.authErrorReset());
    } else if (response && response.data) {
      if (response.status === 401) {
        yield put(AuthActions.signInFailure(null));
      } else if (response.status === 500) {
        yield put(AuthActions.signInFailure('Server response error'));
      } else {
        yield put(AuthActions.signInFailure(response.data));
      }
    } else {
      yield put(AuthActions.signInFailure('Server response error'));
    }
  } catch (e) {
    yield put(AuthActions.signInFailure(`Unknown error: ${e}`));
  }
}

export function* changeEmail(authApi, { data }) {
  try {
    const response = yield call(authApi.changeEmail, data);
    if (response && response.ok) {
      yield put(
        push({
          pathname: '/check-mailbox',
          state: data,
        }),
      );
      yield put(AuthActions.authErrorReset());
    } else if (response && response.data) {
      if (response.status === 401) {
        yield put(AuthActions.signInFailure(null));
      } else if (response.status === 500) {
        yield put(AuthActions.signInFailure('Server response error'));
      } else {
        yield put(AuthActions.signInFailure(response.data));
      }
    } else {
      yield put(AuthActions.signInFailure('Server response error'));
    }
  } catch (e) {
    yield put(AuthActions.signInFailure(`Unknown error: ${e}`));
  }
}

export function* confirmEmail(authApi, { hash, redirect }) {
  try {
    yield put(AuthActions.clearState());
    const response = yield call(authApi.confirmEmail, hash);
    if (response && response.access && response.userInfo) {
      yield put(
        AuthActions.signInSuccess(
          response.userInfo,
          response.access,
          response.refresh,
        ),
      );
      yield put(push('/onboarding/plan'));
    } else {
      if (response?.data) {
        if (response.status === 401) {
          yield put(AuthActions.signInFailure(null));
          yield put(AuthActions.logout());
        } else if (response.status === 500) {
          yield put(AuthActions.signInFailure('Server response error'));
        } else {
          yield put(AuthActions.signInFailure(response.data));
        }
      } else {
        yield put(AuthActions.signInFailure('Server response error'));
      }
      if (redirect) {
        yield put(push(redirect));
      } else {
        yield put(push('/sign-up'));
      }
    }
  } catch (e) {
    yield put(AuthActions.signInFailure(`Unknown error: ${e}`));
  }
}

export function* confirmEmailInit(authApi, { hash, redirect }) {
  try {
    yield put(AuthActions.clearState());
    const response = yield call(authApi.confirmEmailInit, hash);
    if (response && response?.codeValid) {
      yield put(
        AuthActions.checkEmailInitSuccess(
          response?.codeValid
        ),
      );
    } else {
      if (response?.data) {
        if (response.status === 401) {
          yield put(AuthActions.signInFailure(null));
          yield put(AuthActions.logout());
        } else if (response.status === 500) {
          yield put(AuthActions.signInFailure('Server response error'));
        } else {
          yield put(AuthActions.signInFailure(response.data));
        }
      } else {
        yield put(AuthActions.signInFailure('Server response error'));
      }
      if (redirect) {
        yield put(push(redirect));
      } else {
        yield put(push('/login'));
      }
    }
  } catch (e) {
    yield put(AuthActions.signInFailure(`Unknown error: ${e}`));
  }
}

export function* checkPassword(authApi, { email }) {
  try {
    const response = yield call(authApi.checkPassword, email);
    if (response && response.ok) {
      yield put(
        push({
          pathname: '/verify-code',
          state: email,
        }),
      );
      yield put(AuthActions.authErrorReset());
    } else if (response?.data) {
      if (response.status === 401) {
        yield put(AuthActions.signInFailure(null));
      } else if (response.status === 500) {
        yield put(AuthActions.signInFailure('Server response error'));
      } else {
        yield put(AuthActions.signInFailure(response.data));
      }
    } else {
      yield put(AuthActions.signInFailure('Server response error'));
    }
  } catch (e) {
    yield put(AuthActions.signInFailure(`Unknown error: ${e}`));
  }
}

export function* confirmPassword(authApi, { code }) {
  try {
    const response = yield call(authApi.confirmPassword, code);
    if (response && response.access && response.userInfo) {
      yield put(
        AuthActions.signInSuccess(
          null,
          response.access,
          response.refresh,
        ),
      );
      yield put(push('/restore-password/code'));
    } else if (response?.data) {
      if (response.status === 401) {
        yield put(AuthActions.signInFailure(null));
      } else if (response.status === 500) {
        yield put(AuthActions.signInFailure('Server response error'));
      } else {
        yield put(AuthActions.signInFailure(response.data));
      }
    } else {
      yield put(AuthActions.signInFailure('Server response error'));
    }
  } catch (e) {
    yield put(AuthActions.signInFailure(`Unknown error: ${e}`));
  }
}

export function* createUserPassword(authApi, { password, isNewUserCheck }) {
  try {
    const response = yield call(authApi.createUserPassword, password);
    if (response && response.ok) {
      if (isNewUserCheck) {
        yield put(AuthActions.signUpSuccess(response.data));
        yield delay(500);
        yield put(
          push('/onboarding/plan'),
        );
      } else {
        yield put(AuthActions.logout());
        yield put(push('/login'));
      }
    } else if (response?.data) {
      if (response.status === 500) {
        yield put(AuthActions.signUpFailure('Server response error'));
      } else {
        yield put(AuthActions.signUpFailure(response.data));
      }
    } else {
      yield put(AuthActions.signUpFailure('Server response error'));
    }
  } catch (e) {
    yield put(AuthActions.signUpFailure(`Unknown error: ${e}`));
  }
}

export function* socialAuth(authApi, { accessToken, socialType, user }) {
  try {
    const response = yield call(authApi.socialAuth, accessToken, socialType, user);
    let historyLocal = connectRouter(history)();
    if (response?.access && response?.userInfo) {
      yield put(
        AuthActions.socialAuthSuccess(
          response.userInfo,
          response.access,
          response.refresh,
        ),
      );

      yield put(AuthActions.socialAuthReset());

      if(response.userInfo?.onboarding_finished){
        sendExtensionMessage({
          action: 'signInSuccess',
          reload: true,
          data: {
            userInfo: response.userInfo,
            access: response.access,
            refresh: response.refresh,
          },
        })
      }

      yield delay(500);
      if (response.userInfo?.onboarding_finished) {
        if(historyLocal?.location?.state?.reference) {
          yield put(replace(historyLocal?.location?.state?.reference));
        }else{
          yield put(push('/dashboard'));
        }
      } else if (response.userInfo?.email_added) {
        yield put(
          push('/onboarding/plan'),
        );
      } else {
        yield put(push('/add-email'));
      }
    } else if (response?.data) {
      if (response.status === 401) {
        yield put(AuthActions.socialAuthFailure(null));
      } else if (response.status === 500) {
        yield put(AuthActions.socialAuthFailure('Server response error'));
      } else {
        yield put(AuthActions.socialAuthFailure(response.data));
      }
    } else {
      yield put(AuthActions.socialAuthFailure('Server response error'));
    }
  } catch (e) {
    yield put(AuthActions.socialAuthFailure(`Unknown error: ${e}`));
  }
}

export function* logout(authApi) {
  try {
    const response = yield call(authApi.logout);
    if(response){
      authApi.updateAccessToken(null, null);
      yield delay(500);
      yield put(push('/login'));
      sendExtensionMessage({ action: 'logout' , reload: true})
    }
  } catch (e) {
    console.log('error:', e);
  }
}

export function* socialAuthConnect(authApi, { accessToken, socialType, user }) {
  try {
    const response = yield call(authApi.socialAuthAdd, accessToken, socialType, user);
    if (response?.access && response?.userInfo) {
      yield put(
        AuthActions.socialAuthSuccess(
          response.userInfo,
          response.access,
          response.refresh,
        ),
      );
      yield delay(500);
    } else if (response?.data) {
      if (response?.status === 401) {
        yield put(AuthActions.socialAuthFailure(null));
      } else if (response?.status === 500) {
        yield put(AuthActions.socialAuthFailure('Server response error'));
      } else {
        yield put(AuthActions.socialAuthFailure(response.data));
      }
    } else {
      yield put(AuthActions.socialAuthFailure('Server response error'));
    }
  } catch (e) {
    yield put(AuthActions.socialAuthFailure(`Unknown error: ${e}`));
  }
}

export function* socialAuthDelete(authApi, { socialType }) {
  try {
    const response = yield call(authApi.socialAuthDelete, socialType);
    if (response?.ok) {
      yield put(AuthActions.socialAuthDeleteSuccess(response.data));
      /// yield put(AuthActions.updateProfile(response.data));
    } else {
      if (response?.data) {
        if (response?.status === 401) {
          const res = yield call(authApi.tokenRefresh);
          if (res?.access) {
            yield put(AuthActions.updateTokens(res.access, res.refresh));
            yield* socialAuthDelete(authApi, { socialType });
          } else {
            yield put(AuthActions.logout());
            yield put(push('/login'));
          }
        } else {
          yield put(ErrorsActions.errorSave(response.data));
        }
      } else {
        yield put(ErrorsActions.errorSave('Server response error'));
      }
      yield put(AuthActions.authFetchingReset());
    }
  } catch (e) {
    yield put(AuthActions.authFetchingReset());
    yield put(ErrorsActions.errorSave(`Unknown error: ${e}`));
  }
}

const actions = {
  refreshTokenActions: {
    request: AuthActions.refreshTokenRequest,
    success: AuthActions.refreshTokenSuccess,
    errors: AuthActions.refreshTokenFailure,
  },
  verifyTokenActions: {
    request: AuthActions.verifyTokenRequest,
    success: AuthActions.verifyTokenSuccess,
    errors: AuthActions.verifyTokenFailure,
  },
};

const eventsOptions = {
  [AuthTypes.REFRESH_TOKEN_REQUEST]: {
    api: services.refreshToken,
    actions: actions.refreshTokenActions,
  },
  [AuthTypes.VERIFY_TOKEN_REQUEST]: {
    api: services.verifyToken,
    actions: actions.verifyTokenActions,
  },
};

// REFRESH TOKEN
function* refreshTokenGenerator(action) {
  const provider = eventsOptions[action.type];
  const params = action.payload;
  const response = yield call(provider.api, params);

  if (response.ok) {

    yield put(provider.actions.success(response?.data));

    // reload page after first refresh token
    window.location.reload();
  } else {
    yield put(provider.actions.errors({ errors: response?.data?.message?.detail }));

    // logout
    yield put(AuthActions.logout());
  }
}

// VERIFY TOKEN
function* verifyTokenGenerator(action) {
  const provider = eventsOptions[action.type];

  try {
    const { token, isExtension } = action.payload;
    const response = yield call(provider.api, { token });

    if (response.status === 200) {
      yield put(provider.actions.success(response.data));
      if(isExtension){
        const userInfo = yield select(AuthSelectors.getUserInfo);
        const accessToken = yield select(AuthSelectors.getAccessToken);
        const refreshToken = yield select(AuthSelectors.getRefreshToken);

        /* отправка инфы о пользователе если сессия в web уже есть*/
        if(userInfo?.onboarding_finished){
          sendExtensionMessage({
            action: 'signInSuccess',
            reload: true,
            data: {
              userInfo: userInfo,
              access: accessToken,
              refresh: refreshToken,
            },
          })
        }
      }
    }

    if (response.status === 401 || response.status === 403) {
      yield put(provider.actions.errors({ errors: 'error 401 || 403' }));

      throw response;
    }

    if (response.status === 404) {
      throw response;
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));

    // refresh token
    yield put(actions.refreshTokenActions.request(action.payload));
  }
}

export function* apiAuthSaga() {
  yield takeLatest(AuthTypes.REFRESH_TOKEN_REQUEST, refreshTokenGenerator);
  yield takeLatest(AuthTypes.VERIFY_TOKEN_REQUEST, verifyTokenGenerator);
}
