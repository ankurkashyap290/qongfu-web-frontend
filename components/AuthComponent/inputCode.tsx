import React, { FunctionComponent, useState } from "react";
import _ from "lodash";
import ReactCodeInput from "react-code-input";
import { Typography, Button, Grid, Link } from "@material-ui/core";
import useStyles from "../../Styles/components/auth";

interface Props {
  onUpdate: Function;
  onResend: Function;
  isMobile: boolean;
}

const InputCode: FunctionComponent<Props> = ({ onUpdate, onResend, isMobile }) => {
  const [code, setCode] = useState("");
  const classes = useStyles();
  const fieldsCount = 5;

  const handleInputCodeChange = value => {
    setCode(value);
  };
  const handleCodeSubmission = () => {
    onUpdate && onUpdate(code);
  };
  const webProps = {
    inputStyle: {
      margin: "10px",
      width: "50px",
      borderRadius: "5px",
      fontSize: "21px",
      height: "56px",
      color: "#b2b2b2",
      textAlign: "center",
      border: "1px solid #b2b2b2",
      boxShadow: "0 0 5px #b2b2b2",
    },
  };

  const mobileProps = {
    inputStyle: {
      margin: "5px",
      width: "40px",
      borderRadius: "5px",
      fontSize: "21px",
      height: "46px",
      color: "#b2b2b2",
      textAlign: "center",
      border: "1px solid #b2b2b2",
      boxShadow: "0 0 5px #b2b2b2",
    },
  };

  const handleResendCode = () => {
    onResend && onResend();
  };

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      style={{ height: isMobile ? "calc(100vh - 50px)" : "auto" }}
    >
      <Grid container direction="column" justify="center">
        <Grid item>
          <Typography variant="h4" className={classes.inputHeadingText}>
            Input Code
          </Typography>
          <Typography variant="body1" component="p" className={classes.dividerText}>
            Type the code that we have sent to you.
          </Typography>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <ReactCodeInput
              id="verify-phone"
              type="text"
              fields={fieldsCount}
              onChange={value => handleInputCodeChange(value)}
              {...(isMobile ? mobileProps : webProps)}
            />
          </div>
        </Grid>
        <Grid item style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: "200px", margin: "20px 0px" }}
            disableRipple
            onClick={handleCodeSubmission}
          >
            SUBMIT
          </Button>
        </Grid>
        <Grid item style={{ textAlign: "center" }}>
          <Link
            onClick={handleResendCode}
            className={classes.forgotLink}
            style={{ cursor: "pointer", fontWeight: 600 }}
          >
            Resend Code Again
          </Link>
        </Grid>
      </Grid>
      {isMobile && (
        <Grid item style={{ textAlign: "center" }}>
          <Button
            color="secondary"
            size="large"
            style={{ width: "200px", margin: "20px 0px" }}
            disableRipple
          >
            Cancel
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default InputCode;
