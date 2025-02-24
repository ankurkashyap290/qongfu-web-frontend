import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import { Button, Grid, Typography, Dialog, DialogContent } from "@material-ui/core";
import TextInput from "../TextInput/textInput";
import useStyles from "../../Styles/components/footer";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { addMissingEntity } from "../../redux/actions/user";
import { User, MissingEntity } from "../../redux/actionTypes";
import { hideDialog } from "../../redux/actions/app";
import SuccessModal from "../SuccessModal";
import LoadingOverlay from "react-loading-overlay";
import { ToastContainer } from "react-toastify";

interface Props {
  dialogInfo?: any;
  addMissingEntity: typeof addMissingEntity;
  profile?: User | null;
  hideDialog: typeof hideDialog;
  loading: boolean;
}
const FeedbackForm: FunctionComponent<Props> = ({
  addMissingEntity,
  profile,
  dialogInfo,
  hideDialog,
  loading,
}) => {
  const classes = useStyles();
  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string().required("* Email is required"),
      content: Yup.string().required("* Content is required"),
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
    email: profile && profile.email ? profile.email : "",
    content: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    let payload = {
      type: "Feedback",
      content: values.content,
      flags: ["Feedback"],
      email: values.email,
    } as MissingEntity;

    if (profile && profile.id) {
      payload.user_id = profile && profile.id;
    }
    addMissingEntity({ ...payload });
    resetForm({});
  };

  const handleModalClose = () => {
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
        <Formik
          initialValues={initialValues}
          validate={validate(validationSchema)}
          onSubmit={handleSubmit}
          render={({ errors, handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Typography
                variant="h5"
                color="textSecondary"
                paragraph
                className={classes.footerHeading}
              >
                Share your feedback
              </Typography>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <TextInput
                id="email"
                label="Email"
                className={classes.email}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                onChange={handleChange("email")}
                value={values.email}
                placeholder="Type your email here..."
                variant="filled"
                helperText={
                  errors.email && <span className={classes.errorText}>{errors.email}</span>
                }
              />

              <TextInput
                label="Feedback"
                className={classes.feedback}
                name="content"
                id="content"
                margin="normal"
                variant="filled"
                onChange={handleChange}
                value={values.content || ""}
                placeholder="If you have any questions, suggestions or feedback feel free to share it with us"
                multiline={true}
                rows={3}
                helperText={
                  errors.content && <span className={classes.errorText}>{errors.content}</span>
                }
              />
              <Grid item className={classes.submitContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submitBtn}
                  classes={{ label: classes.submitBtnLable }}
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
          className={classes.confirmationModal}
          onClose={handleModalClose}
          maxWidth="xl"
        >
          <DialogContent>
            <SuccessModal
              title="Success!"
              description="Your Feedback has been submitted successfully."
              buttonText="Done"
              handlerFunction={handleModalClose}
            />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </LoadingOverlay>
  );
};
const mapStateToProps = (appState: AppState) => {
  return {
    loading: appState.user.loading,
    profile: appState.user.profile,
    dialogInfo: appState.app.dialogInfo,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackForm);
