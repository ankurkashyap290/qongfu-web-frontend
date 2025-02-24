import React, { FunctionComponent, useEffect } from "react";
import _ from "lodash";
import {
  Stepper,
  Step,
  StepLabel,
  Grid,
  Link,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import clsx from "clsx";
import { useRouter } from "next/router";
import LoadingOverlay from "react-loading-overlay";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import WelcomePage from "./welcomePage";
import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";
import useStyles from "../../Styles/components/userOnboarding";
import { LeftArrow, RightInactiveArrow } from "../CustomIcon";
import { Success } from "../CustomIcon";
import { getIsMobile } from "../../utils";

interface Props {
  userOnboardingStep: string;
  loading: boolean;
}

const Onboarding: FunctionComponent<Props> = ({ userOnboardingStep, loading }) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const router = useRouter();
  useEffect(() => {
    if (userOnboardingStep === "success") {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [userOnboardingStep]);

  const handleStepChange = step => {
    router.push(`/user-onboarding?slug=${step}`, `/user-onboarding/${step}`);
  };

  const steps = [1, 2, 3];
  const customSteps = props => {
    const { active } = props;
    const icons = {
      1: 1,
      2: 2,
      3: 3,
    };
    return (
      <div
        className={clsx(classes.root, classes.circle, {
          [classes.active]: active,
        })}
      >
        <div>
          <span className={classes.stepLabel}>{icons[String(props.icon)]}</span>
        </div>
      </div>
    );
  };

  return (
    <LoadingOverlay
      active={loading}
      spinner={<CircularProgress />}
      text=""
      styles={{
        content: base => ({
          ...base,
          color: "#919191",
        }),
        overlay: base => ({
          ...base,
          zIndex: 9999,
          color: "#919191",
          backgroundColor: "rgba(255,255,255,.3)",
        }),
      }}
    >
      <React.Fragment>
        {userOnboardingStep === "" || userOnboardingStep === "success" ? null : (
          <Grid
            container
            justify="center"
            style={{ backgroundColor: isMobile ? "#fff" : "#f8fcff" }}
          >
            <Grid item xs={4} xl={4} lg={4} sm={4} md={4}>
              {userOnboardingStep !== "step1" ? (
                <div className={classes.personalInfoLink}>
                  <Link
                    href="#back"
                    onClick={evt => {
                      evt.preventDefault();
                      handleStepChange(userOnboardingStep === "step2" ? "step1" : "step2");
                    }}
                  >
                    <LeftArrow className={classes.stepLeftArrow} />{" "}
                    {userOnboardingStep === "step2" ? "Personal Info" : "Avatar"}
                  </Link>
                </div>
              ) : null}
            </Grid>
            <Grid
              item
              xs={4}
              xl={4}
              lg={4}
              sm={4}
              md={4}
              className={clsx(
                isMobile ? "" : classes.stepsContainer,
                classes.onboardingMainConatiner
              )}
            >
              <Stepper
                activeStep={
                  userOnboardingStep === "step1" ? 0 : userOnboardingStep === "step2" ? 1 : 2
                }
                alternativeLabel
                className={classes.stepper}
              >
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel
                      classes={{ labelContainer: classes.stepAlternativeLabel }}
                      StepIconComponent={customSteps}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {isMobile ? null : (
                <div style={{ width: "100%", textAlign: "center" }}>
                  {userOnboardingStep === "step1" ? <FirstStep /> : null}
                  {userOnboardingStep === "step2" ? <SecondStep /> : null}
                  {userOnboardingStep === "step3" ? <ThirdStep /> : null}
                </div>
              )}
            </Grid>
            <Grid item xs={4} xl={4} lg={4} sm={4} md={4} style={{ textAlign: "right" }}>
              {userOnboardingStep !== "step1" ? (
                <div className={clsx(classes.personalInfoLink, classes.hiddenXs)}>
                  <Link
                    onClick={() =>
                      handleStepChange(userOnboardingStep === "step2" ? "step3" : "success")
                    }
                    className={classes.SkipLink}
                  >
                    Skip
                  </Link>
                  <RightInactiveArrow className={classes.stepLeftArrow} />{" "}
                </div>
              ) : null}
            </Grid>
          </Grid>
        )}
        <Grid
          container
          justify="center"
          style={isMobile ? { backgroundColor: "#fff", minHeight: "calc(100vh - 60px)" } : {}}
        >
          {userOnboardingStep === "" ? <WelcomePage /> : null}
          {isMobile ? (
            <div style={{ width: "100%", textAlign: "center" }}>
              {" "}
              {userOnboardingStep === "step1" ? <FirstStep /> : null}
              {userOnboardingStep === "step2" ? <SecondStep /> : null}
              {userOnboardingStep === "step3" ? <ThirdStep /> : null}
            </div>
          ) : null}
          {userOnboardingStep === "success" ? (
            <div className={classes.onboardingMainConatiner}>
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Typography variant="h5" className={classes.successModalHeading}>
                  Welcome to Qongfu!
                </Typography>
                <Success style={{ fontSize: "160px", margin: "25px" }} />

                <Typography variant="h5" className={classes.successModalText}>
                  Your account has been activated!
                  <br />
                  The world of Qongfu awaits.
                </Typography>
                <Typography variant="body1" className={classes.successModalConfirm}>
                  Redirecting you to the home page…
                </Typography>
              </div>
            </div>
          ) : null}
        </Grid>
      </React.Fragment>
    </LoadingOverlay>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    userOnboardingStep: appState.user.userOnboardingStep,
    loading: appState.user.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
