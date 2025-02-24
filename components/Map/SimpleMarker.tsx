import React, { FunctionComponent } from "react";
import { IconButton } from "@material-ui/core";
import useStyles from "../../Styles/components/mapView";
import { Marker } from "../../redux/actionTypes";
import MapPinDanceIcon from "../CustomIcon/MapPinDance";
import MapPinFitnessIcon from "../CustomIcon/MapPinFitness";
import MapPinMartialArtsIcon from "../CustomIcon/MapPinMartialArts";
import MapPinRecreationalIcon from "../CustomIcon/MapPinRecreational";
import MapPinSportsIcon from "../CustomIcon/MapPinSports";
import MapPinWellnessIcon from "../CustomIcon/MapPinWellness";

const SimpleMarker: FunctionComponent<Marker> = props => {
  const { place, onMarkerClick } = props;
  const classes = useStyles();
  const getMarkerIcon = slug => {
    switch (slug) {
      case "dance":
        return <MapPinDanceIcon className={classes.markerStyle} />;
      case "fitness":
        return <MapPinFitnessIcon className={classes.markerStyle} />;
      case "martial-arts":
        return <MapPinMartialArtsIcon className={classes.markerStyle} />;
      case "recreational":
        return <MapPinRecreationalIcon className={classes.markerStyle} />;
      case "sports":
        return <MapPinSportsIcon className={classes.markerStyle} />;
      case "wellness":
        return <MapPinWellnessIcon className={classes.markerStyle} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <IconButton
        onClick={() => onMarkerClick && onMarkerClick(place.id)}
        className={classes.markerBtn}
        disableRipple
      >
        {getMarkerIcon(place.lifestyles.length ? place.lifestyles[0].slug : "fitness")}
      </IconButton>
      {/*
        To-do make info window
        {props.showtitle ? (
          <InfoWindow onClick={props.onClick} value={props.value} store={props.store} />
        ) : null} */}
    </div>
  );
};

export default SimpleMarker;
