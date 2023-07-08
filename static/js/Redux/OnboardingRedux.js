/* eslint-disable no-empty-pattern */
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onBoardingSetProp: ['key', 'value'],

  setSelectedCategory: ['selectedCategory'],
  focusCategory: ['focusCategory'],
  focusCategoryReset: null,

  setSelectedPlan: ['selectedPlan'],
  focusPlan: ['focusPlan'],
  focusPlanReset: null,

  setSwitchPlan: ['switchPlan'],

  countriesRequest: null,
  countriesSuccess: ['countries'],

  saveBillingAddress: ['presetBillingAddress'],
  clearBillingAddress: null,

  checkDiscountCodeRequest: ['code'],
  checkDiscountCodeSuccess: ['discountResult'],
  checkDiscountCodeFailure: ['discountError'],
  checkDiscountCodeReset: null,

  saveSubscriptionRequest: ['data'],
  saveSubscriptionSuccess: ['saveSubscriptionResult'],
  saveSubscriptionFailure: ['saveSubscriptionError'],
  changeSubscriptionReset: null,

  updateSubscriptionRequest: ['data'],
  updateSubscriptionSuccess: ['updateSubscriptionResult'],
  updateSubscriptionFailure: ['updateSubscriptionError'],

  deleteSubscriptionRequest: ['categoryId'],
  deleteSubscriptionSuccess: ['deleteSubscriptionResult'],
  deleteSubscriptionFailure: ['deleteSubscriptionError'],

  undoDeleteSubscriptionRequest: ['data'],
  undoDeleteSubscriptionSuccess: ['undoDeleteSubscriptionResult'],
  undoDeleteSubscriptionFailure: ['undoDeleteSubscriptionError'],

  cancelSubRequest: ['subscriptionId'],
  cancelSubSuccess: ['cancelSubResult'],
  cancelSubFailure: ['cancelSubError'],

  cancelTrialRequest: ['data'],
  cancelTrialSuccess: ['cancelTrialResult'],
  cancelTrialFailure: ['cancelTrialError'],

  undoCancelSubRequest: ['subscriptionId'],
  undoCancelSubSuccess: ['undoCancelSubResult'],
  undoCancelSubFailure: ['undoCancelSubError'],

  undoPauseSubRequest: ['subscriptionId'],
  undoPauseSubSuccess: ['undoPauseSubResult'],
  undoPauseSubFailure: ['undoPauseSubError'],

  questionsDataRequest: null,
  questionsDataSuccess: ['questionsDataResult'],
  questionsDataFailure: ['questionsDataError'],

  createIntentRequest: ['data'],
  createIntentSuccess: ['intentResult'],
  createIntentFailure: ['intentError'],
  createIntentReset: null,

  setChargebeeCardFetching: ['chargebeeCardFetching'],
  setYearlySubscription: ['isYearlySubscription'],

  onBoardingFetchingReset: null,
  logout: null,

  restoreCancel: ['data']
});

export const OnboardingTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  selectedCategory: [],
  focusCategory: null,

  selectedPlan: {},
  focusPlan: null,

  switchPlan: {},
  isYearlySubscription: false,

  countries: null,
  countriesFetching: false,

  presetBillingAddress: null,

  discountResult: null,
  discountError: null,
  discountFetching: false,

  saveSubscriptionResult: null,
  saveSubscriptionError: null,
  saveSubscriptionFetching: false,

  updateSubscriptionResult: null,
  updateSubscriptionError: null,
  updateSubscriptionFetching: false,

  deleteSubscriptionResult: null,
  deleteSubscriptionError: null,
  deleteSubscriptionFetching: false,

  undoDeleteSubscriptionResult: null,
  undoDeleteSubscriptionError: null,
  undoDeleteSubscriptionFetching: false,

  cancelSubFetching: false,
  cancelSubResult: null,
  cancelSubError: null,

  cancelTrialFetching: false,
  cancelTrialResult: null,
  cancelTrialError: null,

  undoCancelSubFetching: false,
  undoCancelSubResult: null,
  undoCancelSubError: null,

  undoPauseSubFetching: false,
  undoPauseSubResult: null,
  undoPauseSubError: null,

  questionsDataResult: null,
  questionsDataFetching: null,

  step_1: null,
  step_2: [],
  step_2_other: null,
  step_3: null,

  intentResult: null,
  intentError: null,
  intentFetching: false,

  chargebeeCardFetching: false,

  isRestoredCancel: false,
});

/* ------------- Selectors ------------- */
export const getState = (state) => state.onBoarding;

export const onBoardingSetProp = (state, { key, value }) => {
  const obj = {};
  obj[key] = value;

  return state.merge(obj);
};

export const setSelectedCategory = (state, { selectedCategory }) =>
  state.merge({ selectedCategory });
export const focusCategory = (state, { focusCategory }) =>
  state.merge({ focusCategory });
export const focusCategoryReset = (state, {}) =>
  state.merge({ focusCategory: null });

export const setSelectedPlan = (state, { selectedPlan }) =>
  state.merge({ selectedPlan });
export const focusPlan = (state, { focusPlan }) => state.merge({ focusPlan });
export const focusPlanReset = (state, {}) => state.merge({ focusPlan: null });

export const setSwitchPlan = (state, { switchPlan }) => {
  if (switchPlan) {
    return state.merge({ switchPlan });
  }
  return state.merge({ switchPlan: {} });
};

export const restoreCancel = (state, {data}) =>
  state.merge({ isRestoredCancel: data })

export const countriesRequest = (state, {}) =>
  state.merge({ countriesFetching: true });
export const countriesSuccess = (state, { countries }) =>
  state.merge({ countriesFetching: false, countries });

export const saveBillingAddress = (state, { presetBillingAddress }) =>
  state.merge({ presetBillingAddress });
export const clearBillingAddress = (state, {}) =>
  state.merge({ presetBillingAddress: null });

export const checkDiscountCodeRequest = (state, { code }) =>
  state.merge({ discountFetching: true });
export const checkDiscountCodeSuccess = (state, { discountResult }) =>
  state.merge({ discountFetching: false, discountResult });
export const checkDiscountCodeFailure = (state, { discountError }) =>
  state.merge({ discountFetching: false, discountError });
export const checkDiscountCodeReset = (state, {}) =>
  state.merge({ discountResult: null, discountError: null });

export const saveSubscriptionRequest = (state, { data }) =>
  state.merge({ saveSubscriptionFetching: true });
export const saveSubscriptionSuccess = (state, { saveSubscriptionResult }) =>
  state.merge({
    saveSubscriptionFetching: false,
    saveSubscriptionResult,

    selectedCategory: [],
    focusCategory: null,

    selectedPlan: {},
    focusPlan: null,
  });
export const saveSubscriptionFailure = (state, { saveSubscriptionError }) =>
  state.merge({ saveSubscriptionFetching: false, saveSubscriptionError });

export const changeSubscriptionReset = (state, {}) =>
  state.merge({
    saveSubscriptionFetching: false,
    saveSubscriptionResult: null,
    saveSubscriptionError: null,

    updateSubscriptionFetching: false,
    updateSubscriptionResult: null,
    updateSubscriptionError: null,

    deleteSubscriptionFetching: false,
    deleteSubscriptionResult: null,
    deleteSubscriptionError: null,

    undoDeleteSubscriptionFetching: false,
    undoDeleteSubscriptionResult: null,
    undoDeleteSubscriptionError: null,

    cancelSubFetching: false,
    cancelSubResult: null,
    cancelSubError: null,

    cancelTrialFetching: false,
    cancelTrialResult: null,
    cancelTrialError: null,

    undoCancelSubFetching: false,
    undoCancelSubResult: null,
    undoCancelSubError: null,

    undoPauseSubFetching: false,
    undoPauseSubResult: null,
    undoPauseSubError: null,

    isRestoredCancel: false
  });

export const updateSubscriptionRequest = (state, { data }) =>
  state.merge({ updateSubscriptionFetching: true });
export const updateSubscriptionSuccess = (state, { updateSubscriptionResult }) =>
  state.merge({
    updateSubscriptionFetching: false,
    updateSubscriptionResult,

    switchPlan: {},
  });
export const updateSubscriptionFailure = (state, { updateSubscriptionError }) =>
  state.merge({ updateSubscriptionFetching: false, updateSubscriptionError });

export const deleteSubscriptionRequest = (state, { categoryId }) =>
  state.merge({ deleteSubscriptionFetching: true });
export const deleteSubscriptionSuccess = (state, { deleteSubscriptionResult }) =>
  state.merge({
    deleteSubscriptionFetching: false,
    deleteSubscriptionResult,

    switchPlan: {},
  });
export const deleteSubscriptionFailure = (state, { deleteSubscriptionError }) =>
  state.merge({ deleteSubscriptionFetching: false, deleteSubscriptionError });

export const undoDeleteSubscriptionRequest = (state, { data }) =>
  state.merge({ undoDeleteSubscriptionFetching: true });
export const undoDeleteSubscriptionSuccess = (state, { undoDeleteSubscriptionResult }) =>
  state.merge({
    undoDeleteSubscriptionFetching: false,
    undoDeleteSubscriptionResult,
  });
export const undoDeleteSubscriptionFailure = (state, { undoDeleteSubscriptionError }) =>
  state.merge({
    undoDeleteSubscriptionFetching: false,
    undoDeleteSubscriptionError,
  });

export const cancelSubRequest = (state, { subscriptionId }) =>
  state.merge({ cancelSubFetching: true });
export const cancelSubSuccess = (state, { cancelSubResult }) =>
  state.merge({
    cancelSubFetching: false,
    cancelSubResult,
    switchPlan: {},
  });
export const cancelSubFailure = (state, { cancelSubError }) =>
  state.merge({ cancelSubFetching: false, cancelSubError });

export const cancelTrialRequest = (state, { data }) =>
  state.merge({ cancelTrialFetching: true });
export const cancelTrialSuccess = (state, { cancelTrialResult }) =>
  state.merge({
    cancelTrialFetching: false,
    cancelTrialResult,
  });
export const cancelTrialFailure = (state, { cancelSubError }) =>
  state.merge({ cancelTrialFetching: false, cancelSubError });

export const undoCancelSubRequest = (state, { subscriptionId }) =>
  state.merge({ undoCancelSubFetching: true });
export const undoCancelSubSuccess = (state, { undoCancelSubResult }) =>
  state.merge({
    undoCancelSubFetching: false,
    undoCancelSubResult,
  });
export const undoCancelSubFailure = (state, { undoCancelSubError }) =>
  state.merge({
    undoCancelSubFetching: false,
    undoCancelSubError,
  });

export const undoPauseSubRequest = (state, { subscriptionId }) =>
  state.merge({ undoPauseSubFetching: true });
export const undoPauseSubSuccess = (state, { undoPauseSubResult }) =>
  state.merge({
    undoPauseSubFetching: false,
    undoPauseSubResult,
  });
export const undoPauseSubFailure = (state, { undoPauseSubError }) =>
  state.merge({
    undoPauseSubFetching: false,
    undoPauseSubError,
  });

export const onBoardingFetchingReset = (state) =>
  state.merge({
    countriesFetching: false,
    discountFetching: false,
    saveSubscriptionFetching: false,
    updateSubscriptionFetching: false,
    deleteSubscriptionFetching: false,
    undoDeleteSubscriptionFetching: false,
    questionsDataFetching: false,
    intentFetching: false,
    chargebeeCardFetching: false,
  });

export const questionsDataRequest = (state, {}) =>
  state.merge({ questionsDataFetching: true });

export const createIntentRequest = (state, { data }) =>
  state.merge({ intentFetching: true });
export const createIntentSuccess = (state, { intentResult }) =>
  state.merge({
    intentFetching: false,
    intentResult,
  });
export const createIntentFailure = (state, { intentError }) =>
  state.merge({ intentFetching: false, chargebeeCardFetching: false, intentError });
export const createIntentReset = (state, {}) =>
  state.merge({
    intentFetching: false,
    chargebeeCardFetching: false,
    intentResult: null,
    intentError: null,
  });

export const setChargebeeCardFetching = (state, { chargebeeCardFetching }) =>
  state.merge({ chargebeeCardFetching });

export const questionsDataSuccess = (state, { questionsDataResult }) =>
  state.merge({ questionsDataFetching: false, questionsDataResult });

export const setYearlySubscription = (state, { isYearlySubscription }) =>
  state.merge({ isYearlySubscription });

export const logout = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_BOARDING_SET_PROP]: onBoardingSetProp,

  [Types.SET_SELECTED_CATEGORY]: setSelectedCategory,

  [Types.FOCUS_CATEGORY]: focusCategory,
  [Types.FOCUS_CATEGORY_RESET]: focusCategoryReset,

  [Types.SET_SELECTED_PLAN]: setSelectedPlan,

  [Types.SET_SWITCH_PLAN]: setSwitchPlan,

  [Types.FOCUS_PLAN]: focusPlan,
  [Types.FOCUS_PLAN_RESET]: focusPlanReset,

  [Types.COUNTRIES_REQUEST]: countriesRequest,
  [Types.COUNTRIES_SUCCESS]: countriesSuccess,

  [Types.SAVE_BILLING_ADDRESS]: saveBillingAddress,
  [Types.CLEAR_BILLING_ADDRESS]: clearBillingAddress,

  [Types.CHECK_DISCOUNT_CODE_REQUEST]: checkDiscountCodeRequest,
  [Types.CHECK_DISCOUNT_CODE_SUCCESS]: checkDiscountCodeSuccess,
  [Types.CHECK_DISCOUNT_CODE_FAILURE]: checkDiscountCodeFailure,
  [Types.CHECK_DISCOUNT_CODE_RESET]: checkDiscountCodeReset,

  [Types.SAVE_SUBSCRIPTION_REQUEST]: saveSubscriptionRequest,
  [Types.SAVE_SUBSCRIPTION_SUCCESS]: saveSubscriptionSuccess,
  [Types.SAVE_SUBSCRIPTION_FAILURE]: saveSubscriptionFailure,

  [Types.UPDATE_SUBSCRIPTION_REQUEST]: updateSubscriptionRequest,
  [Types.UPDATE_SUBSCRIPTION_SUCCESS]: updateSubscriptionSuccess,
  [Types.UPDATE_SUBSCRIPTION_FAILURE]: updateSubscriptionFailure,

  [Types.DELETE_SUBSCRIPTION_REQUEST]: deleteSubscriptionRequest,
  [Types.DELETE_SUBSCRIPTION_SUCCESS]: deleteSubscriptionSuccess,
  [Types.DELETE_SUBSCRIPTION_FAILURE]: deleteSubscriptionFailure,

  [Types.UNDO_DELETE_SUBSCRIPTION_REQUEST]: undoDeleteSubscriptionRequest,
  [Types.UNDO_DELETE_SUBSCRIPTION_SUCCESS]: undoDeleteSubscriptionSuccess,
  [Types.UNDO_DELETE_SUBSCRIPTION_FAILURE]: undoDeleteSubscriptionFailure,

  [Types.CANCEL_SUB_REQUEST]: cancelSubRequest,
  [Types.CANCEL_SUB_SUCCESS]: cancelSubSuccess,
  [Types.CANCEL_SUB_FAILURE]: cancelSubFailure,

  [Types.CANCEL_TRIAL_REQUEST]: cancelTrialRequest,
  [Types.CANCEL_TRIAL_SUCCESS]: cancelTrialSuccess,
  [Types.CANCEL_TRIAL_FAILURE]: cancelTrialFailure,

  [Types.UNDO_CANCEL_SUB_REQUEST]: undoCancelSubRequest,
  [Types.UNDO_CANCEL_SUB_SUCCESS]: undoCancelSubSuccess,
  [Types.UNDO_CANCEL_SUB_FAILURE]: undoCancelSubFailure,

  [Types.UNDO_PAUSE_SUB_REQUEST]: undoPauseSubRequest,
  [Types.UNDO_PAUSE_SUB_SUCCESS]: undoPauseSubSuccess,
  [Types.UNDO_PAUSE_SUB_FAILURE]: undoPauseSubFailure,

  [Types.CHANGE_SUBSCRIPTION_RESET]: changeSubscriptionReset,

  [Types.ON_BOARDING_FETCHING_RESET]: onBoardingFetchingReset,

  [Types.QUESTIONS_DATA_REQUEST]: questionsDataRequest,
  [Types.QUESTIONS_DATA_SUCCESS]: questionsDataSuccess,

  [Types.CREATE_INTENT_REQUEST]: createIntentRequest,
  [Types.CREATE_INTENT_SUCCESS]: createIntentSuccess,
  [Types.CREATE_INTENT_FAILURE]: createIntentFailure,
  [Types.CREATE_INTENT_RESET]: createIntentReset,

  [Types.SET_CHARGEBEE_CARD_FETCHING]: setChargebeeCardFetching,
  [Types.SET_YEARLY_SUBSCRIPTION]: setYearlySubscription,

  [Types.RESTORE_CANCEL]: restoreCancel,

  [Types.LOGOUT]: logout,
});
