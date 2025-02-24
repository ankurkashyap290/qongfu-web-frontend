import React, { FunctionComponent } from "react";
import { Grid, Typography } from "@material-ui/core";
import useStyles from "../../Styles/components/PlaceDetails/placeDetailCards";
import KidsCoupleIcon from "../CustomIcon/KidsCouple";
import ParkedCarIcon from "../CustomIcon/ParkedCar";
import PaymentMethodIcon from "../CustomIcon/PaymentMethod";
import PersonIcon from "../CustomIcon/Person";
import WifiIcon from "../CustomIcon/Wifi";

interface Props {
  amenities: any;
  isMobile?: boolean;
}

const MoreInfo: FunctionComponent<Props> = ({ amenities }) => {
  const classes = useStyles();

  const getIcon = icon => {
    switch (icon) {
      case "client_type":
        return <PersonIcon style={{ verticalAlign: "middle" }} />;
      case "kids":
        return <KidsCoupleIcon style={{ verticalAlign: "middle" }} />;
      case "parking":
        return <ParkedCarIcon style={{ verticalAlign: "middle" }} />;
      case "payments":
        return <PaymentMethodIcon style={{ verticalAlign: "middle" }} />;
      case "wifi":
        return <WifiIcon style={{ verticalAlign: "middle" }} />;
      default:
        return null;
    }
  };

  const renderAmenity = item => {
    return (
      <React.Fragment key={item.id}>
        <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
          <Typography variant="body2" className={classes.moreInfoLabel}>
            <span style={{ marginRight: 10 }}>{getIcon(item.icon)}</span>
            {item.label}
          </Typography>
        </Grid>
        <Grid item sm={6} xs={6} md={6} lg={6} xl={6} style={{ marginBottom: "16px" }}>
          <Typography variant="body2" className={classes.moreInfoValue}>
            {item.info}
          </Typography>
        </Grid>
      </React.Fragment>
    );
  };
  return (
    amenities.length && (
      <React.Fragment>
        <Typography
          variant="h5"
          component="h5"
          className={classes.aboutUsHeading}
          style={{ marginBottom: "15px" }}
        >
          More Info
        </Typography>
        <Grid container direction="row">
          {amenities.map(item => renderAmenity(item))}
        </Grid>
      </React.Fragment>
    )
  );
};

export default MoreInfo;
