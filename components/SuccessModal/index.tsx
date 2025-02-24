import React, { FunctionComponent } from "react";
import { Typography, Button, Grid } from "@material-ui/core/";
import { Success } from "../CustomIcon";
import useStyles from "../../Styles/components/successModal";

interface Props {
  icon?: string;
  iconLabel?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  handlerFunction: Function;
}

const SuccessModal: FunctionComponent<Props> = props => {
  const classes = useStyles();
  const { title, description, buttonText, handlerFunction, icon } = props;

  return (
    <React.Fragment>
      <div className={classes.hiddenSm}>
        <div className={classes.successContainer}>
          {icon === "success" ? <Success style={{ fontSize: "120px", margin: "25px" }} /> : null}
          <Typography variant="h5" className={classes.successModalHeading}>
            {title}
          </Typography>
          <Typography variant="body1" className={classes.successModalConfirm}>
            {description}
          </Typography>
        </div>
        <Grid container justify="center">
          <Button
            variant="outlined"
            color="primary"
            size="large"
            style={{ width: "160px", margin: "20px 0px" }}
            disableRipple
            onClick={() => handlerFunction()}
          >
            {buttonText}
          </Button>
        </Grid>
      </div>
      <Grid container direction="column" justify="space-around" className={classes.hiddenXs}>
        <Grid item>
          <div className={classes.successContainer}>
            {icon === "success" ? <Success style={{ fontSize: "120px", margin: "25px" }} /> : null}
            <Typography variant="h5" className={classes.successModalHeading}>
              {title}
            </Typography>
            <Typography variant="body1" className={classes.successModalConfirm}>
              {description}
            </Typography>
          </div>
        </Grid>
        <Grid item style={{ textAlign: "center" }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            style={{ width: "160px", margin: "20px 0px" }}
            disableRipple
            onClick={() => handlerFunction()}
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SuccessModal;
