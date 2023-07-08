import { API } from '../../Services/Api';
const request = new API();

export const getSearchStore = (data) => request.api.get('/admin-panel/product_database/stores/', {q: data?.searchValue, only_product_db: data?.only_product_db});
export const deleteStore = (data) => request.api.delete(`/admin-panel/product_database/stores/${data?.record?.id}/?remove_from=${data?.flag}`, null);
