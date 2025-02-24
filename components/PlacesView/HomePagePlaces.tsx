import React, { FunctionComponent, useEffect, useState } from "react";
// import qs from "qs";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import Link from "next/link";
import { useRouter } from "next/router";
import { Grid, Typography, Drawer, CircularProgress } from "@material-ui/core";
import useStyles from "../../Styles/components/PlacesView/homePagePlaces";
import PlaceCard from "../Cards/placeCard";
import PaginationView from "../Pagination";
import { Pagination, Location, User, AdvanceSearchFilters } from "../../redux/actionTypes";
import { fetchExplorePlaces } from "../../redux/actions/explore";
import { setFilterDrawer } from "../../redux/actions/app";
import { countriesLocations, DefaultCountry } from "../../config";
import Container from "@material-ui/core/Container";
import InfiniteScroll from "react-infinite-scroll-component";
import { getIsMobile, getFilterQueryParams } from "../../utils";
import AdvanceSearch from "../AdvanceSearch";
import AddPlaces from "./addNewPlace";
import clsx from "clsx";
import Fab from "@material-ui/core/Fab";
import { MobileMapIcon } from "../../components/CustomIcon";
import SearchFiltersView from "./SearchFiltersView";
import LoadingOverlay from "react-loading-overlay";

const defaultPagination = { page: 1, pageSize: 3, total: 0, totalPage: 0 };

interface Props {
  explore: any;
  geoLocation: Location;
  profile: User | null;
  fetchExplorePlaces: typeof fetchExplorePlaces;
  isFilterDrawerOpen: boolean;
  setFilterDrawer: typeof setFilterDrawer;
  advanceSearchFilters: AdvanceSearchFilters;
}

const HomePagePlaces: FunctionComponent<Props> = ({
  explore,
  geoLocation,
  isFilterDrawerOpen,
  fetchExplorePlaces,
  setFilterDrawer,
  advanceSearchFilters,
}) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const router = useRouter();
  const [countryLocations, setCountryLocations] = useState([] as any);
  const [loadedLocation, setLoadedLocation] = useState({ lat: 0, lng: 0 } as Location);
  const [reloadPlaces, setReloadPlaces] = useState(false);

  useEffect(() => {
    // can change country thus we have to change showing locations places
    // TODO: tmp assuming only country_id = 18;
    if (hasLocationChanged() || reloadPlaces) {
      if (isMobile) {
        setLoadedLocation(geoLocation);
        fetchExplorePlaces("explore", { country_id: DefaultCountry.id });
      } else {
        setLoadedLocation(geoLocation);
        fetchExplorePlaces("nearBy", { country_id: DefaultCountry.id }, { ...defaultPagination });
        setCountryLocations(countriesLocations[DefaultCountry.country] || []);
      }
    }
  }, [geoLocation, reloadPlaces]);

  useEffect(() => {
    // hot reload only once all loaded
    if (loadedLocation.lat && loadedLocation.lng) {
      let placesKey = "nearby";
      if (isMobile) {
        placesKey = "explore";
      } else {
        router.push("/", "/");
      }
      const { places } = getExploreState(placesKey);
      setReloadPlaces(places.length <= 0);
    }
  }, [isMobile]);

  useEffect(() => {
    countryLocations.map(location => {
      fetchExplorePlaces(
        location.key,
        { location: location.value, country_id: DefaultCountry.id },
        { ...defaultPagination }
      );
      return location;
    });
  }, [countryLocations]);

  useEffect(() => {
    if (isMobile) {
      fetchExplorePlaces("explore", { ...getFilterQueryParams(advanceSearchFilters, true) });
    }
  }, [advanceSearchFilters]);

  const hasLocationChanged = () => {
    if (!loadedLocation && geoLocation && geoLocation.lat && geoLocation.lng) {
      return true;
    }
    if (
      geoLocation &&
      loadedLocation &&
      (geoLocation.lat !== loadedLocation.lat || geoLocation.lng !== loadedLocation.lng)
    ) {
      return true;
    }
    return false;
  };

  const getExploreState = stateKey => {
    return {
      loading: explore.loading[stateKey] || false,
      places: explore.places[stateKey] || [],
      pagination: explore.pagination[stateKey] || defaultPagination,
    };
  };

  const handlePageChange = (
    stateKey: string,
    pagination: Pagination,
    page: number,
    mode: string = ""
  ) => {
    fetchExplorePlaces(
      stateKey,
      { __extras: { isPaginationScroll: mode! === "scroll" ? true : false } },
      { ...pagination, page }
    );
  };

  const handleFilterDrawerToggle = () => {
    setFilterDrawer(!isFilterDrawerOpen);
  };

  const handleScrollPagination = () => {
    const { pagination } = getExploreState("explore");
    const page = pagination.page || 1;
    const total = pagination.totalPage || 0;
    const newPage = page + 1;
    if (newPage <= total) {
      handlePageChange("explore", pagination, newPage, "scroll");
    }
  };

  const handleClickOnMapIcon = () => {
    let queryString = "";
    if (router.asPath.indexOf("?") >= 0) {
      queryString = `?${router.asPath.split("?").pop()}`;
    }
    router.push("/explore-maps", `/maps${queryString}`);
  };

  const renderPlacesRow = (stateKey, label, location) => {
    const { loading, places, pagination } = getExploreState(stateKey);
    return places.length <= 0 ? null : (
      <div>
        <div>
          <Typography
            variant="h4"
            className={classes.placeHeading}
            style={{ float: "left", paddingLeft: "8px" }}
          >
            {label}
          </Typography>
          <div className={classes.directionIcon} style={{ float: "right", paddingRight: "8px" }}>
            <PaginationView
              page={pagination.page}
              totalPage={pagination.totalPage || 0}
              handleChange={(page, mode) => handlePageChange(stateKey, pagination, page, mode)}
            />
          </div>
        </div>
        <LoadingOverlay
          active={loading}
          spinner={<CircularProgress />}
          text=""
          styles={{
            content: base => ({
              ...base,
              color: "#919191",
            }),
            overlay: base => ({
              ...base,
              zIndex: 9999,
              color: "#919191",
              backgroundColor: "rgba(255,255,255,.5)",
            }),
            wrapper: {
              clear: "both",
              position: "relative",
            },
          }}
        >
          <Grid container>
            {places.map(place => (
              <Grid
                item
                key={`places_${place.id}_${stateKey}`}
                xs={12}
                sm={6}
                md={4}
                xl={4}
                lg={4}
                style={{ padding: "8px" }}
              >
                <PlaceCard data={place} />
              </Grid>
            ))}
          </Grid>
        </LoadingOverlay>
        <div style={{ marginBottom: "30px", marginRight: "15px", textAlign: "right" }}>
          {pagination.total! > pagination.pageSize && (
            <Link href={location ? `/explore?location=${location}` : "/explore"}>
              <a className={classes.totalPlaces}>View all Places ({pagination.total}+) ></a>
            </Link>
          )}
        </div>
      </div>
    );
  };

  const renderFilterDrawer = () => {
    return (
      <Drawer anchor="bottom" open={isFilterDrawerOpen} onClose={handleFilterDrawerToggle}>
        <AdvanceSearch isMobile={isMobile} />
      </Drawer>
    );
  };

  const getListTitleMenu = () => {
    return (
      <div>
        <SearchFiltersView filterResultCount={0} />
      </div>
    );
  };

  const renderScrollView = () => {
    const { loading, places, pagination } = getExploreState("explore");
    return (
      <Grid container direction="row">
        {renderFilterDrawer()}
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          <React.Fragment>
            {getListTitleMenu()}
            <InfiniteScroll
              dataLength={places.length || 0} //This is important field to render the next data
              next={() => handleScrollPagination()}
              hasMore={loading ? true : places.length < pagination.total! ? true : false}
              loader={
                <div style={{ minHeight: "80px", marginLeft: "32px" }}>
                  <CircularProgress />
                </div>
              }
              endMessage={
                loading ? <div>Loading...</div> : <AddPlaces isMobile={isMobile} showTitle={true} />
              }
              style={{ width: "100%" }}
            >
              <Grid container style={{ marginBottom: 10, width: "100%", padding: "0px 8px" }}>
                {places.map(place => (
                  <Grid
                    item
                    key={`places_${place.id}_explore`}
                    xs={12}
                    sm={6}
                    md={6}
                    xl={4}
                    lg={4}
                    style={{ padding: isMobile ? "8px" : "8px" }}
                  >
                    <PlaceCard data={place} />
                  </Grid>
                ))}
              </Grid>
            </InfiniteScroll>
          </React.Fragment>
        </Grid>
      </Grid>
    );
  };

  const renderMobile = () => {
    let showFabIcon: boolean = true;
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

  const renderWeb = () => {
    return (
      <div
        style={{
          marginLeft: 100,
          marginRight: 120,
          marginTop: 0,
        }}
      >
        {renderPlacesRow("nearBy", "Nearby Places", "")}
        {countryLocations.map(location => (
          <React.Fragment key={location.key}>
            {renderPlacesRow(location.key, `Places in ${location.value}`, location.value)}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return <Container>{isMobile ? renderMobile() : renderWeb()}</Container>;
};

const mapStateToProps = (appState: AppState) => {
  return {
    explore: appState.explore,
    geoLocation: appState.app.location,
    profile: appState.user.profile,
    isFilterDrawerOpen: appState.app.isFilterDrawerOpen,
    advanceSearchFilters: appState.app.advanceSearchFilters,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePagePlaces);
