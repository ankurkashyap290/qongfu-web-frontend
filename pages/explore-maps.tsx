import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { NextPage } from "next";
import _ from "lodash";
import actionCreators from "../redux/actions";
import Map from "../components/Map";
import { fetchAllPlaces } from "../redux/actions/map";
import { Places, AdvanceSearchFilters, Location } from "../redux/actionTypes";
import { AppState } from "../redux/reducers";
import ExplorerLayout from "../components/Layout/ExplorerLayout";
import useStyles from "../Styles/exploreMaps";
import AdvanceSearch from "../components/AdvanceSearch";
import { getIsMobile, getFilterQueryParams } from "../utils";
import SearchFiltersView from "../components/PlacesView/SearchFiltersView";
import PlaceCarousel from "../components/ExploreMapView/PlaceCarousel";
import { Button, Fab, Drawer } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { setFilterDrawer, setAdvanceSearchFilters } from "../redux/actions/app";
import { loadFiltersFromQuery } from "../utils";
import AppPageContext from "../redux/lib/AppPageContext";
interface Props {
  places: Places[];
  fetchAllPlaces: typeof fetchAllPlaces;
  advanceSearchFilters: AdvanceSearchFilters;
  geoLocation: Location;
  loading: boolean;
  isFilterDrawerOpen: boolean;
  setFilterDrawer: typeof setFilterDrawer;
}

interface MapInfo {
  max_distance: number;
  location_lat: string;
  location_lng: string;
}

const ExploreMaps: NextPage<Props> = ({
  places,
  fetchAllPlaces,
  advanceSearchFilters,
  geoLocation,
  loading,
  isFilterDrawerOpen,
  setFilterDrawer,
}) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const [initialLoad, setInitialLoad] = useState(false);
  const [mapInfo, updateMapInfo] = useState({
    max_distance: 0,
    location_lat: "",
    location_lng: "",
    map: true,
  } as MapInfo);

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isCarouselOpen, setCarouselState] = useState(false);

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
    if (geoLocation.lat && geoLocation.lng) {
      fetchAllPlaces({
        ...getFilterQueryParams(advanceSearchFilters, true),
        ...(mapInfo.max_distance ? mapInfo : {}),
      });
    }
  }, [advanceSearchFilters, geoLocation]);

  const handlerMapChange = ({ center, distance }) => {
    const mapDetails = {
      max_distance: Math.ceil(distance / 2), //keep distance half of the two points of center
      location_lat: center.lat.toFixed(8),
      location_lng: center.lng.toFixed(8),
      map: true,
    };
    updateMapInfo(mapDetails);
    fetchAllPlaces({
      ...getFilterQueryParams(advanceSearchFilters, true),
      ...mapDetails,
    });
  };

  const toggleCarousel = () => {
    setCarouselState(!isCarouselOpen);
  };

  const handleMapCenter = () => {
    console.log("set center point");
  };

  const handleFilterDrawerToggle = () => {
    setFilterDrawer(!isFilterDrawerOpen);
  };

  const handleMarkerClick = value => {
    if (!isCarouselOpen) {
      setCarouselState(true);
    }
    setActiveItemIndex(value);
  };

  const renderFilterDrawer = () => {
    return (
      <Drawer anchor="bottom" open={isFilterDrawerOpen} onClose={handleFilterDrawerToggle}>
        <AdvanceSearch isMobile={isMobile} mapView={true} />
      </Drawer>
    );
  };

  const renderFilterContainer = () => {
    return (
      <div style={{ width: 320, position: "absolute", top: "10px", left: "10px" }}>
        <AdvanceSearch isMobile={isMobile} mapView={true} />
      </div>
    );
  };

  return (
    <ExplorerLayout showHeroHeader={false} pageType="search" loading={loading}>
      <main className={classes.mainContainer} style={{ position: "relative" }}>
        {/* TODO: SET CENTER POINT OF GEOLOCATION WHEN GEOLOCATION DATA AVAILABLE */}
        <Map
          height={`calc(100vh - ${isMobile ? "65px" : "80px"})`}
          markers={places}
          onMapChange={handlerMapChange}
          setActiveItemIndex={handleMarkerClick}
        ></Map>
        {isMobile ? renderFilterDrawer() : renderFilterContainer()}

        <div style={{ position: "absolute", top: "10px", right: "30px" }}>
          <SearchFiltersView filterResultCount={0} mapView />
        </div>
        {places.length ? (
          <div
            style={
              isMobile
                ? {
                    display: "flex",
                    flexDirection: "column-reverse",
                    position: "absolute",
                    bottom: "10px",
                    left: "0px",
                    width: "100vw",
                  }
                : { position: "absolute", top: "77px", right: "10px", width: "400px" }
            }
          >
            <div style={{ width: "100%", display: isCarouselOpen ? "" : "none" }}>
              <PlaceCarousel
                places={places}
                activeItemIndex={activeItemIndex}
                setActiveItemIndex={setActiveItemIndex}
                isMobile={true} //show always mobile view as per requirements now
              />
            </div>
            <div style={{ width: "100%", textAlign: "center", marginTop: "16px" }}>
              <Button size="small" className={classes.toggleCarouselBtn} onClick={toggleCarousel}>
                {isCarouselOpen ? (
                  <span>
                    Hide <ExpandLessIcon style={{ verticalAlign: "middle" }} />
                  </span>
                ) : (
                  <span>
                    Show Place <ExpandMoreIcon style={{ verticalAlign: "middle" }} />
                  </span>
                )}
              </Button>
            </div>
          </div>
        ) : null}
        <div
          style={{
            position: "absolute",
            bottom: isMobile && isCarouselOpen ? "300px" : "64px",
            right: "64px",
          }}
        >
          <Fab
            variant="round"
            size="medium"
            color="primary"
            aria-label="center"
            onClick={handleMapCenter}
            disableRipple
          >
            <MyLocationIcon />
          </Fab>
        </div>
      </main>
    </ExplorerLayout>
  );
};

ExploreMaps.getInitialProps = async (ctx: AppPageContext): Promise<Props> => {
  if (ctx.isServer && ctx.store) {
    console.log("ctx.query", ctx.query);
    ctx.store.dispatch(setAdvanceSearchFilters(loadFiltersFromQuery(ctx.query ? ctx.query : null)));
  } else if (!ctx.isServer) {
    if (ctx.query && ctx.query.reset === "true") {
      ctx.store.dispatch(
        setAdvanceSearchFilters(loadFiltersFromQuery(ctx.query ? ctx.query : null))
      );
    }
  }
  // @ts-ignore
  return {};
};

const mapStateToProps = (appState: AppState) => {
  return {
    loading: appState.map.loading,
    places: appState.map.places,
    advanceSearchFilters: appState.app.advanceSearchFilters,
    geoLocation: appState.app.location,
    isFilterDrawerOpen: appState.app.isFilterDrawerOpen,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMaps);
