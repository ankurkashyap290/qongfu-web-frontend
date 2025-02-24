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
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { User } from "../../redux/actionTypes";
import { saveUserDetails } from "../../redux/actions/user";
import { hideDialog } from "../../redux/actions/app";
import useStyles from "../../Styles/components/accountSettings";
import SuccessModal from "../SuccessModal";
import { getIsMobile } from "../../utils";
import Alert from "@material-ui/lab/Alert";

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

interface Props {
  token: string | null;
  profile: User | null;
  saveUserDetails: typeof saveUserDetails;
  loading: boolean;
  dialogInfo: any;
  hideDialog: typeof hideDialog;
  error: string | null;
}

const EmailUpdate: FunctionComponent<Props> = ({
  token,
  profile,
  saveUserDetails,
  dialogInfo,
  hideDialog,
  error,
}) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const [emailUpdation, setEmailUpdation] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailUpdate = () => {
    setEmailError("");
    setEmailUpdation(!emailUpdation);
  };
  const handleUpdateNewEmail = () => {
    if (email === "") {
      setEmailError("* Email is required");
    } else {
      if (emailError === "") {
        saveUserDetails(
          {
            //@ts-ignore
            first_name: profile.first_name,
            //@ts-ignore
            last_name: profile.last_name,
            email,
          },
          token,
          "",
          "email"
        );
      }
    }
  };

  const handleEmailChange = evt => {
    if (evt.target.value.match(emailRegex)) {
      setEmailError("");
      setEmail(evt.target.value);
    } else {
      setEmailError("* Invalid Email Format");
      setEmail(evt.target.value);
    }
  };
  const handleModalClose = () => {
    setEmailUpdation(false);
    setEmailError("");
    setEmail("");
    hideDialog("info", "account-update-email");
  };

  return (
    <form
      onSubmit={() => {
        return false;
      }}
    >
      <Typography variant="body1" className={classes.inputLabels}>
        Email
      </Typography>
      <Grid container spacing={isMobile ? 1 : 2} direction="row">
        <Grid item xs={9} sm={9} md={8} lg={8} xl={8}>
          <TextField
            variant="outlined"
            id="email_txt"
            disabled
            className={classes.inputFields}
            value={profile ? profile.email : ""}
            placeholder="email address"
            InputProps={{
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
        <Grid item xs={3} sm={3} md={4} lg={4} xl={4}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            disableRipple
            style={{ width: isMobile ? "82px" : "100px", marginTop: "13px" }}
            onClick={handleEmailUpdate}
          >
            {emailUpdation ? "Cancel" : "Modify"}
          </Button>
        </Grid>
      </Grid>
      {emailUpdation ? (
        <Grid container spacing={isMobile ? 1 : 2} direction="row">
          {error && (
            <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          <Grid item xs={9} sm={9} md={8} lg={8} xl={8}>
            <Typography variant="body1" className={classes.inputLabels}>
              Add a new Email
            </Typography>
            <TextField
              variant="outlined"
              id="email"
              required
              className={classes.inputFields}
              placeholder="email address"
              onChange={handleEmailChange}
              value={email}
              helperText={emailError && <span className={classes.errorText}>{emailError}</span>}
              InputProps={{
                classes: {
                  root: classes.inputBorder,
                },
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
              style={{ width: isMobile ? "82px" : "100px", marginTop: "53px" }}
              onClick={handleUpdateNewEmail}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      ) : null}
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={
          dialogInfo && dialogInfo.dialogCode === "account-update-email" && dialogInfo.open
            ? true
            : false
        }
        className={classes.confirmationModal}
        onClose={handleModalClose}
        maxWidth="xl"
      >
        <DialogContent>
          <SuccessModal
            title="Confirmation email sent!"
            description=" Please check your email and click the confirmation link that we have sent."
            buttonText="Okay"
            handlerFunction={handleModalClose}
          />
        </DialogContent>
      </Dialog>
    </form>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    token: appState.user.token,
    loading: appState.user.loading,
    profile: appState.user.profile,
    dialogInfo: appState.app.dialogInfo,
    error: appState.user.error["update-details-email"] || null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmailUpdate);
