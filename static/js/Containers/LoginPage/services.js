import { API } from '../../Services/Api';

const request = new API();

export const refreshToken = ({ token }) => {
  const req = request.api.post('auth/token/refresh/', {
    refresh: token,
  });

  return req;
};

export const verifyToken = ({ token }) => {
  const req = request.api.post('auth/token/verify/', {
    token,
  });

  return req;
};
