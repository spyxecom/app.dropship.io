import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    getNotificationsRequest: null,
    getNotificationsSuccess: ['data'],
    getNotificationsFailure: ['error'],
  },
  { prefix: '/dropship/notifications/' },
);

export const NotificationsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  errors: false,
  hello: 'world',
  notifications: [
    {
      id: 0,
      text:
        '<p>There is a new drop in the <a href="/portfolio">Household</a> category waiting for you!</p>',
      time: '2h ago',
    },
    {
      id: 1,
      text:
        '<p>The exclusive Dropship Community has just been released! <a href="/portfolio">Check it out.</a></p>',
      time: '1d ago',
    },
    {
      id: 2,
      text:
        '<p>Help us improve Dropship by <a href="/portfolio">Suggesting a Feature.</a></p>',
      time: '1d ago',
    },
    {
      id: 3,
      text:
        '<p>Update: You are now able to import products, directly from your <a href="/portfolio">Portfolio</a>, to WooCommerce!</p>',
      time: '2d ago',
    },
    {
      id: 4,
      text:
        '<p>There is a new drop in the <a href="/portfolio">Household</a> category waiting for you!</p>',
      time: '2h ago',
    },
    {
      id: 5,
      text:
        '<p>The exclusive Dropship Community has just been released! <a href="/portfolio">Check it out.</a></p>',
      time: '1d ago',
    },
    {
      id: 6,
      text:
        '<p>Help us improve Dropship by <a href="/portfolio">Suggesting a Feature.</a></p>',
      time: '1d ago',
    },
    {
      id: 7,
      text:
        '<p>Update: You are now able to import products, directly from your <a href="/portfolio">Portfolio</a>, to WooCommerce!</p>',
      time: '2d ago',
    },
  ],
});

/* ------------- Functions for reducer cases ------------- */

const getNotificationsRequest = (state) => state.merge({ loading: true });

const getNotificationsSuccess = (state, { data }) =>
  state.merge({ loading: false, notifications: data });

const getNotificationsFailure = (state, { errors }) =>
  state.merge({ loading: false, errors });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_NOTIFICATIONS_REQUEST]: getNotificationsRequest,
  [Types.GET_NOTIFICATIONS_SUCCESS]: getNotificationsSuccess,
  [Types.GET_NOTIFICATIONS_FAILURE]: getNotificationsFailure,
});
