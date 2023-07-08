import { API } from '../../Services/Api';
const request = new API();

export const getTrackingStores = (data) => request.api.get('/sales_tracker/stores/', {...data});
export const getTrackingStoresNext = (url) => request.api.get(url, null);
export const getTrackingStoreByID = (id) => request.api.get(`/sales_tracker/stores/${id}/`, null);
export const deleteTrackingStoreByID = (record) => request.api.delete(`/sales_tracker/stores/${record.id}/`, null);
export const createTrackingStore = (url) => request.api.post(`/sales_tracker/stores/`, {url: url});
export const createTrackingStoreNew = (data) => request.api.post(`/sales_tracker/stores/start_tracking/`, {...data});

export const getTrackingProducts = (data) => request.api.get('/sales_tracker/products/', {...data});
export const getTrackingProductsNext = (url) => request.api.get(url, null);
export const getTrackingProductByID = (id) => request.api.get(`/sales_tracker/products/${id}/`, null);
export const deleteTrackingProductByID = (record) => request.api.delete(`/sales_tracker/products/${record.id}/`, null);
export const createTrackingProduct = (url) => request.api.post(`/sales_tracker/products/`, {url: url});
export const createTrackingProductNew = (data) => request.api.post(`/sales_tracker/products/start_tracking/`, {...data});

export const getDetailedStoreInfo =  (data) => request.api.post(`/sales_tracker/stores/${data.id}/detailed_charts/`, {date_range: data.date_range});
export const getDetailedProductInfo =  (data) => request.api.post(`/sales_tracker/products/${data?.store_id}_${data.id}/detailed_charts/`,
  {page: data.page, page_size: data.page_size, ordering: data.ordering, date_range: data.date_range});

export const getDetailedStoreInfoCheck =  (data) => request.api.post(`/sales_tracker/stores/${data.id}/statistic_exists/`, {date_range: data.date_range});
export const getDetailedProductInfoCheck =  (data) => request.api.post(`/sales_tracker/products/${data?.store_id}_${data.id}/statistic_exists/`,
  {date_range: data.date_range});

export const getProductListByStore =  (data) => request.api.post(`/sales_tracker/products/store/${data.store_id}/`,
  {page: data.page, page_size: data.page_size, ordering: data.ordering, date_range: data.date_range});

export const getStoreProductsModal =  (data) => request.api.post(`/sales_tracker/products/store/${data.store_id}/`,
  {page: data.page, page_size: data.page_size, ordering: data.ordering, date_range: data.date_range});

export const getExpandableChart = (data) => request.api.post(`/sales_tracker/products/chart/${data.store_id}/${data.product_id}/`, {date_range: data.date_range});

export const getSalesReport = (data) => request.api.post(`/sales_tracker/stores/${data.id}/store_report/`, {date_range: data.date_range}, {responseType: 'blob'});
export const getProductReport = (data) => request.api.post(`/sales_tracker/products/${data.id}/download_report/`, {date_range: data.date_range}, {responseType: 'blob'});
export const getRevenueReport = (data) => request.api.post(`/sales_tracker/stores/${data.id}/download_report/`, {date_range: data.date_range}, {responseType: 'blob'});

export const getTopStoresFilters = () => request.api.get(`/sales_tracker/top_stores/filters/`, null);
export const getTopProductsFilters = () => request.api.get(`/sales_tracker/top_products/filters/`, null);
export const getTopStores = (data) => request.api.post(`/sales_tracker/top_stores/`, {...data});
export const getTopProducts = (data) => request.api.post(`/sales_tracker/top_products/`, {...data});
export const getTopStoresCount = (data) => request.api.post(`/sales_tracker/top_stores/count/`, {...data});
export const getTopProductsCount = (data) => request.api.post(`/sales_tracker/top_products/count/`, {...data});
