import React, { FunctionComponent, useState } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../../Styles/components/auth";
import { DefaultCountry } from "../../config";
// import Emoji from "./countryFlag";
import { Countries } from "../../redux/actionTypes";

interface Props {
  handleSelectCountry: Function;
  handleModalClose: Function;
  countries: Countries[];
  country?: any | null;
}

const CountryList: FunctionComponent<Props> = ({
  handleSelectCountry,
  handleModalClose,
  countries,
  country = null,
}) => {
  const [selectedCountry, setCountryCode] = useState(country ? country : DefaultCountry);
  const fileteredCountries = countries.filter(country => country.approved === 1);
  const classes = useStyles();
  const handleSelectFlag = country => {
    setCountryCode(country);
  };

  const handleCountrySelection = () => {
    handleSelectCountry(selectedCountry);
    handleModalClose();
  };

  return (
    <React.Fragment>
      <CloseIcon className={classes.closeIcon} onClick={() => handleModalClose()} />
      <Grid container justify="center">
        <Typography className={classes.countryModalHeading}>
          Select your country location
        </Typography>
      </Grid>
      <List className={classes.listScroll}>
        <Divider component="li" />
        {fileteredCountries.map(country => (
          <div key={`country-item-${country.id}`}>
            <ListItem
              alignItems="flex-start"
              onClick={() => handleSelectFlag(country)}
              className={
                selectedCountry && selectedCountry.dial_code === country.dial_code
                  ? classes.selectedCountry
                  : classes.notSelectedCountry
              }
            >
              <ListItemAvatar
                style={{ minWidth: "34px", marginTop: "0px" }}
                children={<span style={{ fontSize: "28px" }}>{country.flag}</span>}
              />
              {/* <Emoji symbol={`${country.flag}`} label={country.country} /> */}

              <ListItemText primary={country.country} />
              {selectedCountry && selectedCountry.dial_code === country.dial_code ? (
                <ListItemSecondaryAction>
                  <CheckCircleOutlineIcon style={{ color: "#51a322", fontSize: "24px" }} />
                </ListItemSecondaryAction>
              ) : null}
            </ListItem>
            <Divider component="li" />
          </div>
        ))}

        <Divider component="li" />
      </List>
      <Grid container justify="center">
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ width: "200px", margin: "20px 0px" }}
          disableRipple
          onClick={handleCountrySelection}
        >
          DONE
        </Button>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    countries: appState.app.countries,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CountryList);
