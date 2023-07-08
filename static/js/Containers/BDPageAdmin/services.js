/* eslint-disable no-restricted-syntax */
// /*  Benefits and Drawbacks services */

import { API } from '../../Services/Api';

const request = new API();

export const getBdList = ({ search, ...params }) => {
  const p = new URLSearchParams(search);
  const uri = `/admin-panel/benefits-drawbacks/`;
  for (const [key, value] of Object.entries(params)) {
    p.append(key, value);
  }
  return request.api.get(`${uri}?${p.toString()}`, null);
};

export const getBdListNext = (link) => {
  const uri = new URL(link);
  uri.protocol = 'https://';
  return request.api.get(uri.toString(), null);
};

export const getBdIcons = ({ search, ...params }) => {
  const p = new URLSearchParams(search);
  const uri = `/admin-panel/benefits-drawbacks-icons/`;
  for (const [key, value] of Object.entries(params)) {
    p.append(key, value);
  }
  return request.api.get(`${uri}?${p.toString()}`, null);
};

export const getBdIconsNext = (link) => {
  const uri = new URL(link);
  uri.protocol = 'https://';
  return request.api.get(uri.toString(), null);
};

export const createBdCard = (data) =>
  request.api.post(`/admin-panel/benefits-drawbacks/`, { ...data });

export const changeBdCard = ({ id, icon, title, description, _type }) => {
  return request.api.patch(`/admin-panel/benefits-drawbacks/${id}/`, {
    ...(icon && { icon: { id: icon?.id } }),
    ...(title && { title }),
    ...(description && { description }),
    ...(_type && { _type }),
  });
};
export const deleteBdCard = ({ id }) =>
  request.api.delete(`/admin-panel/benefits-drawbacks/${id}/`);
