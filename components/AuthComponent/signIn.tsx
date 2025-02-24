import React from "react";
import { NextPage } from "next";
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
import { userLogin } from "../../redux/actions/user";
import SocialMedia from "../SocialMedia";
import { getIsMobile } from "../../utils";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import Alert from "@material-ui/lab/Alert";

interface Props {
  userLogin: typeof userLogin;
  error: string | null;
  dialogInfo: any;
}

const SignIn: NextPage<Props> = ({ userLogin, error }) => {
  const [agree, setAgree] = React.useState(false);
  const [passwordVisibility, showPassword] = React.useState(false);
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  const classes = useStyles();
  const isMobile = getIsMobile();
  // const handleEmail = (evt: any) => {
  //   setEmail(evt.target.value);
  // };
  // const handlePassword = (evt: any) => {
  //   setPassword(evt.target.value);
  // };

  const handleCheckbox = () => {
    setAgree(!agree);
  };
  const handleClickShowPassword = () => {
    showPassword(!passwordVisibility);
  };

  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .required("* Email is required")
        .email("* Enter a valid email"),
      password: Yup.string().required("* Password is required"),
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
  };

  const handleSubmit = values => {
    userLogin(
      {
        email: values.email,
        password: values.password,
      },
      agree
    );
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
                  Login to Qongfu
                </Typography>
                {error && (
                  <div style={{ margin: "10px 0px" }}>
                    <Alert severity="error">{error}</Alert>
                  </div>
                )}
                <TextField
                  variant="outlined"
                  //label="Email"
                  id="email"
                  className={classes.inputFields}
                  placeholder="EMAIL"
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
                <TextField
                  variant="outlined"
                  //label="Password"
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

                <FormControlLabel
                  value="start"
                  control={<Checkbox checked={agree} onChange={handleCheckbox} color="primary" />}
                  label={
                    <div>
                      <Typography variant="body2" className={classes.rememberMe}>
                        Remember me
                      </Typography>
                    </div>
                  }
                  labelPlacement="end"
                  className={classes.checkbox}
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
                      type="submit"
                    >
                      SIGN IN
                    </Button>
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid container justify="center">
                <Link
                  // key={`${item.linkName}-${index}`}
                  href="/forgot-password-email"
                  className={classes.forgotLink}
                >
                  Forgot Password?
                </Link>
              </Grid>
            </FormControl>
          </Form>
        )}
      />
      <SocialMedia title="or sign-in with" />
      {isMobile ? (
        <Grid container justify="center">
          <Typography variant="body2" className={classes.rememberMe} style={{ marginTop: "2px" }}>
            New to Qongfu?
          </Typography>
          &nbsp;
          <Link
            // key={`${item.linkName}-${index}`}
            href="/sign-up"
            className={classes.forgotLink}
          >
            Sign up.
          </Link>
        </Grid>
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    dialogInfo: appState.app.dialogInfo,
    error: appState.user.error["sign-in"] || null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
