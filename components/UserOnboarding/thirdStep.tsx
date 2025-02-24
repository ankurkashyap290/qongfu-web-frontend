import React from "react";
import { NextPage } from "next";
import _ from "lodash";
import { Typography, Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { useRouter } from "next/router";
import actionCreators from "../../redux/actions";
import useStyles from "../../Styles/components/userOnboarding";
import { getIsMobile } from "../../utils";
import LifestylesAndQogfusUpdate from "../LifestylesAndQongfus/LifestylesAndQogfusUpdate";

interface Props {}

const ThirdStep: NextPage<Props> = ({}) => {
  const isMobile = getIsMobile();
  const classes = useStyles();
  const router = useRouter();
  const handleSuccessHandler = () => {
    router.push("/user-onboarding?slug=success", "/user-onboarding/success");
  };

  return (
    <Grid container justify="center">
      <Typography variant="h4" className={classes.startedText}>
        You're on Fire!
        <br />
        Let's add some interests
      </Typography>
      <Typography variant="body2" className={classes.thirdStepDesc}>
        Sharing your interests can help enhance
        <br />
        your overall Qongfu experience.
      </Typography>
      <LifestylesAndQogfusUpdate
        submitButtonText={isMobile ? "Complete SignUp" : "Submit"}
        selectionBoxMaxWidth={352}
        successDialog={false}
        successHandler={handleSuccessHandler}
      />
      {isMobile ? null : (
        <Grid container justify="center">
          <Button
            className={classes.cancelButton}
            disableRipple
            onClick={() => handleSuccessHandler()}
          >
            Skip
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ThirdStep);
