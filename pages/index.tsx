import React, { useRef, useEffect } from "react";
import { NextPage } from "next";
import WelcomeToQongFu from "../components/Qongfu/welcomeToQongfu";
import WhatAreWe from "../components/WhatAreWe";
import QongfuMobile from "../components/Qongfu/qongfuMobile";
import QongfuBusiness from "../components/Qongfu/qongfuBusiness";
import ExplorerLayout from "../components/Layout/ExplorerLayout";
import HomePagePlaces from "../components/PlacesView/HomePagePlaces";
import useStyle from "../Styles";
import { setAdvanceSearchFilters } from "../redux/actions/app";
import { loadFiltersFromQuery, queryHasFilterParam } from "../utils";
import AppPageContext from "../redux/lib/AppPageContext";
interface Props {
  hash: string;
}

const Page: NextPage<Props> = ({ hash }) => {
  const classes = useStyle();
  const aboutRef = useRef(null);
  const mobileRef = useRef(null);
  const businessRef = useRef(null);
  const exploreRef = useRef(null);

  const scrollToRef = ref => {
    window.scrollTo(0, ref.current.offsetTop);
  };

  useEffect(() => {
    switch (hash.split("#").pop()) {
      case "about-us":
        scrollToRef(aboutRef);
        break;
      case "explore-qongfu":
        scrollToRef(exploreRef);
        break;
      case "qongfu-mobile":
        scrollToRef(mobileRef);
        break;
      case "qongfu-business":
        scrollToRef(businessRef);
        break;
      default:
    }
  }, [hash]);

  return (
    <ExplorerLayout showHeroHeader pageType="index">
      <main className={classes.indexPageMain}>
        <div ref={exploreRef}>
          <WelcomeToQongFu showWelcomeBox={true} />
        </div>

        <HomePagePlaces />
        <div className={classes.hiddenSm} ref={aboutRef}>
          <WhatAreWe />
        </div>
        <div className={classes.hiddenSm} ref={mobileRef}>
          <QongfuMobile />
        </div>
        <div className={classes.hiddenSm} ref={businessRef}>
          <QongfuBusiness />
        </div>
      </main>
    </ExplorerLayout>
  );
};

Page.getInitialProps = async (ctx: AppPageContext): Promise<Props> => {
  let hash = "";
  if (ctx.isServer && ctx.store) {
    ctx.store.dispatch(setAdvanceSearchFilters(loadFiltersFromQuery(ctx.query ? ctx.query : null)));
  } else if (!ctx.isServer) {
    if (ctx.query && (ctx.query.reset === "true" || queryHasFilterParam(ctx.query))) {
      ctx.store.dispatch(
        setAdvanceSearchFilters(loadFiltersFromQuery(ctx.query ? ctx.query : null))
      );
    }
    hash = ctx.query.hash ? ctx.query.hash.toString() : "";
    hash = `${+new Date()}#${hash}`;
  }
  return { hash };
};

export default Page;
