// SAVE/UNSAVE PRODUCT TO COLLECTION
import { call, put, select } from 'redux-saga/effects';

// REDUCERS
import ProductCreators, {ProductsSelectors} from '../../ProductsPage/reducer';
import Creators, {
  CollectionsTypes as constants,
} from '../reducer';
import ProductDetailsCreators from '../../ProductDetailsPage/reducer'

import { EventHandler } from '../../../Utils/event-handler';

// SERVICE
import * as services from '../service';

// COMPONENTS
import {
  openCollectionListNotification,
  openDefaultNotification,
  unSaveNotification,
} from '../notifications';

const actions = {
  addToCollectionActions: {
    request: Creators.addToCollectionRequest,
    success: Creators.addToCollectionSuccess,
    errors: Creators.addToCollectionFailure,
  },
  removeFromCollectionActions: {
    request: Creators.removeFromCollectionRequest,
    success: Creators.removeFromCollectionSuccess,
    errors: Creators.removeFromCollectionFailure,
  },
};

const eventsOptions = {
  [constants.ADD_TO_COLLECTION_REQUEST]: {
    api: services.addToCollection,
    actions: actions.addToCollectionActions,
  },
  [constants.REMOVE_FROM_COLLECTION_REQUEST]: {
    api: services.removeFromCollection,
    actions: actions.removeFromCollectionActions,
  },
};

export function* saveUnsaveGenerator(action) {
  const provider = eventsOptions[action.type];
  const params = action.payload;
  const isSave = action.type === constants.ADD_TO_COLLECTION_REQUEST;
  const products = yield select(ProductsSelectors.getProducts)

  try {
    const response = yield call(provider.api, params);

    if (response.data) {
      // eslint-disable-next-line camelcase
      const { message, saved_to, status_code } = response.data;

      // TODO: fix this after update structure
      // eslint-disable-next-line no-throw-literal,camelcase
      if (status_code === 404)
        throw new Error('saveUnsaveGenerator Error from server');

      yield put(provider.actions.success(response.data));

      // SAVE
      if (isSave) {
        // save when click on collection item in modal
        if (params.isCollectionList) {
          yield put(Creators.saveCollection({collectionID: saved_to.id, collectionName: saved_to.name}))
          yield call(openCollectionListNotification, {
            message,
            collection: saved_to,
          }); // collection list notification

          // CLOSE LIST MODAL
          yield call(EventHandler.emit, 'close-list-modal');
        } else {
          // save when click on bookmark
          yield call(openDefaultNotification, { params, isSave }); // default notification
        }
        // UNSAVE
      } else {
        yield call(unSaveNotification, { message, collection: saved_to }); // unsave notification
      }

      // UPDATE PRODUCT
      if(products){
        yield put(
          ProductCreators.updateProduct({ product: response.data.product}),
        );
      }
      yield put(
        ProductDetailsCreators.updateProductSaved({ product: response.data.product }),
      );
    } else {
      yield put(
        provider.actions.errors({ errors: 'saveUnsaveGenerator error' }),
      );
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default saveUnsaveGenerator;
