import React, { FunctionComponent, useEffect, useState } from "react";
import _ from "lodash";
import clsx from "clsx";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import {
  TextField,
  InputAdornment,
  Typography,
  FormControl,
  FormGroup,
  Button,
  Grid,
  MenuItem,
  Card,
  CardContent,
  Chip,
  FormHelperText,
  Dialog,
  DialogContent,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  List,
} from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CheckIcon from "@material-ui/icons/Check";
import useStyles from "../../Styles/components/accountSettings";
import { User, Languages, Countries } from "../../redux/actionTypes";
import { saveUserDetails } from "../../redux/actions/user";
import { hideDialog } from "../../redux/actions/app";
import SuccessModal from "../SuccessModal";
import moment from "moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { DatePicker } from "@material-ui/pickers";
import SearchLocationInput from "../UserLocation/searchLocation";
import Alert from "@material-ui/lab/Alert";
import AddNewLanguage from "./addNewLanguage";

interface Props {
  token: string | null;
  profile: User | null;
  saveUserDetails: typeof saveUserDetails;
  languages: Languages[];
  isMobile?: boolean;
  dialogInfo: any;
  hideDialog: typeof hideDialog;
  countries: Countries[];
  error: string | null;
}

const ProfileInfo: FunctionComponent<Props> = ({
  profile,
  saveUserDetails,
  token,
  languages,
  isMobile,
  dialogInfo,
  hideDialog,
  countries,
  error,
}) => {
  const [addLanguage, setAddLanguage] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [date_of_birth, setDateOfBirth] = useState(null);
  const [filterLanguagesList, setFilterLanguagesList] = useState([...languages] as Languages[]);
  const [selectedLanguages, setSelectedLanguages] = useState([] as Languages[]);
  const [dobError, setDobError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [hometown, setHometown] = useState("");
  const [hometownError, setHometownError] = useState(false);
  const [newLanguageModal, setNewLanguageModal] = React.useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (profile) {
      updateProfileData();
      if (profile.languages) {
        setSelectedLanguages(profile.languages || []);
      }
    }
  }, [profile]);

  useEffect(() => {
    setFilterLanguagesList(languages)
  }, [languages]);

  useEffect(() => {
    if (dialogInfo && dialogInfo.dialogCode === "account-update-profile" && dialogInfo.open) {
      setSearchText("");
      setAddLanguage(false);
    }
  }, [dialogInfo]);


  const handleAddNewLanguage = () => {
    setAddLanguage(true);
    setLanguageError(false);
  };
  const handleDateOfBirth = date => {
    setDateOfBirth(date);
    setDobError(false);
  };

  const updateProfileData = () => {
    const date: any =
      profile && moment(profile.date_of_birth!).isValid()
        ? moment(profile.date_of_birth).toDate()
        : null;
    const hometown = profile && profile.hometown ? profile.hometown : "";
    setDateOfBirth(date);
    setHometown(hometown);
  };

  const handleSelectLanguage = language => {
    if (selectedLanguages.find(item => item.id === language.id)) {
      console.log("This language is already selected");
    } else {
      const newSelectedLanguages = _.cloneDeep(selectedLanguages);
      newSelectedLanguages.push(_.cloneDeep(language));
      setSelectedLanguages(newSelectedLanguages);
    }
  };

  const handleDelete = chipToDelete => {
    setSelectedLanguages(chips => chips.filter(chip => chip.id !== chipToDelete.id));
  };

  const CustomDatePicker = props => {
    return (
      <TextField
        variant="outlined"
        id="date-of-birth"
        className={classes.inputFields}
        placeholder="Date of Birth"
        disabled
        onClick={props.onClick}
        value={props.value}
        InputProps={{
          classes: {
            root: clsx(classes.inputBorder, classes.dateOfBirth),
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

  const handleAddNewLanguageModal = () => {
    setNewLanguageModal(true);
  };

  const renderSearchField = () => {
    return (
      <TextField
        onChange={evt => handleLanguagesSearch(evt.target.value)}
        className={classes.searchField}
        variant="outlined"
        label="i.e. english"
        InputProps={{
          classes: {
            root: classes.inputBorder,
          },
        }}
      />
    );
  };


  const handleLanguagesSearch = searchPhrase => {
    setSearchText(searchPhrase);
    const tempSelectedValue = [...languages];
    if (searchPhrase.length > 2) {
      const foundedValues = tempSelectedValue.filter(item => {
        const languageMatched = item.language.toLowerCase().indexOf(searchPhrase.toLowerCase()) >= 0;
        return languageMatched;
      });

      if (foundedValues.length) {
        const foundedLanguages = foundedValues.map(item => {
          return item;
        });
        setFilterLanguagesList(foundedLanguages);
      } else {
        setFilterLanguagesList([]);
      }
    } else {
      setFilterLanguagesList([...languages]);
    }
  };


  const validationSchema = () => {
    return Yup.object().shape({
      first_name: Yup.string().required("* First Name is required"),
      last_name: Yup.string().required("* Last Name is required"),
      display_name: Yup.string().required("* Display Name is required"),
      gender: Yup.string().required("* Gender is required"),
      country_id: Yup.string().required("* Nationality is required"),
      bio: Yup.string().required("* Bio is required"),
    });
  };

  const validate = getValidationSchema => {
    return values => {
      const validationSchema = getValidationSchema(values);
      try {
        validationSchema.validateSync(values, { abortEarly: false });
        return {};
      } catch (error) {
        validateExtras();
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
      first_name: profile && profile.first_name ? profile.first_name : "",
      last_name: profile && profile.last_name ? profile.last_name : "",
      display_name: profile && profile.display_name ? profile.display_name : "",
      gender: profile && profile.gender ? profile.gender : "",
      country_id: profile && profile.country ? profile.country.id : "",
      bio: profile && profile.bio ? profile.bio : "",
    };
    return initialValues;
  };

  const validateExtras = () => {
    let update = true;
    if (!selectedLanguages.length) {
      setLanguageError(true);
      update = false;
    }
    if (!date_of_birth) {
      setDobError(true);
      update = false;
    }
    if (!hometown) {
      setHometownError(true);
      update = false;
    }
    return update;
  };

  const handleSubmit = values => {
    if (validateExtras()) {
      saveUserDetails(
        {
          ...values,
          date_of_birth: date_of_birth ? moment(date_of_birth!).format("YYYY-MM-DD") : "",
          languages: selectedLanguages.map(language => language.id),
          hometown,
        },
        token,
        "",
        "profile"
      );
    }
  };

  const handleModalClose = () => {
    setNewLanguageModal(false);
    hideDialog("info", "account-update-profile");
  };


  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <React.Fragment>
        <Card className={classes.mainCard}>
          <CardContent className={classes.cardContent}>
            <Formik
              initialValues={getInitialValues()}
              validate={validate(validationSchema)}
              onSubmit={handleSubmit}
              enableReinitialize={true}
              render={({ errors, handleChange, handleSubmit, values }) => (
                <Form onSubmit={handleSubmit}>
                  <FormControl style={{ width: "100%" }}>
                    <FormGroup aria-label="position">
                      <Typography variant="h4" className={classes.headingText}>
                        Profile Info
                      </Typography>
                      <Typography variant="body1" className={classes.DescriptionText}>
                        Lorem ipsum dolor sit amen. Lorem ipsum dolor
                      </Typography>

                      {error && (
                        <div style={{ margin: "10px 0px" }}>
                          <Alert severity="error">{error}</Alert>
                        </div>
                      )}

                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography variant="body1" className={classes.inputLabels}>
                            First Name
                          </Typography>

                          <TextField
                            variant="outlined"
                            id="first_name"
                            className={classes.inputFields}
                            placeholder="Enter your First Name"
                            value={values.first_name || ""}
                            onChange={handleChange}
                            helperText={
                              errors.first_name && (
                                <span className={classes.errorText}>{errors.first_name}</span>
                              )
                            }
                            InputProps={{
                              classes: {
                                root: classes.inputBorder,
                              },
                            }}
                          />

                          <Typography variant="body1" className={classes.inputLabels}>
                            Last Name
                          </Typography>

                          <TextField
                            variant="outlined"
                            id="last_name"
                            className={classes.inputFields}
                            placeholder="Enter your Last Name"
                            value={values.last_name || ""}
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

                          <Typography variant="body1" className={classes.inputLabels}>
                            Display Name
                          </Typography>

                          <TextField
                            variant="outlined"
                            id="display_name"
                            className={classes.inputFields}
                            placeholder="Enter your Display Name"
                            value={values.display_name || ""}
                            onChange={handleChange}
                            helperText={
                              errors.display_name && (
                                <span className={classes.errorText}>{errors.display_name}</span>
                              )
                            }
                            InputProps={{
                              classes: {
                                root: classes.inputBorder,
                              },
                            }}
                          />

                          <Typography variant="body1" className={classes.inputLabels}>
                            Date of Birth
                          </Typography>

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

                          {!dobError ? null : (
                            <FormHelperText className={classes.errorText}>
                              {" "}
                              * Date of birth is required
                            </FormHelperText>
                          )}

                          <Typography variant="body1" className={classes.inputLabels}>
                            Gender
                          </Typography>

                          <TextField
                            id="gender"
                            name="gender"
                            select
                            placeholder="Select your gender"
                            value={values.gender || ""}
                            variant="outlined"
                            className={classes.inputFields}
                            onChange={handleChange}
                            helperText={
                              errors.gender && (
                                <span className={classes.errorText}>{errors.gender}</span>
                              )
                            }
                            InputProps={{
                              classes: {
                                root: classes.inputBorder,
                              },
                            }}
                          >
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

                          <Typography variant="body1" className={classes.inputLabels}>
                            Hometown
                          </Typography>
                          <SearchLocationInput
                            placeholder="Enter your Home Location"
                            onSelect={value => {
                              setHometownError(!value);
                              setHometown(value);
                            }}
                            value={hometown}
                            hasError={hometownError}
                            errorText="* Hometown required"
                          />
                          <Typography variant="body1" className={classes.inputLabels}>
                            Nationality
                          </Typography>

                          <TextField
                            id="country_id"
                            name="country_id"
                            variant="outlined"
                            select
                            placeholder="Select your Nationality"
                            value={values.country_id || ""}
                            className={classes.inputFields}
                            onChange={handleChange}
                            helperText={
                              errors.country_id && (
                                <span className={classes.errorText}>{errors.country_id}</span>
                              )
                            }
                            InputProps={{
                              classes: {
                                root: classes.inputBorder,
                              },
                            }}
                          >
                            {countries.map(country => (
                              <MenuItem
                                value={country.id}
                                className={classes.dropdownList}
                                key={country.id}
                              >
                                {country.nationality}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6} md={6}>
                          <Typography variant="body1" className={classes.inputLabels}>
                            About Me
                          </Typography>

                          <TextField
                            variant="outlined"
                            id="bio"
                            rows="25"
                            className={classes.inputFields}
                            placeholder="Enter your Bio"
                            value={values.bio || ""}
                            multiline
                            onChange={handleChange}
                            helperText={
                              errors.bio && <span className={classes.errorText}>{errors.bio}</span>
                            }
                            InputProps={{
                              classes: {
                                root: classes.inputBorder,
                              },
                            }}
                          />

                          <Grid container direction="row">
                            <Grid item xs={4} md={4} lg={4} sm={4}>
                              <Typography variant="body1" className={classes.inputLabels}>
                                Languages
                              </Typography>
                            </Grid>
                            <Grid item xs={8} md={8} lg={8} sm={8} style={{ textAlign: "right" }}>
                              <Button
                                disableRipple
                                className={classes.newLanguageButton}
                                onClick={handleAddNewLanguage}
                              >
                                + Add New Language
                              </Button>
                            </Grid>
                          </Grid>

                          <div className={classes.selectedLanguages} style={{position:'relative', paddingBottom:'40px'}}>
                            {selectedLanguages.length && selectedLanguages.length > 0
                              ? selectedLanguages.map(item => {
                                  return (
                                    <Chip
                                      key={`lang-${item.id}`}
                                      label={item.language}
                                      className={classes.selectedLanguagesChip}
                                      onDelete={() => handleDelete(item)}
                                      deleteIcon={<CloseIcon style={{ color: "#fff" }} />}
                                    />
                                  );
                                })
                              : null}

                            <Grid
                              container
                              direction="row"
                              justify="flex-end"
                              style={{ marginBottom: "5px", justifyContent: "center", position:'absolute', bottom:0 }}
                            >
                              <Typography variant="body1" className={classes.notFindLanguageText}>
                                Can’t find your Language?
                              </Typography>
                              <Button
                                disableRipple
                                onClick={handleAddNewLanguageModal}
                                className={classes.addNewButton}
                              >
                                Add here
                              </Button>{" "}
                            </Grid>
                          </div>
                          {languageError ? (
                            <FormHelperText
                              className={classes.errorText}
                              style={{ marginBottom: "7px" }}
                            >
                              * Language is required
                            </FormHelperText>
                          ) : null}

                          {addLanguage ? renderSearchField() : null}
                          <div className={addLanguage?classes.searchedLanguagesSection: classes.searchedSection}>
                            {!addLanguage ? null : (
                               <List >

                                {filterLanguagesList.map((item, index) => (
                                  <ListItem
                                    alignItems="flex-start"
                                    key={`${item.language}-${index}`}
                                    onClick={() => handleSelectLanguage(item)}
                                    className={
                                    classes.languagesList
                                    }
                                  >
                                    <ListItemText primary={item.language} />
                                    <ListItemSecondaryAction>
                                      {selectedLanguages.find(
                                        language => language.id === item.id
                                      ) ? (
                                        <CheckIcon style={{ color: "#0092dd" }} />
                                      ) : (
                                        <AddCircleOutlineIcon style={{ color: "#0092dd" }} />
                                      )}
                                    </ListItemSecondaryAction>
                                  </ListItem>


                                ))}
                                {filterLanguagesList.length === 0 && searchText.length > 2 ? (
                                  <div>
                                    <Typography
                                      variant="body1"
                                      className={classes.noResulFindText}
                                      style={{ textAlign: "center" }}
                                    >
                                      No result
                                    </Typography>
                                  </div>
                                ) : null}
                             </List>
                            )}
                          </div>
                        </Grid>
                      </Grid>
                    </FormGroup>
                    <Grid container justify="center">
                      <FormGroup>
                        <FormControl>
                          <Grid container justify="center">
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              disableRipple
                              type="submit"
                              style={{ width: isMobile ? "150px" : "300px", marginTop: "30px" }}
                            >
                              Update
                            </Button>
                          </Grid>
                        </FormControl>
                        <Typography
                          variant="body1"
                          className={classes.footerText}
                          style={{ width: "300px" }}
                        >
                          This is a lorem ipsum dolor. The more information you share the easier it
                          will be for our team to locate the place and have them join the Qongfu
                          Community
                        </Typography>
                      </FormGroup>
                    </Grid>
                  </FormControl>
                </Form>
              )}
            />
          </CardContent>
        </Card>
        <Dialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={
            dialogInfo && dialogInfo.dialogCode === "account-update-profile" && dialogInfo.open
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
              description="Your profile has been updated."
              buttonText="Done"
              handlerFunction={handleModalClose}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={newLanguageModal}
          classes={{ paper: classes.languageModal }}
          onClose={handleModalClose}
        >
          <DialogContent>
            <AddNewLanguage onSubmit={handleModalClose} />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </MuiPickersUtilsProvider>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    token: appState.user.token,
    loading: appState.user.loading,
    profile: appState.user.profile,
    languages: appState.app.languages,
    dialogInfo: appState.app.dialogInfo,
    countries: appState.app.countries,
    error: appState.user.error["update-details-profile"] || null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);
