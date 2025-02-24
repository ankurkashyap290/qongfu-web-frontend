import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { useRouter } from "next/router";
import { ViewMapIcon } from "../CustomIcon";
import GridView from "../CustomIcon/GridView";
import useStyles from "../../Styles/components/advanceSearch";
import AdvanceSearchCollapse from "./advanceSearchCollapse";
import { AdvanceSearchFilters, Countries } from "../../redux/actionTypes";
import { setAdvanceSearchFilters } from "../../redux/actions/app";
import { DefaultSearchFilters } from "../../config";
import MapActions from "../ExploreMapView/MapActions";
import { updateRouterHistory } from "../../utils";

interface Props {
  mapView?: boolean;
  setAdvanceSearchFilters: typeof setAdvanceSearchFilters;
  advanceSearchFilters: AdvanceSearchFilters;
  isMobile: boolean;
  mbFilterDrawerClose?: Function;
  filterLocations: string[] | [];
  onFilterChange?: Function;
  areaAndCities: any[];
  countries: Countries[];
}

const AdvanceSearch: FunctionComponent<Props> = ({
  mapView = false,
  setAdvanceSearchFilters,
  advanceSearchFilters,
  onFilterChange,
  isMobile,
  areaAndCities,
  countries,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [drawerOpen, toggleFilterDrawer] = useState(true);

  const handleToggleFilter = () => {
    toggleFilterDrawer(!drawerOpen);
  };

  const toggleResultView = () => {
    let queryString = "";
    if (router.asPath.indexOf("?") >= 0) {
      queryString = `?${router.asPath.split("?").pop()}`;
    }
    if (mapView) {
      router.push("/explore-search", `/explore${queryString}`);
    } else {
      router.push("/explore-maps", `/maps${queryString}`);
    }
  };

  const _handleResetFilters = () => {
    const resetFilters = { ...DefaultSearchFilters };
    setAdvanceSearchFilters({ ...resetFilters });
    updateRouterHistory(router, resetFilters);
    onFilterChange && onFilterChange({ ...resetFilters }, "");
  };

  const handleFilterChange = filters => {
    setAdvanceSearchFilters({ ...filters });
    updateRouterHistory(router, filters);
    onFilterChange && onFilterChange({ ...filters }, "");
  };

  return (
    <div className={drawerOpen ? classes.advanceSearchRoot : ""}>
      <div
        style={
          !isMobile && mapView
            ? {
                overflowY: "auto",
                overflowX: "hidden",
                height: "calc(100vh - 220px)",
                display: drawerOpen ? "" : "none",
              }
            : {}
        }
      >
        <div
          className={clsx(classes.advSearchMarginBottom, classes.hiddenSm)}
          style={{ marginTop: "5px" }}
        >
          <Button
            className={classes.advanceSearchLabel}
            disableRipple
            onClick={() => toggleResultView()}
          >
            {mapView ? (
              <div className={classes.gridViewIcon}>
                <GridView />
              </div>
            ) : (
              <ViewMapIcon fontSize="large" />
            )}
            <span className={classes.labelText} style={{ fontWeight: 600 }}>
              {mapView ? "View Result on Grid" : "View Result on Map"}
            </span>
          </Button>
        </div>

        <div className={classes.advSearchMarginBottom}>
          <AdvanceSearchCollapse
            isMobile={isMobile}
            selectedFilters={advanceSearchFilters}
            onChangeFilter={handleFilterChange}
            areaAndCities={areaAndCities}
            countries={countries}
          />
        </div>

        <div className={clsx(classes.advanceSearchHead, classes.hiddenXs)}>
          <Button
            color="primary"
            classes={{
              label: classes.resetLabel,
              textPrimary: classes.advanceSearchTextPrimary,
              root: isMobile ? classes.mbResetButton : "",
            }}
            disableRipple
            onClick={_handleResetFilters}
          >
            Reset Settings (Default)
          </Button>
        </div>
      </div>

      {mapView &&
        (drawerOpen ? (
          <div className={clsx(classes.advSearchMarginFilterBottomBottom, classes.hiddenSm)}>
            <Button
              variant="contained"
              className={classes.advanceSearchHideFilters}
              disableRipple
              onClick={handleToggleFilter}
            >
              Hide Filter
            </Button>
          </div>
        ) : (
          <MapActions
            openLeftDrawer={handleToggleFilter}
            isMapView={mapView}
            setIsMapView={toggleResultView}
            isMobile={isMobile}
          />
        ))}
    </div>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    // mapView: appState.app.mapView,
    filterLocations: appState.places.locations || [],
    advanceSearchFilters: appState.app.advanceSearchFilters,
    areaAndCities: appState.app.areaAndCities,
    countries: appState.app.countries,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceSearch);
