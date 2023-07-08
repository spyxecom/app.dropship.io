import React from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {notification} from 'antd';
import {ButtonComponent} from '../Button';
import Icon from '../../Icon';
import {EventHandler} from '../../Utils/event-handler';

const SaveToCollectionMsg = ({text, isSave, isRestore=false}) => {
  const {t} = useTranslation();

  return (
    <div className="notification__body">
      <div className="notification__wrapper">
        <div className="notification__icon">
          <Icon role="icon" outline type="bookmark"/>
        </div>
        <div className="notification__text-block">
          <p className="notification__name">{text}</p>
          <p className="notification__action">
            {t(isRestore ? 'Product has been restored' : isSave ? 'notification.save_text' : 'notification.unsave_text')}
          </p>
        </div>
        <ButtonComponent
          className="btn--notification"
          text={t('notification.save_btn')}
          onClick={() => {
            notification.destroy();
            EventHandler.emit('open-modal', {text: 'hello world'});
          }}
        />
      </div>
    </div>
  );
};

SaveToCollectionMsg.defaultProps = {};

SaveToCollectionMsg.propTypes = {
  text: PropTypes.string.isRequired,
  isSave: PropTypes.bool,
  keyForClose: PropTypes.string.isRequired,
};

export const DefaultMsg = ({text, icon, iconWidth, iconHeight, iconOutline}) => {
  return (
    <div className="notification__body">
      <div className="notification__wrapper">
        <div className="notification__icon">
          <Icon role="icon" outline={!!iconOutline} width={iconWidth} height={iconHeight} type={icon || 'folder'}/>
        </div>
        <div className="notification__text-block">
          <p className="notification__name">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

export const DefaultMsgSalesTracker = (
  {
    icon,
    iconWidth,
    iconHeight,
    iconOutline,
    connect = false,
    name = null,
    disconnect= false,
    admin=false
  }) => {
  const {t} = useTranslation();


  return (
    <div className="notification__body">
      <div className="notification__wrapper">
        <div className="notification__icon">
          <Icon role="icon" outline={!!iconOutline} width={iconWidth} height={iconHeight} type={icon || 'folder'}/>
        </div>
        <div className="notification__text-block">
          <p className="notification__name">
              <span className={'preset-notification-block'}>
              {
                admin ?
                  `You have deleted ${name}`
                  :
                connect ?
                  t('You have successfully started tracking the selected product')
                  :
                  name ?
                    disconnect ?
                    t('You have successfully stopped tracking _name_', {name: name})
                      :
                    t('You have successfully started tracking _name_', {name: name})
                    :
                    t('You have successfully stopped tracking the selected product')
              }
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export const DefaultMsgSaga = ({
                                 text,
                                 icon,
                                 iconWidth,
                                 iconHeight,
                                 iconOutline,
                                 withTranslate = false,
                                 preset = null,
                                 undo = null
                               }) => {
  const {t} = useTranslation();
  return (
    <div className="notification__body">
      <div className="notification__wrapper">
        <div className="notification__icon">
          <Icon role="icon" outline={!!iconOutline} width={iconWidth} height={iconHeight} type={icon || 'folder'}/>
        </div>
        <div className="notification__text-block">
          <p className="notification__name">
            {withTranslate ?
              <span className={'preset-notification-block'}>
              {t(text?.props?.children, {name: preset})}
            </span>
              : {text}}
            {undo && undo}
          </p>
        </div>
      </div>
    </div>
  );
}

DefaultMsg.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  iconOutline: PropTypes.bool,
  icon: PropTypes.any,
};

export default SaveToCollectionMsg;
