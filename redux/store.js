import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import getCombinedReducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";

export function initializeStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  let store = createStore(
    getCombinedReducers(),
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  /**
   * next-redux-saga depends on `sagaTask` being attached to the store.
   * It is used to await the rootSaga task before sending results to the client.
   */
  store.sagaTask = sagaMiddleware.run(sagas);
  return { store };
}
