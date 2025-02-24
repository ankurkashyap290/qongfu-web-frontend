import React, { FunctionComponent, useEffect, useState } from "react";

import _ from "lodash";
import {
  TextField,
  Typography,
  FormControl,
  FormGroup,
  Button,
  Grid,
  Link,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useStyles from "../../Styles/components/auth";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import Alert from "@material-ui/lab/Alert";
import { resetPassword, resetPasswordCodeVerification } from "../../redux/actions/user";
import { hideDialog } from "../../redux/actions/app";
import InputCode from "./inputCode";
import { getIsMobile } from "../../utils";

interface Props {
  resetPassword: typeof resetPassword;
  hideDialog: typeof hideDialog;
  resetPasswordCodeVerification: typeof resetPasswordCodeVerification;
  dialogInfo: any;
  verifyResetPasswordError: string;
  resetPasswordError: string;
}

const ForgotEmail: FunctionComponent<Props> = ({
  resetPassword,
  resetPasswordCodeVerification,
  dialogInfo,
  hideDialog,
  verifyResetPasswordError,
  resetPasswordError,
}) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const [showVerifyInputForm, toggleVerifyInputModal] = useState(false);
  const [resendCodeSuccess, setResendCodeSuccess] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");

  // TODO RESET SUCCESS NEED TO SHOW AFTER API WORKED

  useEffect(() => {
    if (
      dialogInfo &&
      dialogInfo.dialogCode === "reset-password-verify-input-email" &&
      dialogInfo.open
    ) {
      hideDialog("confirm", "reset-password-verify-input-email");
      if (showVerifyInputForm) {
        setResendCodeSuccess(true);
        setTimeout(() => {
          setResendCodeSuccess(false);
        }, 2000);
      } else {
        toggleVerifyInputModal(true);
      }
    }
  }, [dialogInfo]);

  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .required("* Email is required")
        .email("* Enter a valid email"),
    });
  };

  const validate = getValidationSchema => {
    return values => {
      const validationSchema = getValidationSchema(values);
      try {
        validationSchema.validateSync(values, { abortEarly: false });
        return {};
      } catch (error) {
        return getErrorsFromValidationError(error);
      }
    };
  };

  const getErrorsFromValidationError = validationError => {
    const FIRST_ERROR = 0;
    return validationError.inner.reduce((errors, error) => {
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR],
      };
    }, {});
  };

  const getInitialValues = () => {
    return {
      email: "",
    };
  };

  const handleSubmit = values => {
    const email = values.email;
    setCurrentEmail(email);
    sendResetPassword(email);
  };

  const sendResetPassword = email => {
    resetPassword(
      {
        reset_type: "email",
        email: email,
      },
      "email",
      email
    );
  };

  const handleVerifyCode = inputCode => {
    resetPasswordCodeVerification({ reset_type: "email", reset_key: inputCode });
  };

  const handleResendVerifyCode = () => {
    sendResetPassword(currentEmail);
  };

  const renderAskEmail = () => {
    return (
      <Formik
        initialValues={getInitialValues()}
        validate={validate(validationSchema)}
        onSubmit={handleSubmit}
        render={({ errors, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl style={{ width: "100%" }}>
              <FormGroup aria-label="position">
                <Typography variant="h4" className={classes.headingText}>
                  Reset password
                </Typography>
                {resetPasswordError && (
                  <div style={{ margin: "10px 0px" }}>
                    <Alert severity="error">{resetPasswordError}</Alert>
                  </div>
                )}
                <TextField
                  variant="outlined"
                  label="Email"
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={classes.inputFields}
                  placeholder="Type your email here..."
                  onChange={handleChange}
                  helperText={
                    errors.email && <span className={classes.errorText}>{errors.email}</span>
                  }
                  InputProps={{
                    classes: {
                      root: classes.inputBorder,
                    },
                  }}
                />
              </FormGroup>
              <Grid container justify="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ width: "200px", margin: "20px 0px" }}
                  disableRipple
                  type="submit"
                >
                  SEND CODE
                </Button>
              </Grid>
              <Grid container justify="center">
                <Link href="/sign-in" className={classes.forgotLink} style={{ fontWeight: 600 }}>
                  Return to Login
                </Link>
              </Grid>
            </FormControl>
          </Form>
        )}
      />
    );
  };
  const renderVerifyInputForm = () => {
    return (
      <div>
        {verifyResetPasswordError && <Alert severity="error">{verifyResetPasswordError}</Alert>}
        {resendCodeSuccess && (
          <Alert severity="info">Verification code resent on given email</Alert>
        )}
        <InputCode
          isMobile={isMobile}
          onUpdate={handleVerifyCode}
          onResend={handleResendVerifyCode}
        />
      </div>
    );
  };
  return showVerifyInputForm ? renderVerifyInputForm() : renderAskEmail();
};

const mapStateToProps = (appState: AppState) => {
  return {
    dialogInfo: appState.app.dialogInfo,
    resetPasswordError: appState.user.error["forgot-reset-email"] || null,
    verifyResetPasswordError: appState.user.error["verify-reset-email"] || null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotEmail);
