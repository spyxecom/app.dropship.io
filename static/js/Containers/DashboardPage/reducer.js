import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getDashboardInfoRequest: ['payload'], // payload: { typeData }
  getDashboardInfoSuccess: ['payload'], // payload: { data }
  dashboardInfoFailure: ['payload'], // payload: { errors }

  getNewDashboardInfoRequest: ['payload'], // payload: { link }
  getNewDashboardInfoSuccess: ['payload'], // payload: { data }

  getNextDashboardInfoRequest: ['payload'], // payload: { link }
  getNextDashboardInfoSuccess: ['payload'], // payload: { data }
})

export const DashboardTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  result: null,
  errors: false,
  fetchingProducts: false,
})

/* ------------- Functions for reducer cases ------------- */

const getDashboardInfoRequest = (state, {payload: {typeData}}) => {
  if(typeData){
    return state.merge({
      fetchingProducts: true,
      result: {...state.result, results: []}
    })
  }else{
    return state.merge({fetching: true})
  }
}

const getDashboardInfoSuccess = (state, {payload: data}) =>
  state.merge({
    fetching: false,
    fetchingProducts: false,
    result: {...state.result, ...data}
  })

const dashboardInfoFailure = (state, {payload: {errors}}) =>
  state.merge({fetching: false, fetchingProducts: false, errors})

const getNewDashboardInfoRequest = (state) => state.merge({ fetchingProducts: true });

const getNewDashboardInfoSuccess = (state, { payload: { ...data } }) => {
  return state
    .merge({
      fetchingProducts: false,
      result: { ...state.result, ...data },
    })
};

const getNextDashboardInfoRequest = (state) => state.merge({ fetchingProducts: true });

const getNextDashboardInfoSuccess = (state, { payload: { ...data } }) => {
  const allData = state.result.results.concat(data.results);
  return state
    .merge({
      fetchingProducts: false,
      result: { ...state.result, ...data, results: allData },
    })
    .setIn(['result', 'results'], allData);
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_DASHBOARD_INFO_REQUEST]: getDashboardInfoRequest,
  [Types.GET_DASHBOARD_INFO_SUCCESS]: getDashboardInfoSuccess,
  [Types.DASHBOARD_INFO_FAILURE]: dashboardInfoFailure,

  [Types.GET_NEW_DASHBOARD_INFO_REQUEST]: getNewDashboardInfoRequest,
  [Types.GET_NEW_DASHBOARD_INFO_SUCCESS]: getNewDashboardInfoSuccess,

  [Types.GET_NEXT_DASHBOARD_INFO_REQUEST]: getNextDashboardInfoRequest,
  [Types.GET_NEXT_DASHBOARD_INFO_SUCCESS]: getNextDashboardInfoSuccess,
})
