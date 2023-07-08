// CLEAR COLLECTION
export const clearProductData = (state) =>
  state.merge({ productID: '', productName: '' });

// SAVE/REMOVE COLLECTION TO STORE
export const removeCollection = (state) =>
  state.merge({ collection: null, saveResult: null });

export const saveCollection = (state, { payload: collection }) => {
  return state.merge({ collection });
};

// REMOVE FROM COLLECTION
export const removeFromCollectionRequest = (
  state,
  { payload: { productID, productName } },
) => state.merge({ loading: true, productID, productName });

export const removeFromCollectionSuccess = (state, { payload: { data } }) =>
  state.merge({ loading: false });

export const removeFromCollectionFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });
