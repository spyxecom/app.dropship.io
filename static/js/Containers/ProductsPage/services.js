/*
 *
 * Products Page services
 *
 */

import { API } from '../../Services/Api';

const request = new API();

export const getProducts = ({ isAdmin, search, ...params }) => {
  // const p = new URLSearchParams(search);
  const p = new URLSearchParams(search);
  let uri = null;
  const { drop_id } = params;

  if (isAdmin) {
    if (drop_id) {
      uri = `/admin-panel/portfolio/${drop_id}/`;
    } else {
      uri = '/admin-panel/portfolio/products/list/';
    }
  } else {
    uri = '/portfolio/product-list';
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(params)) {
    p.append(key, value);
  }

  return request.api.get(`${uri}?${p.toString()}`, null);
};

export const getProductsNext = ({ link }) => {
  const uri = new URL(link);
  uri.protocol = 'https://';
  return request.api.get(uri.toString(), null);
};

export const addProducts = ({ dropId, urls }) =>
  request.api.post(
    `/admin-panel/portfolio/${dropId}/add_products/`,
    { urls },
    { timeout: 60000 },
  );
