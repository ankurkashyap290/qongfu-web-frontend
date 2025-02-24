import React, { FunctionComponent, useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import TopBarSearch from "./topBarSearch";
import { useRouter } from "next/router";

export interface Props {}

const LandingPageSearch: FunctionComponent<Props> = ({}) => {
  const router = useRouter();
  const [searchPhrase, setSearchPhrase] = useState("");

  const handleSearchInputChange = value => {
    setSearchPhrase(value);
  };

  const handleClickExplore = () => {
    if (searchPhrase.length) {
      router.push(`/explore-search?search=${searchPhrase}`, `/explore?search=${searchPhrase}`);
    }
  };

  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={10} sm={10} md={9} lg={9} xl={9}>
        <TopBarSearch
          showOn="normal"
          icon="search"
          placeholder="What are you looking for?"
          onSearchInput={handleSearchInputChange}
        />
        <Typography
          style={{
            color: "#afafaf",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          (i.e. Place name, area, city, lifestyle or qongfu)
        </Typography>
      </Grid>
      <Grid item xs={2} sm={2} md={3} lg={3} xl={3}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ width: "100%" }}
          onClick={handleClickExplore}
        >
          Explore
        </Button>
      </Grid>
    </Grid>
  );
};

export default LandingPageSearch;
