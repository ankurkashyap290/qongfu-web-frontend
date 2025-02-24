import React, { FunctionComponent } from "react";
import { Box, IconButton } from "@material-ui/core";
import GridView from "../CustomIcon/GridView";
import MapView from "../CustomIcon/MapView";
import { FilterIcon } from "../CustomIcon";
import useStyles from "../../Styles/components/mapView";
import clsx from "clsx";

interface Props {
  openLeftDrawer: Function;
  isMapView: boolean;
  setIsMapView: Function;
  isMobile?: boolean;
}

const MapActions: FunctionComponent<Props> = props => {
  const classes = useStyles();
  const { openLeftDrawer, setIsMapView, isMobile } = props;
  return isMobile ? (
    <Box
      className={classes.mapViewAction}
      style={{ margin: "0", position: "absolute", top: "10px", left: "10px" }}
    >
      <IconButton className={classes.mapViewActionBtn} onClick={() => setIsMapView()} disableRipple>
        <GridView />
      </IconButton>
      <IconButton
        className={clsx(classes.mapViewActionBtn, classes.mapViewSelectedActionBtn)}
        disableRipple
      >
        <MapView />
      </IconButton>
    </Box>
  ) : (
    <Box className={classes.mapViewAction} style={{ margin: "0" }}>
      <IconButton className={classes.mapViewActionBtn} onClick={() => setIsMapView()} disableRipple>
        <GridView />
      </IconButton>
      <IconButton
        className={clsx(classes.mapViewActionBtn, classes.mapViewSelectedActionBtn)}
        disableRipple
      >
        <MapView />
      </IconButton>
      <IconButton
        className={classes.mapViewActionBtn}
        onClick={() => openLeftDrawer()}
        disableRipple
      >
        <FilterIcon
          color="primary"
          fontSize="large"
          style={{ paddingLeft: "7px", paddingTop: "8px" }}
        />
      </IconButton>
    </Box>
  );
};

export default MapActions;
