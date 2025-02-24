import React, { FunctionComponent, useState, useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import LoadingOverlay from "react-loading-overlay";
import Header from "../Header";
import Footer from "../Footer";
import AskLocation from "../AskLocation";
import { unsetNotification } from "../../redux/actions/app";
import { Notification } from "../../redux/actionTypes";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import Notifier from "../Notifier";
import { ToastContainer } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
// import useStyles from "../../Styles/components/welcomeToQongfu";
const scrollHeaderHeight = 80;

interface Props {
  showHeroHeader?: boolean;
  pageType?: string;
  children: any;
  loading?: boolean;
  handleOpenCloseAccountDrawer?: Function;
  notification: Notification;
  unsetNotification: typeof unsetNotification;
  userLoading: boolean;
  // scrollToRef?: Function;
  // myRef?: any;
}

const ExplorerLayout: FunctionComponent<Props> = ({
  // showHeroHeader,
  children,
  pageType,
  loading,
  notification,
  unsetNotification,
  userLoading,
  // scrollToRef,
  // myRef,
}) => {
  const [scrollHeaderOn, setScrollHeader] = useState(false);
  // const [showWelcomeBox, setWelcomeBox] = useState(showHeroHeader);
  // const exploreRef = useRef(null);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = _.throttle(() => {
    if (pageType === "index") {
      if (window.pageYOffset > scrollHeaderHeight) {
        setScrollHeader(true);
        // showHeroHeader && setWelcomeBox(false);
      } else if (window.pageYOffset < scrollHeaderHeight) {
        setScrollHeader(false);
        // showHeroHeader && setWelcomeBox(true);
      }
    } else {
      // setScrollHeader(true);
    }
  }, 500);

  useEffect(() => {
    if (pageType !== "index") {
      setScrollHeader(true);
    }
  }, []);

  return (
    <LoadingOverlay
      active={pageType === "accountSettings" ? userLoading : loading}
      spinner={<CircularProgress />}
      text="Please wait..."
      styles={{
        content: base => ({
          ...base,
          color: "#919191",
          marginTop: "50vh",
        }),
        overlay: base => ({
          ...base,
          zIndex: 9999,
          color: "#919191",
          backgroundColor: "rgba(255,255,255,.5)",
        }),
      }}
    >
      <AskLocation />
      <Header scrollHeaderOn={scrollHeaderOn} showSearch={scrollHeaderOn} pageType={pageType} />
      {children}
      {pageType === "index" ? <Footer /> : null}
      <Notifier notification={notification} unsetNotification={unsetNotification} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </LoadingOverlay>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    notification: appState.app.notification,
    userLoading: appState.user.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerLayout);
