/*
 *
 * Portfolio services
 *
 */

import { API } from '../../Services/Api';

const request = new API();

export const getStatusCategory = () => {
  const req = request.api.get(`/portfolio/status/`, null);

  return req;
};

export const getUserCategoryData = ({ id }) => {
  const req = request.api.get(`/portfolio/?category=${id}&page_size=30`, null);

  return req;
};

export const getUserSubscription = () => {
  const req = request.api.get(`/subscription/all/`, null);

  return req;
};

export const getNextDrops = ({ link }) => {
  const uri = new URL(link);
  uri.protocol = 'https://';
  return request.api.get(uri.toString(), null);
};
