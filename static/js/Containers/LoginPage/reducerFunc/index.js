// REFRESH TOKEN
export const refreshTokenRequest = (state, { token }) =>
  state.merge({ fetching: true, token });

export const refreshTokenSuccess = (state, { payload }) => {
  const { access, refresh, user } = payload;

  return state.merge({
    fetching: false,
    accessToken: access,
    refreshToken: refresh,
    userInfo: user,
  });
};

export const refreshTokenFailure = (state, { payload }) => {
  const { errors } = payload;

  return state.merge({ fetching: false, error: errors });
};

// CHECK REFRESH TOKEN
export const verifyTokenRequest = (state, { token }) =>
  state.merge({ fetching: true, isValidRefreshToken: false, token });

export const verifyTokenSuccess = (state, payload) =>
  state.merge({ fetching: false, isValidRefreshToken: true });

export const verifyTokenFailure = (state, { errors }) =>
  state.merge({ fetching: false, isValidRefreshToken: false, error: errors });
