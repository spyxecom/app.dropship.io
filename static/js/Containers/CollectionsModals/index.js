import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { EventHandler } from '../../Utils/event-handler';
import SaveToModalComponent from './components/modals';
import CreateModalComponent from './components/modals/create-modal';
import Creators from '../CollectionsPage/reducer';
import './styles.less';

export const CollectionsComponent = ({
  auth,
  dispatch,
  isMobile,
  loading,
  collections,
  productName,
  productID,
  collection,
}) => {
  const [inputCollectionName, setInputCollectionName] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [fromPage, setFromPage] = useState(false);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);

  // GET COLLECTION EFFECT
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    if(auth && isModalVisible) dispatch(Creators.getCollectionsRequest({ page_size: 40 }));
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [auth, isModalVisible]);

  // ADD/REMOVE EVENT LISTENER
  useEffect(() => {
    EventHandler.subscribe('open-modal', openModalHandler);
    EventHandler.subscribe('close-create-modal', onCloseHandler);
    EventHandler.subscribe('open-create-modal', onOpenCreateHandler);
    EventHandler.subscribe('open-delete-modal', onOpenDeleteModalHandler);
    EventHandler.subscribe('close-list-modal', onCloseListModalHandler);
    EventHandler.subscribe('push-to-modal', onPushHandler);

    EventHandler.subscribe('restore-modal', onRestoreHandler);
    EventHandler.subscribe('restore-product', onRestoreProductHandler);

    return () => {
      EventHandler.unsubscribe('open-modal', openModalHandler);
      EventHandler.unsubscribe('close-create-modal', onCloseHandler);
      EventHandler.unsubscribe('open-create-modal', onOpenCreateHandler);
      EventHandler.unsubscribe('open-delete-modal', onOpenDeleteModalHandler);
      EventHandler.unsubscribe('close-list-modal', onCloseListModalHandler);
      EventHandler.unsubscribe('push-to-modal', onPushHandler);

      EventHandler.unsubscribe('restore-modal', onRestoreHandler);
      EventHandler.unsubscribe('restore-product', onRestoreProductHandler);
    };
  });

  // OPEN MODAL HANDLER
  const openModalHandler = (props) => {
    setModalVisible(true);

  };

  // OPEN CREATE COLLECTION MODAL HANDLER
  const openCreateCollectionModalHandler = (props) => {
    setModalVisible(false);
    setCreateModalVisible(true);
  };

  // CLOSE CREATE COLLECTION MODAL HANDLER
  const closeCreateCollectionModalHandler = (props) => {
    setCreateModalVisible(false);
    !fromPage && setModalVisible(true);
    setFromPage(false);
  };

  // CLOSE CREATE MODAL EVENT HANDLER
  const onCloseHandler = () => {
    setCreateModalVisible(false);
    setInputCollectionName('');
  };

  // OPEN CREATE MODAL EVENT HANDLER
  const onOpenCreateHandler = () => {
    setCreateModalVisible(true);
    setInputCollectionName('');

    // if from collections page
    setFromPage(true);
  };

  // CLOSE LIST MODAL EVENT HANDLER
  const onCloseListModalHandler = () => {
    setModalVisible(false);
    setInputCollectionName('');
  };

  // OPEN DELETE MODAL EVENT HANDLER
  const onOpenDeleteModalHandler = () => {};

  const onPushHandler = ({ detail: { link, ...rest }, ...other }) => {
    const bredcrumbs = rest?.name
      ? {
          name: rest?.name,
          link: link,
          ...(rest?.search && { search: rest?.search }),
        ...(rest?.from && { from: rest?.from }),
        }
      : null;
    dispatch(push(link, bredcrumbs));
  };

  // GET NEXT COLLECTION FUNC
  const getNextCollectionFunc = ({ link }) => {
    dispatch(Creators.getNextCollectionsRequest({ link }));
  };

  // CREATE COLLECTION
  const createCollectionHandler = () => {
    dispatch(
      Creators.createCollectionRequest({
        name: inputCollectionName?.trim(),
        productName,
        productID,
      }),
    );
  };

  const addToCollectionFunc = ({
    collectionID,
    collectionName,
    event,
    isCollectionList,
  }) => {
    const setAsDefaultElement = event.target.closest('#set-as-default');

    if (!setAsDefaultElement) {
      // ADD TO COLLECTION HANDLER
      dispatch(
        Creators.addToCollectionRequest({
          productID,
          collectionID,
          productName,
          isCollectionList,
        }),
      );
    } else {
      // SET AS DEFAULT COLLECTION HANDLER
      dispatch(
        Creators.setCollectionAsDefaultRequest({
          collectionID,
          collectionName,
        }),
      );
    }
  };

  function onRestoreHandler() {
    dispatch(Creators.restoreCollectionRequest(collection));
  }
  function onRestoreProductHandler() {
    dispatch(
      Creators.addToCollectionRequest({
        productName,
        productID,
        ...(collection && { collectionID: collection.collectionID }),
        restore: true
      }),
    );
  }

  return (
    <>
      <SaveToModalComponent
        isMobile={isMobile}
        loading={loading}
        collections={collections}
        addToCollectionFunc={addToCollectionFunc}
        getNextCollectionFunc={getNextCollectionFunc}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        openCreateCollectionModalHandler={openCreateCollectionModalHandler}
      />
      <CreateModalComponent
        closeCreateCollectionModalHandler={closeCreateCollectionModalHandler}
        loading={loading}
        isMobile={isMobile}
        createCollectionHandler={createCollectionHandler}
        inputCollectionName={inputCollectionName}
        isCreateModalVisible={isCreateModalVisible}
        setInputCollectionName={setInputCollectionName}
      />
    </>
  );
};

CollectionsComponent.propTypes = {
  title: PropTypes.string,
  auth: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.string,
  ]),
  collections: PropTypes.object,
  isOpenCollectionModal: PropTypes.bool,
  isMobile: PropTypes.bool,
  productName: PropTypes.string,
  productID: PropTypes.string,
};

const mapStateToProps = (state) => ({
  loading: state.collections.loading,
  errors: state.collections.errors,
  collections: state.collections.collections,
  productName: state.collections.productName,
  productID: state.collections.productID,
  collectionID: state.collections.collectionID,
  collection: state.collections.collection,
  isOpenCollectionModal: state.collections.isOpenCollectionModal,
  isMobile: state.nav.isMobile,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionsComponent);
