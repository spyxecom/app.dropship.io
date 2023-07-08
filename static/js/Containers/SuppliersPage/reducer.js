import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions(
  {
    getSuppliersRequest: null,
    getSuppliersSuccess: ['payload'],
    getSuppliersFailure: ['payload'],
  }
);

export const SuppliersPageTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  loading: false,
  suppliers: [],
  errors: false,
});

const getSuppliersRequest = (state) =>
  state.merge({ loading: true });

const getSuppliersSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, suppliers: data });

const getSuppliersFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SUPPLIERS_REQUEST]: getSuppliersRequest,
  [Types.GET_SUPPLIERS_SUCCESS]: getSuppliersSuccess,
  [Types.GET_SUPPLIERS_FAILURE]: getSuppliersFailure,
});
