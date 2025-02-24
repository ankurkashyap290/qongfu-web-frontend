import React from "react";
import { NextPage } from "next";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import {
  Grid,
  List,
  ListItem,
  Typography,
  ListItemSecondaryAction,
  Divider,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import clsx from "clsx";
import Router from "next/router";
import useStyles from "../../Styles/components/accountSettings";
import ProfileBreadcrumbs from "../Breadcrumbs";
import { RightInactiveArrow, RightActiveArrow } from "../CustomIcon";
import AccountInfo from "./accountInfo";
import ProfileInfo from "./profileInfo";
import { userLogout, setActiveSettingsTab } from "../../redux/actions/user";
import LocationSetup from "./locationSetup";
import LifestylesAndQongfus from "./lifestylesAndQongfus";
import { User } from "../../redux/actionTypes";
import { getIsMobile } from "../../utils";
import { setAccountProfileDrawer } from "../../redux/actions/app";

interface Props {
  token: string | null;
  profile: User | null;
  isAccountProfileDrawerOpen: boolean;
  setAccountProfileDrawer: typeof setAccountProfileDrawer;
  userLogout: typeof userLogout;
  setActiveSettingsTab: typeof setActiveSettingsTab;
  activeSettingsTab: string;
}

const AccountSettings: NextPage<Props> = ({
  token,
  setAccountProfileDrawer,
  userLogout,
  activeSettingsTab,
  setActiveSettingsTab,
}) => {
  const classes = useStyles();
  const isMobile = getIsMobile();

  const handleListItemClick = value => {
    setActiveSettingsTab(value);
    setAccountProfileDrawer(false);
    Router.push("/account-settings", `/settings/${value}`);
  };
  const handleLogoutClick = () => {
    userLogout(token);
  };

  return (
    <Container style={isMobile ? { paddingLeft: 0, paddingRight: 0 } : {}}>
      <div className={classes.mainMargin}>
        <Grid container direction="row">
          <Grid item md={3} lg={3} className={clsx(classes.accountLeftPanel, classes.hiddenSm)}>
            <div style={{ marginLeft: "15px", marginTop: "15px" }}>
              {isMobile ? (
                <ProfileBreadcrumbs data={[{ linkName: "Home", href: "/", active: false }]} />
              ) : (
                <ProfileBreadcrumbs
                  data={[
                    { linkName: "My Profile", href: "/my-profile", active: false },
                    { linkName: "Admin", href: "/", active: true },
                  ]}
                />
              )}
            </div>
            <Typography
              variant="body1"
              component="p"
              className={clsx(classes.dividerText, classes.hiddenSm)}
            >
              Account Settings
            </Typography>

            <Divider className={clsx(classes.divider, classes.hiddenXs)} />
            <List className={classes.list}>
              <ListItem
                alignItems="flex-start"
                className={
                  activeSettingsTab === "account-info"
                    ? classes.listItemActive
                    : classes.listItemInactive
                }
                onClick={() => handleListItemClick("account-info")}
              >
                Account Info
                <ListItemSecondaryAction className={classes.hiddenSm}>
                  {activeSettingsTab === "account-info" ? (
                    <RightActiveArrow style={{ fontSize: "24px" }} />
                  ) : (
                    <RightInactiveArrow style={{ fontSize: "24px" }} />
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Divider className={clsx(classes.divider, classes.hiddenXs)} />
            <Typography
              variant="body1"
              component="p"
              className={clsx(classes.dividerText, classes.hiddenSm)}
            >
              Profile Settings
            </Typography>
            <List className={classes.list}>
              <ListItem
                alignItems="flex-start"
                className={
                  activeSettingsTab === "profile-info"
                    ? classes.listItemActive
                    : classes.listItemInactive
                }
                onClick={() => handleListItemClick("profile-info")}
              >
                Profile Info
                <ListItemSecondaryAction className={classes.hiddenSm}>
                  {activeSettingsTab === "profile-info" ? (
                    <RightActiveArrow style={{ fontSize: "24px" }} />
                  ) : (
                    <RightInactiveArrow style={{ fontSize: "24px" }} />
                  )}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider className={clsx(classes.divider, classes.hiddenSm)} />
              <ListItem
                alignItems="flex-start"
                className={
                  activeSettingsTab === "location-setup"
                    ? classes.listItemActive
                    : classes.listItemInactive
                }
                onClick={() => handleListItemClick("location-setup")}
              >
                Location Setup
                <ListItemSecondaryAction className={classes.hiddenSm}>
                  {activeSettingsTab === "location-setup" ? (
                    <RightActiveArrow style={{ fontSize: "24px" }} />
                  ) : (
                    <RightInactiveArrow style={{ fontSize: "24px" }} />
                  )}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider className={clsx(classes.divider, classes.hiddenSm)} />
              <ListItem
                alignItems="flex-start"
                className={
                  activeSettingsTab === "lifestyles-and-qongfus"
                    ? classes.listItemActive
                    : classes.listItemInactive
                }
                onClick={() => handleListItemClick("lifestyles-and-qongfus")}
              >
                Lifestyles and Qongfu
                <ListItemSecondaryAction className={classes.hiddenSm}>
                  {activeSettingsTab === "lifestyles-and-qongfus" ? (
                    <RightActiveArrow style={{ fontSize: "24px" }} />
                  ) : (
                    <RightInactiveArrow style={{ fontSize: "24px" }} />
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Divider className={clsx(classes.divider, classes.hiddenXs)} />
            <List className={clsx(classes.list, classes.hiddenXs)}>
              <ListItem
                alignItems="flex-start"
                className={
                  activeSettingsTab === "help" ? classes.listItemActive : classes.listItemInactive
                }
              >
                Help
              </ListItem>
              <ListItem
                alignItems="flex-start"
                className={
                  activeSettingsTab === "logout" ? classes.listItemActive : classes.listItemInactive
                }
                onClick={() => handleLogoutClick()}
              >
                Log Out
              </ListItem>
            </List>
            {/* </Drawer> */}
          </Grid>
          <Grid item md={9} lg={9} sm={12} xs={12}>
            {activeSettingsTab === "account-info" ? <AccountInfo /> : null}
            {activeSettingsTab === "profile-info" ? <ProfileInfo /> : null}
            {activeSettingsTab === "location-setup" ? <LocationSetup /> : null}
            {activeSettingsTab === "lifestyles-and-qongfus" ? <LifestylesAndQongfus /> : null}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    token: appState.user.token,
    loading: appState.user.loading,
    profile: appState.user.profile,
    isAccountProfileDrawerOpen: appState.app.isAccountProfileDrawerOpen,
    activeSettingsTab: appState.user.activeSettingsTab,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
