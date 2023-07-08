// GET NEXT COLLECTIONS
export const getNextCollectionsRequest = (state) =>
  state.merge({ loading: true });

export const getNextCollectionsSuccess = (state, { payload: { ...data } }) => {
  const allData = state.collections.results.concat(data.results);

  return state
    .merge({
      loading: false,
      collections: { ...data, results: allData },
    })
    .setIn(['collections', 'results'], allData);
};

export const getNextCollectionsFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });
