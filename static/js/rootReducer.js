import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from './Utils/utils';
import { reducer as auth } from './Containers/LoginPage/reducer';
import { reducer as startup } from './Redux/StartupRedux';
import { reducer as portfolio } from './Containers/PortfolioPage/reducer';
import { reducer as products } from './Containers/ProductsPage/reducer';
import { reducer as notifications } from './Containers/Notifications/reducer';
import { reducer as nav } from './Redux/NavRedux';
import { reducer as errors } from './Redux/ErrorsRedux';
import { reducer as category } from './Redux/CategoryRedux';
import { reducer as plan } from './Redux/PlanRedux';
import { reducer as onBoarding } from './Redux/OnboardingRedux';
import { reducer as productDetails } from './Containers/ProductDetailsPage/reducer';
import { reducer as collections } from './Containers/CollectionsPage/reducer';
import { reducer as users } from './Containers/User/reducer';
import { reducer as setting } from './Containers/SettingPage/reducer';
import { reducer as dashboard } from './Containers/DashboardPage/reducer';
import { reducer as benefitsDrawbacks } from './Containers/BDPageAdmin/reducer';
import { reducer as dropTimes } from './Containers/DropTimesPageAdmin/reducer';
import { reducer as shopifySearch } from './Containers/ShopifySearch/reducer';
import { reducer as breadCrumbs } from './Containers/Breadcrumbs/actions';
import { reducer as portfolioAdmin } from './Containers/PortfolioPageAdmin/reducer';
import { reducer as productDetailsPageAdmin } from './Containers/ProductDetailsPageAdmin/reducer';
import { reducer as shopifyStore } from './Containers/ShopifyStore/reducer';
import { reducer as productDatabase } from './Containers/ProductDatabasePage/reducer';
import { reducer as competitors } from './Containers/ShopifySearch/reducer';
import { reducer as salesTracker } from './Containers/SalesTrackerPage/reducer';
import { reducer as universityPage } from './Containers/UniversityPage/reducer';
import { reducer as suppliersPage } from './Containers/SuppliersPage/reducer';
import { reducer as chargebee } from './Components/PlanCardUpcomingNew/reducer';
import { reducer as adminStoreManager } from './Containers/AdminStoreManager/reducer';
import { reducer as adminStoreTable } from './Containers/AdminStoreTable/reducer';

export const reducers = combineReducers({
  auth,
  portfolio,
  products,
  notifications,
  nav,
  errors,
  category,
  plan,
  startup,
  onBoarding,
  productDetails,
  collections,
  users,
  setting,
  dashboard,
  benefitsDrawbacks,
  dropTimes,
  shopify: shopifySearch,
  breadcrumbs: breadCrumbs,
  portfolioAdmin,
  productDetailsAdmin: productDetailsPageAdmin,
  shopifyStore,
  productDatabase,
  competitors,
  salesTracker,
  universityPage,
  suppliersPage,
  adminStoreManager,
  adminStoreTable,
  chargebee,
  router: connectRouter(history),
});

export default reducers;
