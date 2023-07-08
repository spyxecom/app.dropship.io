/*
 *
 * CollectionsModals services
 *
 */

import { API } from '../../Services/Api';
import { serialize } from '../../Utils/utils';

const request = new API();

export const addToCollection = ({ productID, collectionID }) => {
  const req = request.api.post(`/portfolio/save-product/`, {
    product_id: productID,
    collection_id: collectionID,
  });

  return req;
};

export const setCollectionAsDefault = ({ collectionID }) => {
  const req = request.api.put(`/portfolio/collections/`, {
    default: true,
    collection_id: collectionID,
  });

  return req;
};

export const renameCollection = ({ collectionID, collectionName }) => {
  const req = request.api.put(`/portfolio/collections/`, {
    name: collectionName,
    collection_id: collectionID,
  });

  return req;
};

export const removeCollection = ({ collectionID }) =>
  request.api.delete(`/portfolio/collections/delete/`, {
    collection_id: collectionID,
  });

export const restoreCollection = ({ collectionID }) =>
  request.api.post(`/portfolio/collections/delete/`, {
    collection_id: collectionID,
  });

export const removeFromCollection = ({ productID }) => {
  const req = request.api.delete(`/portfolio/save-product/`, {
    product_id: productID,
  });

  return req;
};

export const getCollections = (params) => {
  const req = request.api.get(
    `/portfolio/collections/?${serialize(params)}`,
    null,
  );

  return req;
};

export const getNextCollections = ({ link }) => {
  const uri = new URL(link);
  uri.protocol = 'https://';

  const req = request.api.get(uri, null);

  return req;
};

export const createCollection = ({ productID, name }) => {
  const req = request.api.post(`/portfolio/collections/`, {
    name,
    product_id: productID,
  });

  return req;
};

export const getProducts = ({ search, ...params }) => {
  const p = new URLSearchParams(search);
  const uri = `/portfolio/product-list`;

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
