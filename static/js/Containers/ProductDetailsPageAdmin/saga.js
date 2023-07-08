/*Admin ProductDetails Page sagas*/

import { takeLatest, put, call, delay } from 'redux-saga/effects';

import * as services from './services';
import Creators, { ProductDetailsAdminTypes as constants } from './reducer';

import React from 'react';
import { push } from 'connected-react-router';
import { openNotificationWithIcon } from '../../Components/Notification/index';
import { DefaultMsg } from '../../Components/Notification/notification-message';
//import { EventHandler } from '../../Utils/event-handler';

const actions = {
  getProductDetailsAdminActions: {
    request: Creators.getProductDetailsAdminRequest,
    success: Creators.getProductDetailsAdminSuccess,
    errors: Creators.getProductDetailsAdminFailure,
  },
  getProductDetailsAdminShopifyActions: {
    request: Creators.getProductDetailsAdminShopifyRequest,
    success: Creators.getProductDetailsAdminShopifySuccess,
    errors: Creators.getProductDetailsAdminShopifyFailure,
  },
  deleteProductDetailsAdminActions: {
    request: Creators.deleteProductDetailsAdminRequest,
    success: Creators.deleteProductDetailsAdminSuccess,
    errors: Creators.deleteProductDetailsAdminFailure,
  },
  changeStatusProductDetailsAdminActions: {
    request: Creators.changeStatusProductDetailsAdminRequest,
    success: Creators.changeStatusProductDetailsAdminSuccess,
    errors: Creators.changeStatusProductDetailsAdminFailure,
  },
  updateProductDetailsAdminActions: {
    request: Creators.updateProductDetailsAdminRequest,
    success: Creators.updateProductDetailsAdminSuccess,
    errors: Creators.updateProductDetailsAdminFailure,
  },
  deleteImageActions: {
    request: Creators.deleteImageRequest,
    success: Creators.deleteImageSuccess,
    errors: Creators.deleteImageFailure,
  },
  addCompetitorsActions: {
    request: Creators.addCompetitorsRequest,
    success: Creators.addCompetitorsSuccess,
    errors: Creators.addCompetitorsFailure,
  },
  deleteCompetitorsActions: {
    request: Creators.deleteCompetitorsRequest,
    success: Creators.deleteCompetitorsSuccess,
    errors: Creators.deleteCompetitorsFailure,
  },
  uploadImageActions: {
    request: Creators.uploadImageRequest,
    success: Creators.uploadImageSuccess,
    errors: Creators.uploadImageFailure,
  },
  addSupplierActions: {
    request: Creators.addSupplierRequest,
    success: Creators.addSupplierSuccess,
    errors: Creators.addSupplierFailure,
  },
  deleteSupplierActions: {
    request: Creators.deleteSupplierRequest,
    success: Creators.deleteSupplierSuccess,
    errors: Creators.deleteSupplierFailure,
  },
  getBdActions: {
    request: Creators.getBdRequest,
    success: Creators.getBdSuccess,
    errors: Creators.getBdFailure,
  },
  getBdNextActions: {
    request: Creators.getBdNextRequest,
    success: Creators.getBdNextSuccess,
    errors: Creators.getBdNextFailure,
  },
  addBdActions: {
    request: Creators.addBdRequest,
    success: Creators.addBdSuccess,
    errors: Creators.addBdFailure,
  },
  deleteBdActions: {
    request: Creators.deleteBdRequest,
    success: Creators.deleteBdSuccess,
    errors: Creators.deleteBdFailure,
  },
  getInterestTargetActions: {
    request: Creators.getInterestTargetRequest,
    success: Creators.getInterestTargetSuccess,
    errors: Creators.getInterestTargetFailure,
  },
  getInterestTargetNextActions: {
    request: Creators.getInterestTargetNextRequest,
    success: Creators.getInterestTargetNextSuccess,
    errors: Creators.getInterestTargetNextFailure,
  },
  getShopifyTargetNextActions: {
    request: Creators.getShopifyTargetNextRequest,
    success: Creators.getShopifyTargetNextSuccess,
    errors: Creators.getShopifyTargetNextFailure,
  },
  changeInterestTargetActions: {
    request: Creators.changeInterestTargetRequest,
    success: Creators.changeInterestTargetSuccess,
    errors: Creators.changeInterestTargetFailure,
  },
  changeShopifyTargetActions: {
    request: Creators.changeShopifyTargetRequest,
    success: Creators.changeShopifyTargetSuccess,
    errors: Creators.changeShopifyTargetFailure,
  },
};

const eventsOptions = {
  [constants.GET_PRODUCT_DETAILS_ADMIN_REQUEST]: {
    api: services.getProductDetailsAdmin,
    actions: actions.getProductDetailsAdminActions,
  },
  [constants.GET_PRODUCT_DETAILS_ADMIN_SHOPIFY_REQUEST]: {
    api: services.getProductDetailsAdminShopify,
    actions: actions.getProductDetailsAdminShopifyActions,
  },
  [constants.DELETE_PRODUCT_DETAILS_ADMIN_REQUEST]: {
    api: services.deleteProductDetailsAdmin,
    actions: actions.deleteProductDetailsAdminActions,
    openNotification: ({ key }) => {
      openNotificationWithIcon({
        key,
        style: { minWidth: '716px' },
        className: 'notification notification_delete',
        message: (
          <DefaultMsg
            text={
              <span className="restore-modal-notification">
                Product has been removed!
              </span>
            }
            icon="notification_delete"
          />
        ),
      });
    },
  },
  [constants.UPDATE_PRODUCT_DETAILS_ADMIN_REQUEST]: {
    api: services.updateProductDetailsAdmin,
    actions: actions.updateProductDetailsAdminActions,
    openNotification: ({ key }) => {
      openNotificationWithIcon({
        key,
        style: { minWidth: '716px' },
        className: 'notification notification--save',
        message: (
          <DefaultMsg
            text={
              <span className="restore-modal-notification">
                Product has been successfully saved!
              </span>
            }
            icon="bookmark"
            iconOutline={true}
          />
        ),
      });
    },
  },
  [constants.CHANGE_STATUS_PRODUCT_DETAILS_ADMIN_REQUEST]: {
    api: services.updateProductDetailsAdmin,
    actions: actions.changeStatusProductDetailsAdminActions,
  },
  [constants.DELETE_IMAGE_REQUEST]: {
    api: services.deleteAddImage,
    actions: actions.deleteImageActions,
  },
  [constants.UPLOAD_IMAGE_REQUEST]: {
    api: services.uploadImage,
    actions: actions.uploadImageActions,
  },
  [constants.ADD_COMPETITORS_REQUEST]: {
    api: services.addCompetitors,
    actions: actions.addCompetitorsActions,
  },
  [constants.DELETE_COMPETITORS_REQUEST]: {
    api: services.deleteCompetitors,
    actions: actions.deleteCompetitorsActions,
  },
  [constants.ADD_SUPPLIER_REQUEST]: {
    api: services.addSupplier,
    actions: actions.addSupplierActions,
  },
  [constants.DELETE_SUPPLIER_REQUEST]: {
    api: services.deleteSupplier,
    actions: actions.deleteSupplierActions,
  },
  [constants.GET_BD_REQUEST]: {
    api: services.getBdDetails,
    actions: actions.getBdActions,
  },
  [constants.GET_BD_NEXT_REQUEST]: {
    api: services.getBdNext,
    actions: actions.getBdNextActions,
  },

  [constants.ADD_BD_REQUEST]: {
    api: services.addBdDetails,
    actions: actions.addBdActions,
  },
  [constants.DELETE_BD_REQUEST]: {
    api: services.deleteBdDetails,
    actions: actions.deleteBdActions,
  },
  [constants.GET_INTEREST_TARGET_REQUEST]: {
    api: services.getInterestTarget,
    actions: actions.getInterestTargetActions,
  },
  [constants.GET_INTEREST_TARGET_NEXT_REQUEST]: {
    api: services.getInterestTargetNext,
    actions: actions.getInterestTargetNextActions,
  },
  [constants.GET_SHOPIFY_TARGET_NEXT_REQUEST]: {
    api: services.getShopifyTargetNext,
    actions: actions.getShopifyTargetNextActions,
  },
  [constants.CHANGE_INTEREST_TARGET_REQUEST]: {
    api: services.changeInterestTarget,
    actions: actions.changeInterestTargetActions,
  },
  [constants.CHANGE_SHOPIFY_TARGET_REQUEST]: {
    api: services.changeShopifyTarget,
    actions: actions.changeShopifyTargetActions,
  },
};

function* apiGenerator(action) {
  const provider = eventsOptions[action.type];
  try {
    const params = action.payload;
    const response = yield call(provider.api, params);

    if (response.data && response.ok) {
      yield put(provider.actions.success(response.data));
    } else {
      yield put(provider.actions.errors({ errors: 'some error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

function* apiGeneratorWithNotification(action) {
  const provider = eventsOptions[action.type];
  const params = action.payload;

  const key = `open${params.product_id}`;

  try {
    const response = yield call(provider.api, params);

    if (response?.data || response.status === 204) {
      yield put(provider.actions.success(response?.data || true));

      if (action.type !== 'UPDATE_PRODUCT_DETAILS_ADMIN_REQUEST') {
        yield put(
          push(`/admin/portfolio/product-list/?drop_id=${params.drop_id}`),
        );
      }
      yield delay(500);
      yield call(provider.openNotification, { key });
    } else {
      yield put(provider.actions.errors({ errors: 'error' }));
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_PRODUCT_DETAILS_ADMIN_REQUEST, apiGenerator);
  yield takeLatest(constants.DELETE_PRODUCT_DETAILS_ADMIN_REQUEST, apiGeneratorWithNotification);
  yield takeLatest(constants.UPDATE_PRODUCT_DETAILS_ADMIN_REQUEST, apiGeneratorWithNotification);

  yield takeLatest(constants.GET_PRODUCT_DETAILS_ADMIN_SHOPIFY_REQUEST, apiGenerator);

  yield takeLatest(
    constants.CHANGE_STATUS_PRODUCT_DETAILS_ADMIN_REQUEST,
    apiGenerator,
  );
  yield takeLatest(constants.DELETE_IMAGE_REQUEST, apiGenerator);
  yield takeLatest(constants.UPLOAD_IMAGE_REQUEST, apiGenerator);

  yield takeLatest(constants.ADD_COMPETITORS_REQUEST, apiGenerator);
  yield takeLatest(constants.DELETE_COMPETITORS_REQUEST, apiGenerator);
  yield takeLatest(constants.ADD_SUPPLIER_REQUEST, apiGenerator);
  yield takeLatest(constants.DELETE_SUPPLIER_REQUEST, apiGenerator);

  yield takeLatest(constants.GET_BD_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_BD_NEXT_REQUEST, apiGenerator);
  yield takeLatest(constants.ADD_BD_REQUEST, apiGenerator);
  yield takeLatest(constants.DELETE_BD_REQUEST, apiGenerator);

  yield takeLatest(constants.GET_INTEREST_TARGET_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_INTEREST_TARGET_NEXT_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_SHOPIFY_TARGET_NEXT_REQUEST, apiGenerator);
  yield takeLatest(constants.CHANGE_INTEREST_TARGET_REQUEST, apiGenerator);

  yield takeLatest(constants.CHANGE_SHOPIFY_TARGET_REQUEST, apiGenerator);
}
