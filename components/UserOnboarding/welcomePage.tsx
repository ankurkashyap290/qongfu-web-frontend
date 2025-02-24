import React, { FunctionComponent } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { Typography, Grid, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import useStyles from "../../Styles/components/userOnboarding";

interface Props {}

const WelcomePage: FunctionComponent<Props> = ({}) => {
  const classes = useStyles();
  const router = useRouter();
  const handleStartUserOnboarding = () => {
    router.push("/user-onboarding?slug=step1", "/user-onboarding/step1");
  };
  const handleGoToHome = () => {
    router.push(`/sign-in`);
  };
  return (
    <React.Fragment>
      <div className={classes.onboardingMainConatiner}>
        <Grid container justify="center">
          <Typography variant="h3" className={classes.welcomeText}>
            Welcome to Qongfu
          </Typography>
        </Grid>
        <Grid container justify="center">
          <img src="/assets/img/group_9015.png" alt="Qongfu" className={classes.logo} />
        </Grid>
        <div style={{ minHeight: "160px" }}>
          <Grid container justify="center">
            <Typography variant="body1" className={classes.startedText}>
              Let’s get you onboard!
            </Typography>
          </Grid>
          <Grid container justify="center">
            <Typography variant="body2" className={classes.startedDesc}>
              Join the Global Qongfu Community!
            </Typography>
          </Grid>
        </div>
        <Grid container justify="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            disableRipple
            onClick={handleStartUserOnboarding}
          >
            Let's get started
          </Button>
        </Grid>
        <Grid container justify="center">
          <Button className={classes.cancelButton} disableRipple onClick={handleGoToHome}>
            Cancel
          </Button>
        </Grid>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
