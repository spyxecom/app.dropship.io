// SET AS DEFAULT COLLECTION
export const setAsDefaultCollectionRequest = (state) => state.merge({loading: true});

export const setAsDefaultCollectionSuccess = (state, {payload: {collection}}) => {
  let collections = state.collections.results;
  const products = collection.products.splice(0, 4);

  // eslint-disable-next-line no-param-reassign
  collection.products = products;

  collections = collections.map((value, key) => {
    if (value.id === collection.id) {
      //index = key;

      return value.set('default', true);
    }

    // SET ALL AS FALSE
    return value.set('default', false);
  });

  return state.merge({
    loading: false,
    collections: {results: collections},
    collection: {collectionID: collection.id, collectionName: collection.name}
  });
};

export const setAsDefaultCollectionFailure = (state, {payload: {errors}}) =>
  state.merge({loading: false, errors});
