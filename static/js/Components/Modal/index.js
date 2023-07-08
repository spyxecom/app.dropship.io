import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';
import { Modal } from 'antd';
import NotificationClose from '../../Icon/img/NotificationClose';
import './styles.less';

export const ModalComponent = ({
  title,
  visible,
  isMobile,
  children,
  buttons,
  handleOk,
  handleClose,
  className,
  wrapClassName,
  ...props
}) => (
  <Modal
    className={cls(className, 'custom-modal')}
    wrapClassName={cls(wrapClassName, 'custom-wrap-modal')}
    {...(isMobile ? { transitionName: '' } : null)}
    title={title}
    open={visible}
    centered={!isMobile}
    closable
    closeIcon={<NotificationClose />}
    onOk={handleOk}
    onCancel={handleClose}
    getContainer={() => document.getElementById('global-wrap')}
    footer={
      buttons ? <div className="modal-footer-wrapper">{buttons}</div> : <div />
    }
    {...props}
  >
    {children}
  </Modal>
);

ModalComponent.defaultProps = {
  title: '',
};

ModalComponent.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  visible: PropTypes.bool,
  isMobile: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
  buttons: PropTypes.any,
  handleOk: PropTypes.func,
  handleClose: PropTypes.func.isRequired,
};

export default ModalComponent;
