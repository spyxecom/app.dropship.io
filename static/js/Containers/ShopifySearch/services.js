import { API } from '../../Services/Api';
const request = new API();

export const getCompetitorsFilters = () => request.api.get(`product_database/choice_filters/`, null);
export const getCompetitorsPresets = () => request.api.get(`product_database/competitors/filter_presets/`, null);
export const createCompetitorsPreset = (data) => request.api.post(`product_database/competitors/filter_presets/`, { ...data });
export const deleteCompetitorsPreset = (record) => request.api.delete(`product_database/competitors/filter_presets/${record.id}/`, null);
export const cancelDeleteCompetitorsPreset = (record) => request.api.delete(`product_database/competitors/filter_presets/${record.id}/`, null);
export const updateCompetitorsPreset = (data) => request.api.patch(`product_database/competitors/filter_presets/${data.record.id}/`, {name: data.name});
export const getCompetitors = (data) => request.api.post(`product_database/competitors/search/`, {...data});
export const getShopifyCount = () => request.api.get(`/admin-panel/competitors_count/`);

export const deleteTrackingStoreByID = (record) => request.api.delete(`/sales_tracker/stores/${record?.store?.id}/`, null);
export const createTrackingStore = (data) => request.api.post(`/sales_tracker/stores/start_tracking/`, {...data});
export const deleteTrackingProductByID = (record) => request.api.delete(`/sales_tracker/products/${record.id}/`, null);
export const createTrackingProduct = (data) => request.api.post(`/sales_tracker/products/start_tracking/`, {...data});
