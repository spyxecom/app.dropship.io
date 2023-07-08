// OPEN/CLOSE COLLECTION MODAL
export const openCollectionModal = (state) =>
  state.merge({ isOpenCollectionModal: true });

export const closeCollectionModal = (state) =>
  state.merge({ isOpenCollectionModal: false });

// OPEN/CLOSE COLLECTION MODAL
export const openNotificationAdd = (state) =>
  state.merge({ isOpenNotificationAdd: true });

export const closeNotificationAdd = (state) =>
  state.merge({ isOpenNotificationAdd: false });

// ADD TO COLLECTION
export const addToCollectionRequest = (state) => state.merge({ loading: true });

export const addToCollectionSuccess = (state, { payload: { product } }) =>
  state.merge({
    loading: false,
    productID: product.product_id,
    productName: product.title,
  });

export const addToCollectionFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });
