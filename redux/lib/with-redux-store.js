import React from "react";
import { initializeStore } from "../store";
import { IS_SERVER, __NEXT_REDUX_STORE__ } from "../../constants";

export let reduxStore;

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (IS_SERVER) {
    return initializeStore(initialState, false);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState, true);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default App => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      reduxStore = getOrCreateStore();

      // Provide the store to getInitialProps of pages
      appContext.ctx.store = reduxStore.store;
      appContext.ctx.isServer = IS_SERVER;

      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.store.getState(),
      };
    }

    constructor(props) {
      super(props);
      reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={reduxStore.store} persistor={reduxStore.persistor} />;
    }
  };
};
