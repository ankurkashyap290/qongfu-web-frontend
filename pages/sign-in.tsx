import React from "react";
import { NextPage } from "next";
import UserLayout from "../components/Layout/UserLayout";
import { Grid, Card, CardContent, Container } from "@material-ui/core";
import useStyles from "../Styles/signIn";
import { getIsMobile } from "../utils";
import SignInForm from "../components/AuthComponent/signIn";
import { useRouter } from "next/router";

interface Props {}

const SignIn: NextPage<Props> = ({}) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const router = useRouter();
  const renderTabs = () => {
    return (
      <div className={classes.tabContainer}>
        <div
          className={classes.inactiveTab}
          onClick={() => {
            router.push("/sign-up");
          }}
        >
          Sign Up
        </div>
        <div className={classes.activeTab}>Sign In</div>
      </div>
    );
  };
  const renderForm = () => {
    return <SignInForm />;
  };
  const renderWeb = () => {
    return (
      <Grid container>
        <Grid item lg={6} md={6} xl={6} sm={6}>
          {" "}
        </Grid>

        <Grid item lg={4} md={4} xl={4} sm={4} style={{ position: "relative", marginBottom: 20 }}>
          <Card style={{ backgroundColor: "#F7F7F7" }}>
            <CardContent style={{ margin: 0, padding: 0 }}>
              {renderTabs()}
              <div className={classes.formContainer}>{renderForm()}</div>
            </CardContent>
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
      <Container>{isMobile ? renderMobile() : renderWeb()}</Container>
    </UserLayout>
  );
};

export default SignIn;
