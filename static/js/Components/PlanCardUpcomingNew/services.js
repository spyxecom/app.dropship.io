import { API } from '../../Services/Api';
const request = new API();

export const getCharge = (data) => request.api.post(`/subscription/update/`, {...data, estimate: true});
