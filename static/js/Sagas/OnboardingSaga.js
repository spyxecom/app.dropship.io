/* eslint-disable no-empty-pattern */
import {call, delay, put, select} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import OnboardingActions from '../Redux/OnboardingRedux';
import AuthActions, { AuthSelectors } from '../Containers/LoginPage/reducer';
import ErrorsActions from '../Redux/ErrorsRedux';
import { sendExtensionMessage } from '../Utils/extension';

export function* getCountries(api, authApi, {}) {
  try {
    const response = yield call(api.getCountries);
    if (response?.ok) {
      yield put(OnboardingActions.countriesSuccess(response.data));
    } else {
      if (response?.data) {
        if (response.status === 401) {
          yield put(ErrorsActions.errorSave(null));
        } else if (response.status === 500) {
          yield put(ErrorsActions.errorSave('Server response error'));
        } else {
          yield put(ErrorsActions.errorSave(response.data));
        }
      } else {
        yield put(ErrorsActions.errorSave('Server response error'));
      }
      yield put(OnboardingActions.onBoardingFetchingReset());
    }

    if (response?.status === 401) {
      const res = yield call(authApi.tokenRefresh);
      if (res && res.access) {
        yield put(AuthActions.updateTokens(res.access, res.refresh));
        yield* getCountries(api, authApi, {});
      } else {
        yield put(AuthActions.logout());
        yield put(push('/login'));
      }
    }
  } catch (e) {
    yield put(OnboardingActions.onBoardingFetchingReset());
    yield put(ErrorsActions.errorSave(`Server response error: ${e}`));
  }
}

export function* checkDiscountCode(api, authApi, { code }) {
  try {
    const response = yield call(api.checkDiscountCode, code);
    if (response?.ok) {
      yield put(OnboardingActions.checkDiscountCodeSuccess(response.data));
    } else {
      if (response?.data) {
        if (response.status === 401) {
          yield put(ErrorsActions.errorSave(null));
        } else {
          yield put(ErrorsActions.errorSave(response.data));
        }
      } else {
        yield put(ErrorsActions.errorSave('Server response error'));
      }
      yield put(OnboardingActions.checkDiscountCodeFailure(true));
      yield put(OnboardingActions.onBoardingFetchingReset());
    }

    if (response?.status === 401) {
      const res = yield call(authApi.tokenRefresh);
      if (res && res.access) {
        yield put(AuthActions.updateTokens(res.access, res.refresh));
        yield* checkDiscountCode(api, authApi, { code });
      } else {
        yield put(AuthActions.logout());
        yield put(push('/login'));
      }
    }
  } catch (e) {
    yield put(OnboardingActions.onBoardingFetchingReset());
    yield put(ErrorsActions.errorSave(`Server response error: ${e}`));
  }
}

export function* saveSubscription(api, authApi, { data }) {
  try {
    const response = yield call(api.saveSubscription, data);
    const userInfo = yield select(AuthSelectors.getUserInfo);
    const accessToken = yield select(AuthSelectors.getAccessToken);
    const refreshToken = yield select(AuthSelectors.getRefreshToken);

    if (response?.ok && response?.data) {
      yield put(
        OnboardingActions.saveSubscriptionSuccess(response.data.subscriptions),
      );
      if (userInfo.onboarding_finished) {
        yield put(
          AuthActions.updateProfile({
            subscriptions: [
              /*...userInfo.subscriptions,*/
              ...response.data.subscriptions,
            ],
          }),
        );
        sendExtensionMessage({
          action: 'updateProfile',
          data: { subscriptions: [...response.data.subscriptions] }
        })
      } else {
        yield put(OnboardingActions.changeSubscriptionReset());
        yield put(OnboardingActions.createIntentReset());
        yield put(
          AuthActions.updateProfile({
            onboarding_finished: true,
            subscriptions: response.data.subscriptions,
          }),
        );
        sendExtensionMessage({
          action: 'signInSuccess',
          reload: true,
          data: {
            userInfo: {
              ...userInfo,
              onboarding_finished: true,
              subscriptions: response.data.subscriptions
            },
            access: accessToken,
            refresh: refreshToken,
          },
        })

        yield put(push('/onboarding/checkout/success'));
      }
    } else {
      if (response?.data) {
        if (response.status === 401) {
          yield put(ErrorsActions.errorSave(null));
        } else if (response.status === 500) {
          yield put(OnboardingActions.saveSubscriptionFailure(true));
          yield put(ErrorsActions.errorSave(response.data));
        } else {
          yield put(ErrorsActions.errorSave(response.data));
          yield delay(3000);
          yield put(AuthActions.logout());
        }
      } else {
        yield put(ErrorsActions.errorSave('Server response error'));
      }
      yield put(OnboardingActions.onBoardingFetchingReset());
    }

    if (response?.status === 401) {
      const res = yield call(authApi.tokenRefresh);
      if (res && res.access) {
        yield put(AuthActions.updateTokens(res.access, res.refresh));
        yield* saveSubscription(api, authApi, { data });
      } else {
        yield put(AuthActions.logout());
        yield put(push('/login'));
      }
    }
  } catch (e) {
    yield put(OnboardingActions.onBoardingFetchingReset());
    yield put(ErrorsActions.errorSave(`Server response error: ${e}`));
  }
}

export function* updateSubscription(api, authApi, { data }) {
  try {
    const response = yield call(api.updateSubscription, data);
    const userInfo = yield select(AuthSelectors.getUserInfo);
    if (response?.ok && response?.data?.subscriptions?.length) {
      yield put(OnboardingActions.updateSubscriptionSuccess(response.data.subscriptions));
     /* let newSubscriptions = [];
      if (data.force) {
        newSubscriptions = userInfo.subscriptions.filter(
          (subscription) =>
            !(
              subscription.category.name === response.data.subscriptions[0]?.category?.name &&
              subscription.payment_status.name === 'Paid'
            ),
        );
      } else {
        newSubscriptions = userInfo.subscriptions;
      }*/
      if(response?.data?.card?.payment_source){
        const {
          brand,
          expiry_month,
          expiry_year,
          first_name,
          last_name,
          last4
        } = response?.data?.card?.payment_source?.card

        yield put(
          AuthActions.updateProfile({
            ...userInfo,
            subscriptions: [...response.data.subscriptions],
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
      }else{
        yield put(
          AuthActions.updateProfile({
            subscriptions: [
              /*...newSubscriptions, */
              ...response.data.subscriptions],
          }),
        );
      }
      sendExtensionMessage({
        action: 'updateProfile',
        data: { subscriptions: [...response.data.subscriptions] }
      })
    } else {
      if (response?.data?.errors) {
        if (response.status === 401) {
          yield put(ErrorsActions.errorSave(null));
        } else if (response.status === 500) {
          yield put(OnboardingActions.updateSubscriptionFailure(true));
          yield put(ErrorsActions.errorSave(response?.data?.errors[0]));
        } else {
          yield put(ErrorsActions.errorSave(response?.data?.errors[0]));
        }
      } else {
        yield put(ErrorsActions.errorSave('Server response error'));
      }
      yield put(OnboardingActions.onBoardingFetchingReset());
    }

    if (response?.status === 401) {
      const res = yield call(authApi.tokenRefresh);
      if (res && res.access) {
        yield put(AuthActions.updateTokens(res.access, res.refresh));
        yield* updateSubscription(api, authApi, { data });
      } else {
        yield put(AuthActions.logout());
        yield put(push('/login'));
      }
    }
  } catch (e) {
    yield put(OnboardingActions.onBoardingFetchingReset());
    yield put(ErrorsActions.errorSave(`Server response error: ${e}`));
  }
}

export function* deleteSubscription(api, authApi, { categoryId }) {
  try {
    const response = yield call(api.deleteSubscription, categoryId);
    const userInfo = yield select(AuthSelectors.getUserInfo);
    if (response?.ok && response?.data?.subscription?.id) {
      yield put(OnboardingActions.deleteSubscriptionSuccess(response.data));
      const newSubscriptions = userInfo.subscriptions.map(
        subscription => (subscription.id === response.data.subscription.id)
          ? response.data.subscription
          : subscription
      );
      yield put(
        AuthActions.updateProfile({ subscriptions: [...newSubscriptions] }),
      );
      sendExtensionMessage({
        action: 'updateProfile',
        data: { subscriptions: [...newSubscriptions] }
      })
    } else {
      if (response?.data) {
        if (response.status === 401) {
          yield put(ErrorsActions.errorSave(null));
        } else if (response.status === 500) {
          yield put(OnboardingActions.deleteSubscriptionFailure(true));
          yield put(ErrorsActions.errorSave(response.data));
        } else {
          yield put(ErrorsActions.errorSave(response.data));
        }
      } else {
        yield put(ErrorsActions.errorSave('Server response error'));
      }
      yield put(OnboardingActions.onBoardingFetchingReset());
    }

    if (response?.status === 401) {
      const res = yield call(authApi.tokenRefresh);
      if (res && res.access) {
        yield put(AuthActions.updateTokens(res.access, res.refresh));
        yield* deleteSubscription(api, authApi, { categoryId });
      } else {
        yield put(AuthActions.logout());
        yield put(push('/login'));
      }
    }
  } catch (e) {
    yield put(OnboardingActions.onBoardingFetchingReset());
    yield put(ErrorsActions.errorSave(`Server response error: ${e}`));
  }
}

export function* undoDeleteSubscription(api, authApi, { data }) {
  try {
    const response = yield call(api.undoDeleteSubscription, data);
    const userInfo = yield select(AuthSelectors.getUserInfo);
    if (response?.ok && response?.data?.subscription?.id) {
      yield put(OnboardingActions.undoDeleteSubscriptionSuccess(response.data));

      const newSubscriptions = userInfo.subscriptions.map(
        subscription => (subscription.id === response.data.subscription.id)
          ? response.data.subscription
          : subscription
      );
      yield put(
        AuthActions.updateProfile({ subscriptions: [...newSubscriptions] }),
      );
      sendExtensionMessage({
        action: 'updateProfile',
        data: { subscriptions: [...newSubscriptions] }
      })
    } else {
      if (response?.data) {
        if (response.status === 401) {
          yield put(ErrorsActions.errorSave(null));
        } else if (response.status === 500) {
          yield put(OnboardingActions.undoDeleteSubscriptionFailure(true));
          yield put(ErrorsActions.errorSave(response.data));
        } else {
          yield put(ErrorsActions.errorSave(response.data));
        }
      } else {
        yield put(ErrorsActions.errorSave('Server response error'));
      }
      yield put(OnboardingActions.onBoardingFetchingReset());
    }

    if (response?.status === 401) {
      const res = yield call(authApi.tokenRefresh);
      if (res && res.access) {
        yield put(AuthActions.updateTokens(res.access, res.refresh));
        yield* undoDeleteSubscription(api, authApi, { data });
      } else {
        yield put(AuthActions.logout());
        yield put(push('/login'));
      }
    }
  } catch (e) {
    yield put(OnboardingActions.onBoardingFetchingReset());
    yield put(ErrorsActions.errorSave(`Server response error: ${e}`));
  }
}

export function* cancelSub(api, authApi, { subscriptionId }) {
  try {
    const response = yield call(api.cancelSub, subscriptionId);
    const userInfo = yield select(AuthSelectors.getUserInfo);
    if (response?.ok && response?.data?.subscription?.id) {
      yield put(OnboardingActions.cancelSubSuccess(response.data));
      const newSubscriptions = userInfo.subscriptions.map(
        subscription => (subscription.id === response.data.subscription.id)
          ? response.data.subscription
          : subscription
      );
      yield put(
        AuthActions.updateProfile({ subscriptions: [...newSubscriptions] }),
      );
      sendExtensionMessage({
        action: 'updateProfile',
        data: { subscriptions: [...newSubscriptions] }
      })

    } else {
      if (response?.data) {
        if (response.status === 401) {
          yield put(ErrorsActions.errorSave(null));
        } else if (response.status === 500) {
          yield put(OnboardingActions.cancelSubFailure(true));
          yield put(ErrorsActions.errorSave(response.data));
        } else {
          yield put(ErrorsActions.errorSave(response.data));
        }
      } else {
        yield put(ErrorsActions.errorSave('Server response error'));
      }
      yield put(OnboardingActions.onBoardingFetchingReset());
    }

    if (response?.status === 401) {
      const res = yield call(authApi.tokenRefresh);
      if (res && res.access) {
        yield put(AuthActions.updateTokens(res.access, res.refresh));
        yield* cancelSub(api, authApi, { subscriptionId });
      } else {
        yield put(AuthActions.logout());
        yield put(push('/login'));
      }
    }
  } catch (e) {
    yield put(OnboardingActions.onBoardingFetchingReset());
    yield put(ErrorsActions.errorSave(`Server response error: ${e}`));
  }
}

export function* cancelTrial(api, authApi, { data }) {
  try {
    const response = yield call(api.cancelTrial, data);
    const userInfo = yield select(AuthSelectors.getUserInfo);
    if (response?.ok && response?.data?.subscription?.id) {
      yield put(OnboardingActions.cancelTrialSuccess(response.data));
      const newSubscriptions = [response?.data?.subscription];

      if(response?.data?.card?.payment_source){
        const {
          brand,
          expiry_month,
          expiry_year,
          first_name,
          last_name,
          last4
        } = response?.data?.card?.payment_source?.card

        yield put(
          AuthActions.updateProfile({
            ...userInfo,
            subscriptions: [...newSubscriptions],
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
      }else{
        yield put(
          AuthActions.updateProfile({
            subscriptions: [...newSubscriptions],
          }),
        );
      }
      sendExtensionMessage({
        action: 'updateProfile',
        data: { subscriptions: [...newSubscriptions] }
      })
    } else {
      if (response?.data) {
        if (response.status === 401) {
          yield put(ErrorsActions.errorSave(null));
        } else if (response.status === 500) {
          yield put(ErrorsActions.errorSave(response.data));
        } else {
          yield put(ErrorsActions.errorSave(response.data));
        }
        yield put(OnboardingActions.cancelTrialFailure(true));
      } else {
        yield put(ErrorsActions.errorSave('Server response error'));
      }
      yield put(OnboardingActions.onBoardingFetchingReset());
    }

    if (response?.status === 401) {
      const res = yield call(authApi.tokenRefresh);
      if (res && res.access) {
        yield put(AuthActions.updateTokens(res.access, res.refresh));
        yield* cancelTrial(api, authApi, { data });
      } else {
        yield put(AuthActions.logout());
        yield put(push('/login'));
      }
    }
  } catch (e) {
    yield put(OnboardingActions.onBoardingFetchingReset());
    yield put(ErrorsActions.errorSave(`Server response error: ${e}`));
  }
}

export function* undoCancelSub(api, authApi, { subscriptionId }) {
  try {
    const response = yield call(api.undoCancelSub, subscriptionId);
    const userInfo = yield select(AuthSelectors.getUserInfo);
    if (response?.ok && response?.data?.subscription?.id) {
      yield put(OnboardingActions.undoCancelSubSuccess(response.data));

      const newSubscriptions = userInfo.subscriptions.map(
        subscription => (subscription.id === response.data.subscription.id)
          ? response.data.subscription
          : subscription
      );
      yield put(
        AuthActions.updateProfile({ subscriptions: [...newSubscriptions] }),
      );
      sendExtensionMessage({
        action: 'updateProfile',
        data: { subscriptions: [...newSubscriptions] }
      })
    } else {
      if (response?.data) {
        if (response.status === 401) {
          yield put(ErrorsActions.errorSave(null));
        } else if (response.status === 500) {
          yield put(OnboardingActions.undoCancelSubFailure(true));
          yield put(ErrorsActions.errorSave(response.data));
        } else {
          yield put(ErrorsActions.errorSave(response.data));
        }
      } else {
        yield put(ErrorsActions.errorSave('Server response error'));
      }
      yield put(OnboardingActions.onBoardingFetchingReset());
    }

    if (response?.status === 401) {
      const res = yield call(authApi.tokenRefresh);
      if (res && res.access) {
        yield put(AuthActions.updateTokens(res.access, res.refresh));
        yield* undoCancelSub(api, authApi, { subscriptionId });
      } else {
        yield put(AuthActions.logout());
        yield put(push('/login'));
      }
    }
  } catch (e) {
    yield put(OnboardingActions.onBoardingFetchingReset());
    yield put(ErrorsActions.errorSave(`Server response error: ${e}`));
  }
}

export function* undoPauseSub(api, authApi, { subscriptionId }) {
  try {
    const response = yield call(api.undoPauseSub, subscriptionId);
    const userInfo = yield select(AuthSelectors.getUserInfo);
    if (response?.ok && response?.data?.subscription?.id) {
      yield put(OnboardingActions.undoPauseSubSuccess(response.data));

      const newSubscriptions = userInfo.subscriptions.map(
        subscription => (subscription.id === response.data.subscription.id)
          ? response.data.subscription
          : subscription
      );
      yield put(
        AuthActions.updateProfile({ subscriptions: [...newSubscriptions] }),
      );
      sendExtensionMessage({
        action: 'updateProfile',
        data: { subscriptions: [...newSubscriptions] }
      })
    } else {
      if (response?.data) {
        if (response.status === 401) {
          yield put(ErrorsActions.errorSave(null));
        } else if (response.status === 500) {
          yield put(OnboardingActions.undoPauseSubFailure(true));
          yield put(ErrorsActions.errorSave(response.data));
        } else {
          yield put(ErrorsActions.errorSave(response.data));
        }
      } else {
        yield put(ErrorsActions.errorSave('Server response error'));
      }
      yield put(OnboardingActions.onBoardingFetchingReset());
    }

    if (response?.status === 401) {
      const res = yield call(authApi.tokenRefresh);
      if (res && res.access) {
        yield put(AuthActions.updateTokens(res.access, res.refresh));
        yield* undoCancelSub(api, authApi, { subscriptionId });
      } else {
        yield put(AuthActions.logout());
        yield put(push('/login'));
      }
    }
  } catch (e) {
    yield put(OnboardingActions.onBoardingFetchingReset());
    yield put(ErrorsActions.errorSave(`Server response error: ${e}`));
  }
}

export function* getQuestionsData(api, authApi, {}) {
  try {
    const response = yield call(api.getQuestionsData);
    if (response?.ok) {
      yield put(OnboardingActions.questionsDataSuccess(response.data));
    } else {
      if (response?.data) {
        if (response.status === 401) {
          yield put(ErrorsActions.errorSave(null));
        } else if (response.status === 500) {
          yield put(ErrorsActions.errorSave('Server response error'));
        } else {
          yield put(ErrorsActions.errorSave(response.data));
        }
      } else {
        yield put(ErrorsActions.errorSave('Server response error'));
      }
      yield put(OnboardingActions.onBoardingFetchingReset());
    }

    if (response?.status === 401) {
      const res = yield call(authApi.tokenRefresh);
      if (res && res.access) {
        yield put(AuthActions.updateTokens(res.access, res.refresh));
        yield* getQuestionsData(api, authApi, {});
      } else {
        yield put(AuthActions.logout());
        yield put(push('/login'));
      }
    }
  } catch (e) {
    yield put(OnboardingActions.onBoardingFetchingReset());
    yield put(ErrorsActions.errorSave(`Server response error: ${e}`));
  }
}

export function* createIntent(api, authApi, { data }) {
  try {
    const response = yield call(api.createIntent, data);

    if (response?.ok) {
      yield put(OnboardingActions.createIntentSuccess(response.data['payment_intent']));
    } else {
      if (response?.data) {
        if (response.status === 401) {
          yield put(ErrorsActions.errorSave(null));
        } else if (response.status === 500) {
          yield put(OnboardingActions.createIntentFailure(true));
          yield put(ErrorsActions.errorSave(response.data));
        } else {
          yield put(OnboardingActions.createIntentFailure(true));
          yield put(ErrorsActions.errorSave(response.data));
        }
      } else {
        yield put(OnboardingActions.createIntentFailure(true));
        yield put(ErrorsActions.errorSave('Server response error'));
      }
      yield put(OnboardingActions.onBoardingFetchingReset());
    }

    if (response?.status === 401) {
      const res = yield call(authApi.tokenRefresh);
      if (res && res.access) {
        yield put(AuthActions.updateTokens(res.access, res.refresh));
        yield* createIntent(api, authApi, { data });
      } else {
        yield put(AuthActions.logout());
        yield put(push('/login'));
      }
    }
  } catch (e) {
    yield put(OnboardingActions.onBoardingFetchingReset());
    yield put(ErrorsActions.errorSave(`Server response error: ${e}`));
  }
}
