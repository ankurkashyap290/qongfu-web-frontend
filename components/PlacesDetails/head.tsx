import React, { FunctionComponent, useState, useEffect } from "react";
import _ from "lodash";
import { Avatar, Grid, Button, Dialog, Typography } from "@material-ui/core";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import WeeklySchedule from "../PlacesDetails/weeklySchedule";
import useStyles from "../../Styles/components/PlaceDetails/head";
import QongfuBreadcrumbs from "../Breadcrumbs";
import { LocationIcon } from "../CustomIcon";
import StarRating from "../StarRating";
import RateUs from "./rateUs";
import { getTimeToAmPmFormat } from "../../utils";
import WatchLaterOutlinedIcon from "@material-ui/icons/WatchLaterOutlined";
import { PhoneIconBlack, InnerFilterHighestRated, AuthenticatedSeal } from "../CustomIcon";
import { hideDialog } from "../../redux/actions/app";

interface Props {
  coverImage: string;
  logo: string;
  name: string;
  location: string;
  star: string;
  score: number;
  isMobile?: boolean;
  open?: string;
  close?: string;
  openNow?: any;
  timingCalculated?: any[] | null;
  dayNumber?: string;
  tabValue?: number;
  setTabValue?: Function;
  scrollHeaderOn?: boolean;
  setScrollHeader?: Function;
  hideDialog: typeof hideDialog;
  verified: number | null;
}

const Head: FunctionComponent<Props> = props => {
  const [rateUsModalVisibility, setRateUsModalVisibility] = useState(false);
  const [mbTimingDialogOpen, setTimingDialog] = useState(false);
  const {
    coverImage,
    logo,
    name,
    location,
    star,
    open,
    close,
    openNow,
    isMobile,
    dayNumber,
    timingCalculated,
    setTabValue,
    tabValue,
    setScrollHeader,
    scrollHeaderOn,
    score,
    hideDialog,
    verified,
  } = props;
  const classes = useStyles();
  const scrollHeaderHeight = isMobile ? 180 : 360;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = _.throttle(() => {
    if (isMobile) {
      setScrollHeader && setScrollHeader(false);
    } else if (window.pageYOffset > scrollHeaderHeight && !scrollHeaderOn) {
      setScrollHeader && setScrollHeader(true);
    } else if (window.pageYOffset < scrollHeaderHeight && !scrollHeaderOn) {
      setScrollHeader && setScrollHeader(false);
    }
  }, 100);

  const handleRateUsModal = () => {
    setRateUsModalVisibility(true);
  };

  const handleModalClose = () => {
    setRateUsModalVisibility(false);
    hideDialog("info", "saved-place-rating");
  };

  const handleTabChange = newValue => {
    setTabValue && setTabValue(newValue);
  };

  const handleMbTimingComponentClick = () => {
    setTimingDialog(true);
  };

  const handleMbTimingDialogClose = () => {
    setTimingDialog(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          backgroundImage: `url("${coverImage}")`,
        }}
        className={classes.headBackgroundImage}
      />
      <div
        className={
          scrollHeaderOn ? clsx(classes.infoBarMain, classes.infoBarFixed) : classes.infoBarMain
        }
      >
        <div
          className={clsx(
            classes.mbPhoneCallRating,
            classes.hiddenXs,
            scrollHeaderOn ? classes.hiddenSm : ""
          )}
        >
          <PhoneIconBlack /> <InnerFilterHighestRated />
        </div>
        <div
          className={clsx(
            classes.hiddenXs,
            classes.mbStartRating,
            scrollHeaderOn ? classes.hiddenSm : ""
          )}
        >
          <Button className={classes.ratingButton}>
            <StarRating
              rating={parseInt(star) || 0}
              pageType="placeCard"
              filledFontSize="19px"
              unfilledFontSize="19px"
            />
            &nbsp;
            <span className={classes.review}>{new Intl.NumberFormat().format(score || 0)}</span>
          </Button>
        </div>
        <Grid
          direction="row"
          container
          className={clsx(
            classes.infoBarContainer,
            scrollHeaderOn ? classes.infoBarContainerFixed : ""
          )}
        >
          <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
            <div className={classes.infoBarLogoMain}>
              <Avatar
                src={logo}
                alt={`${name}-logo`}
                className={scrollHeaderOn ? classes.avatarFixed : classes.bigAvatar}
              />
            </div>
            <div className={scrollHeaderOn ? classes.placeInfoFixed : classes.placeInfo}>
              <div className={classes.hiddenSm}>
                <QongfuBreadcrumbs
                  data={[
                    { linkName: "Explore", href: "/", active: false },
                    { linkName: "Places", href: "/places", active: false },
                    { linkName: name, href: "/", active: true },
                  ]}
                />
              </div>
              <div className={clsx(classes.hiddenXs, scrollHeaderOn ? "" : classes.hiddenSm)}>
                <div className={classes.ratingsAndShareActionCt}>
                  <Button>
                    <StarRating
                      rating={parseInt(star) || 0}
                      pageType="placeCard"
                      filledFontSize="19px"
                      unfilledFontSize="19px"
                      color="primary"
                    />
                    &nbsp;
                    <span className={classes.review}>
                      {new Intl.NumberFormat().format(score || 0)}
                    </span>
                  </Button>
                  <div>
                    <PhoneIconBlack /> <InnerFilterHighestRated />
                  </div>
                </div>
              </div>

              <Typography variant="h5" component="h2" className={classes.placeName}>
                {verified ? <AuthenticatedSeal className={classes.authenticatedIcon} /> : null}
                {name}
              </Typography>
              <div className={scrollHeaderOn ? classes.hiddenSm : ""}>
                <WatchLaterOutlinedIcon className={classes.icon2} />
                <span className={openNow ? classes.open : classes.closed}>
                  {openNow ? "OPEN" : "CLOSED"}
                </span>{" "}
                <span className={classes.time}>
                  {" "}
                  |{" "}
                  {openNow ? (
                    <span>{`${getTimeToAmPmFormat(open)}-${getTimeToAmPmFormat(close)}`}</span>
                  ) : (
                    "Now"
                  )}
                </span>
                <ExpandMoreIcon className={classes.icon} onClick={handleMbTimingComponentClick} />
                <Dialog onClose={handleMbTimingDialogClose} open={mbTimingDialogOpen}>
                  <WeeklySchedule
                    data={timingCalculated!}
                    openToday={openNow!}
                    dayNumber={dayNumber!}
                    isMobile={isMobile}
                    mode="float"
                  />
                </Dialog>
              </div>
              <div>
                <span className={classes.placeLocation}>
                  <LocationIcon
                    style={{ marginLeft: "3px", marginRight: "5px", verticalAlign: "middle" }}
                  />
                  {location}
                </span>{" "}
              </div>
            </div>
          </Grid>
          <Grid
            item
            className={clsx(
              scrollHeaderOn ? classes.ratingSectionFixed : classes.ratingSection,
              classes.hiddenSm
            )}
            xs={12}
            sm={12}
            md={3}
            lg={3}
            xl={3}
          >
            <div style={{ textAlign: "right", paddingTop: "10px" }}>
              <span className={classes.starRating}>{parseInt(star) > 0 ? star : null}</span>
              <StarRating
                rating={parseInt(star)}
                pageType="pageDetailsHeader"
                filledFontSize="35px"
                unfilledFontSize="35px"
              />
            </div>
            <div className={classes.rateUs}>
              <Button
                variant="outlined"
                color="primary"
                classes={{ root: classes.rateUsRoot, label: classes.rateUsLabel }}
                onClick={() => handleRateUsModal()}
                style={{ width: "170px" }}
              >
                Rate us
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid
          direction="row"
          spacing={0}
          container
          className={clsx(classes.hiddenXs, classes.buttonBoxShadow)}
        >
          <Grid item xs={6} sm={6}>
            <Button
              disableRipple
              className={classes.headerTabBtn}
              onClick={() => handleTabChange(0)}
              variant="outlined"
              classes={{
                outlined:
                  tabValue === 0 ? classes.headerTabBtnActive : classes.headerTabBtnInActive,
              }}
            >
              Info
            </Button>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Button
              disableRipple
              className={classes.headerTabBtn}
              onClick={() => handleTabChange(1)}
              variant="outlined"
              classes={{
                outlined:
                  tabValue === 1 ? classes.headerTabBtnActive : classes.headerTabBtnInActive,
              }}
            >
              Media
            </Button>
          </Grid>
        </Grid>
        <Dialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={rateUsModalVisibility}
          onClose={handleModalClose}
          fullWidth
          maxWidth="sm"
          className={classes.rateUsDialogRoot}
        >
          <RateUs logo={logo} name={name} handleModalClose={handleModalClose} />
        </Dialog>
      </div>
    </div>
  );
};

export default Head;
