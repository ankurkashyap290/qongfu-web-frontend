import React, { FunctionComponent, useState, useEffect } from "react";
import {
  Paper,
  IconButton,
  Select,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import clsx from "clsx";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import {
  CustomSearchIcon,
  InnerFilterFitness,
  InnerFilterSports,
  InnerMartialArts,
  InnerRecreation,
  InnerWellness,
} from "../CustomIcon";
import useStyles from "../../Styles/components/topBarSearch";
import { RocketSearchQueryType, RocketSearchResponse } from "../../redux/actionTypes";
import { CATEGORY_FILTERS } from "../../constants";
import { getIsMobile } from "../../utils";
import { useRouter } from "next/router";
import { searchPlaces, resetSearchPlaces } from "../../redux/actions/app";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";

interface Props {
  showOn: string;
  icon?: string;
  placeholder: string;
  selectedLifestyle?: string;
  handleHeadSelectOnChange?: Function;
  searchPlaces: typeof searchPlaces;
  searchedPlaces: RocketSearchResponse | null;
  resetSearchPlaces: typeof resetSearchPlaces;
  searchLoading: boolean;
  searchQuery: string;
  onSearchInput?: Function;
}

interface SearchList {
  group: string;
  linkedId: string;
  title: string;
  description: string;
}

const TopBarSearch: FunctionComponent<Props> = ({
  showOn,
  icon,
  placeholder,
  selectedLifestyle,
  handleHeadSelectOnChange,
  searchedPlaces,
  searchPlaces,
  // resetSearchPlaces,
  searchLoading,
  searchQuery,
  onSearchInput,
}) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const router = useRouter();

  const [searchButtonOpen, toggleSearchButton] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [listData, setDataList] = useState([] as SearchList[]);

  useEffect(() => {
    setSearchPhrase(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (searchedPlaces) {
      let places: SearchList[] = searchedPlaces.places.map(place => ({
        group: "Places",
        linkedId: place.slug,
        title: place.place_name,
        description: place.location,
      }));
      let qongfus: SearchList[] = searchedPlaces.qongfus.map(qongfu => ({
        group: "Qongfu",
        linkedId: qongfu.qongfu,
        title: qongfu.qongfu,
        description: "",
      }));
      let regions: SearchList[] = searchedPlaces.locations.regions.map(region => ({
        group: "Locations",
        linkedId: region.name,
        title: region.name,
        description: "",
      }));
      let cities: SearchList[] = searchedPlaces.locations.cities.map(city => ({
        group: "Locations",
        linkedId: city.name,
        title: city.name,
        description: "",
      }));
      let areas: SearchList[] = searchedPlaces.locations.areas.map(area => ({
        group: "Locations",
        linkedId: area.name,
        title: area.name,
        description: "",
      }));
      setDataList([...places, ...qongfus, ...regions, ...cities, ...areas]);
    }
  }, [searchedPlaces]);

  // @ts-ignore
  const handleSearchOnChange = (value, evt) => {
    const queryParam: RocketSearchQueryType = { search: "" }; //max_results: 3
    setSearchPhrase(value);
    if (value.length >= 3) {
      queryParam["search"] = value;
      if (selectedLifestyle) {
        // queryParam["lifestyles"] = selectedLifestyle;
      }
    }
    onSearchInput && onSearchInput(queryParam.search);
    searchPlaces(queryParam);
  };

  const handleOnSelectChange = item => {
    if (item.group === "Places") {
      router.push("/places-details", `/places/${item.linkedId}`);
    } else if (item.group === "Qongfu") {
      router.push(`/explore-search?search=${item.linkedId}`, `/explore?search=${item.linkedId}`);
    } else {
      router.push(
        `/explore-search?location=${item.linkedId}`,
        `/explore?location=${item.linkedId}`
      );
    }
  };

  const handleSearchClick = () => {
    if (searchPhrase.length >= 3) {
      router.push(`/explore-search?search=${searchPhrase}`, `/explore?search=${searchPhrase}`);
    }
  };

  const renderAutocompleteOption = option => {
    return (
      <div onClick={() => handleOnSelectChange(option)} className={classes.searchResultListItem}>
        <Typography variant="body1" className={classes.listItemHeading}>
          {option.title}
        </Typography>
        <Typography variant="body1" className={classes.listItemSubText}>
          {option.description}
        </Typography>
      </div>
    );
  };

  const handleSearchClose = () => {
    // if (resetSearchPlaces) {
    //   resetSearchPlaces();
    // }
    if (showOn !== "normal") {
      toggleSearchButton(false);
    }
  };

  const handleSearchOpen = () => {
    if (showOn !== "normal") {
      toggleSearchButton(true);
    }
    searchPlaces({ search: searchPhrase });
  };

  const handleOnHeadSelectChange = value => {
    handleHeadSelectOnChange && handleHeadSelectOnChange(value);
    //console.log("value", value);
  };

  const renderLifestyleIcon = item => {
    if (item === "Fitness") {
      return <InnerFilterFitness style={{ marginBottom: "-8px" }} />;
    } else if (item === "Wellness") {
      return <InnerWellness style={{ marginBottom: "-8px" }} />;
    } else if (item === "Sports") {
      return <InnerFilterSports style={{ marginBottom: "-8px" }} />;
    } else if (item === "Martial Arts") {
      return <InnerMartialArts style={{ marginBottom: "-8px" }} />;
    } else if (item === "Recreation") {
      return <InnerRecreation style={{ marginBottom: "-8px" }} />;
    }
  };

  return (
    <div className={classes.searchBoxContainer}>
      <Paper
        className={clsx(
          classes.search,
          showOn === "normal"
            ? classes.searchNormal
            : showOn === "header"
            ? classes.searchHeader
            : showOn === "mapView"
            ? classes.searchLifestyleMapView
            : classes.searchLifestyle
        )}
      >
        <IconButton aria-label="search" color="primary" className={classes.searchIconBtn}>
          {icon === "filterFitnessFilled" ? (
            <div>
              {renderLifestyleIcon(selectedLifestyle)}
              <Select
                native
                value={selectedLifestyle || ""}
                onChange={evt => handleOnHeadSelectChange(evt.target.value)}
                // inputProps={{
                //   name: 'age',
                //   id: 'age-native-simple',
                // }}
                disableUnderline={false}
                className={classes.lifestyleSelect}
              >
                {CATEGORY_FILTERS.map((item, index) => {
                  return (
                    <option value={item} key={`${item}-${index}`}>
                      {item}
                    </option>
                  );
                })}
              </Select>
            </div>
          ) : null}
          {icon === "search" ? (
            isMobile ? (
              <SearchIcon color="secondary" />
            ) : (
              <CustomSearchIcon />
            )
          ) : null}
          {showOn === "header" && !isMobile ? (
            <span className={classes.selectedCategory}>
              {router.pathname === "/places" ? "Places" : "Explore"}
            </span>
          ) : null}
        </IconButton>
        <Autocomplete
          size="small"
          options={listData} //.sort((a, b) => -b.group.localeCompare(a.group))}
          groupBy={option => option.group}
          getOptionLabel={option => option.title || ""}
          inputValue={searchPhrase}
          renderInput={params => (
            <TextField
              {...params}
              variant="standard"
              className={classes.input}
              placeholder={!isMobile ? placeholder : "Search Qongfu"}
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                endAdornment: searchButtonOpen ? (
                  <InputAdornment position="end">
                    <Button
                      variant="outlined"
                      onClick={handleSearchClick}
                      disableRipple
                      size="small"
                    >
                      Search
                    </Button>
                  </InputAdornment>
                ) : null,
              }}
            />
          )}
          onInputChange={(evt, value) => handleSearchOnChange(value, evt)}
          classes={{
            root: classes.autocompleteRoot,
            endAdornment: classes.hidden,
            inputRoot: classes.autocompleteInputRoot,
            listbox: classes.searchResultDropDown,
            popper: showOn === "normal" ? classes.autocompletePopper : classes.testPopper,
            option: classes.autocompleteOption,
          }}
          renderOption={option => renderAutocompleteOption(option)}
          onClose={handleSearchClose}
          onOpen={handleSearchOpen}
          noOptionsText={!searchPhrase ? "Loading..." : "No option found"}
          loading={searchLoading}
          disablePortal
          freeSolo
          // disableOpenOnFocus
        />
      </Paper>
    </div>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    searchedPlaces: appState.app.searchedPlaces,
    searchLoading: appState.app.searchLoading,
    searchQuery: appState.app.advanceSearchFilters.search || "",
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TopBarSearch);
