import React, { FunctionComponent } from "react";
import { Grid, Typography } from "@material-ui/core";
import useStyles from "../../Styles/components/PlaceDetails/placeDetailCards";
import { Lifestyles as LifeStyleType, Specialists } from "../../redux/actionTypes";
import { Lifestyle, ClientType } from "../CustomIcon";

interface Props {
  aboutUs: string;
  lifestyles?: LifeStyleType[];
  specialists?: Specialists[] | undefined;
}

const AboutUs: FunctionComponent<Props> = props => {
  const classes = useStyles();
  const { aboutUs, lifestyles, specialists } = props;

  return (
    <React.Fragment>
      <Grid container spacing={4} direction="row" style={{ padding: "0px 16px" }}>
        <Grid item sm={12} md={6} lg={6}>
          <Typography variant="h5" component="h5" className={classes.aboutUsHeading}>
            About Us
          </Typography>
          <Typography variant="body2" className={classes.aboutUsDesc}>
            {aboutUs}
          </Typography>
        </Grid>
        {lifestyles && specialists && (lifestyles?.length || specialists?.length) ? (
          <Grid item sm={6} md={6} lg={6}>
            <Typography variant="h5" component="h5" className={classes.aboutUsHeading}>
              More Info
            </Typography>
            {lifestyles.length && lifestyles.length > 0 ? (
              <Grid container direction="row" style={{ marginTop: "20px" }} justify="flex-start">
                <Grid item sm={4} md={4} lg={4} xl={3}>
                  <Lifestyle className={classes.verticalIcon} />
                  <span className={classes.moreInfo}>Lifestyle</span>
                </Grid>
                <Grid item sm={4} md={2} lg={2} xl={2} style={{ paddingTop: "3px" }}>
                  :
                </Grid>
                <Grid item sm={4} md={6} lg={6} xl={7}>
                  <span className={classes.aboutUsDesc} style={{ paddingTop: "3px" }}>
                    {lifestyles.map((item, index) => {
                      if (index === lifestyles.length - 1) {
                        return `${item.lifestyle}`;
                      } else {
                        return `${item.lifestyle}, `;
                      }
                    })}
                  </span>
                </Grid>
              </Grid>
            ) : null}
            {specialists?.length && specialists.length > 0 ? (
              <Grid container direction="row" style={{ marginTop: "20px" }} justify="flex-start">
                <Grid item sm={4} md={4} lg={4} xl={3}>
                  <ClientType className={classes.verticalIcon} />
                  <span className={classes.moreInfo}>Client Type</span>
                </Grid>
                <Grid item sm={4} md={2} lg={2} xl={2} style={{ paddingTop: "3px" }}>
                  :
                </Grid>
                <Grid item sm={4} md={6} lg={6} xl={7} style={{ paddingTop: "3px" }}>
                  <span className={classes.aboutUsDesc}>{specialists[0].client_type}</span>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        ) : null}
      </Grid>
    </React.Fragment>
  );
};

export default AboutUs;
