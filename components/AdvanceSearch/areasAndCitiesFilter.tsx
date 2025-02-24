import React, { FunctionComponent, useState, useEffect } from "react";
import _ from "lodash";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  ListItemIcon,
  Checkbox,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../../Styles/components/advanceSearch";
import { getIsMobile } from "../../utils";

interface Props {
  onFilterApply: Function;
  selectedArea: any;
  handleModalClose: Function;
  selectedFilter: any;
}

const CountryList: FunctionComponent<Props> = ({
  onFilterApply,
  selectedArea,
  handleModalClose,
  selectedFilter,
}) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const [selectedLocations, setLocations] = useState([] as string[]);
  const [childList, setChildList] = useState([] as string[]);
  useEffect(() => {
    const areasAndCities = [] as string[];
    selectedArea.cities.map(item => {
      areasAndCities.push(item?.name || "");
      item.area &&
        item.area.map(areaItem => {
          areasAndCities.push(areaItem?.name || "");
          return areaItem;
        });
      return item;
    });
    setChildList(areasAndCities);
  }, [selectedArea]);

  useEffect(() => {
    if (childList.length) {
      selectedFilter.map(item => {
        if (item === selectedArea.label) {
          setLocations([...childList]);
        } else if (childList.includes(item)) {
          setLocations([...selectedLocations, item]);
        }
        return item;
      });
    }
  }, [selectedFilter, childList]);

  const handleFilterApply = () => {
    const locations =
      selectedLocations.length === childList.length ? [selectedArea.label] : selectedLocations;
    // updated selected filters
    // remove all older selection for this selectedArea
    const newFilter = [...selectedFilter]
      .filter(item => item !== selectedArea.label)
      .filter(item => !childList.includes(item));
    onFilterApply([...newFilter, ...locations]);
  };

  const toggleSelection = location => {
    if (selectedLocations.includes(location)) {
      setLocations(selectedLocations.filter(item => item !== location));
    } else {
      setLocations([...selectedLocations, location]);
    }
  };

  const toggleGroupSelection = () => {
    if (selectedLocations.length === childList.length) {
      setLocations([]);
    } else {
      setLocations([...childList]);
    }
  };

  return (
    <React.Fragment>
      <Grid container direction="row" style={{ padding: "32px" }}>
        <Grid item xs={8} xl={8} sm={8} md={8} lg={8}>
          <Typography variant="h5" className={classes.headingText}>
            Search Areas and Cities:
          </Typography>
        </Grid>
        <Grid
          xs={4}
          xl={4}
          sm={4}
          md={4}
          lg={4}
          item
          style={{ textAlign: "right", marginTop: isMobile ? "20px" : "60px" }}
        >
          <CloseIcon className={classes.closeIcon} onClick={() => handleModalClose()} />
        </Grid>
        <Grid item xs={12} xl={12} sm={12} md={12} lg={12} style={{ textAlign: "center" }}>
          <Checkbox
            edge="start"
            disableRipple
            className={classes.areaCitiesHeadingCheckbox}
            checked={selectedLocations.length === childList.length}
            onChange={() => toggleGroupSelection()}
          />
          <span className={classes.groupName}>{selectedArea.label}</span>
        </Grid>
        <Grid item xs={12} xl={12} sm={12} md={12} lg={12}>
          <List style={{ padding: isMobile ? "0px" : "30px" }}>
            <Grid container direction="row" spacing={2}>
              {childList.map(item => (
                <Grid xs={6} sm={4} lg={3} md={3} item key={item}>
                  <ListItem key={item} style={{ padding: "0px" }}>
                    <ListItemIcon classes={{ root: classes.areasCheckboxWidth }}>
                      <Checkbox
                        checked={selectedLocations.includes(item)}
                        className={classes.areaCitiesCheckbox}
                        onChange={() => toggleSelection(item)}
                      />
                    </ListItemIcon>
                    <ListItemText style={{ whiteSpace: "nowrap" }}>{item}</ListItemText>
                  </ListItem>
                </Grid>
              ))}
            </Grid>
          </List>
        </Grid>
        <Grid container justify="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            classes={{ root: classes.filterButton }}
            style={{ margin: "20px 0px", padding: isMobile ? "10px 20px" : "10px 60px" }}
            disableRipple
            onClick={() => handleFilterApply()}
          >
            Filter By Selection
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CountryList;
