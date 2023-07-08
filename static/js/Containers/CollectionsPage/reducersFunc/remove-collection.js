// REMOVE COLLECTION
export const removeCollectionRequest = (state, { payload: { data } }) =>
  state.merge({ loading: true });

export const removeCollectionSuccess = (state, { payload: { data } }) =>
  state.merge({ loading: false, saveResult: { removed: true } });

export const removeCollectionFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });
