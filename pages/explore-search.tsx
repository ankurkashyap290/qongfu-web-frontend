import React from "react";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
import { NextPage } from "next";
import ExplorerLayout from "../components/Layout/ExplorerLayout";
import useStyles from "../Styles/exploreSearch";
import PlacesView from "../components/PlacesView";
import MobileSubHeaderNav from "../components/Header/mobileSubHeaderNav";
import { setAdvanceSearchFilters } from "../redux/actions/app";
import { loadFiltersFromQuery, queryHasFilterParam } from "../utils";
import AppPageContext from "../redux/lib/AppPageContext";

interface Props {}

const Places: NextPage<Props> = () => {
  const classes = useStyles();
  return (
    <ExplorerLayout showHeroHeader={false} pageType="search">
      <main className={classes.searchPageMain}>
        <Grid container direction="row" className={classes.cardGrid1}>
          <Grid item xs={12} sm={12} className={classes.hiddenXs} style={{ margin: "10px 0px" }}>
            <MobileSubHeaderNav />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <PlacesView paginationType="scroll" />
          </Grid>
        </Grid>
      </main>
    </ExplorerLayout>
  );
};

Places.getInitialProps = async (ctx: AppPageContext): Promise<Props> => {
  if (ctx.isServer && ctx.store) {
    ctx.store.dispatch(setAdvanceSearchFilters(loadFiltersFromQuery(ctx.query ? ctx.query : null)));
  } else if (!ctx.isServer) {
    if (ctx.query) {
      if (ctx.query.reset === "true" || queryHasFilterParam(ctx.query)) {
        ctx.store.dispatch(
          setAdvanceSearchFilters(loadFiltersFromQuery(ctx.query ? ctx.query : null))
        );
      }
    }
  }
  return {};
};

export default Places;
