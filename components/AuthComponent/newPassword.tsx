import React, { FunctionComponent, useEffect, useState } from "react";
import {
  TextField,
  Typography,
  FormGroup,
  Button,
  Grid,
  Link,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useStyles from "../../Styles/components/auth";
import { saveNewPassword, resetPasswordCodeVerificationSuccess } from "../../redux/actions/user";
import { useRouter } from "next/router";
import SuccessModal from "../SuccessModal";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import Alert from "@material-ui/lab/Alert";
import { hideDialog } from "../../redux/actions/app";

interface Props {
  saveNewPassword: typeof saveNewPassword;
  hideDialog: typeof hideDialog;
  resetPasswordCodeVerificationSuccess: typeof resetPasswordCodeVerificationSuccess;
  resetPasswordCodeVerified: string;
  error: string;
  dialogInfo: any;
}

const NewPassword: FunctionComponent<Props> = ({
  saveNewPassword,
  resetPasswordCodeVerified,
  resetPasswordCodeVerificationSuccess,
  dialogInfo,
  error,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [openSuccessModal, setSuccessModal] = useState(false);
  const [cancelConfirmation, setCancelConfirmation] = useState(false);

  useEffect(() => {
    if (dialogInfo && dialogInfo.dialogCode === "reset-password-success" && dialogInfo.open) {
      hideDialog("confirm", "reset-password-success");
      setSuccessModal(true);
    }
  }, [dialogInfo]);

  const validationSchema = () => {
    return Yup.object().shape({
      password: Yup.string()
        .required("* Password is required")
        .min(8, "* Password must have at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "* Password must have at least 1 letter, 1 digit, 1 special character"
        ),
      confirmPassword: Yup.string()
        .required("* Please Confirm your password")
        .oneOf([Yup.ref("password"), null], "* Confirm Password and New Password not matched"),
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
      password: "",
      confirmPassword: "",
    };
  };

  const handleSubmit = values => {
    if (1 === 1 || resetPasswordCodeVerified) {
      saveNewPassword({ password: values.password }, resetPasswordCodeVerified);
    } else {
      // show error code verified expired
    }
  };

  const continueChangePassword = () => {
    setCancelConfirmation(false);
  };

  const handleCancel = () => {
    setCancelConfirmation(true);
  };
  const handleGoToLogin = () => {
    // clear saved password reset token from redux
    resetPasswordCodeVerificationSuccess("");
    router.push("/sign-in");
  };

  const renderForm = () => {
    return (
      <React.Fragment>
        <Formik
          initialValues={getInitialValues()}
          validate={validate(validationSchema)}
          onSubmit={handleSubmit}
          render={({ errors, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup aria-label="position">
                <Typography variant="h4" className={classes.headingText}>
                  Reset Password
                </Typography>
                <Typography variant="body2" className={classes.newPasswordText}>
                  You can now enter your new password.
                </Typography>
                {error || !resetPasswordCodeVerified ? (
                  <div style={{ margin: "10px 0px" }}>
                    <Alert severity="error">
                      {!resetPasswordCodeVerified ? "Invalid Token" : error}
                    </Alert>
                  </div>
                ) : null}
                <TextField
                  variant="outlined"
                  label="Password"
                  id="password"
                  autoComplete="password"
                  className={classes.inputFields}
                  placeholder="Your secured password"
                  onChange={handleChange}
                  helperText={
                    errors.password && <span className={classes.errorText}>{errors.password}</span>
                  }
                  type="password"
                  InputProps={{
                    classes: {
                      root: classes.inputBorder,
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Confirm Password"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  className={classes.inputFields}
                  placeholder="Confirm your secured password"
                  onChange={handleChange}
                  helperText={
                    errors.confirmPassword && (
                      <span className={classes.errorText}>{errors.confirmPassword}</span>
                    )
                  }
                  type="password"
                  InputProps={{
                    classes: {
                      root: classes.inputBorder,
                    },
                  }}
                />
              </FormGroup>
              <Grid container justify="center">
                <FormGroup>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{ width: "200px", margin: "20px 0px" }}
                    disableRipple
                    type="submit"
                  >
                    CONFIRM
                  </Button>
                </FormGroup>
              </Grid>
              <Grid container justify="center">
                <Button className={classes.cancelButton} disableRipple onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
            </Form>
          )}
        />
        <Dialog
          aria-labelledby="cancel-password-change"
          aria-describedby="cancel-password-change"
          open={cancelConfirmation}
          //className={classes.countriesModal}
        >
          <DialogContent>
            <Typography variant="h5" className={classes.cancelPasswordText}>
              Are you sure you want to cancel
              <br /> the password change?
            </Typography>
            <Grid container justify="center" direction="column">
              <Button
                variant="contained"
                color="primary"
                size="medium"
                disableRipple
                onClick={continueChangePassword}
                style={{ margin: "30px 0px", textTransform: "capitalize" }}
              >
                Continue Password Change
              </Button>
              <Link href="/sign-in" className={classes.cancelPasswordChangeLink}>
                Yes. Cancel the password change
              </Link>
            </Grid>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  };

  const renderSuccess = () => {
    return (
      <SuccessModal
        title=" Success!"
        icon="success"
        description="Your Password has been reset!"
        buttonText=" Go To Login"
        handlerFunction={handleGoToLogin}
      />
    );
  };

  return openSuccessModal ? renderSuccess() : renderForm();
};

const mapStateToProps = (appState: AppState) => {
  return {
    dialogInfo: appState.app.dialogInfo,
    error: appState.user.error["reset-new-password"] || null,
    resetPasswordCodeVerified: appState.user.resetPasswordCodeVerified,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
