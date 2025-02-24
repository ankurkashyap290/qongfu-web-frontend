import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import LoadingOverlay from "react-loading-overlay";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../../Styles/components/lifestylesAndQongfus";
import {
  Grid,
  Link,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { addMissingEntity } from "../../redux/actions/user";
import { hideDialog } from "../../redux/actions/app";
import { User, MissingEntity } from "../../redux/actionTypes";
import SuccessModal from "../SuccessModal";

interface Props {
  addMissingEntity: typeof addMissingEntity;
  profile: User | null;
  loading: boolean;
  hideDialog: typeof hideDialog;
  dialogInfo: any;
  onSubmit: Function;
}

const AddNewQongfu: FunctionComponent<Props> = ({
  addMissingEntity,
  profile,
  loading,
  dialogInfo,
  hideDialog,
  onSubmit,
}) => {
  const classes = useStyles();
  const validationSchema = () => {
    return Yup.object().shape({
      content: Yup.string().required("* Qongfu Name is required"),
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
    content: "",
  };

  const handleSubmit = values => {
    let payload = {
      type: "Qongfu",
      content: values.content,
      flags: ["Suggestion"],
    } as MissingEntity;

    if (profile && profile.id) {
      payload.user_id = profile && profile.id;
    }
    addMissingEntity({ ...payload });
  };

  const handleModalClose = () => {
    onSubmit();
    hideDialog("info", "saved-missing-entity");
  };

  return (
    <LoadingOverlay
      active={loading}
      spinner
      text="Please wait..."
      styles={{
        content: base => ({
          ...base,
        }),
        overlay: base => ({
          ...base,
          zIndex: 9999,
          color: "#ddd",
          backgroundColor: "rgba(255,255,255,.1)",
        }),
      }}
    >
      <React.Fragment>
        <div className={classes.modalClose}>
          <CloseIcon className={classes.closeIcon} onClick={() => onSubmit()} />
        </div>
        <Formik
          initialValues={initialValues}
          validate={validate(validationSchema)}
          onSubmit={handleSubmit}
          render={({ errors, handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <div className={classes.addNewModalContent}>
                <Typography variant="h5" className={classes.modalHeading}>
                  Welcome to the Qongfu Community Database!
                </Typography>

                <Typography variant="body1" className={classes.modalDesc}>
                  If you weren’t able to find your Qongfu practice you’ve come to the right place!
                </Typography>
                <TextField
                  id="content"
                  className={classes.inputFields}
                  name="content"
                  margin="normal"
                  onChange={handleChange}
                  value={values.content || ""}
                  placeholder="Type here..."
                  variant="outlined"
                  helperText={
                    errors.content && <span className={classes.errorText}>{errors.content}</span>
                  }
                  InputProps={{
                    classes: {
                      root: classes.inputBorder,
                    },
                  }}
                />
                <Grid container justify="flex-start">
                  <InfoIcon />
                  <Typography variant="body1">Help:</Typography>
                </Grid>
                <Grid container justify="flex-start" className={classes.linkSection}>
                  <Link
                    // key={`${item.linkName}-${index}`}
                    href="/#"
                    // className={classes.forgotLink}
                  >
                    What’s a Qongfu?
                  </Link>
                </Grid>
                <Grid container justify="flex-start" className={classes.linkSection}>
                  <Link
                    // key={`${item.linkName}-${index}`}
                    href="/#"
                    // className={classes.forgotLink}
                  >
                    What qualifies for a Qongfu?
                  </Link>
                </Grid>
                <Typography variant="body1" className={classes.modalLowerDesc}>
                  The more information you share the easier it will be for our team to locate the
                  place and have them join the Qongfu Community.
                </Typography>
              </div>
              <Grid container justify="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disableRipple
                  style={{ width: "300px", marginBottom: "20px" }}
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Form>
          )}
        />
        <Dialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={
            dialogInfo && dialogInfo.dialogCode === "saved-missing-entity" && dialogInfo.open
              ? true
              : false
          }
          className={classes.qongfuModal}
          onClose={handleModalClose}
        >
          <DialogContent>
            <SuccessModal
              title="New Qongfu Submitted!"
              handlerFunction={handleModalClose}
              description="Our support team will review your request and process it as soon as possible. You will receive a notification once the process has been completed."
              buttonText="Done"
            />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </LoadingOverlay>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    token: appState.user.token,
    loading: appState.user.loading,
    profile: appState.user.profile,
    dialogInfo: appState.app.dialogInfo,
    qongfus: appState.app.qongfus,
    lifestyles: appState.app.lifestyles,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddNewQongfu);
