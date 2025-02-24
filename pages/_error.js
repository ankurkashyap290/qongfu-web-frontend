import React from "react";
import { useRouter } from "next/router";
import { Typography, Button } from "@material-ui/core";
import { LifestyleIconColored } from "../components/CustomIcon";

function Error({ statusCode }) {
  const router = useRouter();
  const handleGoToHomePage = () => {
    router.push("/");
  };

  return (
    <React.Fragment>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <img alt="complex" src="/assets/img/no-result.png" />
        <Typography variant="h5" color="primary" style={{ marginTop: "40px" }}>
          {" "}
          {statusCode}
          <br /> Sorry, the page you visited does not exist.
        </Typography>
        <Button
          variant="outlined"
          size="large"
          color="primary"
          style={{ marginTop: "20px", backgroundColor: "#fff", textTransform: "unset" }}
          onClick={() => handleGoToHomePage()}
        >
          <LifestyleIconColored style={{ verticalAlign: "sub " }} />
          Go to Home
        </Button>
      </div>
    </React.Fragment>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
