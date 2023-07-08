import { API } from '../../Services/Api';
const request = new API();

export const getProductDatabaseFilters = () => request.api.get(`product_database/choice_filters/`, null);
export const getProductDatabasePresets = () => request.api.get(`product_database/filter_presets/`, null);
export const createProductDatabasePreset = (data) => request.api.post(`product_database/filter_presets/`, { ...data });
export const deleteProductDatabasePreset = (record) => request.api.delete(`product_database/filter_presets/${record.id}/`, null);
export const cancelDeleteProductDatabasePreset = (record) => request.api.delete(`product_database/filter_presets/${record.id}/`, null);
export const updateProductDatabasePreset = (data) => request.api.patch(`product_database/filter_presets/${data.record.id}/`, {name: data.name});
export const getProductsDatabase = (data) => request.api.post(`product_database/search/`, {...data});
export const getProductChart = (data) => request.api.get(`/product_database/products/chart/${data.store_id}/${data.product_id}/`, null)

export const deleteTrackingStoreByID = (record) => request.api.delete(`/sales_tracker/stores/${record?.store?.id}/`, null);
export const createTrackingStore = (data) => request.api.post(`/sales_tracker/stores/start_tracking/`, {...data});
export const deleteTrackingProductByID = (record) => request.api.delete(`/sales_tracker/products/${record.id}/`, null);
export const createTrackingProduct = (data) => request.api.post(`/sales_tracker/products/start_tracking/`, {...data});

