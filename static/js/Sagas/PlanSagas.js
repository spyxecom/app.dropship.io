/* eslint-disable no-empty-pattern */
import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import PlanActions from '../Redux/PlanRedux';
import AuthActions from '../Containers/LoginPage/reducer';
import ErrorsActions from '../Redux/ErrorsRedux';

export function* getPlans(api, authApi, {}) {
  try {
    const response = yield call(api.getPlans);
    if (response && response.ok) {
      // let mapSubscriptions = response.data.reduce((accumulator, currentValue) => ({...accumulator, [currentValue.id]: {...currentValue}}), {})

      yield put(PlanActions.plansSuccess(response.data));
    } else {
      if (response && response.data) {
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
      yield put(PlanActions.planFetchingReset());
    }

    if (response && response.status === 401) {
      const res = yield call(authApi.tokenRefresh);
      if (res && res.access) {
        yield put(AuthActions.updateTokens(res.access, res.refresh));
        yield* getPlans(api, authApi, {});
      } else {
        yield put(AuthActions.logout());
        yield put(push('/login'));
      }
    }
  } catch (e) {
    yield put(PlanActions.planFetchingReset());
    yield put(ErrorsActions.errorSave(`Server response error: ${e}`));
  }
}
