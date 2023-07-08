// CREATE COLLECTION
export const createCollectionRequest = (state) =>
  state.merge({ loading: true });

export const createCollectionSuccess = (state, { payload: { data } }) =>
  state.merge({ loading: false });

export const createCollectionFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });
