import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { NextPage } from "next";
import clsx from "clsx";
import { Grid, Card, CardContent, Divider, Typography } from "@material-ui/core";
import ExplorerLayout from "../components/Layout/ExplorerLayout";
import actionCreators from "../redux/actions";
import Head from "../components/PlacesDetails/head";
import useStyles from "../Styles/placeDetails";
import WeeklySchedule from "../components/PlacesDetails/weeklySchedule";
import Location from "../components/PlacesDetails/Location";
import MoreInfo from "../components/PlacesDetails/MoreInfo";
// import AboutUs from "../components/PlacesDetails/aboutUs";
import MediaGallery from "../components/PlacesDetails/mediaGallery";
import MobileMediaGallery from "../components/PlacesDetails/mobileMediaGallery";
import RatingsAndReviews from "../components/PlacesDetails/ratingsAndReviews";
import { getPlace as fetchPlace } from "../redux/actions/places";
import { Places } from "../redux/actionTypes";
import { AppState } from "../redux/reducers";
import { getIsMobile } from "../utils";
import { hideDialog } from "../redux/actions/app";
import LifeStylesAndQongfus from "../components/LifestylesAndQongfus";
import Container from "@material-ui/core/Container";
import AppPageContext from "../redux/lib/AppPageContext";
import { useRouter } from "next/router";
import { IMAGE_API } from "../config";

interface Props {
  getPlace?: typeof fetchPlace;
  slug: string;
  place?: Places | null;
  hideDialog?: typeof hideDialog;
  systemLifestyles?: any[];
  placeError?: string | null;
}

const PlaceDetails: NextPage<Props> = ({
  place,
  slug,
  hideDialog,
  systemLifestyles,
  placeError,
}) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [scrollHeaderOn, setScrollHeader] = useState(false);
  const router = useRouter();
  const classes = useStyles();
  const isMobile = getIsMobile();

  useEffect(() => {
    if (placeError === "404") {
      router.replace("/404");
    }
  }, [placeError]);

  useEffect(() => {
    let loadPlace = !initialLoad && !place;
    if (place && place.slug !== slug) {
      loadPlace = true;
    }
    if (loadPlace) {
      setInitialLoad(true);
      // getPlace!({ slug });
    }
  }, [place]);

  const handleSetScrollHeader = value => {
    setScrollHeader(value);
  };

  const renderLifestylesAndQongfus = () => {
    return (
      <LifeStylesAndQongfus
        lifestyles={place!.lifestyles || []}
        qongfuMax={9}
        qongfus={place!.qongfus || []}
        systemLifestyles={systemLifestyles || []}
      />
    );
  };

  return (
    <ExplorerLayout showHeroHeader={false} pageType="placeDetails">
      <main className={classes.mainMargin}>
        {place ? (
          <Container>
            <Head
              coverImage={
                place.place_cover_url
                  ? `${IMAGE_API}${place.place_cover_url!}`
                  : `https://via.placeholder.com/728.png?text=${place.place_name}`
              }
              logo={
                place.place_logo_url
                  ? `${IMAGE_API}${place.place_logo_url!}`
                  : `https://via.placeholder.com/728.png?text=${place.place_name}`
              }
              name={place.place_name!}
              location={place.location!}
              star={place.stars!}
              score={place.ratings_count!}
              isMobile={isMobile}
              open={place.start!}
              close={place.close!}
              openNow={place.open_now!}
              dayNumber={place.today_day_of_week!}
              verified={place.verified!}
              timingCalculated={place.timing_calculated!}
              tabValue={tabValue}
              setTabValue={setTabValue}
              scrollHeaderOn={scrollHeaderOn}
              setScrollHeader={handleSetScrollHeader}
              hideDialog={hideDialog!}
            />
            <Grid
              container
              className={clsx(
                classes.placeDetailBody,
                classes.hiddenSm,
                scrollHeaderOn ? classes.onScrollMargin : ""
              )}
            >
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <WeeklySchedule
                  data={place.timing_calculated!}
                  dayNumber={place.today_day_of_week!}
                  openToday={place.open_now!}
                  mode="inline"
                />
                <Location
                  geoLocation={{
                    lat: parseFloat(place.location_lat!),
                    lng: parseFloat(place.location_lng!),
                  }}
                  zoom={12}
                  address={place.address! || place.location!}
                  place={place}
                />
                <Card className={classes.mainCard} style={{ marginRight: "16px" }}>
                  <CardContent>{renderLifestylesAndQongfus()}</CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <Card className={classes.mainCard}>
                  <CardContent>
                    <Grid container direction="row" style={{ padding: "0px 16px" }}>
                      <Grid item sm={12} md={6} lg={6}>
                        <Typography variant="h5" component="h5" className={classes.aboutUsHeading}>
                          About Us
                        </Typography>
                        <Typography variant="body2" className={classes.aboutUsDesc}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Nunc sed augue lacus
                          viverra vitae congue eu consequat. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                          magna aliqua. Nunc sed augue lacus viverra vitae congue eu consequat
                        </Typography>
                      </Grid>
                      <Grid item sm={6} md={6} lg={6}>
                        <MoreInfo amenities={place.amenities || []} isMobile={isMobile} />
                      </Grid>
                    </Grid>

                    <Divider />
                    <MediaGallery />
                    <Divider />
                    <div style={{ padding: "18px 10px" }}>
                      <RatingsAndReviews
                        reviews={place.ratings!}
                        ratingCount={place.ratings_count || null}
                        logo={
                          place.place_logo_path! ||
                          `https://via.placeholder.com/728.png?text=${place.place_name}`
                        }
                        name={place.place_name!}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {tabValue === 0 ? (
              <Grid container className={clsx(classes.placeDetailBody, classes.hiddenXs)}>
                <Grid item xs={12} sm={12}>
                  <div style={{ padding: "0px 16px 10px" }}>
                    <Typography variant="h5" component="h5" className={classes.aboutUsHeading}>
                      About Us
                    </Typography>
                    <Typography variant="body2" className={classes.aboutUsDesc}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Nunc sed augue lacus viverra
                      vitae congue eu consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc
                      sed augue lacus viverra vitae congue eu consequat
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div style={{ padding: "0px 16px 10px" }}>{renderLifestylesAndQongfus()}</div>
                  <div style={{ padding: "16px" }}>
                    <Divider />
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Location
                    geoLocation={{
                      lat: parseFloat(place.location_lat!),
                      lng: parseFloat(place.location_lng!),
                    }}
                    zoom={12}
                    address={place.address!}
                    place={place}
                  />
                  <div style={{ padding: "16px" }}>
                    <Divider />
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div style={{ padding: "16px" }}>
                    <MoreInfo amenities={place.amenities || []} isMobile={isMobile} />
                  </div>
                  <div style={{ padding: "16px" }}>
                    <Divider />
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div style={{ padding: "16px" }}>
                    <RatingsAndReviews
                      reviews={place.ratings!}
                      ratingCount={place.ratings_count || null}
                      logo={
                        place.place_logo_path! ||
                        `https://via.placeholder.com/728.png?text=${place.place_name}`
                      }
                      name={place.place_name!}
                    />
                  </div>
                </Grid>
              </Grid>
            ) : (
              <Grid container className={clsx(classes.placeDetailBody, classes.hiddenXs)}>
                <Grid item>
                  <MobileMediaGallery />
                </Grid>
              </Grid>
            )}
          </Container>
        ) : null}
      </main>
    </ExplorerLayout>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    place: appState.places.place || null,
    placeError: appState.places.placeError || null,
    systemLifestyles: appState.app.lifestyles || [],
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

PlaceDetails.getInitialProps = async (ctx: AppPageContext): Promise<Props> => {
  const slug = ctx.query.slug ? ctx.query.slug.toString() : "";
  await ctx.store.dispatch(fetchPlace({ slug }));
  return {
    slug,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);
