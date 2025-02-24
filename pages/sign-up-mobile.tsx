import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import UserLayout from "../components/Layout/UserLayout";
import { Grid, Card, CardContent, Container } from "@material-ui/core";
import { getIsMobile, isUserLoggedIn } from "../utils";
import VerifyPhone from "../components/AuthComponent/VerifyPhone";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../redux/actions";
import { AppState } from "../redux/reducers";
import { User } from "../redux/actionTypes";
import { useRouter } from "next/router";

interface Props {
  profile: User | null;
  token: string | null;
}

const SignUpMobile: NextPage<Props> = ({ profile, token }) => {
  const isMobile = getIsMobile();
  const router = useRouter();
  const [isLoaded, setPageLoaded] = useState(false);
  const [isRedirected, setRedirectedToHome] = useState(false);
  const [timeOutId, setTimeoutId] = useState(null as any);
  useEffect(() => {
    if (!isLoaded) {
      let redirectToHome = false;
      if (!token || !profile) {
        redirectToHome = true; // if no token found or not found profile then no need of this page to show
      } else if (token && profile && isUserLoggedIn(profile)) {
        redirectToHome = true; // if truly login then no need to come here
      }
      if (redirectToHome) {
        setRedirectedToHome(true);
      } else {
        setRedirectedToHome(false);
        setPageLoaded(true);
      }
    }
  }, [profile, token]);
  useEffect(() => {
    if (isRedirected) {
      const timeout = setTimeout(() => {
        router.push("/");
      }, 1000); //for annoyed users wait for 1 seconds to actual redirect
      setTimeoutId(timeout);
    } else if (timeOutId) {
      clearTimeout(timeOutId);
      setTimeoutId(null);
    }
  }, [isRedirected]);

  const renderForm = () => {
    return (
      <VerifyPhone
        heading="Get Moving with Qongfu!"
        headingDetails="Choose your country code and enter your mobile number."
        submitLabel={isMobile ? "Send OTP to this number" : "Send Code"}
        mode="verify-phone"
      />
    );
  };

  const renderWeb = () => {
    return (
      <Grid container>
        <Grid item lg={6} md={6} xl={6} sm={6}>
          {" "}
        </Grid>

        <Grid item lg={4} md={4} xl={4} sm={4}>
          <Card>
            <CardContent>{renderForm()}</CardContent>
          </Card>
        </Grid>
        <Grid item lg={2} md={2} xl={2} sm={2}>
          {" "}
        </Grid>
      </Grid>
    );
  };
  const renderMobile = () => {
    return renderForm();
  };
  return (
    <UserLayout>
      <Container>
        {isLoaded && !isRedirected ? isMobile ? renderMobile() : renderWeb() : <div> </div>}
      </Container>
    </UserLayout>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    profile: appState.user.profile,
    token: appState.user.token,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpMobile);
