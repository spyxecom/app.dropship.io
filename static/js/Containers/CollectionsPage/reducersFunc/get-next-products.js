// GET NEXT PRODUCTS
export const getProductsNextRequest = (state) => state.merge({ loading: true });

export const getProductsNextSuccess = (state, { payload: data }) => {
  const allData = state.products.results.concat(data.results);
  return state
    .merge({
      loading: false,
      products: { ...data, results: allData },
    })
    .setIn(['products', 'results'], allData);
};

export const getProductsNextFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });
