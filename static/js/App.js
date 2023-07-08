import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { ConfigProvider } from 'antd';
import enGB from 'antd/locale/en_GB'
import dayjs from 'dayjs';
import { history } from './Utils/utils';
import InitComponent from './Containers/InitComponent';
import 'dayjs/locale/de'; // important!
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/it';
import 'dayjs/locale/nl';
import 'dayjs/locale/pt';
import 'dayjs/locale/ru';
import 'dayjs/locale/zh-cn';
import updateLocale from 'dayjs/plugin/updateLocale';

import './index.less';
import './App.less';
import './Components/Forms/Form.less';
import './Containers/LoginPage/styles.less';
import './video.less';

const theme = {
  token: {
    colorPrimary: '#225aea',
    colorLink: '#225aea',
    colorSuccess: '#16895A',
    colorWarning: '#F6B60E',
    colorError: '#D71313',
    black: '#000000',

    fontFamily: `'Inter', sans-serif`,

    fontSizeBase: 14,
    fontSize: 14,

    colorText: '#6E7DAE',
    colorTextBase: '#34315A',
    colorTextHeading: '#151E3A',
    colorTextSecondary: '#C5CCE3',
    colorTextDisabled: '#959292',

    colorBgContainerDisabled: '#F3F3F3',

    radiusBase: 6,
    controlRadius: 6,
    colorBorder: '#F2F3F8',
    colorBorderSecondary: '#F2F3F8',

    colorTextPlaceholder: '#C5CCE3',
    colorBgLayout: '#ffffff',
  },
}

dayjs.extend(updateLocale);

dayjs.updateLocale('en-gb', {
  weekdaysMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  monthsShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
});

document.addEventListener('visibilitychange', () => {
  if (!document.visible) {
    document.activeElement.blur()
  }
})

const handleScroll = function (e) {
  let global = document.getElementById('global-wrap');
  if (global?.style.overflow === 'hidden') {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'unset'
  }
}

document.addEventListener('scroll', handleScroll, false);
document.addEventListener('wheel', handleScroll, {passive: false});

function App({ store }) {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <ConfigProvider locale={enGB} theme={theme}>
          <ConnectedRouter history={history}>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
              <InitComponent />
            </GoogleOAuthProvider>
          </ConnectedRouter>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.shape({
    store: PropTypes.object,
    persistor: PropTypes.object,
  }).isRequired,
};

export default App;
