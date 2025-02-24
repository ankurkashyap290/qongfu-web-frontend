import React, { FunctionComponent, useEffect, useState } from "react";
import _ from "lodash";
import {
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Dialog,
  DialogContent,
  Drawer,
} from "@material-ui/core";
import DehazeIcon from "@material-ui/icons/Dehaze";
import clsx from "clsx";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "../../Styles/components/lifestylesAndQongfus";
import { User, Qongfus, Lifestyles } from "../../redux/actionTypes";
import { saveUserDetails } from "../../redux/actions/user";
import { hideDialog } from "../../redux/actions/app";
import AddNewQongfu from "./addNewQongfu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { getIsMobile } from "../../utils";
import SuccessModal from "../SuccessModal";
import Alert from "@material-ui/lab/Alert";

interface Props {
  token: string | null;
  profile: User | null;
  saveUserDetails: typeof saveUserDetails;
  dialogInfo: any;
  hideDialog: typeof hideDialog;
  lifestyles: Lifestyles[];
  qongfus: Qongfus[];
  submitButtonText: string;
  selectionBoxMaxWidth: number;
  successHandler?: Function;
  successDialog?: boolean;
  error: string | null;
  selectionFieldLabel?: string;
}

const LifestylesAndQongfusUpdate: FunctionComponent<Props> = ({
  profile,
  saveUserDetails,
  token,
  lifestyles,
  qongfus,
  submitButtonText,
  selectionBoxMaxWidth,
  successDialog,
  dialogInfo,
  successHandler,
  hideDialog,
  error,
  selectionFieldLabel = "",
}) => {
  const isMobile = getIsMobile();
  const [selectedQongfus, setSelectedQongfus] = useState([] as Qongfus[]);
  const [selectedLifestyles, setSelectedLifestyles] = useState([] as Lifestyles[]);
  const [selectedSuggestions, setSelectedSuggestions] = useState([] as Qongfus[]);
  const [searchText, setSearchText] = useState("");
  const [filterQongfusList, setFilterQongfusList] = useState([] as Qongfus[]);
  const [filterLifestylesList, setFilterLifestylesList] = useState([] as Lifestyles[]);
  const [searchQongfusList, setSearchQongfusList] = useState([] as Qongfus[]);
  const [searchLifestylesList, setSearchLifestylesList] = useState([] as Lifestyles[]);
  const [isProfileLoaded, setProfileLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState("Expand");
  const [qongfusCount, setQongfusCount] = useState(5);
  const [newQongfuModal, setNewQongfuModal] = React.useState(false);
  const [bottomDrawerVisibility, setBottomDrawerVisibility] = React.useState("expand");
  const [isSearchEnabled, setIsSearchEnabled] = React.useState(false);

  const classes = useStyles();

  // IF PROFILE LOADED THEN SET SELECTED
  useEffect(() => {
    if (profile) {
      setProfileLoaded(true);
      if (profile.qongfus) {
        setSelectedQongfus(profile.qongfus || []);
      }
      if (profile.lifestyles) {
        setSelectedLifestyles(profile.lifestyles || []);
      }
    }
  }, [profile]);

  // IF LIFESTYLES LOADED THEN
  useEffect(() => {
    if (lifestyles && lifestyles.length) {
      let tempQongfus = [] as Qongfus[];
      const topFiveQongfus = [] as Qongfus[];
      lifestyles.map(item => {
        if (topFiveQongfus.length < 5 && item.qongfus.length) {
          topFiveQongfus.push(item.qongfus[0] as Qongfus);
        }
        if (item.qongfus.length) {
          tempQongfus = tempQongfus.concat([], item.qongfus as Qongfus[]);
        }
        return item;
      });
      setSelectedSuggestions(topFiveQongfus);
    }
  }, [lifestyles]);

  useEffect(() => {
    updateFilteredData();
  }, [selectedQongfus, selectedLifestyles, qongfus, lifestyles]);

  useEffect(() => {
    if (dialogInfo && dialogInfo.dialogCode === "account-update-qongfus" && dialogInfo.open) {
      if (!successDialog) {
        hideDialog("info", "account-update-qongfus");
        successHandler && successHandler();
      }
    }
  }, [dialogInfo]);

  const updateFilteredData = () => {
    let newQongfus = _.cloneDeep(qongfus);
    if (selectedQongfus.length) {
      newQongfus = newQongfus.filter(
        item => !selectedQongfus.map(qongfu => qongfu.id).includes(item.id)
      );
    }

    setFilterQongfusList(newQongfus);

    let newLifestyles = _.cloneDeep(lifestyles);
    if (selectedLifestyles.length) {
      newLifestyles = newLifestyles.filter(
        item => !selectedLifestyles.map(lifestyle => lifestyle.id).includes(item.id)
      );
    }
    setFilterLifestylesList(newLifestyles);
    if (isSearchEnabled) {
      updateSearchList(searchText, newLifestyles, newQongfus);
    }
  };

  const disabledButton = selectedQongfus.length > 0 || selectedLifestyles.length > 0;

  const handleSuggestionItemClick = qongfu => {
    const newSelectedQongfus = _.cloneDeep(selectedQongfus);
    newSelectedQongfus.push(_.cloneDeep(qongfu));
    setSelectedQongfus(newSelectedQongfus);

    const foundLifestyle = lifestyles.find(lifestyle => lifestyle.id === qongfu.lifestyle_id);

    if (
      foundLifestyle &&
      !selectedLifestyles.find(lifestyle => lifestyle.id === foundLifestyle.id)
    ) {
      const newSelectedLifestyles = _.cloneDeep(selectedLifestyles);
      newSelectedLifestyles.push(foundLifestyle);
      setSelectedLifestyles(newSelectedLifestyles);
    }

    // remove selected qongfu from suggestion
    const foundSuggestion = selectedSuggestions.findIndex(
      suggestion => suggestion.id === qongfu.id
    );
    if (foundSuggestion >= 0) {
      const newSuggestions = _.cloneDeep(selectedSuggestions);
      newSuggestions.splice(foundSuggestion, 1);
      setSelectedSuggestions(newSuggestions);
    }
    if (isMobile || displayMode === "Collapse") {
      setQongfusCount(selectedQongfus.length);
    }
  };

  const handleSelectLifestyle = lifestyle => {
    const newSelectedLifestyles = _.cloneDeep(selectedLifestyles);
    newSelectedLifestyles.push(_.cloneDeep(lifestyle));
    setSelectedLifestyles(newSelectedLifestyles);
  };

  const handleDeleteLifestyle = id => {
    setSelectedLifestyles(_.cloneDeep(selectedLifestyles).filter(lifestyle => lifestyle.id !== id));
    // found all selected qongfus of this lifestyle
    setSelectedQongfus(_.cloneDeep(selectedQongfus).filter(qongfu => qongfu.lifestyle_id !== id));
    // update topFiveSuggestions again
    if (selectedSuggestions.length < 5) {
      const newSuggestions = _.cloneDeep(selectedSuggestions);
      newSuggestions.push(
        //@ts-ignore
        _.cloneDeep(qongfus.find(item => item.lifestyle_id === id))
      );
      setSelectedSuggestions(newSuggestions);
    }
  };

  const handleDeleteQongfu = id => {
    // found all selected qongfus of this lifestyle
    const newSelectedQongfus = _.cloneDeep(selectedQongfus).filter(qongfu => qongfu.id !== id);
    setSelectedQongfus(newSelectedQongfus);

    // // check lifestyle if no qongfu found then delete it also
    // const selectedLifestyleIds = newSelectedQongfus.map(qongfu => qongfu.lifestyle_id);
    // setSelectedLifestyles(
    //   _.cloneDeep(selectedLifestyles).filter(item => selectedLifestyleIds.includes(item.id))
    // );

    // update topFiveSuggestions again
    if (selectedSuggestions.length < 5) {
      const newSuggestions = _.cloneDeep(selectedSuggestions);
      newSuggestions.push(
        //@ts-ignore
        _.cloneDeep(qongfus.find(item => item.id === id))
      );
      setSelectedSuggestions(newSuggestions);
    }
  };

  const handleQongfuSearch = searchPhrase => {
    setSearchText(searchPhrase);
    if (searchPhrase.length > 2) {
      setIsSearchEnabled(true);
      updateSearchList(searchPhrase, filterLifestylesList, filterQongfusList);
    } else {
      setIsSearchEnabled(false);
    }
  };

  const updateSearchList = (searchPhrase, lifestylesList, qongfusList) => {
    setSearchLifestylesList(
      _.cloneDeep(lifestylesList).filter(
        item => item.lifestyle.toLowerCase().indexOf(searchPhrase.toLowerCase()) >= 0
      )
    );
    setSearchQongfusList(
      _.cloneDeep(qongfusList).filter(
        item => item.qongfu.toLowerCase().indexOf(searchPhrase.toLowerCase()) >= 0
      )
    );
  };

  const handleUpdateQongfus = () => {
    saveUserDetails(
      {
        qongfus: selectedQongfus.map(qongfus => qongfus.id) as any,
        lifestyles: selectedLifestyles.map(lifestyle => lifestyle.id) as any,
        //@ts-ignore
        first_name: profile && profile.first_name,
        //@ts-ignore
        last_name: profile && profile.last_name,
      },
      token,
      "",
      "qongfus"
    );
  };

  const handleCollapseMode = mode => {
    setDisplayMode(mode);
    let count = 0;
    if (isMobile || mode === "Collapse") {
      count = selectedQongfus.length;
    } else {
      count = 5;
    }
    setQongfusCount(count);
  };
  const handleAddNewQongfuModal = () => {
    setNewQongfuModal(true);
  };
  const handleModalClose = () => {
    setNewQongfuModal(false);
    hideDialog("info", "account-update-qongfus");
    if (successDialog) {
      successHandler && successHandler();
    }
  };

  const lifestyleBackgroundColor = item => {
    let lifestyleColor = "";
    const tempLifestyle = selectedLifestyles.find(lifestyle => lifestyle.id === item);
    if (tempLifestyle) {
      lifestyleColor = `#${tempLifestyle.lifestyle_color}`;
    }
    return lifestyleColor;
  };

  const renderQongfus = () => {
    return (
      <div>
        <Grid container justify="center">
          {renderSearchField()}
          <div
            className={
              isMobile
                ? bottomDrawerVisibility === "expand"
                  ? classes.searchedQongfusMobile
                  : ""
                : classes.searchedQongfus
            }
            style={{
              maxWidth: `${selectionBoxMaxWidth}px`,
              width: "100%",
              padding: isMobile ? "0px 10px" : "",
            }}
          >
            {!isSearchEnabled ? null : (
              <div>
                {searchLifestylesList.map((item, index) => (
                  <Chip
                    label={item.lifestyle}
                    size="medium"
                    className={classes.suggestionsChip}
                    key={`${item.lifestyle}-${index}`}
                    onClick={() => handleSelectLifestyle(item)}
                  />
                ))}
                {searchQongfusList.map((item, index) => (
                  <Chip
                    label={item.qongfu}
                    size="medium"
                    className={classes.suggestionsChip}
                    key={`${item.qongfu}-${index}`}
                    onClick={() => handleSuggestionItemClick(item)}
                  />
                ))}
              </div>
            )}
            {isSearchEnabled ||
            selectedLifestyles.length ||
            selectedQongfus.length ||
            bottomDrawerVisibility === "collapse" ? null : (
              <React.Fragment>
                <Typography variant="body2" className={classes.suggestionHeading}>
                  Suggestions:
                </Typography>
                <div>
                  {selectedSuggestions.map((item, index) => (
                    <Chip
                      label={item.qongfu}
                      className={classes.suggestionsChip}
                      key={index}
                      onClick={() => handleSuggestionItemClick(item)}
                    />
                  ))}
                </div>
              </React.Fragment>
            )}
            {isSearchEnabled ? (
              <div>
                {searchLifestylesList.length === 0 && searchQongfusList.length === 0 ? (
                  <div>
                    <Typography
                      variant="body1"
                      className={classes.notFindQongfuText}
                      style={{ textAlign: "center" }}
                    >
                      No result
                    </Typography>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <Grid
            container
            direction="row"
            style={{ marginBottom: "15px", justifyContent: "center" }}
          >
            {isSearchEnabled ? (
              <React.Fragment>
                <Typography variant="body1" className={classes.notFindQongfuText}>
                  Can’t find your Qongfu?
                </Typography>
                <Button
                  disableRipple
                  onClick={handleAddNewQongfuModal}
                  className={classes.addNewButton}
                >
                  Add here
                </Button>{" "}
              </React.Fragment>
            ) : (
              <div style={{ height: "27px" }}> </div>
            )}
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            disableRipple
            disabled={!disabledButton}
            className={clsx(
              selectionBoxMaxWidth === 352 ? classes.submitButtonThirdStep : classes.submitButton,
              !disabledButton && isMobile ? classes.disabledButton : ""
            )}
            onClick={handleUpdateQongfus}
          >
            {submitButtonText}
          </Button>
        </Grid>
      </div>
    );
  };

  const renderSearchField = () => {
    return (
      <TextField
        onChange={evt => handleQongfuSearch(evt.target.value)}
        label="i.e. Boxing, Pilates or Horse Riding"
        className={
          selectionBoxMaxWidth === 352
            ? classes.qongfuSearchFieldThirdStep
            : classes.qongfuSearchField
        }
        variant="outlined"
        value={searchText}
        InputProps={{
          classes: {
            root: classes.inputBorder,
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="search" edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  };

  const handleDrawerVisibility = value => {
    setBottomDrawerVisibility(value);
    if (value === "collapse") {
      setSearchLifestylesList([]);
      setSearchQongfusList([]);
      setSearchText("");
      setIsSearchEnabled(false);
    }
  };

  return !isProfileLoaded ? (
    <div>Wait...</div>
  ) : (
    <div style={{ width: "100%" }}>
      {error && (
        <div style={{ margin: "10px 0px" }}>
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      {selectionFieldLabel && (
        <Grid container justify="flex-start">
          <Typography variant="body1" className={classes.selectionHeading}>
            {selectionFieldLabel}
          </Typography>
        </Grid>
      )}
      <Grid container justify="center">
        <div
          className={
            isMobile
              ? classes.selectedLifestylesAndQongfusMobile
              : classes.selectedLifestylesAndQongfusOverflow
          }
          style={{ position: "relative", maxWidth: `${selectionBoxMaxWidth}px` }}
        >
          {selectedLifestyles.length && selectedLifestyles.length > 0 ? (
            <div style={{ marginBottom: "15px" }}>
              {selectedLifestyles.map((item, index) => (
                <Chip
                  label={item.lifestyle}
                  size="medium"
                  className={classes.selectedLifestyles}
                  style={{ backgroundColor: `#${item.lifestyle_color}` }}
                  key={`${item.lifestyle}-${index}`}
                  onDelete={() => handleDeleteLifestyle(item.id)}
                />
              ))}
            </div>
          ) : (
            <div style={{ margin: "10px", color: "#d9d7d7" }}>No Lifestyle selected yet.</div>
          )}
          {selectedQongfus.length && selectedQongfus.length > 0 ? (
            <div>
              {selectedQongfus.map((item, index) => {
                if (isMobile || index < qongfusCount) {
                  return (
                    <Chip
                      label={item.qongfu}
                      size="medium"
                      className={classes.selectedQongfus}
                      style={{
                        backgroundColor: item.qongfu_color
                          ? `#${item.qongfu_color}`
                          : lifestyleBackgroundColor(item.lifestyle_id),
                      }}
                      key={`${item.qongfu}-${index}`}
                      onDelete={() => handleDeleteQongfu(item.id)}
                    />
                  );
                }
              })}
            </div>
          ) : (
            <div style={{ margin: "10px", color: "#d9d7d7" }}>No Qongfu selected yet.</div>
          )}

          {isMobile ||
          (displayMode === "Expand" && selectedQongfus.length <= qongfusCount) ? null : (
            <div className={classes.collapseButton}>
              {selectedQongfus.length > qongfusCount && displayMode === "Expand" ? (
                <Typography
                  variant="body1"
                  className={classes.qongfusCount}
                  style={{ textAlign: "left", alignSelf: "center" }}
                >
                  ...
                  {selectedQongfus.length - qongfusCount < 0
                    ? 0
                    : selectedQongfus.length - qongfusCount}{" "}
                  more
                </Typography>
              ) : (
                <div></div>
              )}

              <Button
                disableRipple
                onClick={() => handleCollapseMode(displayMode === "Expand" ? "Collapse" : "Expand")}
                className={classes.addNewButton}
                endIcon={displayMode === "Expand" ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              >
                {displayMode==='Expand'?'More':'Less'}
              </Button>
            </div>
          )}
        </div>
      </Grid>
      <div className={classes.mbOpenMobileDrawer}></div>
      {isMobile ? (
        <Drawer anchor="bottom" variant="permanent">
          <div style={{ textAlign: "center" }}>
            <IconButton
              onClick={() =>
                handleDrawerVisibility(bottomDrawerVisibility === "expand" ? "collapse" : "expand")
              }
            >
              <DehazeIcon />
            </IconButton>
          </div>
          {renderQongfus()}
        </Drawer>
      ) : (
        renderQongfus()
      )}

      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={newQongfuModal}
        classes={{ paper: classes.qongfuModal }}
        onClose={handleModalClose}
      >
        <DialogContent>
          <AddNewQongfu onSubmit={handleModalClose} />
        </DialogContent>
      </Dialog>
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={
          dialogInfo &&
          dialogInfo.dialogCode === "account-update-qongfus" &&
          dialogInfo.open &&
          successDialog
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
            description="Your lifestyles and qongfus are updated!"
            buttonText="Done"
            handlerFunction={handleModalClose}
          />
        </DialogContent>
      </Dialog>
    </div>
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
    error: appState.user.error["account-update-qongfus"] || null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LifestylesAndQongfusUpdate);
