import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import { Grid, TextField, Dialog, Button, Typography, Link } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../../Styles/index";
import { Success } from "../CustomIcon";
import NoResultFound from "../NoResultFound";
import { addMissingEntity } from "../../redux/actions/user";
import { User, MissingEntity } from "../../redux/actionTypes";
import { hideDialog } from "../../redux/actions/app";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LoadingOverlay from "react-loading-overlay";

interface Props {
  isMobile?: boolean;
  showTitle?: boolean;
  profile: User | null;
  addMissingEntity: typeof addMissingEntity;
  dialogInfo: any;
  hideDialog: typeof hideDialog;
  loading: boolean;
}

const NewPlace: FunctionComponent<Props> = ({
  isMobile,
  showTitle,
  profile,
  addMissingEntity,
  dialogInfo,
  hideDialog,
  loading,
}) => {
  const [addPlaceModalVisibility, setAddPlaceVisibility] = useState(false);
  const [cityOrAreaError, setCityOrAreaError] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (dialogInfo && dialogInfo.dialogCode === "saved-missing-entity" && dialogInfo.open) {
      setAddPlaceVisibility(false);
    }
  }, [dialogInfo]);

  const handleAddNewPlaceModal = () => {
    setAddPlaceVisibility(true);
  };
  const handleModalClose = () => {
    setAddPlaceVisibility(false);
  };
  const validationSchema = () => {
    return Yup.object().shape({
      place: Yup.string().required("* Place is required"),
      country: Yup.string().required("* Country is required"),
    });
  };

  const validate = getValidationSchema => {
    return values => {
      const validationSchema = getValidationSchema(values);
      try {
        validationSchema.validateSync(values, { abortEarly: false });
        return {};
      } catch (error) {
        validateExtras(values);
        return getErrorsFromValidationError(error);
      }
    };
  };

  const validateExtras = values => {
    let update = true;
    if (values.area === "" && values.city === "") {
      setCityOrAreaError(true);
      update = false;
    }

    return update;
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
    place: "",
    area: "",
    city: "",
    country: "",
  };

  const handleSubmit = values => {
    if (validateExtras(values)) {
      let content = "";
      if (values.area === "") {
        content = `${values.place}, ${values.city}, ${values.country}`;
      } else if (values.city === "") {
        content = `${values.place}, ${values.area}, ${values.country}`;
      }
      let payload = {
        type: "Place",
        content,
        flags: ["Suggestions"],
      } as MissingEntity;

      if (profile && profile.id) {
        payload.user_id = profile && profile.id;
      }
      addMissingEntity({ ...payload });
      // setAddPlaceVisibility(false);
    }
  };
  const handleSuccessModalClose = () => {
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
      <div className={classes.placesNotFoundContainer}>
        <Grid container justify="space-around" className={classes.notResultFoundContainer}>
          <Grid item>
            <NoResultFound
              title="Hmmm..."
              description="Can’t find the place you’re looking for?"
              handleAddNewClick={handleAddNewPlaceModal}
              showAddNew={true}
              isMobile={isMobile}
              showTitle={showTitle}
            />
          </Grid>
        </Grid>
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={addPlaceModalVisibility}
          onClose={handleModalClose}
          classes={{ paper: classes.mbAddNewPlacePaper }}
        >
          <div className={classes.modalClose}>
            <CloseIcon className={classes.closeIcon} onClick={handleModalClose} />
          </div>
          <div className={classes.addNewModalContent}>
            <Typography variant="h5" className={classes.modalHeading}>
              Welcome to the Qongfu Community Database!
            </Typography>

            <Typography variant="body1" className={classes.modalDesc}>
              If you weren’t able to find the place you were connected with don’t sweat it! Let’s
              add it here!
            </Typography>
            <Formik
              initialValues={initialValues}
              validate={validate(validationSchema)}
              onSubmit={handleSubmit}
              render={({ errors, handleChange, handleSubmit, values }) => (
                <Form onSubmit={handleSubmit}>
                  <TextField
                    className={classes.inputFields}
                    placeholder="Place Name"
                    name="place"
                    value={values.place || ""}
                    onChange={handleChange}
                    variant="outlined"
                    helperText={
                      errors.place && <span className={classes.errorText}>{errors.place}</span>
                    }
                    InputProps={{
                      classes: {
                        root: classes.inputBorder,
                      },
                    }}
                  />
                  <TextField
                    className={classes.inputFields}
                    placeholder="Area"
                    name="area"
                    onChange={handleChange}
                    value={values.area}
                    variant="outlined"
                    helperText={
                      cityOrAreaError &&
                      values.city === "" &&
                      values.area === "" && (
                        <span className={classes.errorText}>* Either area or city is required</span>
                      )
                    }
                    InputProps={{
                      classes: {
                        root: classes.inputBorder,
                      },
                    }}
                  />
                  <TextField
                    className={classes.inputFields}
                    placeholder="City"
                    name="city"
                    onChange={handleChange}
                    value={values.city}
                    variant="outlined"
                    helperText={
                      cityOrAreaError &&
                      values.city === "" &&
                      values.area === "" && (
                        <span className={classes.errorText}>* Either area or city is required</span>
                      )
                    }
                    InputProps={{
                      classes: {
                        root: classes.inputBorder,
                      },
                    }}
                  />
                  <TextField
                    className={classes.inputFields}
                    placeholder="Country"
                    name="country"
                    onChange={handleChange}
                    value={values.country || ""}
                    variant="outlined"
                    helperText={
                      errors.country && <span className={classes.errorText}>{errors.country}</span>
                    }
                    InputProps={{
                      classes: {
                        root: classes.inputBorder,
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!profile}
                    style={{ width: "84%", padding: "9px", margin: "10px 0px" }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              )}
            />
            {!profile ? (
              <Typography variant="body1" className={classes.errorText}>
                Please sign-in to contribute on Qongfu. <Link href="/sign-in">Sign In</Link>
              </Typography>
            ) : null}
            <Typography variant="body1" className={classes.modalLowerDesc}>
              The more information you share the easier it will be for our team to locate the place
              and have them join the Qongfu Community.
            </Typography>
          </div>
        </Dialog>
        <Dialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={
            dialogInfo && dialogInfo.dialogCode === "saved-missing-entity" && dialogInfo.open
              ? true
              : false
          }
          onClose={handleSuccessModalClose}
        >
          <div style={{ textAlign: "center", padding: "25px" }}>
            <Typography variant="h5" className={classes.successModalHeading}>
              Great job!
            </Typography>
            <Success style={{ fontSize: "160px", margin: "25px" }} />

            <Typography variant="body1" className={classes.successModalConfirm}>
              Your request has been sent!
            </Typography>

            <Typography variant="body1" className={classes.successModalDesc}>
              Our support team will review your request and process it as soon as possible. You will
              receive a notification once the process has been completed.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              style={{ width: "200px", padding: "9px" }}
              onClick={handleSuccessModalClose}
            >
              Done
            </Button>
          </div>
        </Dialog>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewPlace);
