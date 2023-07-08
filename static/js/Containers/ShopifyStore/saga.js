import { takeLatest, put, call } from 'redux-saga/effects';

import * as services from './services';
import Creators, { ShopifyStoreTypes as constants } from './reducer';
import ProductDetailsCreators from '../ProductDetailsPage/reducer';

import utils from '../../Utils/utils'
import { sendExtensionMessage } from '../../Utils/extension';

const actions = {
  checkOauthActions: {
    request: Creators.checkOauthRequest,
    success: Creators.checkOauthSuccess,
    errors: Creators.checkOauthFailure,
  },
  getShopifyStoresActions: {
    request: Creators.getShopifyStoresRequest,
    success: Creators.getShopifyStoresSuccess,
    errors: Creators.getShopifyStoresFailure,
  },
  getShopifyStoreInfoActions: {
    request: Creators.getShopifyStoreInfoRequest,
    success: Creators.getShopifyStoreInfoSuccess,
    errors: Creators.getShopifyStoreInfoFailure,
  },
  getBundlesActions: {
    request: Creators.getBundlesRequest,
    success: Creators.getBundlesSuccess,
    errors: Creators.getBundlesFailure,
  },
  verifyShopifyStoreActions: {
    request: Creators.verifyShopifyStoreRequest,
    success: Creators.verifyShopifyStoreSuccess,
    errors: Creators.verifyShopifyStoreFailure,
  },
  deleteShopifyStoreActions: {
    request: Creators.deleteShopifyStoreRequest,
    success: Creators.deleteShopifyStoreSuccess,
    errors: Creators.deleteShopifyStoreFailure,
  },
  createChargeShopifyStoreActions: {
    request: Creators.createChargeShopifyStoreRequest,
    success: Creators.createChargeShopifyStoreSuccess,
    errors: Creators.createChargeShopifyStoreFailure,
  },
  checkChargeShopifyActions: {
    request: Creators.checkChargeShopifyRequest,
    success: Creators.checkChargeShopifySuccess,
    errors: Creators.checkChargeShopifyFailure,
  },
  importProductShopifyStoreActions: {
    request: Creators.importProductShopifyStoreRequest,
    success: Creators.importProductShopifyStoreSuccess,
    errors: Creators.importProductShopifyStoreFailure,
  },
};

const eventsOptions = {
  [constants.CHECK_OAUTH_REQUEST]: {
    api: services.checkOauth,
    actions: actions.checkOauthActions,
  },
  [constants.GET_SHOPIFY_STORES_REQUEST]: {
    api: services.getShopifyStores,
    actions: actions.getShopifyStoresActions,
  },
  [constants.GET_SHOPIFY_STORE_INFO_REQUEST]: {
    api: services.getShopifyStoreInfo,
    actions: actions.getShopifyStoreInfoActions,
  },
  [constants.GET_BUNDLES_REQUEST]: {
    api: services.getBundles,
    actions: actions.getBundlesActions,
  },
  [constants.VERIFY_SHOPIFY_STORE_REQUEST]: {
    api: services.verifyShopifyStore,
    actions: actions.verifyShopifyStoreActions,
  },
  [constants.DELETE_SHOPIFY_STORE_REQUEST]: {
    api: services.deleteShopifyStore,
    actions: actions.deleteShopifyStoreActions,
  },
  [constants.CREATE_CHARGE_SHOPIFY_STORE_REQUEST]: {
    api: services.createChargeShopifyStore,
    actions: actions.createChargeShopifyStoreActions,
  },
  [constants.CHECK_CHARGE_SHOPIFY_REQUEST]: {
    api: services.checkChargeShopify,
    actions: actions.checkChargeShopifyActions,
  },
  [constants.IMPORT_PRODUCT_SHOPIFY_STORE_REQUEST]: {
    api: services.importProductShopifyStore,
    actions: actions.importProductShopifyStoreActions,
  },
};

function* apiGenerator(action) {
  const provider = eventsOptions[action.type];
  try {
    const params = action.payload;
    const response = yield call(provider.api, params);

    if (response.ok) {
      if(response.data){
        if(action.type === constants.IMPORT_PRODUCT_SHOPIFY_STORE_REQUEST){
          yield put(ProductDetailsCreators.updateProductShopifyUrl(response.data))
        }

        if(action.type === constants.CREATE_CHARGE_SHOPIFY_STORE_REQUEST){
          if(response?.data?.['charge_url']) utils.goLink(response.data['charge_url'], '_top')
        }

        if (action.type === constants.IMPORT_PRODUCT_SHOPIFY_STORE_REQUEST && response.status === 206) yield put(provider.actions.success({...response.data, isTrial: true}))
        else yield put(provider.actions.success(response.data));

        if(['VERIFY_SHOPIFY_STORE_REQUEST', 'DELETE_SHOPIFY_STORE_REQUEST'].some(el => action.type)){
        sendExtensionMessage({
          action: 'updateUserShopifyStores',
          data: response.data
        })
        }
      }else{
        yield put(provider.actions.success());
      }
    } else {
      if(action.type === constants.IMPORT_PRODUCT_SHOPIFY_STORE_REQUEST){
        yield put(provider.actions.errors({ errors: response?.data?.message || 'some error' }));
      }else{
        yield put(provider.actions.errors({ errors: response?.data?.message?.detail || 'some error' }));
      }
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_SHOPIFY_STORES_REQUEST, apiGenerator);
  yield takeLatest(constants.VERIFY_SHOPIFY_STORE_REQUEST, apiGenerator);
  yield takeLatest(constants.DELETE_SHOPIFY_STORE_REQUEST, apiGenerator);
  yield takeLatest(constants.CREATE_CHARGE_SHOPIFY_STORE_REQUEST, apiGenerator);
  yield takeLatest(constants.CHECK_CHARGE_SHOPIFY_REQUEST, apiGenerator);
  yield takeLatest(constants.IMPORT_PRODUCT_SHOPIFY_STORE_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_BUNDLES_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_SHOPIFY_STORE_INFO_REQUEST, apiGenerator);
  yield takeLatest(constants.CHECK_OAUTH_REQUEST, apiGenerator);
}
