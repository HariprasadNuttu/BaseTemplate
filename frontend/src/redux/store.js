import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer'],
};

export const history = createBrowserHistory();

const middlewares = [routerMiddleware(history), thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);


/*
// devtools for debugging in dev environment.
const devTools =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : (a) => a;

 const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), devTools)
);

export default store;

*/