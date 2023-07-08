import { API } from '../../Services/Api';
const request = new API();

export const getSuppliers = () => request.api.get(`/suppliers/`, null);
