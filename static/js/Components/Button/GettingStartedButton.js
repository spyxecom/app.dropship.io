import React from 'react';
import Icon from '../../Icon';
import UserCreators from "../../Containers/User/reducer";
import {useDispatch} from "react-redux";
import './styles.less';

const GettingStartedButton = () => {

  const dispatch = useDispatch();
  const updatePersonalInfo = (data) => dispatch(UserCreators.userSaveRequest(data));

  return (
    <div className={'getting-started-button'}
                     onClick={() => window.Intercom('startChecklist', 29630569)}
    >
      <Icon type={'bulb'} role={'icon'} />
      Getting Started
      <span className={'close-forever'} onClick={(e) => {
        e.stopPropagation();
        updatePersonalInfo({show_intercom_tutorial: false})
      }} />
    </div>
  );
};

export default GettingStartedButton;
