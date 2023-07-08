import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import Modal from "../../../../Components/Modal";
import {ButtonComponent} from "../../../../Components/Button";
import Icon from "../../../../Icon";
import {Spin} from "antd";
import {OverlayScrollbar} from "../../../../Components/ScrollBar";
import Collection from "../collection";
import {useTranslation} from "react-i18next";
import {debounce} from "../../../../Utils/utils";

export const SaveToModalComponent = ({
  setModalVisible,
  isMobile,
  isModalVisible,
  openCreateCollectionModalHandler,
  getNextCollectionFunc,
  addToCollectionFunc,
  collections,
  loading,
}) => {
  const {t} = useTranslation();
  const scrollRef = useRef();

  const onScrollHandler = debounce((link) => {
    if (scrollRef.current) {
      const {max, position} = scrollRef.current.osInstance().scroll();

      if (position.y >= max.y) {

        // GET NEXT COLLECTION HANDLER
        getNextCollectionFunc({link})
        scrollRef.current.osInstance()
      }
    }
  }, 300);

  return (
    <Modal
      handleOk={() => {
        console.log('handle ok');
      }}
      handleClose={() => {
        setModalVisible(false);
      }}
      title={t('collections.save_to_collection')}
      isMobile={isMobile}
      width={564}
      className="collections collections--list"
      open={isModalVisible}
      destroyOnClose
      buttons={[
        <ButtonComponent
          key="back"
          type="primary"
          className="btn-primary border-only"
          onClick={() => {
            setModalVisible(false);
          }}
          text={t('common.cancel')}
        />,
        <ButtonComponent
          key="submit"
          type="primary"
          className="btn-primary"
          onClick={openCreateCollectionModalHandler}
          text={
            <>
              <Icon type="plus" role="icon"/>
              {t('common.create')}
            </>
          }
        />,
      ]}
    >
      <Spin spinning={loading}>
        <OverlayScrollbar
          ref={scrollRef}
          onScroll={() => onScrollHandler(collections.next)}
          visibility={isMobile && 'hidden'}
        >
          <div className="collections__wrapper">
            {collections.results?.map((value) => (
              <Collection
                key={`collection-${value.id}`}
                images={value.products}
                collectionName={value.name}
                isFavorite={value.default}
                addToCollectionFunc={(e) =>
                  addToCollectionFunc({
                    collectionID: value.id,
                    collectionName: value.name,
                    event: e, // !!! important
                    isCollectionList: true,
                  })
                }
              />
            ))}
          </div>
        </OverlayScrollbar>
      </Spin>
    </Modal>
  );
};

SaveToModalComponent.propTypes = {
  setModalVisible: PropTypes.func,
  isMobile: PropTypes.bool,
  isModalVisible: PropTypes.bool,
  openCreateCollectionModalHandler: PropTypes.func,
  getNextCollectionFunc: PropTypes.func,
  addToCollectionFunc: PropTypes.func,
  collections: PropTypes.object,
  loading: PropTypes.bool,
};

export default SaveToModalComponent;
