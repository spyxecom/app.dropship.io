/* Admin ProductDetails Page services */

import { API } from '../../Services/Api';

const request = new API();

export const getProductDetailsAdmin = ({ drop_id, product_id, ...params }) =>
  request.api.get(
    `/admin-panel/portfolio/${drop_id}/product/${product_id}/`,
    null,
  );

export const deleteProductDetailsAdmin = ({ drop_id, product_id, ...params }) =>
  request.api.delete(
    `/admin-panel/portfolio/${drop_id}/product/${product_id}/`,
    null,
  );

export const updateProductDetailsAdmin = ({ drop_id, product_id, data }) => {
  const imagesAdd = data?.images?.filter((img) => !!img?.originFileObj);
  const imagesUrls = data?.images?.filter((img) => !!img?.url);

  // const description = data?.description ? data?.description.replace(/ /g, '&nbsp;').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\n\r?/g, '<br />') : '';

  if (imagesAdd?.length) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    imagesAdd.forEach((img, i) =>
      formData.append([`image${i}`], img?.originFileObj),
    );
    return request.api.put(
      `/admin-panel/portfolio/${drop_id}/product/${product_id}/`,
      // formData,
      { ...data,
        images: imagesUrls,
        // description: description,
      },
      { headers },
    );
  }

  return request.api.put(
    `/admin-panel/portfolio/${drop_id}/product/${product_id}/`,
    { ...data,
      images: imagesUrls,
      // description: description,
    },
  );
};

export const getProductDetailsAdminShopify = ({ drop_id, product_id, ...params }) => {
  const data = { ...params };

  if (data) {
    return request.api.get(
      `/admin-panel/portfolio/${drop_id}/product/${product_id}/shopify/`,
      data,
    )
  }
  return request.api.get(
    `/admin-panel/portfolio/${drop_id}/product/${product_id}/shopify/`,
    null,
  )
}

export const deleteAddImage = ({ drop_id, product_id, data }) =>
  request.api.put(`/admin-panel/portfolio/${drop_id}/product/${product_id}/`, {
    ...data,
  });

export const addCompetitors = ({ drop_id, product_id, urls }) =>
  request.api.post(
    `/admin-panel/portfolio/${drop_id}/product/${product_id}/competitors/`,
    { urls },
    { timeout: 60000 },
  );

export const deleteCompetitors = ({ drop_id, product_id, id }) =>
  request.api.delete(
    `/admin-panel/portfolio/${drop_id}/product/${product_id}/competitors/?id=${id}`,
  );

export const uploadImage = ({ drop_id, product_id, images }) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const formData = new FormData();
  formData.append('images', images);
  return request.api.post(
    `/admin-panel/portfolio/${drop_id}/product/${product_id}/upload_images/`,
    formData,
    { headers },
  );
};

export const addSupplier = ({ drop_id, product_id, data }) =>
  request.api.post(
    `/admin-panel/portfolio/${drop_id}/product/${product_id}/suppliers/`,
    { ...data },
  );

export const deleteSupplier = ({ drop_id, product_id, data }) =>
  request.api.delete(
    `/admin-panel/portfolio/${drop_id}/product/${product_id}/suppliers/?id=${data?.id}&type=${data?.type}`,
    null,
  );

export const getBdDetails = ({ drop_id, product_id, search, ...params }) => {
  const p = new URLSearchParams(search);
  const uri = `/admin-panel/portfolio/${drop_id}/product/${product_id}/b_and_d/`;
  for (const [key, value] of Object.entries(params)) {
    p.append(key, value);
  }
  return request.api.get(`${uri}?${p.toString()}`, null);
};

export const getBdNext = (link) => {
  const uri = new URL(link);
  uri.protocol = 'https://';
  return request.api.get(uri.toString(), null);
};

export const addBdDetails = ({ drop_id, product_id, data }) =>
  request.api.post(
    `/admin-panel/portfolio/${drop_id}/product/${product_id}/b_and_d/`,
    { ...data },
  );

export const deleteBdDetails = ({ drop_id, product_id, data }) =>
  request.api.delete(
    `/admin-panel/portfolio/${drop_id}/product/${product_id}/b_and_d/?id=${data?.id}`,
  );

export const getInterestTarget = ({
  drop_id,
  product_id,
  search,
  ...params
}) => {
  const p = new URLSearchParams(search);
  const uri = `/admin-panel/portfolio/${drop_id}/product/${product_id}/interests/`;
  for (const [key, value] of Object.entries(params)) {
    p.append(key, value);
  }
  return request.api.get(`${uri}?${p.toString()}`, null);
};

export const getInterestTargetNext = (link) => {
  const uri = new URL(link);
  uri.protocol = 'https://';
  return request.api.get(uri.toString(), null);
};

export const getShopifyTargetNext = (link) => {
  const uri = new URL(link);
  uri.protocol = 'https://';
  return request.api.get(uri.toString(), null);
};

export const changeInterestTarget = ({ drop_id, product_id, data, type }) => {
  if(type === 'add'){
    return request.api.post(
      `/admin-panel/portfolio/${drop_id}/product/${product_id}/interests/`,
      { ...data },
    );
  }else if(type === 'delete'){
    return request.api.delete(
      `/admin-panel/portfolio/${drop_id}/product/${product_id}/interests/?id=${data?.id}`
    );
  }
}

export const changeShopifyTarget = ({ drop_id, product_id, type, productData }) => {
    return request.api.post(
      `/admin-panel/portfolio/${drop_id}/product/${product_id}/shopify/`,
      { _type: type, productData },
    );
}

// export const changeShopifyTarget = ({ drop_id, product_id, type, data }) => {
//   if(type === 'add'){
//     return request.api.post(
//       `/admin-panel/portfolio/${drop_id}/product/${product_id}/shopify/`,
//       { type, ...data },
//     );
//   } else if (type === 'delete') {
//      return request.api.delete(
//       `/admin-panel/portfolio/${drop_id}/product/${product_id}/shopify/?id=${data?.id}`
//     );
//   }
// }
