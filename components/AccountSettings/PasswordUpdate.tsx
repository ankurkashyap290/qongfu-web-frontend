import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import {
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Button,
  Dialog,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import { User } from "../../redux/actionTypes";
import { userPasswordChange } from "../../redux/actions/user";
import { hideDialog } from "../../redux/actions/app";
import useStyles from "../../Styles/components/accountSettings";
import SuccessModal from "../SuccessModal";
import { getIsMobile } from "../../utils";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Alert from "@material-ui/lab/Alert";

interface Props {
  token: string | null;
  profile: User | null;
  userPasswordChange: typeof userPasswordChange;
  isMobile?: boolean;
  dialogInfo: any;
  hideDialog: typeof hideDialog;
  error: string | null;
}

const PasswordUpdate: FunctionComponent<Props> = ({
  token,
  userPasswordChange,
  dialogInfo,
  hideDialog,
  error,
}) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const [oldPasswordVisibility, showOldPassword] = useState(false);
  const [newPasswordVisibility, showNewPassword] = useState(false);
  const [confirmPasswordVisibility, showConfirmPassword] = useState(false);
  const [passwordUpdateMode, setPasswordUpdateMode] = useState(false);

  const validationSchema = () => {
    return Yup.object().shape({
      oldPassword: Yup.string().required("*Current Password is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "* Password must have at least 1 uppercase letter, 1 digit, 1 special character"
        )
        .min(8, "* Password must have at least 8 characters")
        .required("* New Password is required"),
      confirmPassword: Yup.string()
        .required("* Confirm password is required")
        .oneOf([Yup.ref("password"), null], "* Confirm Password not matched"),
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

  const initialValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    userPasswordChange(
      {
        old_password: values.oldPassword,
        password: values.password,
      },
      token,
      "password"
    );
    resetForm({});
  };

  const handleClickShowOldPassword = () => {
    showOldPassword(!oldPasswordVisibility);
  };
  const handleClickShowNewPassword = () => {
    showNewPassword(!newPasswordVisibility);
  };
  const handleClickShowConfirmPassword = () => {
    showConfirmPassword(!confirmPasswordVisibility);
  };

  const handlePasswordUpdate = () => {
    setPasswordUpdateMode(!passwordUpdateMode);
    showOldPassword(false);
  };

  const handleModalClose = () => {
    setPasswordUpdateMode(false);
    showNewPassword(false);
    showConfirmPassword(false);
    showOldPassword(false);
    hideDialog("info", "account-update-password");
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validate={validate(validationSchema)}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        render={({ errors, handleChange, handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            {error && (
              <div style={{ margin: "10px 0px" }}>
                <Alert severity="error">{error}</Alert>
              </div>
            )}
            <Typography variant="body1" className={classes.inputLabels}>
              {passwordUpdateMode ? "Old Password" : "Password"}
            </Typography>
            <Grid container spacing={isMobile ? 1 : 2} direction="row">
              <Grid item xs={9} sm={9} md={8} lg={8} xl={8}>
                <TextField
                  variant="outlined"
                  id="oldPassword"
                  className={classes.inputFields}
                  placeholder="************"
                  disabled={!passwordUpdateMode}
                  type={oldPasswordVisibility ? "text" : "password"}
                  onChange={handleChange}
                  value={passwordUpdateMode ? values.oldPassword : ""}
                  helperText={
                    errors.oldPassword && (
                      <span className={classes.errorText}>
                        {passwordUpdateMode ? errors.oldPassword : ""}
                      </span>
                    )
                  }
                  InputProps={{
                    classes: {
                      root: classes.inputBorder,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowOldPassword}
                          aria-label="toggle password visibility"
                          edge="end"
                          disabled={!passwordUpdateMode}
                        >
                          <Visibility
                            className={
                              oldPasswordVisibility ? classes.showPassword : classes.hidePassword
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={3} sm={3} md={4} lg={4} xl={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={handlePasswordUpdate}
                  style={{ width: isMobile ? "82px" : "100px", marginTop: "13px" }}
                  disableRipple
                >
                  {passwordUpdateMode ? "Cancel" : "Modify"}
                </Button>
              </Grid>
            </Grid>
            {passwordUpdateMode ? (
              <div>
                <Typography variant="body1" className={classes.inputLabels}>
                  New Password
                </Typography>
                <Grid container spacing={isMobile ? 1 : 2} direction="row">
                  <Grid item xs={9} sm={9} md={8} lg={8} xl={8}>
                    <TextField
                      variant="outlined"
                      id="password"
                      className={classes.inputFields}
                      placeholder="************"
                      onChange={handleChange}
                      value={values.password}
                      helperText={
                        errors.password && (
                          <span className={classes.errorText}>{errors.password}</span>
                        )
                      }
                      type={newPasswordVisibility ? "text" : "password"}
                      InputProps={{
                        classes: {
                          root: classes.inputBorder,
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowNewPassword}
                              edge="end"
                            >
                              <Visibility
                                className={
                                  newPasswordVisibility
                                    ? classes.showPassword
                                    : classes.hidePassword
                                }
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={isMobile ? 1 : 2} direction="row">
                  <Grid item xs={9} sm={9} md={8} lg={8} xl={8}>
                    <Typography variant="body1" className={classes.inputLabels}>
                      Confirm New Password
                    </Typography>
                    <TextField
                      variant="outlined"
                      id="confirmPassword"
                      className={classes.inputFields}
                      placeholder="************"
                      onChange={handleChange}
                      value={values.confirmPassword}
                      helperText={
                        errors.confirmPassword && (
                          <span className={classes.errorText}>{errors.confirmPassword}</span>
                        )
                      }
                      type={confirmPasswordVisibility ? "text" : "password"}
                      InputProps={{
                        classes: {
                          root: classes.inputBorder,
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              edge="end"
                            >
                              <Visibility
                                className={
                                  confirmPasswordVisibility
                                    ? classes.showPassword
                                    : classes.hidePassword
                                }
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={3} sm={3} md={4} lg={4} xl={4}>
                    {" "}
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      disableRipple
                      type="submit"
                      style={{ width: isMobile ? "82px" : "100px", marginTop: "53px" }}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </div>
            ) : null}
          </Form>
        )}
      />
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={
          dialogInfo && dialogInfo.dialogCode === "account-update-password" && dialogInfo.open
            ? true
            : false
        }
        className={classes.confirmationModal}
        onClose={handleModalClose}
        maxWidth="xl"
      >
        <DialogContent>
          <SuccessModal
            title="Success!"
            icon="success"
            description="Your password has been updated."
            buttonText="Done"
            handlerFunction={handleModalClose}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    token: appState.user.token,
    profile: appState.user.profile,
    dialogInfo: appState.app.dialogInfo,
    error: appState.user.error["update-password"],
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PasswordUpdate);
