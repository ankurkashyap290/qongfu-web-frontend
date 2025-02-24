import React from "react";
import { NextPage } from "next";
import UserLayout from "../components/Layout/UserLayout";
import { Grid, Card, CardContent, Container } from "@material-ui/core";
import useStyles from "../Styles/forgotPasswordMobile";
import { getIsMobile } from "../utils";
import VerifyPhone from "../components/AuthComponent/VerifyPhone";
import { useRouter } from "next/router";

interface Props {}

const ForgotPasswordMobile: NextPage<Props> = ({}) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const router = useRouter();
  const renderTabs = () => {
    return (
      <div className={classes.tabContainer}>
        <div
          className={classes.inactiveTab}
          onClick={() => {
            router.push("/forgot-password-email");
          }}
        >
          Email
        </div>
        <div className={classes.activeTab}>Mobile</div>
      </div>
    );
  };
  const renderForm = () => {
    return (
      <Card style={{ backgroundColor: "#F7F7F7" }}>
        <CardContent style={{ margin: 0, padding: 0 }}>
          {renderTabs()}
          <div className={classes.formContainer}>
            <VerifyPhone
              heading="Reset your password"
              headingDetails=""
              submitLabel={isMobile ? "Send OTP to this number" : "Send Code"}
              mode="reset-password"
            />
          </div>
        </CardContent>
      </Card>
    );
  };
  const renderWeb = () => {
    return (
      <Grid container>
        <Grid item lg={6} md={6} xl={6} sm={6}>
          {" "}
        </Grid>

        <Grid item lg={4} md={4} xl={4} sm={4} style={{ position: "relative", marginBottom: 20 }}>
          {renderForm()}
        </Grid>
        <Grid item lg={2} md={2} xl={2} sm={2}>
          {" "}
        </Grid>
      </Grid>
    );
  };
  const renderMobile = () => {
    return (
      <React.Fragment>
        <div style={{ textAlign: "center", width: "100%" }}>
          <img src="/assets/img/mobile-header-logo.svg" width="152" height="152" />
        </div>
        <div style={{ position: "relative", margin: 20 }}>{renderForm()}</div>
      </React.Fragment>
    );
  };
  return (
    <UserLayout>
      <Container>{isMobile ? renderMobile() : renderWeb()}</Container>
    </UserLayout>
  );
};

export default ForgotPasswordMobile;
