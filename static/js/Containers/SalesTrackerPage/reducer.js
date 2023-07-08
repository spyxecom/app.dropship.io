import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    getSalesReportRequest: ['payload'],
    getSalesReportSuccess: ['payload'],
    getSalesReportFailure: ['payload'],

    getRevenueReportRequest: ['payload'],
    getRevenueReportSuccess: ['payload'],
    getRevenueReportFailure: ['payload'],

    getProductReportRequest: ['payload'],
    getProductReportSuccess: ['payload'],
    getProductReportFailure: ['payload'],

    getTrackingStoresRequest: ['payload'],
    getTrackingStoresSuccess: ['payload'],
    getTrackingStoresFailure: ['payload'],

    getTrackingStoresNextRequest: ['payload'],
    getTrackingStoresNextSuccess: ['payload'],
    getTrackingStoresNextFailure: ['payload'],

    getTrackingStoreByIDRequest: ['payload'],
    getTrackingStoreByIDSuccess: ['payload'],
    getTrackingStoreByIDFailure: ['payload'],

    deleteTrackingStoreByIDRequest: ['payload'],
    deleteTrackingStoreByIDSuccess: ['payload'],
    deleteTrackingStoreByIDFailure: ['payload'],

    createTrackingStoreRequest: ['payload'],
    createTrackingStoreSuccess: ['payload'],
    createTrackingStoreFailure: ['payload'],

    createTrackingStoreNewRequest: ['payload'],
    createTrackingStoreNewSuccess: ['payload'],
    createTrackingStoreNewFailure: ['payload'],

    getTrackingProductsRequest: ['payload'],
    getTrackingProductsSuccess: ['payload'],
    getTrackingProductsFailure: ['payload'],

    getTrackingProductsNextRequest: ['payload'],
    getTrackingProductsNextSuccess: ['payload'],
    getTrackingProductsNextFailure: ['payload'],

    getTrackingProductByIDRequest: ['payload'],
    getTrackingProductByIDSuccess: ['payload'],
    getTrackingProductByIDFailure: ['payload'],

    deleteTrackingProductByIDRequest: ['payload'],
    deleteTrackingProductByIDSuccess: ['payload'],
    deleteTrackingProductByIDFailure: ['payload'],

    createTrackingProductRequest: ['payload'],
    createTrackingProductSuccess: ['payload'],
    createTrackingProductFailure: ['payload'],

    createTrackingProductNewRequest: ['payload'],
    createTrackingProductNewSuccess: ['payload'],
    createTrackingProductNewFailure: ['payload'],

    deleteTrackingProductByIDFromStoreRequest: ['payload'],
    deleteTrackingProductByIDFromStoreSuccess: ['payload'],
    deleteTrackingProductByIDFromStoreFailure: ['payload'],

    createTrackingProductFromStoreRequest: ['payload'],
    createTrackingProductFromStoreSuccess: ['payload'],
    createTrackingProductFromStoreFailure: ['payload'],

    getDetailedStoreInfoRequest: ['payload'],
    getDetailedStoreInfoSuccess: ['payload'],
    getDetailedStoreInfoFailure: ['payload'],

    getDetailedProductInfoRequest: ['payload'],
    getDetailedProductInfoSuccess: ['payload'],
    getDetailedProductInfoFailure: ['payload'],

    getDetailedStoreInfoCheckRequest: ['payload'],
    getDetailedStoreInfoCheckSuccess: ['payload'],
    getDetailedStoreInfoCheckFailure: ['payload'],

    getDetailedProductInfoCheckRequest: ['payload'],
    getDetailedProductInfoCheckSuccess: ['payload'],
    getDetailedProductInfoCheckFailure: ['payload'],

    getProductListByStoreRequest: ['payload'],
    getProductListByStoreSuccess: ['payload'],
    getProductListByStoreFailure: ['payload'],

    getStoreProductsModalRequest: ['payload'],
    getStoreProductsModalSuccess: ['payload'],
    getStoreProductsModalFailure: ['payload'],

    getStoreProductsModalNextRequest: ['payload'],
    getStoreProductsModalNextSuccess: ['payload'],
    getStoreProductsModalNextFailure: ['payload'],

    getTopStoresFiltersRequest: null,
    getTopStoresFiltersSuccess: ['payload'],
    getTopStoresFiltersFailure: ['payload'],

    getTopProductsFiltersRequest: null,
    getTopProductsFiltersSuccess: ['payload'],
    getTopProductsFiltersFailure: ['payload'],

    getTopStoresRequest: ['payload'],
    getTopStoresSuccess: ['payload'],
    getTopStoresFailure: ['payload'],

    getTopProductsRequest: ['payload'],
    getTopProductsSuccess: ['payload'],
    getTopProductsFailure: ['payload'],

    getTopStoresCountRequest: ['payload'],
    getTopStoresCountSuccess: ['payload'],
    getTopStoresCountFailure: ['payload'],

    getTopProductsCountRequest: ['payload'],
    getTopProductsCountSuccess: ['payload'],
    getTopProductsCountFailure: ['payload'],

    deleteTrackingTopStoreByIDRequest: ['payload'],
    deleteTrackingTopStoreByIDSuccess: ['payload'],
    deleteTrackingTopStoreByIDFailure: ['payload'],

    createTrackingTopStoreRequest: ['payload'],
    createTrackingTopStoreSuccess: ['payload'],
    createTrackingTopStoreFailure: ['payload'],

    deleteTrackingTopProductByIDRequest: ['payload'],
    deleteTrackingTopProductByIDSuccess: ['payload'],
    deleteTrackingTopProductByIDFailure: ['payload'],

    createTrackingTopProductRequest: ['payload'],
    createTrackingTopProductSuccess: ['payload'],
    createTrackingTopProductFailure: ['payload'],

    resetStoreProductsModal: null,

    resetIsAvailable: null,
    resetErrors: null,
    resetSearchResults: null,
    resetFreePlanError: null,
    resetSearchErrors: null,
    resetLastSuccessfulSearch: null,
    setFilters: ['payload'],
    setCheckedList: ['payload'],
    setView: ['payload'],

    getExpandableChartRequest: ['payload'],
    getExpandableChartSuccess: ['payload'],
    getExpandableChartFailure: ['payload'],

    logout: null,
  }
);

export const SalesTrackerTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  searchLoading: false,
  checkLoading: false,
  detailedStoreLoading: false,
  fetchingSpin: false,
  errors: false,
  fileLoading: false,
  searchErrors: '',
  lastSuccessfulSearch: null,
  products: {
    count: 0,
    next:null,
    previous:null,
    results: [],
    searchResults: [],
    limits: {
      stores: {
        used: 0,
        allowed: 0
      },
      products: {
        used: 0,
        allowed: 0
      },
    },
  },
  stores: {
    count: 0,
    next:null,
    previous:null,
    results: [],
    searchResults: [],
    limits: {
      stores: {
        used: 0,
        allowed: 0
      },
      products: {
        used: 0,
        allowed: 0
      },
    },
  },
  selectedStore: {},
  selectedStoreTableData: {},
  selectedStoreTableDataLoading: false,
  storeProductsModalTableData: {},
  storeProductsModalLoading: false,
  selectedProduct: {},
  selectedProductDataLoading: false,
  filters: {
    report_period: {min: null, max: null}
  },
  checkedList: null,
  expandableChartData: {},
  expandableChartLoading: false,
  showFreePlanError: false,
  isAvailable: null,
  view: 'stores',
  topPage: {
    loading: false,
    filtersLoading: false,
    countLoading: false,
    spinner: false,
    topStores: {
      filters: {},
      count: 0,
      errors: false,
      stores: {},
    },
    topProducts: {
      filters: {},
      count: 0,
      errors: false,
      products: {},
    },
  }
});

/* ------------- Functions for reducer cases ------------- */

const resetSearchResults = (state) =>
  state.merge({stores: {...state?.stores, searchResults: []}, products: {...state.products, searchResults: []}})

const getTopStoresFiltersRequest = (state) =>
  state.merge({ topPage: {...state?.topPage, filtersLoading: true} });

const getTopStoresFiltersSuccess = (state, { payload: data }) =>
  state.merge({ topPage: {...state?.topPage,
      filtersLoading: false,
      topStores: {
        ...state?.topPage?.topStores, filters: data
      }}
  });

const getTopStoresFiltersFailure = (state, { payload: { errors } }) =>
  state.merge({ topPage: {...state?.topPage,
      filtersLoading: false,
      topStores: {
        ...state?.topPage?.topStores, errors: errors
      }}
  });

const getTopProductsFiltersRequest = (state) =>
  state.merge({ topPage: {...state?.topPage, filtersLoading: true} });

const getTopProductsFiltersSuccess = (state, { payload: data }) =>
  state.merge({ topPage: {...state?.topPage,
      filtersLoading: false,
      topProducts: {
        ...state?.topPage?.topProducts, filters: data
      }}
  });

const getTopProductsFiltersFailure = (state, { payload: { errors } }) =>
  state.merge({ topPage: {...state?.topPage,
      filtersLoading: false,
      topProducts: {
        ...state?.topPage?.topProducts, errors: errors
      }}
  });

const getTopStoresRequest = (state, {payload}) => {
  let newSearch = payload?.new_search || false;
  return state.merge({topPage: {...state?.topPage, loading: newSearch, spinner: !newSearch}});
}

const getTopStoresSuccess = (state, { payload: data }) =>
  state.merge({
    topPage: {
      ...state?.topPage,
      loading: false,
      spinner: false,
      topStores: {
        ...state?.topPage?.topStores, stores: {...data}
      }
    }
  });

const getTopStoresFailure = (state, { payload: { errors } }) =>
  state.merge({ topPage: {...state?.topPage,
      loading: false,
      spinner: false,
      topStores: {
        ...state?.topPage?.topStores, errors: errors
      }}
  });

const getTopProductsRequest = (state, {payload}) => {
  let newSearch = payload?.new_search || false;
  return state.merge({topPage: {...state?.topPage, loading: newSearch, spinner: !newSearch}});
}

const getTopProductsSuccess = (state, { payload: data }) =>
  state.merge({ topPage: {...state?.topPage,
      loading: false,
      spinner: false,
      topProducts: {
        ...state?.topPage?.topProducts, products: {...data}
      }}
  });

const getTopProductsFailure = (state, { payload: { errors } }) =>
  state.merge({ topPage: {...state?.topPage,
      loading: false,
      spinner: false,
      topProducts: {
        ...state?.topPage?.topProducts, errors: errors
      }}
  });

const getTopStoresCountRequest = (state, {payload}) => {
  return state.merge({topPage: {...state?.topPage, countLoading: true}});
}

const getTopStoresCountSuccess = (state, { payload: data }) =>
  state.merge({
    topPage: {
      ...state?.topPage,
      countLoading: false,
      topStores: {
        ...state?.topPage?.topStores, count: data?.total
      }
    }
  });

const getTopStoresCountFailure = (state, { payload: { errors } }) =>
  state.merge({ topPage: {...state?.topPage,
      countLoading: false,
      topStores: {
        ...state?.topPage?.topStores, errors: errors
      }}
  });

const getTopProductsCountRequest = (state, {payload}) => {
  return state.merge({topPage: {...state?.topPage, countLoading: true}});
}

const getTopProductsCountSuccess = (state, { payload: data }) =>
  state.merge({ topPage: {...state?.topPage,
      countLoading: false,
      topProducts: {
        ...state?.topPage?.topProducts, count: data?.total
      }}
  });

const getTopProductsCountFailure = (state, { payload: { errors } }) =>
  state.merge({ topPage: {...state?.topPage,
      countLoading: false,
      topProducts: {
        ...state?.topPage?.topProducts, errors: errors
      }}
  });

const deleteTrackingTopStoreByIDRequest = (state, {payload: data}) =>
  state.merge({loading: true});

const deleteTrackingTopStoreByIDSuccess = (state, {payload: data}) => {
  let prevResults = state?.topPage?.topStores?.stores?.results ? [...state.topPage.topStores.stores.results] : [];
  let newData = prevResults.map(el => {
    if (el?.internal_shop_id === data?.internal_shop_id) return {...el, is_tracked: false}
    else return el
  })
  return state.merge({
    loading: false,
    topPage: {
      ...state?.topPage,
      topStores: {
        ...state?.topPage?.topStores,
        stores: {...state?.topPage?.topStores?.stores, results: [...newData]}
      }
    }
  })
}
const deleteTrackingTopStoreByIDFailure = (state, {payload: errors}) =>
  typeof errors === 'object' ?
    state.merge({
      loading: false,
      topPage: {...state?.topPage, topStores: {...state?.topPage?.topStores, errors: errors?.data?.message?.detail}}
    })
    :
    state.merge({
      loading: false,
      topPage: {...state?.topPage, topStores: {...state?.topPage?.topStores, errors: errors}}
    })

const createTrackingTopStoreRequest = (state, {payload: data}) =>
  state.merge( {loading: true});

const createTrackingTopStoreSuccess = (state, {payload: data}) => {
  let prevResults = state?.topPage?.topStores?.stores?.results ? [...state.topPage.topStores.stores.results] : [];
  let newData = [...prevResults].map(el => {
    if (el?.custom_domain === data?.original_domain || +el?.internal_shop_id === +data?.internal_shop_id || el?.custom_domain === data?.custom_domain || data?.custom_domain_search?.includes(el?.custom_domain)) return {...el, is_tracked: true}
    else return el
  })
  return state.merge({
    loading: false,
    topPage: {
      ...state?.topPage,
      topStores: {
        ...state?.topPage?.topStores,
        stores: {...state?.topPage?.topStores?.stores, results: [...newData]}
      }
    }
  })
}
const createTrackingTopStoreFailure = (state, {payload: errors}) =>
  typeof errors === 'object' ?
    state.merge({ loading: false,
      topPage: {...state?.topPage, topStores: {...state?.topPage?.topStores, errors: errors?.data?.message?.detail}}
    })
    :
    state.merge({ loading: false,
      topPage: {...state?.topPage, topStores: {...state?.topPage?.topStores, errors: errors}}
    })
const deleteTrackingTopProductByIDRequest = (state, {payload: data}) =>
  state.merge({loading: true});

const deleteTrackingTopProductByIDSuccess = (state, {payload: data}) => {
  let prevResults = state?.topPage?.topProducts?.products?.results ? [...state.topPage.topProducts.products.results] : [];
  let newData = prevResults.map(el => {
    if (el.id === data.id) return {...el, is_tracked: false}
    else return el
  })
  return state.merge({
    loading: false,
    topPage: {
      ...state?.topPage,
      topProducts: {
        ...state?.topPage?.topProducts,
        products: {...state?.topPage?.topProducts?.stores, results: [...newData]}
      }
    }
  })
}
const deleteTrackingTopProductByIDFailure = (state, {payload: errors}) =>
  typeof errors === 'object' ?
    state.merge({
      loading: false,
      topPage: {...state?.topPage, topProducts: {...state?.topPage?.topProducts, errors: errors?.data?.message?.detail}}
    })
    :
    state.merge({
      loading: false,
      topPage: {...state?.topPage, topProducts: {...state?.topPage?.topProducts, errors: errors}}
    })

const createTrackingTopProductRequest = (state, {payload: data}) =>
  state.merge( {loading: true});

const createTrackingTopProductSuccess = (state, {payload: data}) => {
  let prevResults = state?.topPage?.topProducts?.products?.results ? [...state.topPage.topProducts.products.results] : [];
  let newData = prevResults.map(el => {
    if (+el.id === +data.id || +el?.product_id === +data?.product_id) return {...el, is_tracked: true}
    else return el
  })
  return state.merge({
    loading: false,
    topPage: {...state?.topPage,
      topProducts: {...state?.topPage?.topProducts,
        products: {...state?.topPage?.topProducts?.products, results: [...newData]}
      }}
  })
}
const createTrackingTopProductFailure = (state, {payload: errors}) =>
  typeof errors === 'object' ?
    state.merge({ loading: false,
      topPage: {...state?.topPage, topProducts: {...state?.topPage?.topProducts, errors: errors?.data?.message?.detail}}
    })
    :
    state.merge({ loading: false,
      topPage: {...state?.topPage, topProducts: {...state?.topPage?.topProducts, errors: errors}}
    })

const setView = (state, { payload: data }) =>
  state.merge({ view: data });

const getSalesReportRequest = (state) =>
  state.merge({ fileLoading: true });

const getSalesReportSuccess = (state) =>
  state.merge({ fileLoading: false });

const getSalesReportFailure = (state, { payload: { errors } }) =>
  state.merge({ fileLoading: false, errors })

const getProductReportRequest = (state) =>
  state.merge({ fileLoading: true });

const getProductReportSuccess = (state) =>
  state.merge({ fileLoading: false });

const getProductReportFailure = (state, { payload: { errors } }) =>
  state.merge({ fileLoading: false, errors })

const getRevenueReportRequest = (state) =>
  state.merge({ fileLoading: true });

const getRevenueReportSuccess = (state) =>
  state.merge({ fileLoading: false });

const getRevenueReportFailure = (state, { payload: { errors } }) =>
  state.merge({ fileLoading: false, errors })

const getExpandableChartRequest = (state) =>
  state.merge({ expandableChartLoading: true, expandableChartData:{} });

const getExpandableChartSuccess = (state, { payload: data }) =>
  state.merge({ expandableChartLoading: false, expandableChartData: data });

const getExpandableChartFailure = (state, { payload: { errors } }) =>
  state.merge({ expandableChartLoading: false, errors })

const getProductListByStoreRequest = (state) =>
  state.merge({ selectedStoreTableDataLoading: true });

const getProductListByStoreSuccess = (state, { payload: data }) =>
  state.merge({ selectedStoreTableDataLoading: false, selectedStoreTableData: data });

const getProductListByStoreFailure = (state, { payload: { errors } }) =>
  state.merge({ selectedStoreTableDataLoading: false, errors, selectedStoreTableData: [] });

const getStoreProductsModalRequest = (state) =>
  state.merge({ storeProductsModalLoading: true });

const getStoreProductsModalSuccess = (state, { payload: data }) =>
  state.merge({ storeProductsModalLoading: false, storeProductsModalTableData: data });

const getStoreProductsModalFailure = (state, { payload: { errors } }) =>
  state.merge({ storeProductsModalLoading: false, errors, storeProductsModalTableData: [] });

const getStoreProductsModalNextRequest = (state) =>
  state.merge({ storeProductsModalLoading: true });

const getStoreProductsModalNextSuccess = (state, { payload: data }) => {
  const prev = state?.storeProductsModalTableData?.results?.length ? state?.storeProductsModalTableData?.results : []
  return state.merge({storeProductsModalLoading: false, storeProductsModalTableData: {
      count: data?.count,
      results: [...prev, ...data?.results]
    }});
}

const getStoreProductsModalNextFailure = (state, { payload: { errors } }) =>
  state.merge({ storeProductsModalLoading: false, errors, storeProductsModalTableData: [] });

const getDetailedStoreInfoCheckRequest = (state) =>
  state.merge({ checkLoading: true });

const getDetailedStoreInfoCheckSuccess = (state, { payload: data }) =>
  state.merge({ checkLoading: false, isAvailable: data.success });

const getDetailedStoreInfoCheckFailure = (state, { payload: { errors } }) =>
  state.merge({ checkLoading: false, errors, isAvailable: false })

const getDetailedStoreInfoRequest = (state) =>
  state.merge({ detailedStoreLoading: true });

const getDetailedStoreInfoSuccess = (state, { payload: data }) =>
  state.merge({ detailedStoreLoading: false, selectedStore: data });

const getDetailedStoreInfoFailure = (state, { payload: { errors } }) =>
  state.merge({ detailedStoreLoading: false, errors })

const resetIsAvailable= (state) =>
  state.merge({ isAvailable: null });

const resetStoreProductsModal= (state) =>
  state.merge({ storeProductsModalTableData: {} });

const getDetailedProductInfoCheckRequest = (state) =>
  state.merge({ checkLoading: true });

const getDetailedProductInfoCheckSuccess = (state, { payload: data }) =>
  state.merge({ checkLoading: false, isAvailable: data.success });

const getDetailedProductInfoCheckFailure = (state, { payload: { errors } }) =>
  state.merge({ checkLoading: false, errors, isAvailable: false })

const getDetailedProductInfoRequest = (state) =>
  state.merge({ selectedProductDataLoading: true });

const getDetailedProductInfoSuccess = (state, { payload: data }) =>
  state.merge({ selectedProductDataLoading: false, selectedProduct: data });

const getDetailedProductInfoFailure = (state, { payload: { errors } }) =>
  state.merge({ selectedProductDataLoading: false, errors })

const getTrackingStoresRequest = (state, { payload: data }) =>
  state.merge({ loading: !Boolean(data?.search), searchLoading: Boolean(data?.search)});

const getTrackingStoresSuccess = (state, { payload: data }) => {
  if (Boolean(data?.search)) {
    return state.merge({loading: false, searchLoading: false, stores: {...state?.stores, searchResults: data?.results?.length ? [...data.results] : []}});
  }
  else return state.merge({loading: false, searchLoading: false, stores: {...data, searchResults: []}});
}

const getTrackingStoresFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, searchLoading: false, errors })

const getTrackingStoresNextRequest = (state) =>
  state.merge({ loading: true });

const getTrackingStoresNextSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, stores: {...state?.stores, next: data?.next, previous: data?.previous, results: [...state?.stores?.results, ...data?.results]} });

const getTrackingStoresNextFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors })

const getTrackingStoreByIDRequest = (state) =>
  state.merge({ loading: true });

const getTrackingStoreByIDSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, selectedStore: data });

const getTrackingStoreByIDFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors })

const deleteTrackingStoreByIDRequest = (state) =>
  state.merge({ fetchingSpin: true, searchErrors: '' });

const deleteTrackingStoreByIDSuccess = (state, { payload: data }) => {
  let newStores = [...state.stores.results.filter(el => el.id !== data.id)];
  let newStoresSearch = [...state.stores.searchResults].length ? [...state.stores.searchResults.filter(el => el.id !== data.id)] : [];
  let newCount = data?.is_demo ? state.stores.count : state.stores.count - 1;
  let newUsed = data?.is_demo ? state.stores.limits.stores.used : state.stores.limits.stores.used - 1;
  return state.merge({
    fetchingSpin: false,
    stores: {
      ...state.stores,
      results: newStores,
      searchResults: newStoresSearch,
      count: newCount,
      limits: {...state.stores.limits, stores: {...state.stores.limits.stores, used: newUsed}}
    },
    products: {
      ...state.products,
      limits: {...state.products.limits, stores: {...state.products.limits.stores, used: newUsed}}
    }
  });
}

const deleteTrackingStoreByIDFailure = (state, { payload: { errors } }) =>
  typeof errors === 'object' ?
    state.merge({ fetchingSpin: false, selectedStoreTableDataLoading: false, errors: errors?.data?.message?.detail, showFreePlanError: true })
    :
    state.merge({ fetchingSpin: false, selectedStoreTableDataLoading: false, errors })

const createTrackingStoreRequest = (state) =>
  state.merge({ fetchingSpin: true });

const createTrackingStoreSuccess = (state, { payload: data }) => {
  let newStores = [data, ...state.stores.results];
  let newCount = state.stores.count + 1;
  let newUsed = state.stores.limits.stores.used + 1
  return state.merge({
    fetchingSpin: false,
    stores: {
      ...state.stores,
      results: newStores,
      count: newCount,
      limits: {...state.stores.limits, stores: {...state.stores.limits.stores, used: newUsed}}
    },
    products: {
      ...state.products,
      limits: {...state.products.limits, stores: {...state.products.limits.stores, used: newUsed}}
    },
    lastSuccessfulSearch: data?.custom_domain
  });
}

const createTrackingStoreFailure = (state, { payload: { errors } }) =>
  state.merge({ fetchingSpin: false, searchErrors: errors, lastSuccessfulSearch: null })

const createTrackingStoreNewRequest = (state) =>
  state.merge({ fetchingSpin: true });

const createTrackingStoreNewSuccess = (state, { payload: data }) => {
  let newStores = [data, ...state.stores.results];
  let newCount = state.stores.count + 1;
  let newUsed = state.stores.limits.stores.used + 1
  return state.merge({
    fetchingSpin: false,
    stores: {
      ...state.stores,
      results: newStores,
      count: newCount,
      limits: {...state.stores.limits, stores: {...state.stores.limits.stores, used: newUsed}}
    },
    products: {
      ...state.products,
      limits: {...state.products.limits, stores: {...state.products.limits.stores, used: newUsed}}
    },
    lastSuccessfulSearch: data?.custom_domain
  });
}

const createTrackingStoreNewFailure = (state, { payload: { errors } }) =>
  state.merge({ fetchingSpin: false, searchErrors: errors, lastSuccessfulSearch: null })

const getTrackingProductsRequest = (state, { payload: data }) =>
  state.merge({ loading: !Boolean(data?.search), searchLoading: Boolean(data?.search)});

const getTrackingProductsSuccess = (state, { payload: data }) =>
{
  if (Boolean(data?.search)) {
    return state.merge({loading: false, searchLoading: false, products: {...state?.products, searchResults: data?.results?.length ? [...data.results] : []}});
  }
  else return state.merge({
    loading: false,
    searchLoading: false,
    products: {...data, searchResults: []},
    stores: {
      ...state.stores,
      limits: { ...data.limits }
    }
  })
}

const getTrackingProductsFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, searchLoading: false, errors })

const getTrackingProductsNextRequest = (state) =>
  state.merge({ loading: true });

const getTrackingProductsNextSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, products: {...state?.products, next: data?.next, previous: data?.previous, results: [...state?.products?.results, ...data?.results]} });

const getTrackingProductsNextFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors })

const getTrackingProductByIDRequest = (state) =>
  state.merge({ loading: true });

const getTrackingProductByIDSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, selectedProduct: data });

const getTrackingProductByIDFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors })

const deleteTrackingProductByIDRequest = (state) =>
  state.merge({ fetchingSpin: true, searchErrors: '' });

const deleteTrackingProductByIDSuccess = (state, { payload: data }) => {
  let newProducts = [...state.products.results.filter(el => el.id !== data.id)];
  let newProductsSearch = [...state.products.searchResults].length ? [...state.products.searchResults.filter(el => el.id !== data.id)] : [];
  let newCount = data?.is_demo ? state.products.count : state.products.count - 1;
  let newUsed = data?.is_demo ? state.stores.limits.products.used : state.stores.limits.products.used - 1;
  return state.merge({ fetchingSpin: false,
    products: {
    ...state.products,
      count: newCount,
      results: newProducts,
      searchResults: newProductsSearch,
      limits: {...state.products, limits: {...state.products.limits, products: {...state.products.limits.products, used: newUsed}},}
    },
    stores: {...state.stores, limits: {...state.stores.limits, products: {...state.stores.limits.products, used: newUsed}},}
  });
}

const deleteTrackingProductByIDFailure = (state, { payload: { errors } }) =>
  typeof errors === 'object' ?
    state.merge({ fetchingSpin: false, selectedStoreTableDataLoading: false, errors: errors?.data?.message?.detail, showFreePlanError: true })
    :
    state.merge({ fetchingSpin: false, selectedStoreTableDataLoading: false, errors })

const deleteTrackingProductByIDFromStoreRequest = (state) =>
  state.merge({ selectedStoreTableDataLoading: true });

const deleteTrackingProductByIDFromStoreSuccess = (state, { payload: data }) => {
  let newProducts = [...state.products.results.filter(el => el.id !== data.id)];
  let newUsed = state.stores.limits.products.used - 1;
  let newSelectedStoreTableData = [...state.selectedStoreTableData.results].map(el => {
    if (el.id === data.id) return {...el, is_tracked: false}
    else return el
  })
  return state.merge({
    selectedStoreTableDataLoading: false,
    products: {
      ...state.products,
      results: newProducts,
      limits: {...state.products.limits, products: {...state.products.limits.products, used: newUsed}}
    },
    stores: {...state.stores, limits: {...state.stores.limits, products: {...state.stores.limits.products, used: newUsed}}},
    selectedStoreTableData: {...state.selectedStoreTableData, results: newSelectedStoreTableData}
  });
}

const deleteTrackingProductByIDFromStoreFailure = (state, { payload: { errors } }) =>
  typeof errors === 'object' ?
    state.merge({ loading: false, selectedStoreTableDataLoading: false, errors: errors?.data?.message?.detail, showFreePlanError: true })
    :
    state.merge({ loading: false, selectedStoreTableDataLoading: false, errors })

const createTrackingProductFromStoreRequest = (state) =>
  state.merge({ selectedStoreTableDataLoading: true });

const createTrackingProductFromStoreSuccess = (state, { payload: data }) => {
  let newProducts = [{ ...data }, ...state.products.results];
  let newSelectedStoreTableData = [...state.selectedStoreTableData.results].map(el => ({...el, is_tracked: +el.id === +data.id || +el?.product_id === +data?.product_id ? true : el.is_tracked}))
  let newUsed = state.stores.limits.products.used + 1
  return state.merge({
    selectedStoreTableDataLoading: false,
    products: { ...state.products, results: newProducts, limits: {...state.products.limits, products: {...state.products.limits.products, used: newUsed}} },
    stores: {...state.stores, limits: {...state.stores.limits, products: {...state.stores.limits.products, used: newUsed}}},
    selectedStoreTableData: {...state.selectedStoreTableData, results: newSelectedStoreTableData}
  });
}

const createTrackingProductFromStoreFailure = (state, { payload: { errors } }) =>
  state.merge({ selectedStoreTableDataLoading: false, searchErrors: errors })

const createTrackingProductRequest = (state) =>
  state.merge({ fetchingSpin: true });

const createTrackingProductSuccess = (state, { payload: data }) => {
  let newProducts = [data, ...state.products.results];
  let newCount = state.products.count + 1
  let newUsed = state.stores.limits.products.used + 1
  return state.merge({ fetchingSpin: false,
    products: {...state.products,
      count: newCount,
      results: newProducts,
      limits: {...state.products.limits, products: {...state.products.limits.products, used: newUsed}}
    },
    stores: {...state.stores, limits: {...state.stores.limits, products: {...state.stores.limits.products, used: newUsed}}},
    lastSuccessfulSearch: `https://${data?.store?.original_domain }/products/${data?.handle}` });
}

const createTrackingProductFailure = (state, { payload: { errors } }) =>
  state.merge({ fetchingSpin: false, searchErrors: errors, lastSuccessfulSearch: null })

const createTrackingProductNewRequest = (state) =>
  state.merge({ fetchingSpin: true });

const createTrackingProductNewSuccess = (state, { payload: data }) => {
  let newProducts = [data, ...state.products.results];
  let newCount = state.products.count + 1
  let newUsed = state.stores.limits.products.used + 1
  return state.merge({ fetchingSpin: false,
    products: {...state.products,
      count: newCount,
      results: newProducts,
      limits: {...state.products.limits, products: {...state.products.limits.products, used: newUsed}}
    },
    stores: {...state.stores, limits: {...state.stores.limits, products: {...state.stores.limits.products, used: newUsed}}},
    lastSuccessfulSearch: `https://${data?.store?.original_domain }/products/${data?.handle}` });
}

const createTrackingProductNewFailure = (state, { payload: { errors } }) =>
  state.merge({ fetchingSpin: false, searchErrors: errors, lastSuccessfulSearch: null })

const resetSearchErrors = (state) =>
  state.merge({ searchErrors: ''  })

const resetLastSuccessfulSearch = (state) =>
  state.merge({ lastSuccessfulSearch: null })

const resetErrors = (state) =>
  state.merge({ errors: false  })

const resetFreePlanError = (state) =>
  state.merge({ showFreePlanError: false  })

const setFilters = (state, { payload: filters }) => state.merge({ filters })
const setCheckedList = (state, { payload: checkedList }) => state.merge({ checkedList })

export const logout = (state) => state.merge({...INITIAL_STATE })

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_SEARCH_RESULTS]: resetSearchResults,

  [Types.GET_TOP_STORES_FILTERS_REQUEST]: getTopStoresFiltersRequest,
  [Types.GET_TOP_STORES_FILTERS_SUCCESS]: getTopStoresFiltersSuccess,
  [Types.GET_TOP_STORES_FILTERS_FAILURE]: getTopStoresFiltersFailure,

  [Types.GET_TOP_PRODUCTS_FILTERS_REQUEST]: getTopProductsFiltersRequest,
  [Types.GET_TOP_PRODUCTS_FILTERS_SUCCESS]: getTopProductsFiltersSuccess,
  [Types.GET_TOP_PRODUCTS_FILTERS_FAILURE]: getTopProductsFiltersFailure,

  [Types.GET_TOP_STORES_REQUEST]: getTopStoresRequest,
  [Types.GET_TOP_STORES_SUCCESS]: getTopStoresSuccess,
  [Types.GET_TOP_STORES_FAILURE]: getTopStoresFailure,

  [Types.GET_TOP_PRODUCTS_REQUEST]: getTopProductsRequest,
  [Types.GET_TOP_PRODUCTS_SUCCESS]: getTopProductsSuccess,
  [Types.GET_TOP_PRODUCTS_FAILURE]: getTopProductsFailure,

  [Types.GET_TOP_STORES_COUNT_REQUEST]: getTopStoresCountRequest,
  [Types.GET_TOP_STORES_COUNT_SUCCESS]: getTopStoresCountSuccess,
  [Types.GET_TOP_STORES_COUNT_FAILURE]: getTopStoresCountFailure,

  [Types.GET_TOP_PRODUCTS_COUNT_REQUEST]: getTopProductsCountRequest,
  [Types.GET_TOP_PRODUCTS_COUNT_SUCCESS]: getTopProductsCountSuccess,
  [Types.GET_TOP_PRODUCTS_COUNT_FAILURE]: getTopProductsCountFailure,

  [Types.CREATE_TRACKING_TOP_STORE_REQUEST]: createTrackingTopStoreRequest,
  [Types.CREATE_TRACKING_TOP_STORE_SUCCESS]: createTrackingTopStoreSuccess,
  [Types.CREATE_TRACKING_TOP_STORE_FAILURE]: createTrackingTopStoreFailure,

  [Types.CREATE_TRACKING_TOP_PRODUCT_REQUEST]: createTrackingTopProductRequest,
  [Types.CREATE_TRACKING_TOP_PRODUCT_SUCCESS]: createTrackingTopProductSuccess,
  [Types.CREATE_TRACKING_TOP_PRODUCT_FAILURE]: createTrackingTopProductFailure,

  [Types.DELETE_TRACKING_TOP_STORE_BY_ID_REQUEST]: deleteTrackingTopStoreByIDRequest,
  [Types.DELETE_TRACKING_TOP_STORE_BY_ID_SUCCESS]: deleteTrackingTopStoreByIDSuccess,
  [Types.DELETE_TRACKING_TOP_STORE_BY_ID_FAILURE]: deleteTrackingTopStoreByIDFailure,

  [Types.DELETE_TRACKING_TOP_PRODUCT_BY_ID_REQUEST]: deleteTrackingTopProductByIDRequest,
  [Types.DELETE_TRACKING_TOP_PRODUCT_BY_ID_SUCCESS]: deleteTrackingTopProductByIDSuccess,
  [Types.DELETE_TRACKING_TOP_PRODUCT_BY_ID_FAILURE]: deleteTrackingTopProductByIDFailure,

  [Types.SET_VIEW]: setView,

  [Types.RESET_ERRORS]: resetErrors,
  [Types.RESET_IS_AVAILABLE]: resetIsAvailable,
  [Types.RESET_STORE_PRODUCTS_MODAL]: resetStoreProductsModal,
  [Types.RESET_FREE_PLAN_ERROR]: resetFreePlanError,
  [Types.RESET_SEARCH_ERRORS]: resetSearchErrors,
  [Types.RESET_LAST_SUCCESSFUL_SEARCH]: resetLastSuccessfulSearch,
  [Types.SET_FILTERS]: setFilters,
  [Types.SET_CHECKED_LIST]: setCheckedList,

  [Types.GET_SALES_REPORT_REQUEST]: getSalesReportRequest,
  [Types.GET_SALES_REPORT_SUCCESS]: getSalesReportSuccess,
  [Types.GET_SALES_REPORT_FAILURE]: getSalesReportFailure,

  [Types.GET_PRODUCT_REPORT_REQUEST]: getProductReportRequest,
  [Types.GET_PRODUCT_REPORT_SUCCESS]: getProductReportSuccess,
  [Types.GET_PRODUCT_REPORT_FAILURE]: getProductReportFailure,

  [Types.GET_REVENUE_REPORT_REQUEST]: getRevenueReportRequest,
  [Types.GET_REVENUE_REPORT_SUCCESS]: getRevenueReportSuccess,
  [Types.GET_REVENUE_REPORT_FAILURE]: getRevenueReportFailure,

  [Types.GET_TRACKING_STORES_REQUEST]: getTrackingStoresRequest,
  [Types.GET_TRACKING_STORES_SUCCESS]: getTrackingStoresSuccess,
  [Types.GET_TRACKING_STORES_FAILURE]: getTrackingStoresFailure,

  [Types.GET_TRACKING_STORES_NEXT_REQUEST]: getTrackingStoresNextRequest,
  [Types.GET_TRACKING_STORES_NEXT_SUCCESS]: getTrackingStoresNextSuccess,
  [Types.GET_TRACKING_STORES_NEXT_FAILURE]: getTrackingStoresNextFailure,

  [Types.GET_TRACKING_STORE_BY_ID_REQUEST]: getTrackingStoreByIDRequest,
  [Types.GET_TRACKING_STORE_BY_ID_SUCCESS]: getTrackingStoreByIDSuccess,
  [Types.GET_TRACKING_STORE_BY_ID_FAILURE]: getTrackingStoreByIDFailure,

  [Types.DELETE_TRACKING_STORE_BY_ID_REQUEST]: deleteTrackingStoreByIDRequest,
  [Types.DELETE_TRACKING_STORE_BY_ID_SUCCESS]: deleteTrackingStoreByIDSuccess,
  [Types.DELETE_TRACKING_STORE_BY_ID_FAILURE]: deleteTrackingStoreByIDFailure,

  [Types.CREATE_TRACKING_STORE_REQUEST]: createTrackingStoreRequest,
  [Types.CREATE_TRACKING_STORE_SUCCESS]: createTrackingStoreSuccess,
  [Types.CREATE_TRACKING_STORE_FAILURE]: createTrackingStoreFailure,

  [Types.CREATE_TRACKING_STORE_NEW_REQUEST]: createTrackingStoreNewRequest,
  [Types.CREATE_TRACKING_STORE_NEW_SUCCESS]: createTrackingStoreNewSuccess,
  [Types.CREATE_TRACKING_STORE_NEW_FAILURE]: createTrackingStoreNewFailure,

  [Types.GET_TRACKING_PRODUCTS_REQUEST]: getTrackingProductsRequest,
  [Types.GET_TRACKING_PRODUCTS_SUCCESS]: getTrackingProductsSuccess,
  [Types.GET_TRACKING_PRODUCTS_FAILURE]: getTrackingProductsFailure,

  [Types.GET_TRACKING_PRODUCTS_NEXT_REQUEST]: getTrackingProductsNextRequest,
  [Types.GET_TRACKING_PRODUCTS_NEXT_SUCCESS]: getTrackingProductsNextSuccess,
  [Types.GET_TRACKING_PRODUCTS_NEXT_FAILURE]: getTrackingProductsNextFailure,

  [Types.GET_TRACKING_PRODUCT_BY_ID_REQUEST]: getTrackingProductByIDRequest,
  [Types.GET_TRACKING_PRODUCT_BY_ID_SUCCESS]: getTrackingProductByIDSuccess,
  [Types.GET_TRACKING_PRODUCT_BY_ID_FAILURE]: getTrackingProductByIDFailure,

  [Types.DELETE_TRACKING_PRODUCT_BY_ID_REQUEST]: deleteTrackingProductByIDRequest,
  [Types.DELETE_TRACKING_PRODUCT_BY_ID_SUCCESS]: deleteTrackingProductByIDSuccess,
  [Types.DELETE_TRACKING_PRODUCT_BY_ID_FAILURE]: deleteTrackingProductByIDFailure,

  [Types.CREATE_TRACKING_PRODUCT_REQUEST]: createTrackingProductRequest,
  [Types.CREATE_TRACKING_PRODUCT_SUCCESS]: createTrackingProductSuccess,
  [Types.CREATE_TRACKING_PRODUCT_FAILURE]: createTrackingProductFailure,

  [Types.CREATE_TRACKING_PRODUCT_NEW_REQUEST]: createTrackingProductNewRequest,
  [Types.CREATE_TRACKING_PRODUCT_NEW_SUCCESS]: createTrackingProductNewSuccess,
  [Types.CREATE_TRACKING_PRODUCT_NEW_FAILURE]: createTrackingProductNewFailure,

  [Types.CREATE_TRACKING_PRODUCT_FROM_STORE_REQUEST]: createTrackingProductFromStoreRequest,
  [Types.CREATE_TRACKING_PRODUCT_FROM_STORE_SUCCESS]: createTrackingProductFromStoreSuccess,
  [Types.CREATE_TRACKING_PRODUCT_FROM_STORE_FAILURE]: createTrackingProductFromStoreFailure,

  [Types.DELETE_TRACKING_PRODUCT_BY_ID_FROM_STORE_REQUEST]: deleteTrackingProductByIDFromStoreRequest,
  [Types.DELETE_TRACKING_PRODUCT_BY_ID_FROM_STORE_SUCCESS]: deleteTrackingProductByIDFromStoreSuccess,
  [Types.DELETE_TRACKING_PRODUCT_BY_ID_FROM_STORE_FAILURE]: deleteTrackingProductByIDFromStoreFailure,

  [Types.GET_DETAILED_STORE_INFO_REQUEST]: getDetailedStoreInfoRequest,
  [Types.GET_DETAILED_STORE_INFO_SUCCESS]: getDetailedStoreInfoSuccess,
  [Types.GET_DETAILED_STORE_INFO_FAILURE]: getDetailedStoreInfoFailure,

  [Types.GET_DETAILED_PRODUCT_INFO_REQUEST]: getDetailedProductInfoRequest,
  [Types.GET_DETAILED_PRODUCT_INFO_SUCCESS]: getDetailedProductInfoSuccess,
  [Types.GET_DETAILED_PRODUCT_INFO_FAILURE]: getDetailedProductInfoFailure,

  [Types.GET_DETAILED_STORE_INFO_CHECK_REQUEST]: getDetailedStoreInfoCheckRequest,
  [Types.GET_DETAILED_STORE_INFO_CHECK_SUCCESS]: getDetailedStoreInfoCheckSuccess,
  [Types.GET_DETAILED_STORE_INFO_CHECK_FAILURE]: getDetailedStoreInfoCheckFailure,

  [Types.GET_DETAILED_PRODUCT_INFO_CHECK_REQUEST]: getDetailedProductInfoCheckRequest,
  [Types.GET_DETAILED_PRODUCT_INFO_CHECK_SUCCESS]: getDetailedProductInfoCheckSuccess,
  [Types.GET_DETAILED_PRODUCT_INFO_CHECK_FAILURE]: getDetailedProductInfoCheckFailure,

  [Types.GET_PRODUCT_LIST_BY_STORE_REQUEST]: getProductListByStoreRequest,
  [Types.GET_PRODUCT_LIST_BY_STORE_SUCCESS]: getProductListByStoreSuccess,
  [Types.GET_PRODUCT_LIST_BY_STORE_FAILURE]: getProductListByStoreFailure,

  [Types.GET_STORE_PRODUCTS_MODAL_REQUEST]: getStoreProductsModalRequest,
  [Types.GET_STORE_PRODUCTS_MODAL_SUCCESS]: getStoreProductsModalSuccess,
  [Types.GET_STORE_PRODUCTS_MODAL_FAILURE]: getStoreProductsModalFailure,

  [Types.GET_STORE_PRODUCTS_MODAL_NEXT_REQUEST]: getStoreProductsModalNextRequest,
  [Types.GET_STORE_PRODUCTS_MODAL_NEXT_SUCCESS]: getStoreProductsModalNextSuccess,
  [Types.GET_STORE_PRODUCTS_MODAL_NEXT_FAILURE]: getStoreProductsModalNextFailure,

  [Types.GET_EXPANDABLE_CHART_REQUEST]: getExpandableChartRequest,
  [Types.GET_EXPANDABLE_CHART_SUCCESS]: getExpandableChartSuccess,
  [Types.GET_EXPANDABLE_CHART_FAILURE]: getExpandableChartFailure,

  [Types.LOGOUT]: logout,
});
