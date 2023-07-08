import { API } from '../../Services/Api';
const request = new API();

export const getAdminTrackingStores = (data) => request.api.post('/admin-panel/sales_tracker/stores/', {...data});

export const getAdminDetailedStoreInfo =  (data) => request.api.post(`/sales_tracker/stores/${data.id}/detailed_charts/`, {date_range: data.date_range});

export const getAdminDetailedStoreInfoCheck =  (data) => request.api.post(`/sales_tracker/stores/${data.id}/statistic_exists/`, {date_range: data.date_range});

export const getAdminProductListByStore =  (data) => request.api.post(`/sales_tracker/products/store/${data.store_id}/`,
  {page: data.page, page_size: data.page_size, ordering: data.ordering, date_range: data.date_range});
export const getAdminExpandableChart = (data) => request.api.post(`/sales_tracker/products/chart/${data.store_id}/${data.product_id}/`, {date_range: data.date_range});

export const getAdminSalesReport = (data) => request.api.post(`/admin-panel/sales_tracker/stores/${data.id}/store_report/`, {date_range: data.date_range}, {responseType: 'blob'});
export const getAdminRevenueReport = (data) => request.api.post(`/admin-panel/sales_tracker/stores/${data.id}/download_report/`, {date_range: data.date_range}, {responseType: 'blob'});
