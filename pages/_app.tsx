import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import withReduxStore from "../redux/lib/with-redux-store";
import nextReduxSaga from "next-redux-saga";
import AppTheme from "../components/AppTheme";
import { setIp, requestAppInitialize } from "../redux/actions/app";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import { Direction } from "@material-ui/core/styles";
import { setProfile, setToken } from "../redux/actions/user";
import { getToken, getProfile, getDirection } from "../utils";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../Styles/page-transitions.css";
import "react-toastify/dist/ReactToastify.css";
import AppPageContext from "../redux/lib/AppPageContext";

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles !== null) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
    // @ts-ignore
    this.props.reduxStore.dispatch(requestAppInitialize());

    const token = getToken();
    const profile = getProfile();
    if (token) {
      // @ts-ignore
      this.props.reduxStore.dispatch(setToken(token));
    }
    if (profile) {
      // @ts-ignore
      this.props.reduxStore.dispatch(setProfile(profile));
    }
  }

  render() {
    // @ts-ignore
    const { Component, pageProps, reduxStore, router } = this.props;
    const direction: Direction = (getDirection() || "ltr") as Direction;
    return (
      <AppTheme direction={direction}>
        <CssBaseline />
        <Provider store={reduxStore}>
          <TransitionGroup className="components-group">
            <CSSTransition key={router.route} timeout={100} classNames="components">
              <Component {...pageProps} />
            </CSSTransition>
          </TransitionGroup>
        </Provider>
      </AppTheme>
    );
  }
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const appCtx: AppPageContext = ctx as AppPageContext;
  let pageProps = {};
  const reduxStore = appCtx.store;
  if (appCtx.isServer && reduxStore) {
    const ip = require("public-ip");
    const ipV4 = await ip.v4();
    reduxStore.dispatch(setIp({ ip: ipV4 }));
    reduxStore.dispatch(requestAppInitialize());
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default withReduxStore(nextReduxSaga(MyApp));
