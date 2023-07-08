// GET PRODUCTS
export const getProductsRequest = (state) =>
  state.merge({ loading: true, skeletonProducts: true });

export const getProductsSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, skeletonProducts: false, products: data });

export const getProductsFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, skeletonProducts: false, errors });
