import React, { FunctionComponent, useState } from "react";
import _ from "lodash";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  FormControl,
  FormGroup,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  Link,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useStyles from "../../Styles/components/auth";
import Visibility from "@material-ui/icons/Visibility";
import { userRegister } from "../../redux/actions/user";
import SocialMedia from "../SocialMedia";
import { getIsMobile } from "../../utils";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import Alert from "@material-ui/lab/Alert";

interface Props {
  userRegister: typeof userRegister;
  error: string | null;
}

const SignUp: FunctionComponent<Props> = ({ userRegister, error }) => {
  const [agree, setAgree] = useState(false);
  const [passwordVisibility, showPassword] = useState(false);
  const [confirmPasswordVisibility, showConfirmPassword] = useState(false);

  const classes = useStyles();
  const isMobile = getIsMobile();
  const handleCheckbox = () => {
    setAgree(!agree);
  };
  const handleClickShowPassword = () => {
    showPassword(!passwordVisibility);
  };
  const handleClickShowConfirmPassword = () => {
    showConfirmPassword(!confirmPasswordVisibility);
  };
  const handleTermsAndConditions = evt => {
    evt.stopPropagation();
  };

  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .required("* Email is required")
        .email("* Enter a valid email"),
      password: Yup.string()
        .required("* Password is required")
        .min(8, "* Password must have at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "* Password must have at least 1 uppercase letter, 1 digit, 1 special character"
        ),
      confirmPassword: Yup.string()
        .required("* Please Confirm your password")
        .oneOf([Yup.ref("password"), null], "* Passwords must match"),
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
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = values => {
    userRegister({
      email: values.email,
      password: values.password,
      fullname: "##FIRST## ##LAST##",
    });
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validate={validate(validationSchema)}
        onSubmit={handleSubmit}
        render={({ errors, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl style={{ width: "100%", padding: isMobile ? "20px" : "" }}>
              <FormGroup aria-label="position">
                {isMobile && (
                  <img
                    src="/assets/img/mobile-header-logo.svg"
                    width="152"
                    height="152"
                    style={{ margin: "0 auto" }}
                  />
                )}
                <Typography variant="h4" className={classes.signUpAndSignInHeading}>
                  Join Qongfu today
                </Typography>
                {error && (
                  <div style={{ margin: "10px 0px" }}>
                    <Alert severity="error">{error}</Alert>
                  </div>
                )}
                <TextField
                  variant="outlined"
                  //label="EMAIL"
                  id="email"
                  className={classes.inputFields}
                  placeholder="EMAIL"
                  helperText={
                    errors.email && <span className={classes.errorText}>{errors.email}</span>
                  }
                  onChange={handleChange}
                  InputProps={{
                    classes: {
                      root: classes.inputBorder,
                    },
                  }}
                />

                <TextField
                  variant="outlined"
                  //label=""
                  id="password"
                  className={classes.inputFields}
                  placeholder="PASSWORD"
                  onChange={handleChange}
                  helperText={
                    errors.password && <span className={classes.errorText}>{errors.password}</span>
                  }
                  type={passwordVisibility ? "text" : "password"}
                  InputProps={{
                    classes: {
                      root: classes.inputBorder,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          <Visibility
                            className={
                              passwordVisibility ? classes.showPassword : classes.hidePassword
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  variant="outlined"
                  //  label="CONFIRM PASSWORD"
                  id="confirmPassword"
                  className={classes.inputFields}
                  placeholder="CONFIRM PASSWORD"
                  onChange={handleChange}
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
                <FormControlLabel
                  value="start"
                  control={<Checkbox checked={agree} onChange={handleCheckbox} color="primary" />}
                  label={
                    <Typography variant="body2" className={classes.rememberMe}>
                      I hereby agree with the{" "}
                      <Link
                        href="#"
                        onClick={evt => handleTermsAndConditions(evt)}
                        className={classes.authLink}
                      >
                        Terms & Conditions
                      </Link>
                      , and the{" "}
                      <Link
                        href="#"
                        onClick={evt => handleTermsAndConditions(evt)}
                        className={classes.authLink}
                      >
                        Privacy Policy
                      </Link>{" "}
                      as defined by Qongfu.
                    </Typography>
                  }
                  labelPlacement="end"
                  className={classes.termsAndConditions}
                />
              </FormGroup>
              <Grid container justify="center">
                <FormGroup>
                  <FormControl>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{ width: "200px", margin: "20px 0px" }}
                      disableRipple
                      disabled={!agree}
                      type="submit"
                    >
                      SIGN UP NOW
                    </Button>
                  </FormControl>
                </FormGroup>
              </Grid>
            </FormControl>
          </Form>
        )}
      />
      <SocialMedia title="or sign-up with" />
      {isMobile ? (
        <Grid container justify="center">
          <Typography variant="body2" className={classes.rememberMe} style={{ marginTop: "2px" }}>
            Already have an account?
          </Typography>
          &nbsp;
          <Link
            // key={`${item.linkName}-${index}`}
            href="/sign-in"
            className={classes.forgotLink}
          >
            Sign in.
          </Link>
        </Grid>
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    token: appState.user.token,
    mobileNumberVerified: appState.user.mobileNumberVerified,
    verifiedInputCode: appState.user.verifiedInputCode,
    loading: appState.user.loading,
    profile: appState.user.profile,
    dialogInfo: appState.app.dialogInfo,
    error: appState.user.error["sign-up"] || null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
