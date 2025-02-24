import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import { setLocation } from "../../redux/actions/app";
import { Location } from "../../redux/actionTypes";
import { setGeoLocationToLocal, getGeoLocationToLocal } from "../../utils";
import axios from "axios";
import { IP_API } from "../../config";

interface Props {
  setLocation: typeof setLocation;
  location: Location;
  userPublicIp: string;
  userAllowed: boolean;
}

const AskLocation: FunctionComponent<Props> = ({
  setLocation,
  location,
  userPublicIp,
  userAllowed,
}) => {
  useEffect(() => {
    console.log("Ask Location but ", location);
    if (navigator.geolocation && location && !location.lat && !location.lng) {
      console.log("Location fetching");
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locationObject = { location: { lat, lng }, userAllowed: true, userPublicIp };
          setLocation({ ...locationObject });
          setGeoLocationToLocal(JSON.stringify(locationObject));
        },
        err => {
          console.log("GeoLocation error", err);
          setGeoLocationWithIp();
        },
        {
          timeout: 5000,
        }
      );
    } else {
      setGeoLocationWithIp();
    }
  }, []);

  const setGeoLocationWithIp = () => {
    if (userPublicIp) {
      const localSavedLocation = getGeoLocationToLocal();
      if (!userAllowed && !location?.lat && !location?.lng) {
        if (localSavedLocation && userPublicIp === localSavedLocation.userPublicIp) {
          setLocation({ ...localSavedLocation }); //rehydrate it again when same
        } else {
          axios
            .get(`${IP_API}/${userPublicIp}/json`)
            .then(response => {
              const locationObject = {
                location: { lat: response.data.latitude, lng: response.data.longitude },
                userAllowed: false,
                userPublicIp,
              };
              setLocation({ ...locationObject });
              setGeoLocationToLocal(JSON.stringify(locationObject));
            })
            .catch(error => {
              console.log("error", error);
            });
        }
      }
    }
  };

  return <React.Fragment />;
};

const mapStateToProps = (appState: AppState) => {
  return {
    location: appState.app.location,
    userPublicIp: appState.app.userPublicIp,
    userAllowed: appState.app.userAllowed,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AskLocation);
