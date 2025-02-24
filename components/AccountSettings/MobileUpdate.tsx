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
import CheckIcon from "@material-ui/icons/Check";
import { User } from "../../redux/actionTypes";
import { setMobileNumber, verifyInputCode, resendVerifyPhone } from "../../redux/actions/user";
import { hideDialog } from "../../redux/actions/app";
import useStyles from "../../Styles/components/accountSettings";
import SuccessModal from "../SuccessModal";
import { DefaultCountry } from "../../config";
import { getIsMobile } from "../../utils";
import VerifyPhone from "../AuthComponent/VerifyPhone";

interface Props {
  token: string | null;
  profile: User | null;
  setMobileNumber: typeof setMobileNumber;
  verifyInputCode: typeof verifyInputCode;
  resendVerifyPhone: typeof resendVerifyPhone;
  loading: boolean;
  isMobile?: boolean;
  dialogInfo: any;
  hideDialog: typeof hideDialog;
}

const MobileUpdate: FunctionComponent<Props> = ({ profile, dialogInfo, hideDialog }) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const [mobileNumberUpdation, setMobileNumberUpdation] = useState(false);

  const country = profile && profile.country ? profile.country : DefaultCountry;

  const profileCountryDialCode =
    profile && profile.country ? profile.country.dial_code! : country!.dial_code;

  const profileCountryFlag = profile && profile.country ? profile.country.flag! : country!.flag;

  const handleMobileNumberUpdate = () => {
    setMobileNumberUpdation(!mobileNumberUpdation);
  };

  const getProfileContactNumber = () => {
    const contactNumber = profile && profile.contact_number ? profile.contact_number : "";
    return contactNumber.replace(`+${profileCountryDialCode}`, "");
  };

  const handleModalClose = () => {
    setMobileNumberUpdation(false);
    hideDialog("info", "account-update-mobile-verified");
  };

  return (
    <form
      onSubmit={() => {
        return false;
      }}
    >
      <Typography variant="body1" className={classes.inputLabels}>
        {mobileNumberUpdation ? "Current Mobile" : "Mobile"}
      </Typography>
      <Grid container spacing={isMobile ? 1 : 2} direction="row">
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <IconButton aria-label="toggle password visibility" className={classes.flagAdornment}>
            <div
              style={{
                marginRight: isMobile ? "30px" : "36px",
                marginTop: isMobile ? "0px" : "-5px",
              }}
            >
              {/* <Emoji  symbol={`${country.flag}`} label={country.country} /> */}
              <span> {`${profileCountryFlag}`}</span>

              {profileCountryDialCode && (
                <span className={classes.adornment}>{`+${profileCountryDialCode}`}</span>
              )}
            </div>
          </IconButton>
        </Grid>
        <Grid item xs={6} sm={6} md={5} lg={5}>
          <TextField
            variant="outlined"
            id="contact_number_txt"
            className={classes.inputFields}
            placeholder={"000-000-000"}
            value={getProfileContactNumber()}
            disabled
            classes={{ root: classes.inputBorder }}
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
        <Grid item xs={3} sm={3} md={4} lg={4}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            disableRipple
            style={{ width: isMobile ? "82px" : "100px", marginTop: "11px" }}
            onClick={handleMobileNumberUpdate}
          >
            {mobileNumberUpdation ? "Cancel" : "Modify"}
          </Button>
        </Grid>
      </Grid>

      {mobileNumberUpdation ? (
        <div>
          <Typography variant="body1" className={classes.inputLabels}>
            New Mobile
          </Typography>
          <Grid container spacing={isMobile ? 1 : 2} direction="row">
            <VerifyPhone mode="update-phone" heading="" submitLabel="Update" />
          </Grid>
        </div>
      ) : null}

      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={
          dialogInfo &&
          dialogInfo.dialogCode === "account-update-mobile-verified" &&
          dialogInfo.open
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
            description=" Your Mobile Number has been verified!"
            buttonText="Next"
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
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MobileUpdate);
