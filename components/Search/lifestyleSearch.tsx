import React, { FunctionComponent } from "react";
import Grid from "@material-ui/core/Grid";
import TopBarSearch from "./topBarSearch";

export interface Props {
  lifestyleSlug: string | undefined;
  handleHeadSelectOnChange?: Function;
  view: string;
}

const LandingPageSearch: FunctionComponent<Props> = props => {
  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={12} sm={12}>
        <TopBarSearch
          showOn={props.view}
          icon="filterFitnessFilled"
          placeholder={`Search places related to ${props.lifestyleSlug}`}
          selectedLifestyle={props.lifestyleSlug}
          handleHeadSelectOnChange={props.handleHeadSelectOnChange}
        />
      </Grid>
    </Grid>
  );
};

export default LandingPageSearch;
