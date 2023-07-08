import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {
  openCollectionModal,
  closeCollectionModal,
  addToCollectionRequest,
  addToCollectionSuccess,
  addToCollectionFailure,
  openNotificationAdd,
  closeNotificationAdd,
  createCollectionRequest,
  createCollectionSuccess,
  createCollectionFailure,
  getCollectionsRequest,
  getCollectionsSuccess,
  getCollectionsFailure,
  getProductsNextRequest,
  getProductsNextSuccess,
  getProductsNextFailure,
  getNextCollectionsRequest,
  getNextCollectionsSuccess,
  getNextCollectionsFailure,
  getProductsSuccess,
  getProductsRequest,
  getProductsFailure,
  removeCollectionRequest,
  removeCollectionSuccess,
  removeCollectionFailure,
  removeCollection,
  removeFromCollectionFailure,
  removeFromCollectionRequest,
  removeFromCollectionSuccess,
  saveCollection,
  clearProductData,
  renameCollectionRequest,
  renameCollectionSuccess,
  renameCollectionFailure,
  restoreCollectionRequest,
  restoreCollectionSuccess,
  restoreCollectionFailure,
  setAsDefaultCollectionRequest,
  setAsDefaultCollectionSuccess,
  setAsDefaultCollectionFailure,
} from './reducersFunc';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    openCollectionModal: null,
    closeCollectionModal: null,

    openNotificationAdd: null,
    closeNotificationAdd: null,

    addToCollectionRequest: ['payload'], // payload: { productID, productName,
    // collectionID, collectionName, isNewCollection, isCollectionList };
    addToCollectionSuccess: ['payload'], // payload: { data }
    addToCollectionFailure: ['payload'], // payload: { errors }

    removeFromCollectionRequest: ['payload'], // payload: { productID, productName, collectionID };
    removeFromCollectionSuccess: ['payload'], // payload: { data }
    removeFromCollectionFailure: ['payload'], // payload: { errors }

    renameCollectionRequest: ['payload'], // payload: { collectionName, collectionID };
    renameCollectionSuccess: ['payload'], // payload: { data }
    renameCollectionFailure: ['payload'], // payload: { errors }

    removeCollectionRequest: ['payload'], // payload: {  collectionID };
    removeCollectionSuccess: ['payload'], // payload: { data }
    removeCollectionFailure: ['payload'], // payload: { errors }

    saveCollection: ['payload'], // payload: {  collectionID };
    removeCollection: null,

    clearProductData: null,

    restoreCollectionRequest: ['payload'], // payload: {  collectionID }
    restoreCollectionSuccess: ['payload'], // payload: { data }
    restoreCollectionFailure: ['payload'], // payload: { errors }

    setCollectionAsDefaultRequest: ['payload'], // payload: { collectionID };
    setCollectionAsDefaultSuccess: ['payload'], // payload: { data }
    setCollectionAsDefaultFailure: ['payload'], // payload: { errors }

    getCollectionsRequest: ['payload'], // payload: { params } -> page_size, collection_id, etc.
    getCollectionsSuccess: ['payload'], // payload: { data }
    getCollectionsFailure: ['payload'], // payload: { errors }

    getNextCollectionsRequest: ['payload'], // payload: { link }
    getNextCollectionsSuccess: ['payload'], // payload: { data }
    getNextCollectionsFailure: ['payload'], // payload: { errors }

    createCollectionRequest: ['payload'], // payload: { name };
    createCollectionSuccess: ['payload'], // payload: { data };
    createCollectionFailure: ['payload'], // payload: { errors };

    getProductsRequest: ['payload'], // payload: { search } --> filters: month, drop_id
    getProductsSuccess: ['payload'], // payload: { data }
    getProductsFailure: ['payload'], // payload: { errors }

    getProductsNextRequest: ['payload'], // payload: { link }
    getProductsNextSuccess: ['payload'], // payload: { data }
    getProductsNextFailure: ['payload'], // payload: { errors }
  },
  { prefix: '/dropship/portfolio/collections/' },
);

export const CollectionsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  skeletonCollections: false,
  skeletonProducts: false,
  loading: false,
  fetching: false,
  errors: false,
  isOpenCollectionModal: false,
  productID: '',
  productName: '',
  collections: {},
  products: {},
  collectionID: '',
  collection: null,
  saveResult: null,
});

/* ------------- Selectors ------------- */
export const CollectionsSelectors = {
  getState: (state) => state.collections,
};

/* ------------- Functions for reducer cases ------------- */

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_TO_COLLECTION_REQUEST]: addToCollectionRequest,
  [Types.ADD_TO_COLLECTION_SUCCESS]: addToCollectionSuccess,
  [Types.ADD_TO_COLLECTION_FAILURE]: addToCollectionFailure,

  [Types.REMOVE_FROM_COLLECTION_REQUEST]: removeFromCollectionRequest,
  [Types.REMOVE_FROM_COLLECTION_SUCCESS]: removeFromCollectionSuccess,
  [Types.REMOVE_FROM_COLLECTION_FAILURE]: removeFromCollectionFailure,

  [Types.RENAME_COLLECTION_REQUEST]: renameCollectionRequest,
  [Types.RENAME_COLLECTION_SUCCESS]: renameCollectionSuccess,
  [Types.RENAME_COLLECTION_FAILURE]: renameCollectionFailure,

  [Types.REMOVE_COLLECTION_REQUEST]: removeCollectionRequest,
  [Types.REMOVE_COLLECTION_SUCCESS]: removeCollectionSuccess,
  [Types.REMOVE_COLLECTION_FAILURE]: removeCollectionFailure,

  [Types.REMOVE_COLLECTION]: removeCollection,
  [Types.SAVE_COLLECTION]: saveCollection,

  [Types.CLEAR_PRODUCT_DATA]: clearProductData,

  [Types.RESTORE_COLLECTION_REQUEST]: restoreCollectionRequest,
  [Types.RESTORE_COLLECTION_SUCCESS]: restoreCollectionSuccess,
  [Types.RESTORE_COLLECTION_FAILURE]: restoreCollectionFailure,

  [Types.SET_COLLECTION_AS_DEFAULT_REQUEST]: setAsDefaultCollectionRequest,
  [Types.SET_COLLECTION_AS_DEFAULT_SUCCESS]: setAsDefaultCollectionSuccess,
  [Types.SET_COLLECTION_AS_DEFAULT_FAILURE]: setAsDefaultCollectionFailure,

  [Types.GET_COLLECTIONS_REQUEST]: getCollectionsRequest,
  [Types.GET_COLLECTIONS_SUCCESS]: getCollectionsSuccess,
  [Types.GET_COLLECTIONS_FAILURE]: getCollectionsFailure,

  [Types.GET_NEXT_COLLECTIONS_REQUEST]: getNextCollectionsRequest,
  [Types.GET_NEXT_COLLECTIONS_SUCCESS]: getNextCollectionsSuccess,
  [Types.GET_NEXT_COLLECTIONS_FAILURE]: getNextCollectionsFailure,

  [Types.CREATE_COLLECTION_REQUEST]: createCollectionRequest,
  [Types.CREATE_COLLECTION_SUCCESS]: createCollectionSuccess,
  [Types.CREATE_COLLECTION_FAILURE]: createCollectionFailure,

  // NOTIFICATION AND MODALS
  [Types.OPEN_COLLECTION_MODAL]: openCollectionModal,
  [Types.CLOSE_COLLECTION_MODAL]: closeCollectionModal,

  [Types.OPEN_NOTIFICATION_ADD]: openNotificationAdd,
  [Types.CLOSE_NOTIFICATION_ADD]: closeNotificationAdd,

  // GET PRODUCTS
  [Types.GET_PRODUCTS_REQUEST]: getProductsRequest,
  [Types.GET_PRODUCTS_SUCCESS]: getProductsSuccess,
  [Types.GET_PRODUCTS_FAILURE]: getProductsFailure,

  // GET NEXT PRODUCTS
  [Types.GET_PRODUCTS_NEXT_REQUEST]: getProductsNextRequest,
  [Types.GET_PRODUCTS_NEXT_SUCCESS]: getProductsNextSuccess,
  [Types.GET_PRODUCTS_NEXT_FAILURE]: getProductsNextFailure,
});
