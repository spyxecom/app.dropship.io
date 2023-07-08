/* User services */

import { API } from '../../Services/Api';

const request = new API();

export const getUserInfo = () => request.api.get(`/user/account/`);

export const updateUserInfo = (info) => {
  if (info.avatar) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const form = new FormData();
    form.append('avatar', info.avatar.media);
    return request.api.patch(`/user/update/`, form, { headers });
  }
  return request.api.put(`/user/update/`, { ...info });
};

export const changePassword = ({ current, password }) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const form = new FormData();
  form.append('old_password', current);
  form.append('new_password', password);
  return request.api.put(`/user/user/change_password/`, form, { headers });
};

export const sendCodePassword = (email) => {
  return request.api.post(`auth/forgot-password/`, { email });
};

export const confirmCodePassword = (code) => {
  return request.api.get(`auth/forgot-password/`, { code, source: 'settings' });
};

export const createNewPassword = ({ password }) => {
  return request.api.post(`/user/user/set_password/`, {
    new_password: password,
  });
};

export const changeEmails = ({ password, new_email }) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const form = new FormData();
  form.append('password', password);
  form.append('new_email', new_email);
  return request.api.post(`/user/change-email/`, form, { headers });
};

export const confirmEmails = (hash) => {
  return request.api.get(`/user/change-email/?code=${hash}`);
};

export const changeLanguage = (lang) =>
  request.api.post(`/user/set-language/`, { language: lang });
