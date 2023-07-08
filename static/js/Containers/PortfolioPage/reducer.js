import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    getCategoryStatusRequest: null,
    getCategoryStatusSuccess: ['payload'], // payload: { data }
    getCategoryStatusFailure: ['payload'], // payload: { errors }

    getUserCategoryDataRequest: ['payload'], // payload: { id }
    getUserCategoryDataSuccess: ['payload'], // payload: { data }
    getUserCategoryDataFailure: ['payload'], // payload: { errors }

    getNextDropsRequest: ['payload'], // payload: { link }
    getNextDropsSuccess: ['payload'], // payload: { data }
    getNextDropsFailure: ['payload'], // payload: { errors }
    setActiveTabIndex: ['payload'], // payload: { activeTab }

    setLastLanguage: ['payload'],
    logout: null,
  },
  // { prefix: '/dropship/portfolio/' },
);

export const PortfolioTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  skeletonLoading: false,
  userCategoryDataLoading: false,
  dropsLoading: false,
  errors: false,
  categories: [],
  subscriptions: null,
  activeTab: 0,
  lastLanguage: '',
});

/* ------------- Functions for reducer cases ------------- */

const setLastLanguage = (state, { payload: data }) =>
  state.merge({ lastLanguage: data});

export const logout = (state) => state.merge({...INITIAL_STATE })

const getCategoryStatusRequest = (state) =>
  state.merge({ loading: true, skeletonLoading: true });

const getCategoryStatusSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, skeletonLoading: false, categories: data });

const getCategoryStatusFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, skeletonLoading: false, errors });

const getUserCategoryDataRequest = (state) =>
  state.merge({ loading: true, skeletonLoading: true, userCategoryDataLoading: true });

const getUserCategoryDataSuccess = (state, { payload }) =>
  state.merge({
    loading: false,
    skeletonLoading: false,
    userCategoryDataLoading: false,
    subscriptions: payload,
  });

const getUserCategoryDataFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, skeletonLoading: false, errors, userCategoryDataLoading: false });

const getNextDropsRequest = (state) => state.merge({ dropsLoading: true });

const getNextDropsFailure = (state, { payload: { errors } }) =>
  state.merge({ dropsLoading: false, errors });

const getNextDropsSuccess = (state, { payload: data }) => {
  const allData = state.subscriptions.results.concat(data.results);

  return state
    .merge({
      dropsLoading: false,
      subscriptions: { ...state.subscriptions, ...data, results: allData },
    })
    /*.setIn(['subscriptions', 'results'], allData);*/
};

const setActiveTabIndex = (state, { payload: { activeTab } }) => {
  return state.merge({ activeTab: activeTab });
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CATEGORY_STATUS_REQUEST]: getCategoryStatusRequest,
  [Types.GET_CATEGORY_STATUS_SUCCESS]: getCategoryStatusSuccess,
  [Types.GET_CATEGORY_STATUS_FAILURE]: getCategoryStatusFailure,

  [Types.GET_USER_CATEGORY_DATA_REQUEST]: getUserCategoryDataRequest,
  [Types.GET_USER_CATEGORY_DATA_SUCCESS]: getUserCategoryDataSuccess,
  [Types.GET_USER_CATEGORY_DATA_FAILURE]: getUserCategoryDataFailure,

  [Types.GET_NEXT_DROPS_REQUEST]: getNextDropsRequest,
  [Types.GET_NEXT_DROPS_SUCCESS]: getNextDropsSuccess,
  [Types.GET_NEXT_DROPS_FAILURE]: getNextDropsFailure,

  [Types.SET_ACTIVE_TAB_INDEX]: setActiveTabIndex,

  [Types.SET_LAST_LANGUAGE]: setLastLanguage,
  [Types.LOGOUT]: logout,
});
