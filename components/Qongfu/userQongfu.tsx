import React, { FunctionComponent } from "react";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import useStyles from "../../Styles/components/userQougfu";

interface Props {
  children: any;
}

const UserQougfu: FunctionComponent<Props> = ({ children }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={clsx(classes.heroContent, classes.hiddenSm)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} />
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} style={{ backgroundColor: "#ffffff" }}>
            {children}
          </Grid>
        </Grid>
      </div>
      <Grid
        container
        spacing={2}
        className={classes.hiddenXs}
        style={{ backgroundColor: "#ffffff" }}
      >
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} />
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          {children}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default UserQougfu;
