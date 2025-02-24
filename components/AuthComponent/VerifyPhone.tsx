import React, { FunctionComponent, useState, useEffect } from "react";
import { getIsMobile } from "../../utils";
import {
  TextField,
  Typography,
  FormControl,
  FormGroup,
  Button,
  Grid,
  Link,
  InputAdornment,
  IconButton,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useStyles from "../../Styles/components/verifyPhone";
import CountryList from "../Countries";
import { DefaultCountry } from "../../config";
import {
  setMobileNumber,
  verifyInputCode,
  resendVerifyPhone,
  resetPassword,
  resetPasswordCodeVerification,
} from "../../redux/actions/user";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import { User } from "../../redux/actionTypes";
import InputCode from "./inputCode";
import { hideDialog } from "../../redux/actions/app";
import Alert from "@material-ui/lab/Alert";
import SuccessModal from "../SuccessModal";
import { useRouter } from "next/router";
import CheckIcon from "@material-ui/icons/Check";

// TYPE has two values "verify-phone" | "reset-password" | "update-phone"
interface Props {
  mode: string;
  heading: string;
  headingDetails?: string;
  submitLabel: string;
  setMobileNumber: typeof setMobileNumber;
  verifyInputCode: typeof verifyInputCode;
  resendVerifyPhone: typeof resendVerifyPhone;
  resetPassword: typeof resetPassword;
  resetPasswordCodeVerification: typeof resetPasswordCodeVerification;
  hideDialog: typeof hideDialog;
  profile: User | null;
  token: string | null;
  dialogInfo: any;
  loading: boolean;
  updateMobileError: string;
  verifyMobileError: string;
  resetPasswordError: string;
  verifyResetPasswordError: string;
}

const VerifyPhone: FunctionComponent<Props> = ({
  mode,
  heading,
  headingDetails = "",
  submitLabel,
  setMobileNumber,
  verifyInputCode,
  resendVerifyPhone,
  profile,
  token,
  dialogInfo,
  updateMobileError,
  verifyMobileError,
  resetPasswordError,
  verifyResetPasswordError,
  hideDialog,
  resetPassword,
  resetPasswordCodeVerification,
}) => {
  const isMobile = getIsMobile();
  const classes = useStyles();
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(DefaultCountry);
  const [openCountryModal, toggleCountryModal] = useState(false);
  const [showVerifyInputForm, toggleVerifyInputModal] = useState(false);
  const [resendCodeSuccess, setResendCodeSuccess] = useState(false);
  const [showVerifySuccessModal, toggleVerifySuccessModal] = useState(false);
  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
    if (dialogInfo && dialogInfo.dialogCode === "phone-verify-input-code" && dialogInfo.open) {
      hideDialog("confirm", "phone-verify-input-code");
      toggleVerifyInputModal(true);
    }

    if (
      dialogInfo &&
      dialogInfo.dialogCode === "reset-password-verify-input-sms" &&
      dialogInfo.open
    ) {
      hideDialog("confirm", "reset-password-verify-input-sms");
      if (showVerifyInputForm) {
        setResendCodeSuccess(true);
        setTimeout(() => {
          setResendCodeSuccess(false);
        }, 2000);
      } else {
        toggleVerifyInputModal(true);
      }
    }

    if (
      dialogInfo &&
      dialogInfo.dialogCode === "phone-verify-input-resend-success" &&
      dialogInfo.open
    ) {
      hideDialog("info", "phone-verify-input-resend-success");
      setResendCodeSuccess(true);
      setTimeout(() => {
        setResendCodeSuccess(false);
      }, 2000);
    }

    if (
      dialogInfo &&
      dialogInfo.dialogCode === "account-update-mobile-verified" &&
      dialogInfo.open
    ) {
      toggleVerifyInputModal(false);
      if (mode !== "update-phone") {
        hideDialog("info", "account-update-mobile-verified");
        toggleVerifySuccessModal(true);
      }
    }
  }, [dialogInfo]);

  const handleSelectCountryModal = () => {
    toggleCountryModal(true);
  };
  const handleCountryModalClose = () => {
    toggleCountryModal(false);
  };

  const handleSelectCountry = country => {
    setSelectedCountry(country);
    toggleCountryModal(false);
  };

  const getInitialValues = () => {
    return {
      contact_number: "",
    };
  };

  const validationSchema = () => {
    return Yup.object().shape({
      contact_number: Yup.string()
        .required("* Mobile Number is required")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "* Invalid Mobile Number!"
        ),
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

  const handleSubmit = values => {
    setContactNumber(values.contact_number);
    if (mode === "verify-phone" || mode === "update-phone") {
      setMobileNumber(
        {
          contact_number: `+${selectedCountry!.dial_code!}` + values.contact_number,
          first_name: profile ? profile.first_name : "",
          last_name: profile ? profile.last_name : "",
          country_id: selectedCountry.id,
        },
        token
      );
    } else if (mode === "reset-password") {
      sendResetPassword(values.contact_number);
    }
  };

  const sendResetPassword = contact_number => {
    resetPassword(
      {
        reset_type: "sms",
        contact_number: `+${selectedCountry!.dial_code!}` + contact_number,
      },
      "sms",
      `+${selectedCountry!.dial_code!}` + contact_number
    );
  };

  const handleVerifyCode = inputCode => {
    if (mode === "verify-phone" || mode === "update-phone") {
      verifyInputCode({ code: inputCode }, token);
    } else if (mode === "reset-password") {
      resetPasswordCodeVerification({ reset_type: "sms", reset_key: inputCode });
    }
  };

  const handleResendVerifyCode = () => {
    if (mode === "verify-phone" || mode === "update-phone") {
      resendVerifyPhone(token);
    } else if (mode === "reset-password") {
      sendResetPassword(contactNumber);
    }
  };
  const handleVerifySuccess = () => {
    if (mode === "verify-phone") {
      router.replace("/user-onboarding", "/user-onboarding");
    } else if (mode === "update-phone") {
    } else if (mode === "reset-password") {
      // it will redirect from saga next come here
    }
  };

  const inlineFormFields = (errors, handleChange) => {
    return (
      <Grid container spacing={isMobile ? 1 : 2} direction="row" alignItems="center">
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <IconButton
            aria-label="Select Country"
            onClick={handleSelectCountryModal}
            edge="end"
            disableRipple
            className={classes.inlineCountryIconButton}
          >
            <div>
              <span style={{ verticalAlign: "middle", color: "#000" }}>{selectedCountry.flag}</span>
              {selectedCountry && (
                <span className={classes.adornment}>{`+${selectedCountry.dial_code!}`}</span>
              )}
            </div>
          </IconButton>
        </Grid>
        <Grid item xs={6} sm={6} md={5} lg={5}>
          <TextField
            variant="outlined"
            label="Mobile Number"
            id="contact_number"
            autoComplete="contact_number"
            className={classes.inputFields}
            style={{ marginBottom: "0px" }}
            placeholder="000-000-000"
            onChange={handleChange}
            helperText={
              errors.contact_number && (
                <span className={classes.errorText}>{errors.contact_number}</span>
              )
            }
            InputProps={{
              inputProps: { maxLength: 10 },
              classes: {
                root: classes.inputBorder,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <CheckIcon style={{ color: "#5ab949" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={3} sm={3} md={4} lg={4}>
          <Button
            variant="contained"
            color="primary"
            size={mode === "update-phone" ? "small" : "large"}
            disableRipple
            type="submit"
            className={classes.submitBtn}
            style={{ width: isMobile ? "82px" : "100px" }}
          >
            {submitLabel}
          </Button>
        </Grid>
      </Grid>
    );
  };

  const normalFormFields = (errors, handleChange) => {
    return (
      <FormControl style={{ width: "100%" }}>
        <FormGroup aria-label="position">
          <TextField
            variant="outlined"
            label="Mobile Number"
            id="contact_number"
            autoComplete="contact_number"
            className={classes.inputFields}
            placeholder="000-000-000"
            onChange={handleChange}
            helperText={
              errors.contact_number && (
                <span className={classes.errorText}>{errors.contact_number}</span>
              )
            }
            InputProps={{
              inputProps: { maxLength: 10 },
              classes: {
                root: classes.inputBorder,
              },
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="Select Country"
                    onClick={handleSelectCountryModal}
                    edge="end"
                    disableRipple
                    className={classes.countryIconButton}
                  >
                    <div style={{ borderRight: "1px solid #919191" }}>
                      <span style={{ verticalAlign: "middle", color: "#000" }}>
                        {selectedCountry.flag}
                      </span>
                      {selectedCountry && (
                        <span
                          className={classes.adornment}
                        >{`+${selectedCountry.dial_code!}`}</span>
                      )}
                    </div>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormGroup>
        <Grid container justify="center">
          <FormControl>
            <Button
              variant="contained"
              color="primary"
              size={mode === "update-phone" ? "small" : "large"}
              disableRipple
              type="submit"
              className={classes.submitBtn}
            >
              {submitLabel}
            </Button>
          </FormControl>
        </Grid>

        {mode !== "update-phone" && (
          <Grid container justify="center">
            <Link href="/sign-in" className={classes.returnToLogin}>
              Return to Login
            </Link>
          </Grid>
        )}
      </FormControl>
    );
  };

  const renderAskMobileForm = () => {
    return (
      <React.Fragment>
        <div style={{ width: "100%", padding: mode === "update-phone" ? "24px 0px" : "24px" }}>
          {heading && (
            <Typography variant="h4" className={classes.headingText}>
              {heading}
            </Typography>
          )}
          {headingDetails && (
            <Typography
              variant="body2"
              className={classes.dividerText}
              style={{ marginBottom: "30px" }}
            >
              {headingDetails}
            </Typography>
          )}
          {(mode === "verify-phone" || mode === "update-phone") && updateMobileError && (
            <div style={{ margin: "10px 0px" }}>
              <Alert severity="error">{updateMobileError}</Alert>
            </div>
          )}
          {mode === "reset-password" && resetPasswordError && (
            <div style={{ margin: "10px 0px" }}>
              <Alert severity="error">{resetPasswordError}</Alert>
            </div>
          )}
          <Formik
            initialValues={getInitialValues()}
            validate={validate(validationSchema)}
            onSubmit={handleSubmit}
            render={({ errors, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {mode === "update-phone"
                  ? inlineFormFields(errors, handleChange)
                  : normalFormFields(errors, handleChange)}
              </Form>
            )}
          />
        </div>
        <Dialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openCountryModal}
          className={classes.countriesModal}
          onClose={handleCountryModalClose}
        >
          <DialogContent style={{ padding: "24px" }}>
            <CountryList
              country={selectedCountry}
              handleSelectCountry={handleSelectCountry}
              handleModalClose={handleCountryModalClose}
            />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  };
  const renderVerifyInputForm = () => {
    const formRoot = (
      <div>
        {verifyMobileError && <Alert severity="error">{verifyMobileError}</Alert>}
        {verifyResetPasswordError && <Alert severity="error">{verifyResetPasswordError}</Alert>}
        {resendCodeSuccess && (
          <Alert severity="info">Verification code resent on given mobile number</Alert>
        )}
        <InputCode
          isMobile={mode !== "update-phone" ? isMobile : false}
          onUpdate={handleVerifyCode}
          onResend={handleResendVerifyCode}
        />
      </div>
    );

    if (mode === "update-phone") {
      return (
        <Dialog
          aria-labelledby="Input Code"
          aria-describedby="Input Code"
          open={true}
          className={classes.confirmationModal}
          onClose={() => {
            toggleVerifyInputModal(false);
          }}
        >
          <DialogContent>{formRoot}</DialogContent>
        </Dialog>
      );
    } else {
      return formRoot;
    }
  };

  const renderVerifySuccess = () => {
    const formRoot = (
      <SuccessModal
        title="Success!"
        icon="success"
        description=" Your Mobile Number has been verified!"
        buttonText="Next"
        handlerFunction={handleVerifySuccess}
      />
    );
    if (mode === "update-phone") {
      return (
        <Dialog
          aria-labelledby="Input Code"
          aria-describedby="Input Code"
          open={true}
          className={classes.confirmationModal}
          onClose={() => {
            toggleVerifyInputModal(false);
          }}
        >
          <DialogContent>{formRoot}</DialogContent>
        </Dialog>
      );
    } else {
      return formRoot;
    }
  };

  return showVerifyInputForm
    ? renderVerifyInputForm()
    : showVerifySuccessModal
    ? renderVerifySuccess()
    : renderAskMobileForm();
};

const mapStateToProps = (appState: AppState) => {
  return {
    profile: appState.user.profile,
    loading: appState.user.loading,
    token: appState.user.token,
    dialogInfo: appState.app.dialogInfo,
    updateMobileError: appState.user.error["update-mobile"] || null,
    verifyMobileError: appState.user.error["verify-mobile"] || null,
    resetPasswordError: appState.user.error["forgot-reset-sms"] || null,
    verifyResetPasswordError: appState.user.error["verify-reset-sms"] || null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhone);
