import React, { FunctionComponent } from "react";
import { Grid, IconButton, Divider, Typography } from "@material-ui/core";
import { FacebookIcon, GoogleIcon, InstagramIcon } from "../CustomIcon";
import useStyles from "../../Styles/components/auth";

interface Props {
  title: string;
}

const socialMedia: FunctionComponent<Props> = ({ title }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={3} lg={4} xl={4} sm={3} md={4}>
          <Divider className={classes.leftDivider} />
        </Grid>
        <Grid item xs={6} lg={4} xl={4} sm={6} md={4}>
          <Typography variant="body1" component="p" className={classes.dividerText}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={3} lg={4} xl={4} sm={3} md={4}>
          <Divider className={classes.rightDivider} />
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item xs={4} lg={4} md={4} style={{ textAlign: "center" }}>
          <IconButton aria-label="facebook" disableRipple>
            <FacebookIcon style={{ fontSize: "60px" }} />
          </IconButton>
        </Grid>
        <Grid item xs={4} lg={4} md={4} style={{ textAlign: "center" }}>
          <IconButton aria-label="google" disableRipple>
            <GoogleIcon style={{ fontSize: "60px" }} />
          </IconButton>
        </Grid>
        <Grid item xs={4} lg={4} md={4} style={{ textAlign: "center" }}>
          <IconButton aria-label="instagram" disableRipple>
            <InstagramIcon style={{ fontSize: "60px" }} />
          </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default socialMedia;
