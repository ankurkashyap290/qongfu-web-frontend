import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import { Grid, Typography } from "@material-ui/core";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import LandingPageSearch from "../Search/landingPageSearch";
import clsx from "clsx";
import { CATEGORY_FILTERS } from "../../constants";
import useStyles from "../../Styles/components/welcomeToQongfu";
import { User } from "../../redux/actionTypes";
import CategoryCard from "../Cards/categoryCard";
import MobileSubHeaderNav from "../Header/mobileSubHeaderNav";
import { getIsMobile } from "../../utils";

// import Container from "@material-ui/core/Container";
interface Props {
  showWelcomeBox: boolean;
  profile: User | null;
}

const WelcomeToQongFu: FunctionComponent<Props> = ({ profile }) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const responsiveCategoryCarousel = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  const renderMobile = () => {
    return (
      <div className={clsx(classes.hiddenXs, classes.mbWelcomeContent)}>
        <Grid container>
          <MobileSubHeaderNav />

          <Grid item xs={12} sm={12} style={{ marginTop: "10px", marginBottom: "15px" }}>
            <Typography variant="h3" className={classes.welcomeText}>
              {profile ? `Welcome ${profile.display_name}!` : "Welcome to Qongfu!"}
            </Typography>
            <Typography variant="h5" align="center" className={classes.welcomeSubText}>
              How can we help you today?
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} style={{ paddingLeft: "34px" }}>
            <Carousel
              responsive={responsiveCategoryCarousel}
              itemClass={classes.lifeStyleCarouselItem}
            >
              {CATEGORY_FILTERS.map((category, index) => {
                return (
                  <div key={`${category}-${index}`}>
                    <CategoryCard
                      name={category}
                      href={`/explore-search?lifestyles=${category}`}
                      as={`/explore?lifestyles=${category}`}
                    />
                  </div>
                );
              })}
            </Carousel>
          </Grid>
        </Grid>
      </div>
    );
  };
  const renderWeb = () => {
    return (
      <div className={clsx(classes.heroContent)}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Typography variant="h3" className={classes.welcomeText}>
              Welcome to Qongfu
            </Typography>
            <Typography variant="h5" align="center" className={classes.welcomeSubText}>
              Your Health & Fitness Marketplace
            </Typography>
            <LandingPageSearch />
            <div className={classes.welcomeLinksContainer}>
              {CATEGORY_FILTERS.map(category => {
                return (
                  <Link
                    href={`/explore-search?lifestyles=${category}`}
                    as={`/explore?lifestyles=${category}`}
                    key={`cat_${category}`}
                  >
                    <a className={classes.link}>{category}</a>
                  </Link>
                );
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };

  return isMobile ? renderMobile() : renderWeb();
};

const mapStateToProps = (appState: AppState) => {
  return {
    profile: appState.user.profile,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeToQongFu);
