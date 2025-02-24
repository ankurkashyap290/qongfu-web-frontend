import React, { FunctionComponent, useEffect, useState } from "react";
import _ from "lodash";
import { Grid, Avatar, Card, Typography, Button, IconButton, Divider } from "@material-ui/core";
import Router from "next/router";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Dropzone from "react-dropzone";
import useStyles from "../../Styles/components/profile";
import clsx from "clsx";
import { User, Lifestyles, Qongfus } from "../../redux/actionTypes";
import QongfuBreadcrumbs from "../Breadcrumbs";
import MoreInfo from "./moreInfo";
import ValidatedMember from "../CustomIcon/ValidatedMember";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import MobileSubHeaderNav from "../Header/mobileSubHeaderNav";
import { fetchAllLifestyles } from "../../redux/actions/app";
import { saveUserDetails, setActiveSettingsTab } from "../../redux/actions/user";
import LifeStylesAndQongfus from "../LifestylesAndQongfus";
import EditProfile from "../CustomIcon/EditProfile";
import { IMAGE_API } from "../../config";

interface Props {
  isMobile: boolean;
  profile: User | null;
  token: string | null;
  lifestyles?: Lifestyles[];
  fetchAllLifestyles?: typeof fetchAllLifestyles;
  saveUserDetails: typeof saveUserDetails;
  setActiveSettingsTab: typeof setActiveSettingsTab;
}

const Profile: FunctionComponent<Props> = ({
  isMobile,
  profile,
  lifestyles,
  // fetchAllLifestyles,
  saveUserDetails,
  token,
  setActiveSettingsTab,
}) => {
  const [selectedLifestyles, setLifestyles] = useState([] as Lifestyles[]);
  const [selectedQongfus, setQongfus] = useState([] as Qongfus[]);

  useEffect(() => {
    if (profile) {
      setLifestyles(profile?.lifestyles || []);
      setQongfus(profile?.qongfus || []);
    }
  }, [profile]);

  const scrollHeaderHeight = isMobile ? 180 : 360;
  const [scrollHeaderOn, setScrollHeader] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // To-do remove fixed header fro mobile version
  const handleScroll = _.throttle(() => {
    if (isMobile) {
      setScrollHeader(false);
    } else if (window.pageYOffset > scrollHeaderHeight && !scrollHeaderOn) {
      setScrollHeader(true);
    } else if (window.pageYOffset < scrollHeaderHeight && !scrollHeaderOn) {
      setScrollHeader(false);
    }
  }, 100);

  const classes = useStyles();
  const handleProfileEdit = value => {
    Router.push("/account-settings", `/settings/${value}`);
    setActiveSettingsTab(value);
  };

  const handleSelectFile = (acceptedFiles, imageType) => {
    let payload = {
      avatar: acceptedFiles[0],
      cover_photo: acceptedFiles[0],
    };
    if (imageType === "avatar") {
      delete payload.cover_photo;
    } else if (imageType === "cover_photo") {
      delete payload.avatar;
    }
    saveUserDetails(
      {
        //@ts-ignore
        first_name: profile && profile.first_name,
        //@ts-ignore
        last_name: profile && profile.last_name,
        ...payload,
      },
      token,
      "second",
      "upload-user-avatar"
    );
  };

  const renderLifestylesAndQongfus = () => {
    return (
      <LifeStylesAndQongfus
        lifestyles={selectedLifestyles}
        qongfus={selectedQongfus}
        qongfuMax={9}
        systemLifestyles={lifestyles || []}
      />
    );
  };

  return (
    <React.Fragment>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} className={classes.hiddenXs} style={{ margin: "16px 0px" }}>
          <MobileSubHeaderNav />
        </Grid>
      </Grid>
      <div style={{ position: "relative" }}>
        <div
          style={{
            backgroundImage:
              profile && profile.cover_url
                ? `url("${IMAGE_API}${profile && profile.cover_url}")`
                : `url("/assets/img/profile-cover-image.png")`,
          }}
          className={classes.headBackgroundImage}
        />
        <div className={clsx(classes.infoBarMain, scrollHeaderOn ? classes.infoBarFixed : "")}>
          <Dropzone
            maxSize={512000}
            onDrop={acceptedFiles => handleSelectFile(acceptedFiles, "cover_photo")}
          >
            {({ getRootProps, getInputProps }) => (
              <Grid container justify="center">
                <section>
                  <input {...getInputProps()} />
                  <div {...getRootProps()}>
                    <IconButton className={classes.cameraCoverIcon}>
                      <CameraAltIcon
                        style={{ fontSize: isMobile ? "23px" : "30px", color: "#b2b2b2" }}
                      />
                    </IconButton>
                  </div>
                </section>
              </Grid>
            )}
          </Dropzone>

          {/* <div className={classes.infoBarMain}> */}
          <Grid direction="row" container justify="space-between">
            <Grid item>
              <div className={classes.infoBarLogoMain}>
                <Avatar
                  //@ts-ignore
                  src={profile && profile.avatar_url ? `${IMAGE_API}${profile.avatar_url}` : ""}
                  //@ts-ignore
                  alt={profile ? profile.avatar : ""}
                  className={classes.bigAvatar}
                />
                <Dropzone
                  maxSize={512000}
                  onDrop={acceptedFiles => handleSelectFile(acceptedFiles, "avatar")}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Grid
                      container
                      direction="column"
                      justify="flex-end"
                      alignItems="center"
                      className={classes.avatarContainer}
                    >
                      <section>
                        <input {...getInputProps()} />
                        <div {...getRootProps()}>
                          <IconButton className={classes.cameraIcon}>
                            <CameraAltIcon
                              style={{ fontSize: isMobile ? "23px" : "30px", color: "#b2b2b2" }}
                            />
                          </IconButton>
                        </div>
                      </section>
                    </Grid>
                  )}
                </Dropzone>
              </div>
            </Grid>
          </Grid>

          <div className={classes.userInfo}>
            <Button
              className={classes.editIcon}
              style={{ marginRight: "10px" }}
              onClick={() => handleProfileEdit("profile-info")}
            >
              <EditProfile />
            </Button>
            <div className={classes.hiddenSm}>
              <QongfuBreadcrumbs
                data={[{ linkName: "My Account", href: "/settings/account-info", active: false }]}
              />
            </div>

            <div className={classes.userName}>
              {//@ts-ignore
              profile ? profile.display_name : ""}
            </div>
            <Grid container justify="flex-start">
              {(profile && profile.email_verified) ||
              (profile && profile.contact_number_verified) ||
              (profile && profile.identity_verified) ? (
                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                  <ValidatedMember className={classes.verticalIcon} />
                  <span className={classes.validatedMember}>Validated member</span>
                </Grid>
              ) : null}

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <LocationOnIcon style={{ color: "#858585" }} className={classes.verticalIcon} />
                <span className={classes.area}>
                  {profile && profile.country
                    ? `${profile.area ? profile.area + ", " : ""} ${profile.country.country}`
                    : "-"}
                </span>
              </Grid>
            </Grid>
          </div>
        </div>
        {isMobile ? (
          <Grid container className={clsx(classes.userProfileBody, classes.hiddenXs)}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h4" className={classes.aboutUs}>
                About Us
              </Typography>
              <Typography variant="body1" className={classes.aboutUsDesc}>
                {//@ts-ignore
                profile && profile.bio
                  ? profile.bio
                  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Nunc sed augue lacus viverra vitaecongue eu consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sedaugue lacus viverra vitae congue eu consequat."}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Divider style={{ margin: "16px 0 25px" }} />

              <Button
                className={classes.editIcon}
                onClick={() => handleProfileEdit("lifestyles-and-qongfus")}
              >
                <EditProfile />
              </Button>
              {renderLifestylesAndQongfus()}
            </Grid>
            <Grid item xs={12} md={6} lg={6} sm={12}>
              <Divider style={{ margin: "16px 0" }} />
              <Typography variant="h4" className={classes.aboutUs}>
                More Info
              </Typography>
              <MoreInfo profile={profile} />
            </Grid>
          </Grid>
        ) : (
          <Grid container direction="row">
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <div className={classes.mainCard} style={{ margin: "16px 8px 16px 0px" }}>
                <Button
                  className={classes.editIcon}
                  onClick={() => handleProfileEdit("lifestyles-and-qongfus")}
                >
                  <EditProfile />
                </Button>
                {renderLifestylesAndQongfus()}
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Card className={classes.mainCard} style={{ margin: "16px 0px 16px 8px" }}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} md={6} lg={6} sm={12}>
                    <Typography variant="h4" className={classes.aboutUs}>
                      About Us
                    </Typography>
                    <Typography variant="body1" className={classes.aboutUsDesc}>
                      {//@ts-ignore
                      profile && profile.bio
                        ? profile.bio
                        : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Nunc sed augue lacus viverra vitaecongue eu consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sedaugue lacus viverra vitae congue eu consequat."}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} sm={12}>
                    <Typography variant="h4" className={classes.aboutUs}>
                      More Info
                    </Typography>
                    <MoreInfo profile={profile} />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
    </React.Fragment>
  );
};

export default Profile;
