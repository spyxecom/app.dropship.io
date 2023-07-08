/* Admin Portfolio services */

import { API } from '../../Services/Api';

const request = new API();

export const getCategoryDrops = () => {
  const req = request.api.get(`/admin-panel/portfolio/`, null);
  return req;
};

export const getNextDrops = ({ link }) => {
  const uri = new URL(link);
  uri.protocol = 'https://';
  return request.api.get(uri.toString(), null);
};
