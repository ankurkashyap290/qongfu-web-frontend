import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import Header from "../Header";
import Notifier from "../Notifier";
import { Notification } from "../../redux/actionTypes";
import { getIsMobile } from "../../utils";
import useStyles from "../../Styles/userLayout";
import { CircularProgress } from "@material-ui/core";

interface Props {
  children: any;
  notification: Notification;
  loading: boolean;
}

const UserLayout: FunctionComponent<Props> = ({ children, notification, loading }) => {
  const isMobile = getIsMobile();
  const classes = useStyles();
  return (
    <LoadingOverlay
      active={loading}
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
      <div className={!isMobile ? classes.heroContent : ""}>
        {!isMobile ? (
          <Header scrollHeaderOn={false} showSearch={false} showUserMenu={true} userLayout={true} />
        ) : null}
        <Notifier notification={notification} />
        {children}
      </div>
    </LoadingOverlay>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    notification: appState.app.notification,
    loading: appState.user.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserLayout);
