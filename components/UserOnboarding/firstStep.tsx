import React, { FunctionComponent, useEffect } from "react";
import _ from "lodash";
import {
  TextField,
  Typography,
  FormControl,
  FormGroup,
  Button,
  Grid,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import Router from "next/router";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useStyles from "../../Styles/components/userOnboarding";
import { User } from "../../redux/actionTypes";
import moment from "moment";
import { saveUserDetails } from "../../redux/actions/user";
import { hideDialog } from "../../redux/actions/app";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { DatePicker } from "@material-ui/pickers";
import { isUserLoggedIn } from "../../utils";
import Alert from "@material-ui/lab/Alert";

interface Props {
  profile: User | null;
  token: string | null;
  saveUserDetails: typeof saveUserDetails;
  dialogInfo: any;
  hideDialog: typeof hideDialog;
  error: string | null;
}

const FirstStep: FunctionComponent<Props> = ({
  profile,
  token,
  saveUserDetails,
  dialogInfo,
  hideDialog,
  error,
}) => {
  const classes = useStyles();
  const [date_of_birth, setDateOfBirth] = React.useState(null);
  const [isProfileLoaded, setProfileLoaded] = React.useState(false);
  const [isLoggedInUser, setIsLoggedInUser] = React.useState(false);

  useEffect(() => {
    if (profile && !isProfileLoaded) {
      setProfileLoaded(true);
      updateProfileData();
    }
  }, [profile]);

  useEffect(() => {
    if (dialogInfo && dialogInfo.dialogCode === "account-update-first-step" && dialogInfo.open) {
      hideDialog("info", "account-update-first-step");
      Router.push("/user-onboarding?slug=step2", "/user-onboarding/step2");
    }
  }, [dialogInfo]);

  const updateProfileData = () => {
    const date: any =
      profile && moment(profile.date_of_birth!).isValid()
        ? moment(profile.date_of_birth).toDate()
        : null;
    const logIn = isUserLoggedIn(profile && profile);
    setDateOfBirth(date);
    setIsLoggedInUser(logIn);
  };

  const validationSchema = () => {
    return Yup.object().shape({
      first_name: Yup.string().required("* First Name is required"),
      last_name: Yup.string().required("* Last Name is required"),
      gender: Yup.string(),
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
    const initialValues = {
      first_name: isLoggedInUser ? profile && profile.first_name : "",
      last_name: isLoggedInUser ? profile && profile.last_name : "",
      gender: profile && profile.gender ? profile.gender : "",
    };
    return initialValues;
  };

  const handleSubmit = values => {
    const fullname = `${values.first_name} ${values.last_name}`;
    let payload = {
      fullname,
      display_name: fullname,
      first_name: values.first_name,
      last_name: values.last_name,
      date_of_birth: date_of_birth ? moment(date_of_birth!).format("YYYY-MM-DD") : "",
      gender: values.gender,
    };
    if (payload.date_of_birth === "") {
      delete payload.date_of_birth;
    }
    if (payload.gender === "") {
      delete payload.gender;
    }

    saveUserDetails({ ...payload }, token, "first", "first-step");
  };

  const handleGoToHome = () => {
    if (isLoggedInUser) {
      Router.push(`/`);
    } else {
      Router.push(`/sign-in`);
    }
  };

  const handleDateOfBirth = date => {
    setDateOfBirth(date);
  };

  const CustomDatePicker = props => {
    const { value, onClick } = props;
    return (
      <TextField
        variant="outlined"
        id="date-of-birth"
        className={classes.inputFields}
        label="Date of Birth"
        placeholder="Day/Month/year"
        onClick={onClick}
        style={{ width: "80%" }}
        value={value}
        InputProps={{
          classes: {
            root: classes.inputBorder,
          },
          endAdornment: (
            <InputAdornment position="end">
              <DateRangeIcon className={classes.dateRangeIcon} />
            </InputAdornment>
          ),
        }}
      />
    );
  };
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Formik
        initialValues={getInitialValues()}
        validate={validate(validationSchema)}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        render={({ errors, handleChange, handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl style={{ width: "100%", maxWidth: "320px" }}>
              <FormGroup aria-label="position">
                <Typography variant="h4" className={classes.headingText}>
                  Let’s start with your
                  <br /> First and Last Name
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.uploadHeadingSubText}
                  style={{ marginBottom: "15px" }}
                >
                  Your name is required so we could
                  <br /> identify you.
                </Typography>

                {error && (
                  <div style={{ margin: "10px 0px" }}>
                    <Alert severity="error">{error}</Alert>
                  </div>
                )}
                <TextField
                  variant="outlined"
                  label="First Name"
                  id="first_name"
                  className={classes.inputFields}
                  placeholder="The name people calls you"
                  onChange={handleChange}
                  value={values.first_name}
                  helperText={
                    errors.first_name && (
                      <span className={classes.errorText}>{errors.first_name}</span>
                    )
                  }
                  autoComplete="off"
                  InputProps={{
                    classes: {
                      root: classes.inputBorder,
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Last Name"
                  id="last_name"
                  className={classes.inputFields}
                  placeholder="Your family name"
                  value={values.last_name}
                  onChange={handleChange}
                  helperText={
                    errors.last_name && (
                      <span className={classes.errorText}>{errors.last_name}</span>
                    )
                  }
                  InputProps={{
                    classes: {
                      root: classes.inputBorder,
                    },
                  }}
                />

                <DatePicker
                  autoOk
                  variant="inline"
                  format="DD-MM-YYYY"
                  openTo="year"
                  views={["year", "month", "date"]}
                  value={date_of_birth}
                  onChange={handleDateOfBirth}
                  disableFuture
                  TextFieldComponent={CustomDatePicker}
                  inputVariant="outlined"
                  className={classes.inputFields}
                />

                <TextField
                  id="gender"
                  name="gender"
                  select
                  variant="outlined"
                  className={classes.inputFields}
                  value={values.gender || ""}
                  label="Gender"
                  onChange={handleChange}
                  style={{ width: "60%" }}
                  InputProps={{
                    classes: {
                      root: classes.inputBorder,
                    },
                  }}
                >
                  {/* <MenuItem disabled value="Gender">
                    Gender
                  </MenuItem> */}
                  <MenuItem value="m" className={classes.dropdownList}>
                    Male
                  </MenuItem>
                  <MenuItem value="f" className={classes.dropdownList}>
                    Female
                  </MenuItem>
                  <MenuItem value="o" className={classes.dropdownList}>
                    Other
                  </MenuItem>
                </TextField>
              </FormGroup>
              <Grid container justify="center">
                <FormGroup>
                  <FormControl>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      disableRipple
                      type="submit"
                      style={{ padding: "13px 50px", marginTop: "15px" }}
                    >
                      Next
                    </Button>
                  </FormControl>
                </FormGroup>
              </Grid>

              <Grid container justify="center">
                <Button
                  className={classes.cancelButton}
                  disableRipple
                  onClick={() => handleGoToHome()}
                >
                  Cancel
                </Button>
              </Grid>
            </FormControl>
          </Form>
        )}
      />
    </MuiPickersUtilsProvider>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    dialogInfo: appState.app.dialogInfo,
    token: appState.user.token,
    loading: appState.user.loading,
    profile: appState.user.profile,
    error: appState.user.error["update-details-first-step"] || null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FirstStep);
