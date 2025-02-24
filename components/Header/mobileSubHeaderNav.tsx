import React, { FunctionComponent } from "react";
import { Grid, Button } from "@material-ui/core";
import useStyles from "../../Styles/components/header";
import Router from "next/router";

interface Props {}

const MobileSubHeaderNav: FunctionComponent<Props> = ({}) => {
  const classes = useStyles();

  const handleTopButtonsOnClick = value => {
    Router.push(`/${value}`);
  };

  return (
    <React.Fragment>
      <Grid container justify="center">
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.mbActiveBtn}
          onClick={() => handleTopButtonsOnClick("places")}
        >
          Places
        </Button>
        {/* <Button
          variant="contained"
          size="small"
          color="secondary"
          className={classes.mbDisableBtn}
          onClick={() => handleTopButtonsOnClick("specialists")}
        >
          Specialists
        </Button> */}
        <Button
          variant="contained"
          color="secondary"
          className={classes.mbDisableBtn}
          size="small"
          onClick={() => handleTopButtonsOnClick("promos")}
        >
          Promos
        </Button>
        <Grid item />
      </Grid>
    </React.Fragment>
  );
};

export default MobileSubHeaderNav;
