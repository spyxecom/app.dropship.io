import React from 'react';
import {Modal} from "antd";
import './TrialFinished.less'
import ButtonComponent from "../Button";
import cls from "classname";

const TrialFinished = ({visible, isMobile, theme, callBack}) => {
  return (
    <Modal
      className="change-modal custom-modal trial-finished-modal"
      getContainer={() => document.getElementById('global-wrap')}
      {...(isMobile ? { transitionName: '' } : null)}
      open={visible}
      centered={!isMobile}
      width={512}
      footer={null}
      closable="false"
      onCancel={null}
      destroyOnClose
    >
      <div className='trial-finished-wrapper'>
        <div className={cls("trial-finished-image", {
          "trial-finished-image--dark": theme === 'dark'
        })} />
        <div className="trial-finished-title">
          Upgrade To Get Full Access!
        </div>
        <div className="trial-finished-text">
          {/*<p>Your 7-day trial has expired.</p>*/}
          <p>Upgrade your plan to access more tools.</p>
        </div>
        <ButtonComponent text={'Select A Plan'}
                         onClick={() => callBack()}
                         className='trial-finished-button'
        />
      </div>
    </Modal>
  );
};

export default TrialFinished;
