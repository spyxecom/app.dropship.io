import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';
import { history } from './Utils/utils';
import immutablePersistenceTransform from './Utils/ImmutablePersistenceTransform';

const persistConfig = {
  key: 'dropship',
  reducerVersion: '0.67',
  storage,
  blacklist: ['router'],
  // Optionally, just specify the keys you DO want stored to persistence.
  // An empty array means 'don't store any reducers' -> infinitered/ignite#409
  // whitelist: [],
  transforms: [immutablePersistenceTransform],
};

export default async () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const sagaMiddleware = createSagaMiddleware();
  const initialState = {};

  const middleware = [sagaMiddleware, routerMiddleware(history)];

  const connectedRouterReducer = connectRouter(history)(rootReducer);
  const persistedReducer = persistReducer(
    persistConfig,
    connectedRouterReducer,
  );

  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  const persistor = await persistStore(store);
  const reducerVersion = await storage.getItem('reducerVersion');

  if (reducerVersion !== persistConfig.reducerVersion) {
    await persistor.purge();
    await storage.setItem('reducerVersion', persistConfig.reducerVersion);
  }

  sagaMiddleware.run(rootSaga);

  return {
    store,
    persistor,
  };
};
