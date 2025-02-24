import React, { FunctionComponent, useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import Container from "@material-ui/core/Container";
import CloseIcon from "@material-ui/icons/Close";
import {
  MenuItem,
  Menu,
  Avatar,
  ListItemIcon,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Grid,
  Drawer,
  List,
  ListItem,
  Divider,
  Dialog,
  DialogContent,
  Button,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import HomeIcon from "@material-ui/icons/Home";
import TuneIcon from "@material-ui/icons/Tune";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import MapIcon from "@material-ui/icons/Map";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import StorefrontIcon from "@material-ui/icons/Storefront";
import TopBarSearch from "../Search/topBarSearch";
import useStyles from "../../Styles/components/header";
import { User } from "../../redux/actionTypes";
import {
  DropdownInactive,
  DropdownActive,
  InnerFilterAll,
  InnerFilterSports,
  // InnerFilterFitness,
  NotificationIcon,
  LeftArrow,
  AccountCircle,
  Lifestyle,
  AuthenticatedSealWhiteBorder,
  LifestyleBlueIcon,
  // InnerFilterFitnessBlack,
} from "../CustomIcon";
import { userLogout, setActiveSettingsTab } from "../../redux/actions/user";
import {
  setMapView,
  setFilterDrawer,
  setAccountProfileDrawer,
  setLocateMeButton,
} from "../../redux/actions/app";

import { getIsMobile, isUserLoggedIn } from "../../utils";
import SuccessModal from "../SuccessModal";
import { IMAGE_API } from "../../config";

interface Props {
  scrollHeaderOn: boolean;
  showSearch?: boolean | true;
  showUserMenu?: boolean | false;
  profile: User | null;
  userLogout: typeof userLogout;
  token: string | null;
  setFilterDrawer: typeof setFilterDrawer;
  isFilterDrawerOpen: boolean;
  pageType?: string;
  userLayout?: boolean;
  handleOpenCloseAccountDrawer?: Function;
  isLocateMe: boolean;
  setLocateMeButton: typeof setLocateMeButton;
  setAccountProfileDrawer: typeof setAccountProfileDrawer;
  isAccountProfileDrawerOpen: boolean;
  setMapView: typeof setMapView;
  activeSettingsTab: string;
  setActiveSettingsTab: typeof setActiveSettingsTab;
}

const Header: FunctionComponent<Props> = ({
  scrollHeaderOn,
  showSearch,
  showUserMenu,
  profile,
  userLogout,
  token,
  pageType,
  setFilterDrawer,
  isFilterDrawerOpen,
  userLayout,
  // setAccountProfileDrawer,
  isLocateMe,
  setLocateMeButton,
  // isAccountProfileDrawerOpen,
  // setMapView,
  activeSettingsTab,
  setActiveSettingsTab,
}) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [myProfile, setMyProfile] = React.useState(false);
  const [leftDrawerVisibility, setLeftDrawerVisibility] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState("explore");
  const [activeComponent, setActiveComponent] = React.useState("explore");
  const [helpdeskModal, setHelpdeskModal] = React.useState(false);
  const [helpdeskReview, setHelpdeskReview] = React.useState("");
  const [helpdeskSuccess, setHelpdeskSuccess] = React.useState(false);
  const [helpdeskError, setHelpdeskError] = React.useState(false);

  const classes = useStyles();
  const isMobile = getIsMobile();
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (router.pathname === "/explore-search" || router.pathname === "/") {
      setActiveLink("explore");
      setActiveComponent("explore");
    } else if (router.pathname === "/places") {
      setActiveLink("places");
      setActiveComponent("places");
    } else if (router.pathname === "/explore-maps") {
      setActiveLink("maps");
      setActiveComponent("maps");
    } else if (router.pathname === "/my-profile") {
      setActiveLink("my-profile");
      setActiveComponent("my-profile");
      setMyProfile(true);
    } else if (router.pathname === "/account-settings") {
      // read slug from redux
      setActiveLink("account-settings");
      setActiveComponent(activeSettingsTab);
    }
  }, [router]);

  const handleProfileMenu = evt => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(evt.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    //@ts-ignore
    userLogout(token);
    setAnchorEl(null);
  };
  const handleUserAccountSettings = () => {
    router.push(`/settings/${activeSettingsTab}`);
  };

  const handleUserProfilePage = () => {
    router.push(`/my-profile`);
  };

  const handleHelpDeskLink = () => {
    setHelpdeskModal(true);
  };
  const handleHelpDeskModalClose = () => {
    setHelpdeskModal(false);
  };
  const handleHelpdeskReviewChange = evt => {
    setHelpdeskReview(evt.target.value);
  };
  const handleHelpDeskReviewSubmit = () => {
    if (helpdeskReview !== '') {
      setHelpdeskError(false);
    const payload = {
      text: `(id:${profile && profile.id}) ${profile && profile.fullname} - ${helpdeskReview}`,
    };
    axios
      .post(
        `https://hooks.slack.com/services/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`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(response => {
        console.log("response", response);
        setHelpdeskReview("");
        setHelpdeskModal(false);
        setHelpdeskSuccess(true);

      })
      .catch(error => {
        console.log("error", error);
      });
    } else {
      setHelpdeskError(true);
    }
  };
  const renderMenuLinks = () => {
    return showUserMenu ? (
      <div>
        <Link href="/">
          <a
            className={clsx(classes.link, classes.linkActive)}
            onClick={evt => {
              evt.preventDefault();
              handleListItemClick("/");
            }}
          >
            <HomeIcon color="primary" className={classes.alignIcon} />
            Back to Home
          </a>
        </Link>
      </div>
    ) : (
      <div className={classes.hiddenSm}>
        <Link href="/">
          <a
            className={clsx(classes.link, activeLink === "explore" ? classes.linkActive : "")}
            onClick={evt => {
              evt.preventDefault();
              handleListItemClick("/");
            }}
          >
            Explore
          </a>
        </Link>

        <Link href="/places">
          <a
            className={clsx(classes.link, activeLink === "places" ? classes.linkActive : "")}
            onClick={evt => {
              evt.preventDefault();
              handleListItemClick("places");
            }}
          >
            Places
          </a>
        </Link>

        {/* <Link href="#">
          <a className={clsx(classes.link, activeLink === "specialist" ? classes.linkActive : "")}>
            Specialists
          </a>
        </Link> */}

        <Link href="/maps">
          <a
            className={clsx(classes.link, activeLink === "maps" ? classes.linkActive : "")}
            onClick={evt => {
              evt.preventDefault();
              handleListItemClick("maps");
            }}
          >
            Maps
          </a>
        </Link>
        {isUserLoggedIn(profile) ? (
          <Link href="/help-desk">
            <a
              className={clsx(classes.link, activeLink === "helpdesk" ? classes.linkActive : "")}
              onClick={evt => {
                evt.preventDefault();
                handleHelpDeskLink();
              }}
            >
              Help Desk
            </a>
          </Link>
        ) : null}
        {isUserLoggedIn(profile) ? (
          <React.Fragment>
            <IconButton aria-label="notifications">
              <NotificationIcon className={classes.notification} />
            </IconButton>
            <div style={{ display: "inline-block" }}>
              <Avatar
                //@ts-ignore
                src={profile && profile.avatar_url ? `${IMAGE_API}${profile.avatar_url}` : ""}
                //@ts-ignore
                alt={profile.display_name}
                className={classes.profileImage}
                onClick={evt => handleProfileMenu(evt)}
              />
              {open ? (
                <DropdownActive className={classes.dropdownIcon} />
              ) : (
                <DropdownInactive className={classes.dropdownIcon} />
              )}
            </div>
          </React.Fragment>
        ) : (
          <Link href="/sign-in">
            <a className={classes.link}>
              <AccountCircle className={classes.accountCircle} />
              Login / Signup
            </a>
          </Link>
        )}
      </div>
    );
  };
  const handleLeftDrawer = () => {
    if (pageType === "index" || pageType === "accountSettings") {
      setLeftDrawerVisibility(true);
    } else {
      router.back();
    }
  };

  const handleCloseLeftDrawer = () => {
    setLeftDrawerVisibility(false);
  };
  const handleListItemClick = value => {
    if (activeLink === value) {
      return;
    }
    if (value === "explore" || value == "/") {
      router.push("/index?reset=true", "/");
    } else if (value === "places") {
      console.log("Goto Places");
      router.push("/places?reset=true", "/places");
    } else if (value === "maps") {
      router.push("/explore-maps?reset=true", "/maps");
    } else if (value === "notifications") {
      console.log("notifications");
    } else if (
      value === "account-info" ||
      value === "profile-info" ||
      value === "location-setup" ||
      value === "lifestyles-and-qongfus"
    ) {
      setActiveSettingsTab(value);
      router.push("/account-settings", `/settings/${value}`);
    } else if (value === "helpDesk") {
      setHelpdeskModal(true);
    } else if (value === "logout") {
      //@ts-ignore
      userLogout(token);
    } else if (value === "aboutUs") {
      console.log("aboutUs");
    } else if (value === "qongfuMobile") {
      console.log("qongfuMobile");
    } else if (value === "qongfuBusiness") {
      console.log("qongfuBusiness");
    } else if (value === "my-profile") {
      router.push(`/my-profile?rnd=${+new Date()}`, "/my-profile");
    } else if (value === "sign-in" || value === "sign-up") {
      router.push("/auth", `/${value}`);
    }
    setLeftDrawerVisibility(false);
  };

  const renderSearchBar = () => {
    return (
      <TopBarSearch
        showOn="header"
        placeholder="Place name, location, or instructor"
        icon="search"
      />
    );
  };

  const renderWeb = () => {
    return (
      <React.Fragment>
        <Link href="/">
          <a
            className={classes.logoContainer}
            onClick={evt => {
              evt.preventDefault();
              handleListItemClick("/");
            }}
          >
            <img
              src="/assets/img/logo.svg"
              alt="Qongfu"
              className={clsx(classes.logo, classes.hiddenSm)}
            />
          </a>
        </Link>
        <div className={clsx(classes.grow, classes.searchContainer)}>
          {showSearch ? renderSearchBar() : null}
        </div>
        {renderMenuLinks()}
      </React.Fragment>
    );
  };
  const renderMobile = () => {
    return (
      <React.Fragment>
        {pageType === "accountSettings" ? (
          <div>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              style={{ color: "#919191" }}
              onClick={() => (isLocateMe ? setLocateMeButton(!isLocateMe) : handleLeftDrawer())}
            >
              {isLocateMe ? <LeftArrow /> : <MenuIcon />}
            </IconButton>
          </div>
        ) : (
          <div
            className={classes.logoContainer}
            onClick={() => {
              handleLeftDrawer();
            }}
          >
            {pageType === "index" ? (
              <img
                src="/assets/img/mobile-logo-icon.svg"
                alt="Qongfu"
                style={{ verticalAlign: "middle" }}
              />
            ) : (
              <IconButton>
                <LeftArrow />
              </IconButton>
            )}
          </div>
        )}

        <div className={clsx(classes.grow, classes.searchContainer)}>
          {pageType === "accountSettings" ? (
            <Typography variant="body1" component="p" className={classes.accountPageHeader}>
              {isLocateMe ? "Location Setup" : "My Account"}
            </Typography>
          ) : (
            renderSearchBar()
          )}
        </div>
        <div className={classes.headerFilter}>
          {pageType === "myProfile" ? (
            <Avatar
              //@ts-ignore
              src={profile && profile.avatar_url ? `${IMAGE_API}${profile.avatar_url}` : ""}
              //@ts-ignore
              alt={profile && profile.display_name}
              className={classes.mbProfilePageAvatar}
              onClick={evt => handleProfileMenu(evt)}
            />
          ) : pageType === "placeDetails" ? null : pageType === "accountSettings" ? (
            isLocateMe ? null : (
              <NotificationsNoneIcon style={{ color: "#919191" }} />
            )
          ) : (
            <TuneIcon color="secondary" onClick={() => setFilterDrawer(!isFilterDrawerOpen)} />
          )}
        </div>
      </React.Fragment>
    );
  };
  return (
    <React.Fragment>
      <AppBar
        position={scrollHeaderOn ? "fixed" : isMobile ? "fixed" : "static"}
        classes={{
          root: clsx(
            classes.appBarRoot,
            !scrollHeaderOn ? (!isMobile ? classes.appBarRootShadowNone : "") : "",
            userLayout ? classes.userLayoutBackground : ""
          ),
        }}
      >
        <Container>
          <Toolbar>{isMobile ? renderMobile() : renderWeb()}</Toolbar>
        </Container>
      </AppBar>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        style={{ marginTop: "65px" }}
      >
        {myProfile
          ? [
              <MenuItem
                key="profile-menu-item-my-account"
                className={classes.dropdownList}
                onClick={handleUserAccountSettings}
              >
                My Account
              </MenuItem>,
              <MenuItem
                key="profile-menu-item-logout1"
                className={classes.dropdownList}
                onClick={handleLogout}
              >
                Log Out
              </MenuItem>,
            ]
          : [
              <MenuItem
                key="profile-menu-item-my-profile"
                className={classes.dropdownList}
                onClick={handleUserProfilePage}
              >
                <ListItemIcon>
                  <InnerFilterAll />
                </ListItemIcon>
                My Profile
              </MenuItem>,
              // <MenuItem key="profile-menu-item-invite-friends" className={classes.dropdownList}>
              //   <ListItemIcon>
              //     <InnerFilterFitness />
              //   </ListItemIcon>
              //   Invite Friends
              // </MenuItem>,
              // <MenuItem
              //   key="profile-menu-item-settings"
              //   className={classes.dropdownList}
              //   onClick={handleUserAccountSettings}
              // >
              //   <ListItemIcon>
              //     <InnerFilterFitness />
              //   </ListItemIcon>
              //   Settings
              // </MenuItem>,
              <MenuItem
                key="profile-menu-item-logout"
                className={classes.dropdownList}
                onClick={handleLogout}
              >
                <ListItemIcon>
                  <InnerFilterSports />
                </ListItemIcon>
                Log Out
              </MenuItem>,
            ]}
      </Menu>
      <Drawer
        variant="temporary"
        anchor="left"
        open={leftDrawerVisibility}
        classes={{ paper: classes.drawerPaper }}
        onClose={() => handleCloseLeftDrawer()}
      >
        <div>
          <div className={clsx(classes.hiddenXs, classes.drawerHeader)}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item md={4} lg={4} sm={4} xs={4}>
                <Avatar
                  //@ts-ignore
                  src={
                    isUserLoggedIn(profile) && profile!.avatar_url!
                      ? `${IMAGE_API}${profile!.avatar_url!}`
                      : ""
                  }
                  //@ts-ignore
                  alt={isUserLoggedIn(profile) ? profile.display_name : ""}
                  className={classes.mbUserImage}
                  // onClick={evt => handleProfileMenu(evt)}
                />
                {isUserLoggedIn(profile) &&
                (profile?.contact_number_verified || profile?.email_verified) ? (
                  <AuthenticatedSealWhiteBorder
                    style={{ position: "absolute", left: "28px", top: "74px" }}
                  />
                ) : null}
              </Grid>
              <Grid item md={6} lg={6} sm={6} xs={6}>
                {isUserLoggedIn(profile) ? (
                  <React.Fragment>
                    <Typography variant="body1" component="p" className={classes.mbUserProfileName}>
                      {profile ? profile.display_name : ""}
                    </Typography>

                    <Typography variant="body1" component="p" className={classes.mbUserProfileArea}>
                      {profile && profile.country
                        ? `${profile.area}, ${profile.country.country}`
                        : ""}
                    </Typography>

                    <Typography
                      variant="body1"
                      component="p"
                      className={classes.mbUserProfileArea}
                      onClick={() => handleListItemClick("my-profile")}
                    >
                      View Profile
                    </Typography>
                  </React.Fragment>
                ) : (
                  <Typography variant="body1" component="p" className={classes.mbUserProfileArea}>
                    <a onClick={() => handleListItemClick("sign-up")}> Signup </a>
                    or
                    <a onClick={() => handleListItemClick("sign-in")}> Login</a>
                  </Typography>
                )}
              </Grid>
            </Grid>
          </div>
          {pageType === "accountSettings" ? (
            <React.Fragment>
              <List className={classes.list}>
                <ListItem
                  className={
                    activeComponent === "explore"
                      ? classes.listItemActive
                      : classes.listItemInactive
                  }
                  onClick={() => handleListItemClick("explore")}
                >
                  <ListItemIcon>
                    <HomeIcon color="primary" />
                  </ListItemIcon>
                  Home
                </ListItem>
              </List>
              <Divider className={classes.divider} />
              <List className={classes.list}>
                <ListItem
                  className={
                    activeComponent === "account-info"
                      ? classes.listItemActive
                      : classes.listItemInactive
                  }
                  onClick={() => handleListItemClick("account-info")}
                  style={{ marginLeft: "30px" }}
                >
                  Account Info
                </ListItem>
              </List>
            </React.Fragment>
          ) : (
            <List className={classes.list}>
              <ListItem
                className={
                  activeComponent === "explore" ? classes.listItemActive : classes.listItemInactive
                }
                onClick={() => handleListItemClick("explore")}
              >
                <ListItemIcon>
                  {activeComponent === "explore" ? <LifestyleBlueIcon /> : <Lifestyle />}
                </ListItemIcon>
                Explore
              </ListItem>

              <ListItem
                className={
                  activeComponent === "maps" ? classes.listItemActive : classes.listItemInactive
                }
                onClick={() => handleListItemClick("maps")}
              >
                <ListItemIcon>
                  <MapIcon color={activeComponent === "maps" ? "primary" : "inherit"} />
                </ListItemIcon>
                Maps
              </ListItem>
            </List>
          )}
          <Divider className={classes.divider} />
          {isUserLoggedIn(profile) ? (
            <React.Fragment>
              {pageType === "accountSettings" ? (
                <List className={classes.list}>
                  <ListItem
                    className={
                      activeComponent === "profile-info"
                        ? classes.listItemActive
                        : classes.listItemInactive
                    }
                    onClick={() => handleListItemClick("profile-info")}
                    style={{ marginLeft: "30px" }}
                  >
                    Profile Info
                  </ListItem>
                  <ListItem
                    className={
                      activeComponent === "location-setup"
                        ? classes.listItemActive
                        : classes.listItemInactive
                    }
                    onClick={() => handleListItemClick("location-setup")}
                    style={{ marginLeft: "30px" }}
                  >
                    Location Setup
                  </ListItem>
                  <ListItem
                    className={
                      activeComponent === "lifestyles-and-qongfus"
                        ? classes.listItemActive
                        : classes.listItemInactive
                    }
                    onClick={() => handleListItemClick("lifestyles-and-qongfus")}
                    style={{ marginLeft: "30px" }}
                  >
                    Lifestyles and Qongfus
                  </ListItem>
                </List>
              ) : (
                <List className={classes.list}>
                  <ListItem
                    className={
                      activeComponent === "notifications"
                        ? classes.listItemActive
                        : classes.listItemInactive
                    }
                    onClick={() => handleListItemClick("notifications")}
                  >
                    <ListItemIcon>
                      <NotificationsNoneIcon
                        color={activeComponent === "notifications" ? "primary" : "inherit"}
                      />
                    </ListItemIcon>
                    Notifications
                  </ListItem>
                </List>
              )}
              <Divider className={classes.divider} />
              <List className={classes.list}>
                <ListItem
                  className={
                    activeComponent === "helpDesk"
                      ? classes.listItemActive
                      : classes.listItemInactive
                  }
                  onClick={() => handleListItemClick("helpDesk")}
                >
                  <ListItemIcon>
                    <HeadsetMicIcon
                      color={activeComponent === "helpDesk" ? "primary" : "inherit"}
                    />
                  </ListItemIcon>
                  Help Desk
                </ListItem>
                <ListItem
                  className={
                    activeComponent === "logout" ? classes.listItemActive : classes.listItemInactive
                  }
                  style={{ marginLeft: "30px" }}
                  onClick={() => handleListItemClick("logout")}
                >
                  Log Out
                </ListItem>
              </List>
            </React.Fragment>
          ) : (
            <List className={classes.list}>
              <ListItem
                className={
                  activeComponent === "aboutUs" ? classes.listItemActive : classes.listItemInactive
                }
                onClick={() => handleListItemClick("aboutUs")}
              >
                <ListItemIcon>
                  <StarBorderIcon color={activeComponent === "aboutUs" ? "primary" : "inherit"} />
                </ListItemIcon>
                About Us
              </ListItem>
              <ListItem
                className={
                  activeComponent === "qongfuMobile"
                    ? classes.listItemActive
                    : classes.listItemInactive
                }
                onClick={() => handleListItemClick("qongfuMobile")}
              >
                <ListItemIcon>
                  <PhoneIphoneIcon
                    color={activeComponent === "qongfuMobile" ? "primary" : "inherit"}
                  />
                </ListItemIcon>
                Qongfu Mobile
              </ListItem>
              <ListItem
                className={
                  activeComponent === "qongfuBusiness"
                    ? classes.listItemActive
                    : classes.listItemInactive
                }
                onClick={() => handleListItemClick("qongfuBusiness")}
              >
                <ListItemIcon>
                  <StorefrontIcon
                    color={activeComponent === "qongfuBusiness" ? "primary" : "inherit"}
                  />
                </ListItemIcon>
                Qongfu Business
              </ListItem>
            </List>
          )}
        </div>
      </Drawer>
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={helpdeskModal}

        onClose={handleHelpDeskModalClose}
        maxWidth="lg"
      >
        <DialogContent  className={classes.confirmationModal}>
          {helpdeskSuccess ? (
            <SuccessModal
              title="Success!"
              description=" Your query has been submitted."
              buttonText="Okay"
              handlerFunction={handleHelpDeskModalClose}
            />
          ) : (
            <div>
              <div style={{ float: "right" }}>
                <CloseIcon className={classes.closeIcon} onClick={handleHelpDeskModalClose} />
              </div>

              <Typography variant="h5" className={classes.helpdeskModalHeading}>
                Help Desk
              </Typography>
              <Typography variant="body1" className={classes.inputLabels}>
                How can we help you?
              </Typography>
              <TextField
                id="filled-full-width"
                variant="outlined"
                placeholder="Write your query here"
                multiline
                rows="4"
                fullWidth
                onChange={handleHelpdeskReviewChange}
                InputProps={{
                  classes: {
                    root: classes.inputBorder,
                  },
                }}
                helperText={
                  helpdeskError && (
                    <span className={classes.errorText}>* Please write your query message.</span>
                  )
                }
              />
              <Grid item style={{ textAlign: "center" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  style={{ width: "160px", margin: "20px 0px" }}
                  disableRipple
                  onClick={() => handleHelpDeskReviewSubmit()}
                >
                  Submit
                </Button>
              </Grid>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    token: appState.user.token,
    loading: appState.user.loading,
    profile: appState.user.profile,
    dialogInfo: appState.app.dialogInfo,
    isFilterDrawerOpen: appState.app.isFilterDrawerOpen,
    isAccountProfileDrawerOpen: appState.app.isAccountProfileDrawerOpen,
    isLocateMe: appState.app.isLocateMe,
    activeSettingsTab: appState.user.activeSettingsTab,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
