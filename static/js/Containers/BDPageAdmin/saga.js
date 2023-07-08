import { takeLatest, put, call } from 'redux-saga/effects';

import * as services from './services';
import Creators, { BdTypes as constants } from './reducer';

const actions = {
  getBdListActions: {
    request: Creators.getBdListRequest,
    success: Creators.getBdListSuccess,
    errors: Creators.getBdListNextFailure,
  },
  getBdListNextActions: {
    request: Creators.getBdListNextRequest,
    success: Creators.getBdListNextSuccess,
    errors: Creators.getBdListNextFailure,
  },
  getBdIconsActions: {
    request: Creators.getBdIconsRequest,
    success: Creators.getBdIconsSuccess,
    errors: Creators.getBdIconsFailure,
  },
  getBdIconsNextActions: {
    request: Creators.getBdIconsNextRequest,
    success: Creators.getBdIconsNextSuccess,
    errors: Creators.getBdIconsNextFailure,
  },
  createBdCardActions: {
    request: Creators.createBdCardRequest,
    success: Creators.createBdCardSuccess,
    errors: Creators.createBdCardFailure,
  },
  changeBdCardActions: {
    request: Creators.changeBdCardRequest,
    success: Creators.changeBdCardSuccess,
    errors: Creators.changeBdCardFailure,
  },
  deleteBdCardActions: {
    request: Creators.deleteBdCardRequest,
    success: Creators.deleteBdCardSuccess,
    errors: Creators.deleteBdCardFailure,
  },
};

const eventsOptions = {
  [constants.GET_BD_LIST_REQUEST]: {
    api: services.getBdList,
    actions: actions.getBdListActions,
  },
  [constants.GET_BD_LIST_NEXT_REQUEST]: {
    api: services.getBdListNext,
    actions: actions.getBdListNextActions,
  },
  [constants.GET_BD_ICONS_REQUEST]: {
    api: services.getBdIcons,
    actions: actions.getBdIconsActions,
  },
  [constants.GET_BD_ICONS_NEXT_REQUEST]: {
    api: services.getBdIconsNext,
    actions: actions.getBdIconsNextActions,
  },
  [constants.CREATE_BD_CARD_REQUEST]: {
    api: services.createBdCard,
    actions: actions.createBdCardActions,
  },
  [constants.CHANGE_BD_CARD_REQUEST]: {
    api: services.changeBdCard,
    actions: actions.changeBdCardActions,
  },
  [constants.DELETE_BD_CARD_REQUEST]: {
    api: services.deleteBdCard,
    actions: actions.deleteBdCardActions,
  },
};

function* apiGenerator(action) {
  const provider = eventsOptions[action.type];
  const params = action.payload;

  try {
    const response = yield call(provider.api, params);

    if (response.data && response.ok) {
      yield put(provider.actions.success(response.data));
    } else if (!response.data && response.ok) {
      yield put(provider.actions.success(response.data));
    } else {
      yield put(provider.actions.errors({ errors: 'Server response error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_BD_LIST_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_BD_LIST_NEXT_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_BD_ICONS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_BD_ICONS_NEXT_REQUEST, apiGenerator);
  yield takeLatest(constants.CREATE_BD_CARD_REQUEST, apiGenerator);
  yield takeLatest(constants.CHANGE_BD_CARD_REQUEST, apiGenerator);
  yield takeLatest(constants.DELETE_BD_CARD_REQUEST, apiGenerator);
}
