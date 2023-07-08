// GET COLLECTIONS
export const getCollectionsRequest = (state) => state.merge({ fetching: true });

export const getCollectionsSuccess = (state, { payload }) =>
  state.merge({ fetching: false, collections: payload });

export const getCollectionsFailure = (state, { payload: { errors } }) =>
  state.merge({ fetching: false, errors });
