// RESTORE COLLECTION
export const restoreCollectionRequest = (state, { payload: { data } }) =>
  state.merge({ loading: true });

export const restoreCollectionSuccess = (state, { payload: { data } }) =>
  state.merge({ loading: false });

export const restoreCollectionFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });
