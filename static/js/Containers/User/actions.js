import AuthCreators from '../LoginPage/reducer';
import NavCreators from '../../Redux/NavRedux';

/* eslint-disable import/no-named-as-default-member */
export default {
  logout: AuthCreators.logout,
  changeTheme: NavCreators.navSetProp,
  setDisabledTransition: NavCreators.navSetProp
};
