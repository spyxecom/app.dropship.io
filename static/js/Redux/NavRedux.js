import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    navSetProp: ['key', 'value'],
    logout: null,
  },
);

export const NavTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isDesktop: false,
  isMobile: false,
  isShowMenu: false,
  isShowSideBar: false,
  tabPosition: { x: 0, y: 0 },
  theme: localStorage.getItem('dropshipTheme') ? localStorage.getItem('dropshipTheme') : 'light',
  disabledTransition: false
});

/* ------------- Selectors ------------- */
// export const isOpenSidebar = (state) => state.nav.sidebarVisible

export const navSetPropRedux = (state, { key, value }) => {
  const obj = {};
  obj[key] = value;

  if (key === 'theme') {
    localStorage.setItem('dropshipTheme', value);
    document.body.style.backgroundColor = value === 'dark' ? '#030625' : '#ffffff';
    document.querySelector('meta[name="theme-color"]').setAttribute('content', value === 'dark' ? '#030625' : '#ffffff');
  }

  return state.merge(obj);
};

export const logout = (state) => state.merge({...INITIAL_STATE, theme: localStorage.getItem('dropshipTheme') ? localStorage.getItem('dropshipTheme') : 'light'});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.NAV_SET_PROP]: navSetPropRedux,
  [Types.LOGOUT]: logout,
});
