import { API } from '../../Services/Api';
import apisauce from 'apisauce';

const request = new API();

export const checkOauth = (data) => request.api.post('/user/stores/check_oauth_needed/', { domain: data });

export const getShopifyStores = () => request.api.get('/user/stores/');

export const verifyShopifyStore = ({verify_params}) => request.api.get(`/user/stores/verify/${verify_params}`);

export const deleteShopifyStore = ({ store_id }) => request.api.delete(`/user/stores/${store_id}/`);

export const importProductShopifyStore = ({ shop_id, product_id }) => request.api.post(`/user/stores/import_product/`, { shop_id, product_id, product_db: product_id.includes('_') });

//api for landing page invoice - without authorization
const baseURL = process.env.REACT_APP_BASE_API_ROUTE;
const api = apisauce.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const getBundles = () => api.get(`/user/shopify/bundles/`);

export const getShopifyStoreInfo = ({shop_domain}) => api.get(`/user/shopify/shop/${shop_domain}/`);

export const createChargeShopifyStore = (data) => api.post(`/user/stores/create_one_time_charge/`, data);

export const checkChargeShopify = ({charge_id}) => api.get(`/user/shopify/charge/${charge_id}/`);
