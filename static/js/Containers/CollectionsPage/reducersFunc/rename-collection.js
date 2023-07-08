/* eslint-disable no-unused-vars */
// RENAME FROM COLLECTION
export const renameCollectionRequest = (state) =>
  state.merge({ loading: true });

export const renameCollectionSuccess = (state, { payload: { collection } }) => {
  let index;
  let collections = state.collections.results;

  collections = collections.map((value, key) => {
    if (value.id === collection.id) {
      index = key;
    }

    // SET ALL AS FALSE
    return value;
  });

  return state
    .merge({ loading: false })
    .setIn(['collections', 'results', index, 'name'], collection.name);
};

export const renameCollectionFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });
