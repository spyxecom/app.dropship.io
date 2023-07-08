import React from 'react';
import cls from 'classname';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Icon from '../../../../Icon';
import { ImageCellComponent as Image } from '../../../../Components/Image';
import './styles.less';

const EmptyImage = ({ className, text }) => (
  <div className={cls('empty-image', className)}>
    <div className="empty-image_icon">
      <Icon width={64} height={64} role="icon" type="empty_warning" />
    </div>
    <div className="empty-image_wrapper">
      <div className="empty-image_header">{text}</div>
    </div>
  </div>
);

EmptyImage.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};

export const CollectionComponent = ({
  images,
  isFavorite,
  addToCollectionFunc,
  collectionName,
}) => {
  const { t } = useTranslation();
  return (
    <div className="collection" onClick={addToCollectionFunc}>
      <div
        className={cls('collection__images', {
          collection__one: images.length === 1,
          collection__multiple: images.length > 1,
          collection__empty: images.length === 0,
        })}
      >
        {/* A FEW IMAGES */}
        {images.length > 1 && (
          <>
            <div className="collection__image">
              {images[0] && <Image src={images[0]?.image} />}
            </div>
            <div className="collection__image">
              {images[1] && <Image src={images[1]?.image} />}
            </div>
            <div className="collection__image">
              {images[2] && <Image src={images[2]?.image} />}
            </div>
            <div className="collection__image">
              {images[3] && <Image src={images[3]?.image} />}
            </div>
          </>
        )}

        {/* NO IMAGE */}
        {images.length === 0 && (
          <EmptyImage
            className="empty-image"
            text={t('common.no_product_image')}
          />
        )}

        {/* ONE IMAGE */}
        {images.length === 1 && <Image src={images[0]?.image} />}
      </div>
      {/* ADD TO COLLECTION */}
      <div className="collection__add-to-col">
        <div className="add-to-col">
          <div id="set-as-default" className="add-to-col__icon">
            <Icon type="favorite" outline={isFavorite} role="icon" />
          </div>
          <div className="add-to-col__name">{collectionName}</div>
        </div>
      </div>
    </div>
  );
};

CollectionComponent.defaultProps = {};

CollectionComponent.propTypes = {
  images: PropTypes.array.isRequired,
  addToCollectionFunc: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
  collectionName: PropTypes.string,
};

export default CollectionComponent;
