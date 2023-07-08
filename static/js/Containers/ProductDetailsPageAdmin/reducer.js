import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getProductDetailsAdminRequest: ['payload'], // payload: { search } --> filters: month, drop_id
  getProductDetailsAdminSuccess: ['payload'], // payload: { data }
  getProductDetailsAdminFailure: ['payload'], // payload: { errors }

  deleteProductDetailsAdminRequest: ['payload'],
  deleteProductDetailsAdminSuccess: ['payload'],
  deleteProductDetailsAdminFailure: ['payload'],

  changeStatusProductDetailsAdminRequest: ['payload'],
  changeStatusProductDetailsAdminSuccess: ['payload'],
  changeStatusProductDetailsAdminFailure: ['payload'],

  updateProductDetailsAdminRequest: ['payload'],
  updateProductDetailsAdminSuccess: ['payload'],
  updateProductDetailsAdminFailure: ['payload'],

  getProductDetailsAdminShopifyRequest: ['payload'],
  getProductDetailsAdminShopifySuccess: ['payload'],
  getProductDetailsAdminShopifyFailure: ['payload'],

  deleteImageRequest: ['payload'],
  deleteImageSuccess: ['payload'],
  deleteImageFailure: ['payload'],

  addCompetitorsRequest: ['payload'], // payload: { data }
  addCompetitorsSuccess: ['payload'], // payload: { data }
  addCompetitorsFailure: ['payload'], // payload: { errors }

  deleteCompetitorsRequest: ['payload'], // payload: { data }
  deleteCompetitorsSuccess: ['payload'], // payload: { data }
  deleteCompetitorsFailure: ['payload'], // payload: { errors }

  uploadImageRequest: ['payload'], // payload: { data }
  uploadImageSuccess: ['payload'], // payload: { data }
  uploadImageFailure: ['payload'], // payload: { errors }

  addSupplierRequest: ['payload'], // payload: { data }
  addSupplierSuccess: ['payload'], // payload: { data }
  addSupplierFailure: ['payload'], // payload: { errors }

  deleteSupplierRequest: ['payload'], // payload: { data }
  deleteSupplierSuccess: ['payload'], // payload: { data }
  deleteSupplierFailure: ['payload'], // payload: { errors }

  getBdRequest: ['payload'], // payload: { data }
  getBdSuccess: ['payload'], // payload: { data }
  getBdFailure: ['payload'], // payload: { errors }

  getBdNextRequest: ['payload'], // payload: { link }
  getBdNextSuccess: ['payload'], // payload: { data }
  getBdNextFailure: ['payload'], // payload: { errors }

  addBdRequest: ['payload'], // payload: { data }
  addBdSuccess: ['payload'], // payload: { data }
  addBdFailure: ['payload'], // payload: { errors }

  deleteBdRequest: ['payload'], // payload: { data }
  deleteBdSuccess: ['payload'], // payload: { data }
  deleteBdFailure: ['payload'], // payload: { errors }

  getInterestTargetRequest: ['payload'], // payload: { data }
  getInterestTargetSuccess: ['payload'], // payload: { data }
  getInterestTargetFailure: ['payload'], // payload: { errors }

  getInterestTargetNextRequest: ['payload'], // payload: { link }
  getInterestTargetNextSuccess: ['payload'], // payload: { data }
  getInterestTargetNextFailure: ['payload'], // payload: { errors }

  getShopifyTargetNextRequest: ['payload'], // payload: { link }
  getShopifyTargetNextSuccess: ['payload'], // payload: { data }
  getShopifyTargetNextFailure: ['payload'], // payload: { errors }

  changeInterestTargetRequest: ['payload'], // payload: { data }
  changeInterestTargetSuccess: ['payload'], // payload: { data }
  changeInterestTargetFailure: ['payload'], // payload: { errors }

  changeShopifyTargetRequest: ['payload'], // payload: { data }
  changeShopifyTargetSuccess: ['payload'], // payload: { data }
  changeShopifyTargetFailure: ['payload'], // payload: { errors }

  changeApprovedInterests: ['payload'], // payload: { data }

  clearProductData: null,
  clearSaveResult: null,

  saveInfoData: ['payload'],
  clearInfoData: ['payload'],
});

export const ProductDetailsAdminTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  productDetails: {},
  info: null,
  benefitsDrawbacks: null,
  interestTarget: null,
  loading: false,
  errors: false,
  saveResult: null,
  changeStatusFetching: false,
  deleteFetching: false,
  updateLoading: false,
  addCompetitorsLoading: false,
  addSupplierLoading: false,
  benefitsDrawbacksLoading: false,
  interestTargetLoading: false,

  // competitors shopify
  shopifyTarget: null,
  selected_count: null,
  shopifyLoading: false,
  resultSaveShopify: null,
});

/* ------------- Functions for reducer cases ------------- */

const getProductDetailsAdminRequest = (state) => state.merge({ loading: true });

const getProductDetailsAdminSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, productDetails: data });

const getProductDetailsAdminFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });

const getProductDetailsAdminShopifyRequest = (state) => state.merge({ shopifyLoading: true });

const getProductDetailsAdminShopifySuccess = (state, { payload: data }) =>
  state.merge({ shopifyLoading: false, shopifyTarget: data });

const getProductDetailsAdminShopifyFailure = (state, { payload: { errors } }) =>
  state.merge({ productsShopifyLoading: false, errors });

const deleteProductDetailsAdminRequest = (state, { payload: { data } }) =>
  state.merge({ deleteFetching: true });

const deleteProductDetailsAdminSuccess = (state, { payload: data }) =>
  state.merge({ deleteFetching: false, saveResult: { removed: data } });

const deleteProductDetailsAdminFailure = (state, { payload: { errors } }) =>
  state.merge({ deleteFetching: false, errors });

const changeStatusProductDetailsAdminRequest = (state, { payload: { data } }) =>
  state.merge({ changeStatusFetching: true });

const changeStatusProductDetailsAdminSuccess = (state, { payload: data }) =>
  state.merge({
    changeStatusFetching: false,
    productDetails: {
      ...state.productDetails,
      current: data,
    },
    saveResult: { changed_status: true },
  });

const changeStatusProductDetailsAdminFailure = (
  state,
  { payload: { errors } },
) => state.merge({ changeStatusFetching: false, errors });

const updateProductDetailsAdminRequest = (state, { payload: { data } }) =>
  state.merge({ loading: true, updateLoading: true });

const updateProductDetailsAdminSuccess = (state, { payload: data }) =>
  state.merge({
    loading: false,
    updateLoading: false,
    productDetails: {
      ...state.productDetails,
      current: data,
    },
    saveResult: { saved: true },
  });

const updateProductDetailsAdminFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, updateLoading: false, errors });

const deleteImageRequest = (state, { payload: { data } }) =>
  state.merge({ loading: true });

const deleteImageSuccess = (state, { payload: data }) =>
  state.merge({
    saveResult: { deleteImage: true, images: data?.images },
    loading: false,
  });

const deleteImageFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });

const uploadImageRequest = (state) => state.merge({ updateLoading: true });

const uploadImageSuccess = (state, { payload: data }) =>
  state.merge({
    updateLoading: false,
    saveResult: { uploadImage: true, images: data?.images },
  });

const uploadImageFailure = (state, { payload: { errors } }) =>
  state.merge({ updateLoading: false, errors });

const addCompetitorsRequest = (state) =>
  state.merge({ addCompetitorsLoading: true });

const addCompetitorsSuccess = (state, { payload: data }) =>
  state.merge({
    addCompetitorsLoading: false,
    saveResult: { addCompetitors: true, data },
  });

const addCompetitorsFailure = (state, { payload: { errors } }) =>
  state.merge({ addCompetitorsLoading: false, errors });

const deleteCompetitorsRequest = (state) =>
  state.merge({ addCompetitorsLoading: true });

const deleteCompetitorsSuccess = (state, { payload: data }) => {
  return (state.merge({
    addCompetitorsLoading: false,
    saveResult: { deleteCompetitors: true, data },
    shopifyTarget: {
      ...state?.shopifyTarget,
      results: [
        ...state?.shopifyTarget.results.map((el) =>
          data.competitors.some(({ key }) => el.id === key)
            ? { ...el, selected: true }
            : { ...el, selected: false }
        ),
      ],
      selected_count: data.competitors.length,
    }
  }))
}

const deleteCompetitorsFailure = (state, { payload: { errors } }) =>
  state.merge({ addCompetitorsLoading: false, errors });

const addSupplierRequest = (state) => state.merge({ addSupplierLoading: true });

const addSupplierSuccess = (state, { payload: data }) =>
  state.merge({
    productDetails: {
      ...state.productDetails,
      current: {
        ...state.productDetails.current,
        suppliers: data?.suppliers,
      },
    },
    addSupplierLoading: false,
    saveResult: { addSupplier: true, data },
  });

const addSupplierFailure = (state, { payload: { errors } }) =>
  state.merge({ addSupplierLoading: false, errors });

const deleteSupplierRequest = (state) =>
  state.merge({ addSupplierLoading: true });

const deleteSupplierSuccess = (state, { payload: data }) =>
  state.merge({
    productDetails: {
      ...state.productDetails,
      current: {
        ...state.productDetails.current,
        suppliers: data?.suppliers,
      },
    },
    addSupplierLoading: false,
    saveResult: { deleteSupplier: true, data },
  });

const deleteSupplierFailure = (state, { payload: { errors } }) =>
  state.merge({ addSupplierLoading: false, errors });

// GET BENEFITS AND DROBACKS LIST

const getBdRequest = (state) =>
  state.merge({
    benefitsDrawbacksLoading: true,
  });

const getBdSuccess = (state, { payload: data }) =>
  state.merge({
    benefitsDrawbacksLoading: false,
    benefitsDrawbacks: data,
  });

const getBdFailure = (state, { payload: { errors } }) =>
  state.merge({
    benefitsDrawbacksLoading: false,
    errors,
  });

// GET BENEFITS AND DROBACKS NEXT LIST

export const getBdNextRequest = (state) =>
  state.merge({ benefitsDrawbacksLoading: true });

export const getBdNextSuccess = (state, { payload: data }) => {
  const nextData = state.benefitsDrawbacks?.results?.concat(data.results);
  return state.merge({
    benefitsDrawbacksLoading: false,
    benefitsDrawbacks: { ...data, results: nextData },
  });
};
export const getBdNextFailure = (state, { payload: { errors } }) =>
  state.merge({ benefitsDrawbacksLoading: false, errors });

// ADD NEW LIST TO BENEFITS AND DROBACKS
const addBdRequest = (state) =>
  state.merge({
    benefitsDrawbacksLoading: true,
  });

const addBdSuccess = (state, { payload: data }) =>
  state.merge({
    benefitsDrawbacksLoading: false,
    saveResult: { addBd: true, data },
  });

const addBdFailure = (state, { payload: { errors } }) =>
  state.merge({
    benefitsDrawbacksLoading: false,
    errors,
  });

const deleteBdRequest = (state) =>
  state.merge({
    benefitsDrawbacksLoading: true,
  });

const deleteBdSuccess = (state, { payload: data }) =>
  state.merge({
    benefitsDrawbacksLoading: false,
    saveResult: { deleteBd: true, data },
  });

const deleteBdFailure = (state, { payload: { errors } }) =>
  state.merge({
    benefitsDrawbacksLoading: false,
    errors,
  });

// GET INTEREST TARGET LIST

const getInterestTargetRequest = (state) =>
  state.merge({
    interestTargetLoading: true,
  });

const getInterestTargetSuccess = (state, { payload: data }) =>
  state.merge({
    interestTargetLoading: false,
    saveResult: { interestTarget: true },
    interestTarget: data,
  });

const getInterestTargetFailure = (state, { payload: { errors } }) =>
  state.merge({
    interestTargetLoading: false,
    errors,
  });

// GET INTEREST TARGET NEXT LIST

const getInterestTargetNextRequest = (state) =>
  state.merge({ interestTargetLoading: true });

const getInterestTargetNextSuccess = (state, { payload: data }) => {
  const nextData = state.interestTarget?.results?.concat(data.results);
  return state.merge({
    interestTargetLoading: false,
    saveResult: { interestTarget: true },
    interestTarget: { ...data, results: nextData },
  });
};
const getInterestTargetNextFailure = (state, { payload: { errors } }) =>
  state.merge({ interestTargetLoading: false, errors });

// GET SHOPIFY TARGET NEXT LIST

const getShopifyTargetNextRequest = (state) =>
  state.merge({ shopifyLoading: true });

const getShopifyTargetNextSuccess = (state, { payload: data }) => {
  const nextData = state.shopifyTarget?.results?.concat(data.results);
  return state.merge({
    shopifyLoading: false,
    shopifySaveResult: { shopifyTarget: true },
    shopifyTarget: { ...data, results: nextData },
  });
};
const getShopifyTargetNextFailure = (state, { payload: { errors } }) =>
  state.merge({ shopifyLoading: false, errors });

// CHANGE INTEREST TARGET

const changeInterestTargetRequest = (state) =>
  state.merge({
    interestTargetLoading: true,
  });

const changeInterestTargetSuccess = (state, { payload: data }) => {
  if(data?.success){

    let newInterestsList = data.interest.selected
      ? [...state.productDetails.current.interests, data.interest]
      : [...state.productDetails.current.interests.filter(el => el.id !== data.interest.id)]

    return state.merge({
      productDetails: {
        ...state.productDetails,
        current: {
          ...state.productDetails.current,
          interests: newInterestsList,
        },
      },
      interestTargetLoading: false,
      saveResult: { interestTarget: true },
      interestTarget: {
        ...state?.interestTarget,
        results: [...state?.interestTarget.results.map(interest => interest.id === data?.interest?.id ? data?.interest : interest)],
        approved: data.approved,
      }
    });
  }
}

const changeInterestTargetFailure = (state, { payload: { errors } }) =>
  state.merge({
    interestTargetLoading: false,
    errors,
  });

// CHANGE COMPETITORS SHOPIFY TARGET

const changeShopifyTargetRequest = (state) =>
  state.merge({
    shopifyLoading: true,
  });

const changeShopifyTargetSuccess = (state, { payload: data }) => {
  if (data?.success) {
    return state.merge({
      productDetails: {
        ...state.productDetails,
        current: {
          ...state.productDetails.current,
          competitors: [...data?.competitors],
        },
      },
      resultSaveShopify: data,
      shopifyLoading: false,
      saveResult: { shopifyTarget: true },
      shopifyTarget: {
        ...state?.shopifyTarget,
        results: [
          ...state?.shopifyTarget.results.map((el) =>
            data.competitors.some(({ key }) => el.id === key)
              ? { ...el, selected: true }
              : { ...el, selected: false }
          ),
        ],
        selected_count: data.selected_count,
      }
    });
  }
}

const changeShopifyTargetFailure = (state, { payload: { errors } }) =>
  state.merge({
    shopifyLoading: false,
    errors,
  });

const changeApprovedInterests = (state, { payload: data }) => {
  return state.merge({
    interestTarget: {
      ...state?.interestTarget,
      approved: {
        approved_ids: data,
        approved_count: data?.length,
      },
    },
  });
};

const clearProductData = (state) =>
  state.merge({
    productDetails: {},
    interestTarget: null,
    shopifyTarget: null,
    errors: false,
    loading: false,
    shopifyLoading: false,
  });

const clearSaveResult = (state) =>
  state.merge({
    saveResult: null,
    benefitsDrawbacks: null,
    errors: false,
    loading: false,
    changeStatusFetching: false,
    deleteFetching: false,
    updateLoading: false,
    addCompetitorsLoading: false,
    addSupplierLoading: false,
    benefitsDrawbacksLoading: false,
    resultSaveShopify: null,
    // shopifyLoading: false,
  });

const saveInfoData = (state, { payload: data }) => state.merge({ info: data });

const clearInfoData = (state) => state.merge({ info: null });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PRODUCT_DETAILS_ADMIN_REQUEST]: getProductDetailsAdminRequest,
  [Types.GET_PRODUCT_DETAILS_ADMIN_SUCCESS]: getProductDetailsAdminSuccess,
  [Types.GET_PRODUCT_DETAILS_ADMIN_FAILURE]: getProductDetailsAdminFailure,

  [Types.GET_PRODUCT_DETAILS_ADMIN_SHOPIFY_REQUEST]: getProductDetailsAdminShopifyRequest,
  [Types.GET_PRODUCT_DETAILS_ADMIN_SHOPIFY_SUCCESS]: getProductDetailsAdminShopifySuccess,
  [Types.GET_PRODUCT_DETAILS_ADMIN_SHOPIFY_FAILURE]: getProductDetailsAdminShopifyFailure,

  [Types.DELETE_PRODUCT_DETAILS_ADMIN_REQUEST]:
    deleteProductDetailsAdminRequest,
  [Types.DELETE_PRODUCT_DETAILS_ADMIN_SUCCESS]:
    deleteProductDetailsAdminSuccess,
  [Types.DELETE_PRODUCT_DETAILS_ADMIN_FAILURE]:
    deleteProductDetailsAdminFailure,

  [Types.CHANGE_STATUS_PRODUCT_DETAILS_ADMIN_REQUEST]:
    changeStatusProductDetailsAdminRequest,
  [Types.CHANGE_STATUS_PRODUCT_DETAILS_ADMIN_SUCCESS]:
    changeStatusProductDetailsAdminSuccess,
  [Types.CHANGE_STATUS_PRODUCT_DETAILS_ADMIN_FAILURE]:
    changeStatusProductDetailsAdminFailure,

  [Types.UPDATE_PRODUCT_DETAILS_ADMIN_REQUEST]:
    updateProductDetailsAdminRequest,
  [Types.UPDATE_PRODUCT_DETAILS_ADMIN_SUCCESS]:
    updateProductDetailsAdminSuccess,
  [Types.UPDATE_PRODUCT_DETAILS_ADMIN_FAILURE]:
    updateProductDetailsAdminFailure,

  [Types.DELETE_IMAGE_REQUEST]: deleteImageRequest,
  [Types.DELETE_IMAGE_SUCCESS]: deleteImageSuccess,
  [Types.DELETE_IMAGE_FAILURE]: deleteImageFailure,

  [Types.UPLOAD_IMAGE_REQUEST]: uploadImageRequest,
  [Types.UPLOAD_IMAGE_SUCCESS]: uploadImageSuccess,
  [Types.UPLOAD_IMAGE_FAILURE]: uploadImageFailure,

  [Types.ADD_COMPETITORS_REQUEST]: addCompetitorsRequest,
  [Types.ADD_COMPETITORS_SUCCESS]: addCompetitorsSuccess,
  [Types.ADD_COMPETITORS_FAILURE]: addCompetitorsFailure,

  [Types.DELETE_COMPETITORS_REQUEST]: deleteCompetitorsRequest,
  [Types.DELETE_COMPETITORS_SUCCESS]: deleteCompetitorsSuccess,
  [Types.DELETE_COMPETITORS_FAILURE]: deleteCompetitorsFailure,

  [Types.ADD_SUPPLIER_REQUEST]: addSupplierRequest,
  [Types.ADD_SUPPLIER_SUCCESS]: addSupplierSuccess,
  [Types.ADD_SUPPLIER_FAILURE]: addSupplierFailure,

  [Types.DELETE_SUPPLIER_REQUEST]: deleteSupplierRequest,
  [Types.DELETE_SUPPLIER_SUCCESS]: deleteSupplierSuccess,
  [Types.DELETE_SUPPLIER_FAILURE]: deleteSupplierFailure,

  [Types.GET_BD_REQUEST]: getBdRequest,
  [Types.GET_BD_SUCCESS]: getBdSuccess,
  [Types.GET_BD_FAILURE]: getBdFailure,

  [Types.GET_BD_NEXT_REQUEST]: getBdNextRequest,
  [Types.GET_BD_NEXT_SUCCESS]: getBdNextSuccess,
  [Types.GET_BD_NEXT_FAILURE]: getBdNextFailure,

  [Types.ADD_BD_REQUEST]: addBdRequest,
  [Types.ADD_BD_SUCCESS]: addBdSuccess,
  [Types.ADD_BD_FAILURE]: addBdFailure,

  [Types.DELETE_BD_REQUEST]: deleteBdRequest,
  [Types.DELETE_BD_SUCCESS]: deleteBdSuccess,
  [Types.DELETE_BD_FAILURE]: deleteBdFailure,

  [Types.GET_INTEREST_TARGET_REQUEST]: getInterestTargetRequest,
  [Types.GET_INTEREST_TARGET_SUCCESS]: getInterestTargetSuccess,
  [Types.GET_INTEREST_TARGET_FAILURE]: getInterestTargetFailure,

  [Types.GET_INTEREST_TARGET_NEXT_REQUEST]: getInterestTargetNextRequest,
  [Types.GET_INTEREST_TARGET_NEXT_SUCCESS]: getInterestTargetNextSuccess,
  [Types.GET_INTEREST_TARGET_NEXT_FAILURE]: getInterestTargetNextFailure,

  [Types.GET_SHOPIFY_TARGET_NEXT_REQUEST]: getShopifyTargetNextRequest,
  [Types.GET_SHOPIFY_TARGET_NEXT_SUCCESS]: getShopifyTargetNextSuccess,
  [Types.GET_SHOPIFY_TARGET_NEXT_FAILURE]: getShopifyTargetNextFailure,

  [Types.CHANGE_INTEREST_TARGET_REQUEST]: changeInterestTargetRequest,
  [Types.CHANGE_INTEREST_TARGET_SUCCESS]: changeInterestTargetSuccess,
  [Types.CHANGE_INTEREST_TARGET_FAILURE]: changeInterestTargetFailure,

  [Types.CHANGE_SHOPIFY_TARGET_REQUEST]: changeShopifyTargetRequest,
  [Types.CHANGE_SHOPIFY_TARGET_SUCCESS]: changeShopifyTargetSuccess,
  [Types.CHANGE_SHOPIFY_TARGET_FAILURE]: changeShopifyTargetFailure,

  [Types.CHANGE_APPROVED_INTERESTS]: changeApprovedInterests,

  [Types.CLEAR_SAVE_RESULT]: clearSaveResult,
  [Types.CLEAR_PRODUCT_DATA]: clearProductData,

  [Types.SAVE_INFO_DATA]: saveInfoData,
  [Types.CLEAR_INFO_DATA]: clearInfoData,
});
