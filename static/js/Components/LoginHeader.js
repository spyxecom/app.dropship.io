import React from 'react'
import Images from '../Images'
import {useDispatch} from "react-redux";
import Icon from "../Icon";
import IconWithText from "./Text";
import {useTranslation} from "react-i18next";
import AuthActions from "../Containers/LoginPage/reducer";

const LoginHeader = ({withLogout}) => {

  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className="header-row" style={{position: 'relative'}}>
      <img src={Images.logo} alt=""/>
      {
        withLogout &&
        <div style={{position: "absolute", right: '7.77vw', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer'}}>
          <IconWithText
            text={t('Log out')}
            icon={() => <Icon type="logout" role="icon"/>}
            onClick={() => dispatch(AuthActions.logout())}
          />
        </div>
      }
    </div>
  )
}

LoginHeader.defaultProps = {
  withLogout: false
};

export default LoginHeader
