/* ProductDetails Page services */

import { API } from '../../Services/Api';

const request = new API();

export const getProductDetails = ({ product_id, ...params }) =>
  request.api.get(`/portfolio/product/${product_id}`, null);

export const exportInterests = ({ product_id, ...params }) => {
  const headers = {
    Accept: `text/csv`,
  };
  return request.api.get(`/interests/${product_id}/export/`, null, { headers });
};
