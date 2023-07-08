import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import {ButtonComponent} from '../../../../Components/Button';
import Icon from '../../../../Icon';
import {InputComponent} from '../../../../Components/Input';
import Modal from '../../../../Components/Modal';

export const CreateModalComponent = ({
  isMobile,
  closeCreateCollectionModalHandler,
  isCreateModalVisible,
  inputCollectionName,
  createCollectionHandler,
  loading,
  setInputCollectionName,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      handleClose={closeCreateCollectionModalHandler}
      title={t('common.create_new_collection')}
      isMobile={isMobile}
      width={565}
      className="collections collections--create-collection"
      open={isCreateModalVisible}
      destroyOnClose
      buttons={
        isMobile && (
          <ButtonComponent
            key="submit"
            type="primary"
            className="btn-primary"
            disabled={!inputCollectionName}
            onClick={createCollectionHandler}
            text={
              <>
                <Icon type="plus" role="icon" />
                {t('common.create_collection')}
              </>
            }
          />
        )
      }
    >
      <Spin spinning={loading}>
        <div className="collections__text">{t('common.create_col_text')}</div>
        <div className="collections__wrapper">
          <div className="collections__input">
            <InputComponent
              value={inputCollectionName}
              placeholder={t('common.create_col_placeholder')}
              onChange={(e) => setInputCollectionName(e.target.value)}
              className="input--collections-modal"
            />
          </div>
          {!isMobile && (
            <ButtonComponent
              key="submit"
              type="primary"
              className="btn-primary"
              disabled={!inputCollectionName}
              onClick={createCollectionHandler}
              text={t('common.create_collection')}
            />
          )}
        </div>
      </Spin>
    </Modal>
  );
};

CreateModalComponent.propTypes = {
  isMobile: PropTypes.bool,
  closeCreateCollectionModalHandler: PropTypes.func,
  isCreateModalVisible: PropTypes.bool,
  inputCollectionName: PropTypes.string,
  createCollectionHandler: PropTypes.func,
  loading: PropTypes.bool,
  setInputCollectionName: PropTypes.func,
};

export default CreateModalComponent;
