import React, { FunctionComponent } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  Button,
} from "@material-ui/core";
// import clsx from "clsx";
import useStyles from "../../Styles/components/PlaceDetails/placeDetailCards";
import Map from "../Map";
import { Location as GeoLocation, Places } from "../../redux/actionTypes";
import { Map_Key } from "../../config";
interface Props {
  geoLocation: GeoLocation;
  zoom: number;
  address: string;
  place: Places;
  isMobile?: boolean;
}

const Location: FunctionComponent<Props> = props => {
  const [mapModalVisibility, setMapModalVisibility] = React.useState(false);
  const classes = useStyles();
  const handleMapModal = () => {
    setMapModalVisibility(true);
  };
  const handleModalClose = () => {
    setMapModalVisibility(false);
  };
  const { address, geoLocation, zoom, place } = props;
  return (
    <React.Fragment>
      <Card className={classes.mainCard}>
        <CardContent>
          <Grid container justify="space-between">
            <Typography variant="h5" component="h5">
              Location
            </Typography>
            <Typography
              variant="h6"
              component="h6"
              color="primary"
              className={classes.hiddenSm}
              style={{ cursor: "pointer" }}
              onClick={handleMapModal}
            >
              {" "}
              Direction
            </Typography>
          </Grid>
          <Grid container direction="column" className={classes.weekColumn}>
            <Grid item className={classes.hiddenXs}>
              <div className={classes.address} style={{ paddingBottom: "10px" }}>
                {address}
              </div>
            </Grid>
            <Grid item>
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${geoLocation.lat},${geoLocation.lng}&zoom=${zoom}&size=500x500&maptype=roadmap
                &markers=color:red|${geoLocation.lat},${geoLocation.lng}&key=${Map_Key}`}
                width="100%"
              />
            </Grid>
          </Grid>
          <Grid container direction="column" className={classes.hiddenSm}>
            <Grid item>
              <Typography variant="h6" component="h6">
                {" "}
                Address:
              </Typography>
              <div className={classes.address}>{address}</div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={mapModalVisibility}
        onClose={handleModalClose}
        maxWidth="xl"
      >
        <DialogContent style={{ width: "60vw" }}>
          <Map
            mapProps={{ center: geoLocation, zoom, bounds: null }}
            height="400px"
            markers={[{ ...place }]}
          />
          <Grid container justify="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              disableRipple
              style={{ margin: "10px" }}
              onClick={handleModalClose}
            >
              Done
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Location;
