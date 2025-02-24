import React, { FunctionComponent, useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
// import qs from "qs";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import Container from "@material-ui/core/Container";
import { Grid, CircularProgress, Typography, Drawer, Divider } from "@material-ui/core";
import { useRouter } from "next/router";
import PlaceCard from "../Cards/placeCard";
import useStyles from "../../Styles/index";
import PaginationView from "../Pagination";
import InfiniteScroll from "react-infinite-scroll-component";
import { Places, Pagination, Location, AdvanceSearchFilters, User } from "../../redux/actionTypes";
import AddPlaces from "./addNewPlace";
// import { CATEGORY_FILTERS } from "../../constants";
import { getIsMobile, getFilterQueryParams } from "../../utils";
import { fetchPlaces } from "../../redux/actions/places";
import {
  setMapView,
  setFilterDrawer,
  setAdvanceSearchFilters,
  setLifestyleSlug,
} from "../../redux/actions/app";
import clsx from "clsx";
import Fab from "@material-ui/core/Fab";
import MapView from "../../components/ExploreMapView";
import { MobileMapIcon } from "../../components/CustomIcon";
import AdvanceSearch from "../AdvanceSearch";
import MapActions from "../ExploreMapView/MapActions";
import SearchFiltersView from "./SearchFiltersView";

const distanceGroupLimit = 15;
const ratingGroupLimit = 5;
interface Props {
  advanceSearchFilters: AdvanceSearchFilters;
  lifestyleSlug: string;
  places: Places[];
  pagination: Pagination;
  loading: boolean;
  geoLocation: Location;
  fetchPlaces: typeof fetchPlaces;
  paginationType: string;
  mapView: boolean;
  setMapView: typeof setMapView;
  setLifestyleSlug: typeof setLifestyleSlug;
  isFilterDrawerOpen: boolean;
  setFilterDrawer: typeof setFilterDrawer;
  setAdvanceSearchFilters: typeof setAdvanceSearchFilters;
  reloadData?: boolean;
  profile: User | null;
}

const PlacesView: FunctionComponent<Props> = ({
  advanceSearchFilters,
  lifestyleSlug,
  places = [],
  loading,
  fetchPlaces,
  geoLocation,
  pagination,
  paginationType,
  mapView,
  isFilterDrawerOpen,
  setMapView,
  setLifestyleSlug,
  setFilterDrawer,
  reloadData,
  profile,
}) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const router = useRouter();
  const [initialLoad, setInitialLoad] = React.useState(false);
  console.log("sort", advanceSearchFilters);
  const pageView = paginationType === "scroll" ? "scrollView" : "normalView";

  // FOR FIRST TIME LOAD CHECK THAT PLACES HAS CHANGED
  useEffect(() => {
    if (!initialLoad) {
      setInitialLoad(true);
    }
  }, [places]);

  // FETCH PLACES
  // a. FOR ANY FILTER CHANGE
  // b. FOR LOCATION CHANGE
  useEffect(() => {
    fetchPlaces({ ...getFilterQueryParams(advanceSearchFilters, true) });
  }, [advanceSearchFilters, geoLocation]);

  // RESET FILTERS AND RELOAD DATA
  useEffect(() => {
    if (reloadData === true) {
      console.log("Reset FILTERS to reload data");
    }
  }, [reloadData]);

  const handlePageChange = (page: number, mode: string = "") => {
    fetchPlaces(
      {
        ...getFilterQueryParams(advanceSearchFilters, true),
        __extras: { isPaginationScroll: mode! === "scroll" ? true : false },
      },
      { ...pagination, page }
    );
  };

  const handleScrollPagination = () => {
    const page = pagination.page || 1;
    const total = pagination.totalPage || 0;
    const newPage = page + 1;
    if (newPage <= total) {
      handlePageChange(newPage, "scroll");
    }
  };

  const handleClickOnMapIcon = () => {
    let queryString = "";
    if (router.asPath.indexOf("?") >= 0) {
      queryString = `?${router.asPath.split("?").pop()}`;
    }
    router.push("/explore-maps", `/maps${queryString}`);
  };

  const handleFilterDrawerToggle = () => {
    setFilterDrawer(!isFilterDrawerOpen);
  };

  const handleLifeStyleChange = slug => {
    setLifestyleSlug({ slug });
  };

  const handleFilterChange = (filters, viewChange) => {
    console.log(filters, viewChange);
  };

  const renderFilterContainer = () => {
    return (
      <Grid
        item
        xs={12}
        sm={12}
        md={3}
        lg={3}
        xl={3}
        className={mapView ? classes.searchMapView : ""}
      >
        <AdvanceSearch isMobile={isMobile} />
      </Grid>
    );
  };

  const renderFilterDrawer = () => {
    return (
      <Drawer anchor="bottom" open={isFilterDrawerOpen} onClose={handleFilterDrawerToggle}>
        <AdvanceSearch isMobile={isMobile} />
      </Drawer>
    );
  };

  const renderScrollView = () => {
    return (
      <Grid
        container
        direction="row"
        style={mapView ? { float: "left", width: "0px" } : { paddingLeft: isMobile ? "" : "16px" }}
      >
        {isMobile ? renderFilterDrawer() : renderFilterContainer()}
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          {mapView ? (
            <React.Fragment>
              <MapView
                zoom={12}
                isMapView={mapView}
                onMapViewChange={setMapView}
                onLifestyleChange={handleLifeStyleChange}
                places={places}
                isMobile={isMobile}
                loading={!initialLoad || loading ? true : false}
                lifestyleSlug={lifestyleSlug}
              />
              {isMobile && (
                <MapActions
                  openLeftDrawer={() => {}}
                  isMapView={mapView}
                  setIsMapView={() => handleFilterChange(null, "gridView")}
                  isMobile={isMobile}
                />
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* {isMobile ? getListTitleMenu() : getListTitle()} */}
              <SearchFiltersView filterResultCount={pagination.total || 0} />
              <InfiniteScroll
                dataLength={places.length || 0} //This is important field to render the next data
                next={() => handleScrollPagination()}
                hasMore={
                  !initialLoad || loading ? true : places.length < pagination.total! ? true : false
                }
                loader={
                  <div style={{ minHeight: "80px", marginLeft: "32px" }}>
                    <CircularProgress />
                  </div>
                }
                endMessage={
                  loading ? (
                    <div>Loading...</div>
                  ) : (
                    <AddPlaces isMobile={isMobile} showTitle={true} />
                  )
                }
                style={{ width: "100%" }}
              >
                {advanceSearchFilters.sortBy === "distance"
                  ? renderDistaceDivider()
                  : renderRatingDivider()}
              </InfiniteScroll>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    );
  };

  const renderDistaceDivider = () => {
    let addedDivider = false;

    return (
      <Grid container style={{ marginBottom: 10, width: "100%", padding: "0px 8px" }}>
        {places.map(place => {
          const distance_rounded = place?.distance_rounded || 0;
          const element = (
            <React.Fragment key={`places_${place.id}`}>
              {" "}
              <Grid item xs={12} sm={6} md={4} xl={4} lg={4} style={{ padding: "8px" }}>
                <PlaceCard data={place} />
              </Grid>
              {!addedDivider && distance_rounded > distanceGroupLimit ? (
                <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                  <div style={{ textAlign: "center", color: "#919191", margin: "20px 0px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: "35%",
                        verticalAlign: "middle",
                      }}
                    >
                      <Divider style={{ height: "2px" }} />
                    </span>
                    <span style={{ padding: "0 10px" }}>{distanceGroupLimit}+Kms Away</span>
                    <span
                      style={{
                        display: "inline-block",
                        width: "35%",
                        verticalAlign: "middle",
                      }}
                    >
                      <Divider style={{ height: "2px" }} />
                    </span>
                  </div>
                </Grid>
              ) : null}
            </React.Fragment>
          );
          addedDivider = distance_rounded > 15;
          return element;
        })}
      </Grid>
    );
  };

  const renderRatingDivider = () => {
    let ratingDivider = false;
    return (
      <Grid container style={{ marginBottom: 10, width: "100%", padding: "0px 8px" }}>
        {places.map(place => {
          const rating = place.stars || 0;
          const element = (
            <React.Fragment key={`places_${place.id}`}>
              {" "}
              <Grid item xs={12} sm={6} md={4} xl={4} lg={4} style={{ padding: "8px" }}>
                <PlaceCard data={place} />
              </Grid>
              {!ratingDivider && rating < ratingGroupLimit ? (
                <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                  <div style={{ textAlign: "center", color: "#919191", margin: "20px 0px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: "35%",
                        verticalAlign: "middle",
                      }}
                    >
                      <Divider style={{ height: "2px" }} />
                    </span>
                    <span style={{ padding: "0 10px" }}>+{ratingGroupLimit} Stars</span>
                    <span
                      style={{
                        display: "inline-block",
                        width: "35%",
                        verticalAlign: "middle",
                      }}
                    >
                      <Divider style={{ height: "2px" }} />
                    </span>
                  </div>
                </Grid>
              ) : null}
            </React.Fragment>
          );
          ratingDivider = rating < 5;
          return element;
        })}
      </Grid>
    );
  };

  const renderNormalView = () => {
    return (
      <div
        style={{
          marginLeft: 100,
          marginRight: 100,
          marginTop: 0,
        }}
      >
        <div>
          <Typography
            variant="h4"
            className={classes.placeHeading}
            style={{ float: "left", paddingLeft: "8px" }}
          >
            Places
          </Typography>
          <div className={classes.directionIcon} style={{ float: "right", paddingRight: "8px" }}>
            <PaginationView
              page={pagination.page}
              totalPage={pagination.totalPage || 0}
              handleChange={handlePageChange}
            />
          </div>
        </div>
        <Grid container style={{ marginBottom: 10, clear: "both" }}>
          {places.map(place => (
            <Grid
              item
              key={`places_${place.id}`}
              xs={12}
              sm={6}
              md={6}
              xl={4}
              lg={4}
              style={{ padding: "8px" }}
            >
              <PlaceCard data={place} />
            </Grid>
          ))}
        </Grid>
        {pagination.total! > pagination.pageSize && (
          <div style={{ marginTop: "25px", marginBottom: "70px", marginLeft: "8px" }}>
            <Link href="/places">
              <a className={classes.totalPlaces}>View all Places ({pagination.total}+) </a>
            </Link>
          </div>
        )}
      </div>
    );
  };

  const renderWeb = () => {
    return pageView === "scrollView" ? renderScrollView() : renderNormalView();
  };

  const renderMobile = () => {
    let showFabIcon: boolean = !mapView;
    if (router.pathname === "/" && !profile) {
      showFabIcon = false;
    }
    return (
      <React.Fragment>
        {renderScrollView()}
        {showFabIcon && (
          <div className={clsx(classes.mbMapViewContainer, classes.hiddenXs)}>
            <Fab
              variant="round"
              size="large"
              color="primary"
              aria-label="add"
              className={classes.mbMapViewBtn}
              onClick={handleClickOnMapIcon}
              disableRipple
            >
              <MobileMapIcon className={classes.mbMapViewIcon} />
            </Fab>
          </div>
        )}
      </React.Fragment>
    );
  };
  return <Container>{isMobile ? renderMobile() : renderWeb()}</Container>;
};

const mapStateToProps = (appState: AppState) => {
  return {
    places: appState.places.places,
    pagination: appState.places.pagination,
    loading: appState.places.loading || false,
    geoLocation: appState.app.location,
    lifestyleSlug: appState.app.lifestyleSlug,
    advanceSearchFilters: appState.app.advanceSearchFilters,
    mapView: appState.app.mapView,
    isFilterDrawerOpen: appState.app.isFilterDrawerOpen,
    profile: appState.user.profile,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlacesView);
