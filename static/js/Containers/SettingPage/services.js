// /*  Setting services */
import apisauce from 'apisauce';
import { API } from '../../Services/Api';

const request = new API();

export const getLanguagesList = () => request.api.get(`/user/get-language/`);

export const getNotificationsList = () =>
  request.api.get(`/user/notifications/`);

export const changeNotificationsList = ({ push, email }) =>
  request.api.put(`/user/notifications/`, { push, email });

export const getSubscriptionsList = (filter) =>
  request.api.get(`subscription/${filter}/`);

export const addCompanyDetails = (data) =>
  request.api.put(`user/update/`, { company: data });

export const changeBillingAddress = (data) =>
  request.api.put(`user/update/`, { billing_info: data });

export const getPayments = () => request.api.get(`user/payments/`);
export const changePayments = (data) => request.api.post(`payments/replace_card/`, data);

export const getPaymentsNext = ({ link }) => {
  const uri = new URL(link);
  uri.protocol = 'https://';
  return request.api.get(uri.toString(), null);
};

//api for landing page invoice - without authorization
const baseURL = process.env.REACT_APP_BASE_API_ROUTE;
const api = apisauce.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const getPaymentDetails = ({ id }) => {
  const { retrieve_invoice_id } = id;
  if (retrieve_invoice_id) {
    return api.get(`/payments/retrieve_invoice/${retrieve_invoice_id}/`);
  }
  return request.api.get(`user/payments/${id}/`);
}

export const getUserCountry = () => request.api.get(`user/get_country/`);
