import React, { FunctionComponent, useState, useEffect } from "react";
import { Drawer, Dialog, DialogContent, DialogTitle, Button, IconButton } from "@material-ui/core";
import clsx from "clsx";
import CloseIcon from "@material-ui/icons/Close";
import Map from "../Map";
import useStyles from "../../Styles/components/mapView";
import { Places } from "../../redux/actionTypes";
import PlaceCarousel from "../ExploreMapView/PlaceCarousel";
import AddPlaces from "../PlacesView/addNewPlace";
import Search from "../Search/lifestyleSearch";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useRouter } from "next/router";
import LoadingOverlay from "react-loading-overlay";
import LocationOnIcon from "@material-ui/icons/LocationOn";

interface Props {
  zoom: number;
  isMapView: boolean;
  onMapViewChange: Function;
  onLifestyleChange: Function;
  places: Places[];
  isMobile?: boolean;
  handleHeadSelectOnChange?: Function;
  lifestyleSlug?: string;
  loading: boolean;
}

const MapView: FunctionComponent<Props> = props => {
  const { places, isMobile, lifestyleSlug, loading, onLifestyleChange } = props;

  const classes = useStyles();
  const router = useRouter();

  const [initialLoad, setInitialLoad] = useState(false);

  const [noResultFoundVisibility, setNoResultFoundVisibility] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [mbSliderDrawerOpen, setMbSliderDrawerOpen] = useState(true);

  useEffect(() => {
    if (initialLoad && !loading && places && places.length === 0) {
      setNoResultFoundVisibility(true);
    }
    if (!initialLoad) {
      setInitialLoad(true);
    }
  }, [places, initialLoad, loading]);

  const handleSetActiveItemIndex = id => {
    const foundedIndex = places.findIndex((item: Places) => item.id === id);
    if (foundedIndex > -1) {
      setActiveItemIndex(foundedIndex);
      setMbSliderDrawerOpen(true);
    }
  };

  const handleSetMbSliderDrawer = () => {
    setMbSliderDrawerOpen(!mbSliderDrawerOpen);
  };

  const handleModalClose = () => {
    setNoResultFoundVisibility(false);
  };

  return (
    <React.Fragment>
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
            width: "100vw",
            height: "100vh",
          }),
        }}
      >
        {"  "}
      </LoadingOverlay>
      <div className={classes.mapView}>
        <Map
          height={isMobile ? "calc(100vh - 65px)" : "calc(100vh - 80px)"}
          markers={places}
          setActiveItemIndex={handleSetActiveItemIndex}
        />
      </div>
      {router.pathname === "/lifestyle-details" && !isMobile ? (
        <div style={{ position: "absolute", top: "10px", right: "10px", width: "420px" }}>
          <Search
            lifestyleSlug={lifestyleSlug}
            handleHeadSelectOnChange={value => {
              onLifestyleChange(value);
              router.push(`/lifestyle-details`, `/lifestyle/${value}?map_view=true`);
            }}
            view="mapView"
          />
        </div>
      ) : null}
      <div className={clsx(isMobile ? "" : classes.mapViewContent)}>
        {isMobile && places.length > 0 && (
          <div className={clsx(classes.mapViewContent)}>
            <div className={mbSliderDrawerOpen ? classes.mbHideButton : classes.mbShowButton}>
              <Button
                variant="contained"
                color="primary"
                endIcon={mbSliderDrawerOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                className={clsx(classes.mbMapSliderShowHideBtn, classes.hiddenXs)}
                disableRipple
                onClick={handleSetMbSliderDrawer}
              >
                {mbSliderDrawerOpen ? "Hide" : "Show"}
              </Button>
            </div>
          </div>
        )}
        <div
          className={clsx(
            mbSliderDrawerOpen ? classes.locationContainerTop : classes.locationContainerBottom,
            !isMobile
              ? places.length > 0
                ? classes.locationContainerTop
                : classes.locationContainerBottom
              : ""
          )}
        >
          <IconButton>
            <LocationOnIcon />
          </IconButton>
        </div>

        <Drawer
          variant="persistent"
          anchor="bottom"
          open={!isMobile ? true : mbSliderDrawerOpen}
          classes={{ paper: classes.drawerBottomPaper }}
        >
          <PlaceCarousel
            places={places}
            activeItemIndex={activeItemIndex}
            setActiveItemIndex={setActiveItemIndex}
            isMobile={isMobile}
          />
        </Drawer>
      </div>
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={noResultFoundVisibility}
        onClose={handleModalClose}
        maxWidth="xl"
      >
        <DialogTitle>
          <div style={{ textAlign: "right" }}>
            <CloseIcon className={classes.closeIcon} onClick={handleModalClose} />
          </div>
        </DialogTitle>
        <DialogContent>
          <AddPlaces isMobile={isMobile} showTitle={true} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default MapView;
