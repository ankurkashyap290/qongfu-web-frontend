import React, { FunctionComponent, useState, useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  InputLabel,
  InputAdornment,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import clsx from "clsx";
import UserLocation from "../UserLocation";
import useStyles from "../../Styles/components/accountSettings";
import { Location, User, Countries } from "../../redux/actionTypes";
// import countries from "../../config/countries.json";
import { setLocateMeButton, hideDialog } from "../../redux/actions/app";
import { saveUserDetails } from "../../redux/actions/user";
import { getIsMobile } from "../../utils";
import SuccessModal from "../SuccessModal";
import { Map_Key } from "../../config";
import Alert from "@material-ui/lab/Alert";

interface Props {
  location: Location;
  setLocateMeButton: typeof setLocateMeButton;
  token: string | null;
  profile: User | null;
  isLocateMe: boolean;
  saveUserDetails: typeof saveUserDetails;
  dialogInfo: any;
  hideDialog: typeof hideDialog;
  countries: Countries[];
  error: string | null;
}

const LocationSetup: FunctionComponent<Props> = ({
  location,
  setLocateMeButton,
  isLocateMe,
  profile,
  saveUserDetails,
  token,
  dialogInfo,
  hideDialog,
  countries,
  error,
}) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const [defaultLocationLoaded, setDefaultLocation] = useState(false);
  const [showMapScreen, setMapScreen] = useState(false);
  const [isLocationChange, setIsLocationChange] = useState(false);
  const [isProfileLoaded, setProfileLoaded] = useState(false);

  const [userAddress, setUserAddress] = useState({} as Location);

  useEffect(() => {
    // wait for ask location to grab lat,lng and load it
    if (location.lat && location.lng && !defaultLocationLoaded) {
      setDefaultLocation(true);
      // setUserAddress({
      //   lat: location.lat,
      //   lng: location.lng,
      //   area: location.area || "",
      //   city: location.city || "",
      //   region: location.region || "",
      //   address: location.address || "",
      //   country: location.country || "",
      // });
    }
  }, [location]);

  useEffect(() => {
    // wait for profile update until default location grabbed and set
    if (defaultLocationLoaded && profile && !isProfileLoaded) {
      setProfileLoaded(true);
      updateProfileAddress();
    }
  }, [profile, defaultLocationLoaded]);

  useEffect(() => {
    if (!showMapScreen && userAddress.lat && userAddress.lng) {
      setMapScreen(true);
    }
  }, [userAddress]);

  const handleLocationSet = () => {
    setMapScreen(true);
  };

  const updateProfileAddress = () => {
    // override grabbed location with profile location set
    setUserAddress({
      lat: profile && profile.location_lat ? profile.location_lat : 0,
      lng: profile && profile.location_lng ? profile.location_lng : 0,
      area: profile && profile.area ? profile.area : "",
      city: profile && profile.city ? profile.city : "",
      region: profile && profile.region ? profile.region : "",
      address: profile && profile.location ? profile.location : "",
      country: profile && profile.country ? profile.country.country : "",
    });
  };

  const getCountry = countryId => {
    return countries.find(item => item.country_code === countryId);
  };

  const handleLocationChange = address => {
    const tempAddress = address;
    const foundedCountry = getCountry(address.country);
    if (foundedCountry) {
      tempAddress.country = foundedCountry.country;
    }
    setUserAddress({ ...tempAddress });
  };

  const handleAddressChange = evt => {
    const tempUserAddress = userAddress;
    tempUserAddress.address = evt.target.value;
    setUserAddress({ ...tempUserAddress });
  };

  const handleAreaChange = evt => {
    const tempUserAddress = userAddress;
    tempUserAddress.area = evt.target.value;
    setUserAddress({ ...tempUserAddress });
  };

  const handleLocationDone = () => {
    if (!isLocateMe) {
      handleUpdateLocation();
    } else {
      setLocateMeButton(false);
    }
  };

  const handleUpdateLocation = () => {
    if((userAddress.area!==''||userAddress.city!=='')&& userAddress.region!==''&& userAddress.country!==''){
    const location_data = {
      region: userAddress.region,
      city: userAddress.city,
      area: userAddress.area,
    };

    const tempCountry = countries.find(
      country => country.country === userAddress.country
    ) as Countries;

    let payload = {
      //@ts-ignore
      first_name: profile.first_name,
      //@ts-ignore
      last_name: profile.last_name,
      location: userAddress.address,
      location_lat: userAddress.lat,
      location_lng: userAddress.lng,
      country_id: tempCountry.id,
      region: userAddress.region,
      city: userAddress.city,
      area: userAddress.area,
      location_data,
    };
    if (payload.area === "") {
      delete payload.area;
    } else if (payload.city === "") {
      delete payload.city;
    }
    if (payload.location === "") {
      delete payload.location;
    }

    saveUserDetails(
      {
        ...payload,
      },
      token,
      "",
      "location"
    );
    }
  };

  const handleModalClose = () => {
    hideDialog("info", "account-update-location");
    setIsLocationChange(false);
  };


  const renderUserLocation = () => {
    return (
      <UserLocation
        height={isMobile ? (isLocateMe ? "calc(100vh - 125px)" : "174px") : "324px"}
        coordinates={{ lat: userAddress.lat, lng: userAddress.lng }}
        zoom={12}
        onLocationChange={handleLocationChange}
        isMobile={isMobile}
        isLocateMe={isLocateMe}
        setIsLocationChange={setIsLocationChange}
        userCurrentPin={{ lat: location.lat, lng: location.lng }}
      />
    );
  };

  const renderLocateMe = () => {
    return <div style={{ position: "relative" }}>{renderUserLocation()}</div>;
  };

  const renderWelcome = () => {
    return (
      <React.Fragment>
        <Typography variant="h4" className={classes.headingText}>
          Location Setup
        </Typography>
        <Typography variant="body1" className={clsx(classes.DescriptionText, classes.hiddenSm)}>
          Add a location Pin to activate “search Nearby” feature and optimize your overall search
          experience.
        </Typography>
        <Grid container direction="column">
          <Grid item style={{ textAlign: "center" }}>
            <Typography variant="h4" className={classes.locationSetUpHeading}>
              Let’s get your Location Pin Setup!
            </Typography>
          </Grid>

          <Grid item style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disableRipple
              onClick={handleLocationSet}
              className={classes.locationSetupButton}
            >
              Click me to add your Location
            </Button>
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            <Typography variant="body1" className={classes.locationSetUpFooter}>
              Add a location Pin to activate the “search Nearby” feature and optimize your overall
              search experience.
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };

  const renderMobile = () => {
    return (
      <React.Fragment>
        <Grid container direction="row">
          <Grid item xs={12} sm={12}>
            <Typography variant="body1" className={clsx(classes.DescriptionText, classes.hiddenSm)}>
              Please share your Location for optimized search results.
            </Typography>
          </Grid>
          <Grid container direction="column" justify="space-between">
            <Grid item xs={4} sm={4}>
              <Typography variant="body1">GEOLOCATION</Typography>
            </Grid>
            <Grid item xs={8} sm={8} style={{ textAlign: "right" }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                disableRipple
                onClick={() => {
                  setLocateMeButton(true);
                }}
              >
                Locate Me
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <div style={{ position: "relative" }}>{renderMapImage()}</div>
          </Grid>
        </Grid>
        {renderFormFields()}
      </React.Fragment>
    );
  };
  const renderMapImage = () => {
    const center = { lat: 0, lng: 0 };
    if (userAddress.lat && userAddress.lng) {
      center.lat = parseFloat(userAddress.lat + "");
      center.lng = parseFloat(userAddress.lng + "");
    } else {
      center.lat = parseFloat(location.lat + "");
      center.lng = parseFloat(location.lng + "");
    }
    return (
      <div style={{ height: isMobile ? "174px" : "324px" }}>
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${center.lat},${
            center.lng
          }&zoom=${12}&size=800x300&maptype=roadmap
    &markers=color:red|${center.lat},${center.lng}&key=${Map_Key}`}
          width="100%"
        />
      </div>
    );
  };

  const renderWeb = () => {
    return (
      <React.Fragment>
        <Typography variant="h4" className={classes.headingText}>
          Location Setup
        </Typography>

        <Typography variant="body1" className={clsx(classes.DescriptionText, classes.hiddenSm)}>
          Add a location Pin to activate “search Nearby” feature and optimize your overall search
          experience.
        </Typography>
        <div style={{ position: "relative" }}>{renderUserLocation()}</div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            disableRipple
            onClick={() => handleUpdateLocation()}
          >
            Relocate My Pin
          </Button>
        </div>
        {renderFormFields()}
      </React.Fragment>
    );
  };

  const renderFormFields = () => {
    return (
      <Grid container direction="row">
        {error && (
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.locationAddressField}>
          <InputLabel className={classes.inputLabels}>Area</InputLabel>
          <TextField
            variant="outlined"
            className={classes.inputFields}
            id="area"
            value={userAddress.area}
            onChange={handleAreaChange}
            helperText={
              userAddress.city === "" &&
              userAddress.area === "" && (
                <span className={classes.errorText}>* Please fill either city or area</span>
              )
            }
            InputProps={{
              classes: {
                root: clsx(classes.inputBorder, classes.locationAddressFieldColor),
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.locationAddressField}>
          <InputLabel className={classes.inputLabels}>City</InputLabel>
          <TextField
            className={classes.inputFields}
            variant="outlined"
            id="city"
            disabled
            value={userAddress.city}
            helperText={
              userAddress.city === "" &&
              userAddress.area === "" && (
                <span className={classes.errorText}>* Please fill either city or area</span>
              )
            }
            InputProps={{
              classes: {
                root: clsx(classes.inputBorder, classes.locationAddressFieldColor),
              },
              endAdornment: (
                <InputAdornment position="end">
                  <LockIcon color="secondary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.locationAddressField}>
          <InputLabel className={classes.inputLabels}>Governorate</InputLabel>
          <TextField
            className={classes.inputFields}
            variant="outlined"
            id="region"
            disabled
            value={userAddress.region}
            helperText={
              userAddress.region === "" && (
                <span className={classes.errorText}>* Please fill the region</span>
              )
            }
            InputProps={{
              classes: {
                root: clsx(classes.inputBorder, classes.locationAddressFieldColor),
              },
              endAdornment: (
                <InputAdornment position="end">
                  <LockIcon color="secondary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.locationAddressField}>
          <InputLabel className={classes.inputLabels}>Country</InputLabel>
          <TextField
            className={classes.inputFields}
            variant="outlined"
            id="country"
            disabled
            value={userAddress.country}
            helperText={
              userAddress.country === "" && (
                <span className={classes.errorText}>* Please fill the country</span>
              )
            }
            InputProps={{
              classes: {
                root: clsx(classes.inputBorder, classes.locationAddressFieldColor),
              },
              endAdornment: (
                <InputAdornment position="end">
                  <LockIcon color="secondary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.locationAddressField}>
          <InputLabel className={classes.inputLabels}>Address</InputLabel>
          <TextField
            variant="outlined"
            className={classes.inputFields}
            id="address"
            value={userAddress.address}
            onChange={handleAddressChange}
            // helperText={
            //   userAddress.address === "" && (
            //     <span className={classes.errorText}>* Please fill the address</span>
            //   )
            // }
            InputProps={{
              classes: {
                root: clsx(classes.inputBorder, classes.locationAddressFieldColor),
              },
            }}
          />
        </Grid>
      </Grid>
    );
  };

  const renderMapForm = () => {
    return isMobile ? (isLocateMe ? renderLocateMe() : renderMobile()) : renderWeb();
  };

  return (
    <React.Fragment>
      <Card className={classes.mainCard}>
        <CardContent
          className={
            !isLocateMe || !isMobile ? classes.cardContent : classes.mapLocationCardContent
          }
        >
          {!showMapScreen ? renderWelcome() : renderMapForm()}
        </CardContent>
        {isMobile && showMapScreen ? (
          <div style={{ position: "fixed", bottom: "0px", left: "0px", width: "100%" }}>
            {error && (
              <div style={{ margin: "20px 0px" }}>
                <Alert severity="error">{error}</Alert>
              </div>
            )}
            <Button
              variant="contained"
              disabled={!isLocationChange}
              className={
                !isLocationChange
                  ? classes.mapLocationDisabledSearchBtn
                  : classes.mapLocationSearchBtn
              }
              onClick={handleLocationDone}
            >
              DONE
            </Button>
          </div>
        ) : null}
      </Card>
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={
          dialogInfo && dialogInfo.dialogCode === "account-update-location" && dialogInfo.open
            ? true
            : false
        }
        className={classes.confirmationModal}
        onClose={handleModalClose}
        maxWidth="xl"
      >
        <DialogContent>
          <SuccessModal
            title="Success!"
            description="Your location has been updated."
            buttonText="Done"
            handlerFunction={handleModalClose}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    location: appState.app.location,
    token: appState.user.token,
    profile: appState.user.profile,
    isLocateMe: appState.app.isLocateMe,
    dialogInfo: appState.app.dialogInfo,
    countries: appState.app.countries,
    error: appState.user.error["update-details-location"] || null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LocationSetup);
