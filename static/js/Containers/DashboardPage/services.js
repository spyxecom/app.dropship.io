/* Dashboard services */

import { API } from '../../Services/Api';

const request = new API();

export const getDashboardInfo = ({ typeData, ...params }) => {
  if (typeData) {
    return request.api.get(`/dashboard/${typeData}/`, params);
  }
  return request.api.get(`/dashboard/`, null);
};

export const getNextDashboardInfo = ({ link }) => {
  const uri = new URL(link);
  uri.protocol = 'https://';
  return request.api.get(uri, null);
};
