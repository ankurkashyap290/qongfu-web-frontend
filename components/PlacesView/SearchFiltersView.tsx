import React, { FunctionComponent, useRef, useState, useEffect } from "react";
import _ from "lodash";
import clsx from "clsx";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import useStyles from "../../Styles/components/PlacesView/SearchFiltersView";
import { Grid, Button, Chip, Typography } from "@material-ui/core";
import { AdvanceSearchFilters } from "../../redux/actionTypes";
import { getIsMobile, updateRouterHistory } from "../../utils";
import { setAdvanceSearchFilters } from "../../redux/actions/app";
import { FilterSortBy, DefaultSearchFilters } from "../../config";
import { ADVANCE_SEARCH_OPTIONS } from "../../constants";
import DropDownMenu from "../Misc/DropDownMenu";
import { InnerFilterNearestIcon, HighestRated } from "../CustomIcon";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import { useRouter } from "next/router";

interface Props {
  //   geoLocation: Location;
  advanceSearchFilters: AdvanceSearchFilters;
  setAdvanceSearchFilters: typeof setAdvanceSearchFilters;
  countries: any;
  filterResultCount: number;
  mapView?: boolean;
}

const defaultChipCtHeight = 42;

interface FilterProps {
  value: string;
  label: string;
  filter: string;
}

const SearchFiltersView: FunctionComponent<Props> = ({
  countries,
  advanceSearchFilters,
  setAdvanceSearchFilters,
  filterResultCount,
  mapView = false,
}) => {
  const isMobile = getIsMobile();
  const classes = useStyles();

  const router = useRouter();

  const chipCtRef = useRef(null);
  const [chipCtMode, setChipCtMode] = useState({ mode: "", height: defaultChipCtHeight });
  const [filterSelected, setFilterSelection] = useState([] as FilterProps[]);

  useEffect(() => {
    updateFilterSelected();
  }, [advanceSearchFilters]);

  useEffect(() => {
    // @ts-ignore
    if (chipCtRef && chipCtRef.current && chipCtRef.current.scrollHeight > defaultChipCtHeight) {
      // @ts-ignore
      const totalRows = Math.floor(chipCtRef.current.scrollHeight / defaultChipCtHeight) - 1;
      setChipCtMode({
        mode: chipCtMode.mode ? chipCtMode.mode : "expand",
        height: defaultChipCtHeight * totalRows,
      });
    } else {
      setChipCtMode({ mode: "", height: defaultChipCtHeight });
    }
  }, [filterSelected]);

  const handleToggleChip = () => {
    setChipCtMode({ ...chipCtMode, mode: chipCtMode.mode === "expand" ? "collapse" : "expand" });
  };

  const updateFilterSelected = () => {
    let filterSelected = [] as any;

    if (
      advanceSearchFilters.search &&
      DefaultSearchFilters.search !== advanceSearchFilters.search
    ) {
      const searchSelected = advanceSearchFilters.search.split(",").map(item => ({
        label: item, //cause label and value are same for it
        value: item,
        filter: "search",
      }));
      filterSelected = [...filterSelected, ...searchSelected];
    }

    if (
      advanceSearchFilters.lifestyle &&
      DefaultSearchFilters.lifestyle.length !== advanceSearchFilters.lifestyle.length
    ) {
      const filterOption = ADVANCE_SEARCH_OPTIONS.lifestyle;
      const lifestyles = advanceSearchFilters.lifestyle.map(item => ({
        label: filterOption.values.find(lifestyle => lifestyle[filterOption.fieldValue] === item)
          ?.label,
        value: item,
        filter: "lifestyle",
      }));
      filterSelected = [...filterSelected, ...lifestyles];
    }

    if (
      advanceSearchFilters.rated &&
      DefaultSearchFilters.rated.length !== advanceSearchFilters.rated.length
    ) {
      const filterOption = ADVANCE_SEARCH_OPTIONS.rated;
      const rated = advanceSearchFilters.rated.map(item => ({
        label: filterOption.values.find(rate => rate[filterOption.fieldValue] === item)?.label,
        value: item,
        filter: "rated",
      }));
      filterSelected = [...filterSelected, ...rated];
    }

    if (
      advanceSearchFilters.areaAndCities &&
      DefaultSearchFilters.areaAndCities.length !== advanceSearchFilters.areaAndCities.length
    ) {
      const areaAndCities = advanceSearchFilters.areaAndCities.map(item => ({
        label: item, //cause label and value are same for it
        value: item,
        filter: "areaAndCities",
      }));
      filterSelected = [...filterSelected, ...areaAndCities];
    }
    setFilterSelection(filterSelected);
  };

  const nearByIcons = icon => {
    switch (icon) {
      case "InnerFilterNearestIcon":
        return (
          <InnerFilterNearestIcon
            className={
              advanceSearchFilters.sortBy === "distance"
                ? classes.selectedFilterIcon
                : classes.filterIcon
            }
          />
        );
      case "HighestRated":
        return (
          <HighestRated
            className={
              advanceSearchFilters.sortBy === "rating"
                ? classes.selectedFilterIcon
                : classes.filterIcon
            }
          />
        );
      default:
        break;
    }
    return null;
  };

  const getSortingTitle = withIcon => {
    const found = FilterSortBy.find(item => item.value === advanceSearchFilters.sortBy);
    if (found) {
      if (withIcon) {
        return (
          <span>
            {nearByIcons(found.icon)} {`Sort By: ${found.label}`}
          </span>
        );
      }
      return found.label;
    }
    return "Loading...";
  };

  const getSelectedCountry = country => {
    const found = countries.find(item => item.id + "" === country + "");
    if (found) {
      return `${found.flag}${found.country}`;
    }
    return "Loading...";
  };

  const handleSortClick = selected => {
    const newFilters = _.cloneDeep(advanceSearchFilters);
    newFilters.sortBy = selected.value;
    setAdvanceSearchFilters(newFilters);
    updateRouterHistory(router, newFilters);
  };
  const handleCountryClick = selected => {
    const newFilters = _.cloneDeep(advanceSearchFilters);
    newFilters.country = selected.value;
    setAdvanceSearchFilters(newFilters);
    updateRouterHistory(router, newFilters);
  };

  const handleClearFilter = () => {
    const newFilters = _.cloneDeep(DefaultSearchFilters);
    setAdvanceSearchFilters(newFilters);
    updateRouterHistory(router, newFilters);
  };

  const handleDeleteFilterSelected = item => {
    const newFilters = _.cloneDeep(advanceSearchFilters);
    if (item.filter === "search") {
      const searchedItems = (newFilters.search || "").split(",");
      newFilters.search = searchedItems.filter(searchItem => searchItem != item.value).join(",");
    } else {
      if (ADVANCE_SEARCH_OPTIONS[item.filter].multiSelect) {
        newFilters[item.filter] = newFilters[item.filter].filter(filter => filter !== item.value);
      } else {
        newFilters[item.filter] = DefaultSearchFilters[item.filter] || "";
      }
    }

    setAdvanceSearchFilters(newFilters);
    updateRouterHistory(router, newFilters);
  };

  const getMaxHeight = () => {
    const height = chipCtMode.mode === "collapse" ? "" : defaultChipCtHeight;
    return height;
  };

  const getMainTitle = () => {
    if (filterSelected.length === 1) {
      return ` in ${filterSelected[0].label}`;
    }
    return "";
  };
  const renderMobile = () => {
    return mapView ? null : (
      <div>
        <DropDownMenu
          data={FilterSortBy.map(item => {
            return {
              ...item,
              icon: nearByIcons(item.icon),
              rightIcon:
                item.value === advanceSearchFilters.sortBy ? (
                  <CheckIcon style={{ color: "#6DA544" }} />
                ) : null,
            };
          })}
          label={getSortingTitle(false) + " Places"}
          selected={advanceSearchFilters.sortBy}
          onItemClick={handleSortClick}
        />
      </div>
    );
  };
  const renderDropDown = () => {
    return (
      <React.Fragment>
        <DropDownMenu
          data={FilterSortBy.map(item => {
            return {
              ...item,
              icon: nearByIcons(item.icon),
              rightIcon:
                item.value === advanceSearchFilters.sortBy ? (
                  <CheckIcon style={{ color: "#6DA544" }} />
                ) : null,
            };
          })}
          label={getSortingTitle(true)}
          selected={advanceSearchFilters.sortBy}
          onItemClick={handleSortClick}
        />
        <div style={{ margin: "0px 10px" }}></div>
        <DropDownMenu
          data={countries
            .filter(country => country.approved)
            .map(country => {
              return {
                label: country.country,
                value: country.id + "",
                icon: <span className={classes.emojiListItemIcon}>{`${country.flag}`}</span>,
                rightIcon:
                  country.id + "" === advanceSearchFilters.country ? (
                    <CheckIcon style={{ color: "#6DA544" }} />
                  ) : null,
              };
            })}
          label={getSelectedCountry(advanceSearchFilters.country)}
          selected={advanceSearchFilters.country}
          onItemClick={handleCountryClick}
        />
      </React.Fragment>
    );
  };

  const renderMapView = () => {
    return renderDropDown();
  };

  const renderGridView = () => {
    return (
      <React.Fragment>
        <Grid item sm={6} md={6} lg={6} xl={6}>
          <Typography variant="h4" color="primary" style={{ fontWeight: 500 }}>
            {getSortingTitle(false)} Places {getMainTitle()}
          </Typography>
        </Grid>
        <Grid item sm={6} md={6} lg={6} xl={6} className={classes.menuContainer}>
          {renderDropDown()}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {renderResultCount()}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div
            ref={chipCtRef}
            style={{
              maxHeight: getMaxHeight(),
              overflow: "hidden",
            }}
          >
            {renderFilterSelection()}
          </div>
          <div style={{ textAlign: "right" }}>
            {chipCtMode.mode.length ? (
              <Chip
                label={chipCtMode.mode === "expand" ? "Show All" : "Show Less"}
                className={classes.filterSelectedChip}
                onClick={handleToggleChip}
              />
            ) : null}
          </div>
        </Grid>
      </React.Fragment>
    );
  };

  const renderWeb = () => {
    return (
      <Grid
        container
        className={clsx(classes.mainContainer, mapView ? classes.mainContainerMapView : "")}
      >
        {mapView ? renderMapView() : renderGridView()}
      </Grid>
    );
  };
  const renderResultCount = () => {
    const mainTitle = getMainTitle();
    return (
      <React.Fragment>
        <span>
          <span style={{ fontWeight: 600 }}>{filterResultCount}</span> results matched{" "}
          {mainTitle ? mainTitle : " your filters"}
        </span>
        <Button
          variant="text"
          size="small"
          color="primary"
          className={classes.clearFilterLink}
          onClick={handleClearFilter}
        >
          Clear all Filters
        </Button>
      </React.Fragment>
    );
  };
  const renderFilterSelection = () => {
    return filterSelected.map(item => (
      <Chip
        key={`filter-item-${item.value}`}
        label={item.label}
        className={classes.filterSelectedChip}
        onDelete={() => handleDeleteFilterSelected(item)}
        deleteIcon={<CloseIcon style={{ color: "#5D5D5D" }} />}
      />
    ));
  };

  return <div style={{ margin: "0px 16px 8px" }}>{isMobile ? renderMobile() : renderWeb()}</div>;
};

const mapStateToProps = (appState: AppState) => {
  return {
    // geoLocation: appState.app.location,
    countries: appState.app.countries,
    advanceSearchFilters: appState.app.advanceSearchFilters,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchFiltersView);
