import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions(
  {
    getChargeRequest: ['payload'],
    getChargeSuccess: ['payload'],
    getChargeFailure: ['payload'],
  }
);

export const ChargebeeTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  loading: false,
  result: {},
  errors: false,
});

const getChargeRequest = (state, {payload: data}) =>
  state.merge({ loading: true });

const getChargeSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, result: data });

const getChargeFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CHARGE_REQUEST]: getChargeRequest,
  [Types.GET_CHARGE_SUCCESS]: getChargeSuccess,
  [Types.GET_CHARGE_FAILURE]: getChargeFailure,
});
