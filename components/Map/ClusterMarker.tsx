import React, { FunctionComponent } from "react";
import { Typography } from "@material-ui/core";
import useStyles from "../../Styles/components/mapView";
import { Marker } from "../../redux/actionTypes";

const ClusterMarker: FunctionComponent<Marker> = props => {
  const { place, onMarkerClick, clusterLength } = props;
  const classes = useStyles();
  return (
    <div>
      <div
        className={classes.markerBtn}
        onClick={() => (onMarkerClick ? onMarkerClick() : console.log(place.id))}
      >
        {clusterLength && clusterLength <= 10 ? (
          <img src="/assets/img/Cluster_9.png" />
        ) : (
          <img
            src={
              clusterLength && clusterLength >= 100
                ? "/assets/img/Cluster_10+@2x.png"
                : "/assets/img/Cluster_10+.png"
            }
          />
        )}
        <Typography
          className={
            clusterLength && clusterLength > 100
              ? classes.extraLargeCluster
              : clusterLength && clusterLength > 10
              ? classes.largeCluster
              : classes.smallCluster
          }
        >
          {clusterLength}
        </Typography>
      </div>
    </div>
  );
};

export default ClusterMarker;
