import React, { FunctionComponent, useState, useEffect } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Dialog,
  TextField,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import clsx from "clsx";
import _ from "lodash";
import { ADVANCE_SEARCH_OPTIONS } from "../../constants";
import useStyles from "../../Styles/components/advanceSearch";
import {
  // LifestyleIconColored,
  InnerFilterNearestIcon,
  HighestRated,
  MostReviewed,
  DropdownInactive,
  NearestIcon,
  InnerFilterAll,
  InnerFilterFitness,
  InnerFilterSports,
  InnerMartialArts,
  InnerRecreation,
  InnerWellness,
  FilterCountry,
  FilterArea,
  FlagBahrain,
  FlagOman,
  FlagQatar,
  FlagSAU,
  FlagUAE,
  FlagKuwait,
} from "../CustomIcon";
import StarIcon from "../CustomIcon/Star";
import LifestyleIcon from "../CustomIcon/Lifestyle";
import AreasAndCitiesFilter from "./areasAndCitiesFilter";
import { Countries } from "../../redux/actionTypes";
import SearchIcon from "@material-ui/icons/Search";

interface Props {
  selectedFilters: any;
  onChangeFilter: Function;
  isMobile: boolean;
  areaAndCities: any[];
  countries: Countries[];
}

const AdvanceSearchCollapse: FunctionComponent<Props> = ({
  selectedFilters,
  onChangeFilter,
  areaAndCities,
  isMobile,
  countries,
}) => {
  const classes = useStyles();
  const [expandedWeb, setExpandedWeb] = useState([] as string[]);
  const [expandedMobile, setExpandedMobile] = useState("");
  const [areaAndCitiesModal, setAreaAndCitiesModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState({});
  const [selectedRegions, setRegionsList] = useState([]);
  const [allAreasAndCities, setAllAreasAndCities] = useState([] as string[]);
  const [activeCountries, setActiveCountries] = useState([] as any[]);
  const [filteredList, setFilteredList] = useState([] as any[]);
  const [regionsList, setRegionsListForMobile] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    if (countries && countries.length) {
      setActiveCountries(
        countries
          .filter(item => item.approved)
          .map(item => ({ label: item.country, value: item.id + "", icon: item.flag, emoji: true }))
      );
    }
  }, [countries]);

  useEffect(() => {
    const regions = areaAndCities.length ? areaAndCities[0].regions || [] : [];
    setRegionsList(
      regions.map(region => {
        return { label: region.name, value: region.id, cities: region.cities };
      })
    );
    // flat list of all areas and cities for all regions
    const flatList = [] as string[];
    regions.map(region => {
      region.cities.map(city => {
        flatList.push(city.name);
        city.area &&
          city.area.map(item => {
            flatList.push(item.name);
            return item;
          });
        return city;
      });
      return region;
    });

    setAllAreasAndCities(flatList);
  }, [areaAndCities]);

  const getRegionFlatListOfAreasAndCities = region => {
    const flatList = [];
    region.cities.map(city => {
      //@ts-ignore
      flatList.push(city.name);
      city.area &&
        city.area.map(item => {
          //@ts-ignore
          flatList.push(item.name);
          return item;
        });
      return city;
    });
    return flatList;
  };

  useEffect(() => {
    const regions = areaAndCities.length ? areaAndCities[0].regions || [] : [];
    setRegionsListForMobile(
      regions.map(region => {
        const list = getRegionFlatListOfAreasAndCities(region);
        return {
          label: region.name,
          value: region.id,
          areasAndCities: [...list],
        };
      })
    );
  }, [areaAndCities]);

  useEffect(() => {
    handleFilterAreaList(searchPhrase);
  }, [regionsList]);

  const handleFilterAreaList = searchText => {
    setSearchPhrase(searchText);
    if (searchText.length > 2) {
      setFilteredList(
        _.cloneDeep(regionsList)
          .filter(
            region =>
              //@ts-ignore
              region.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 ||
              //@ts-ignore
              region.areasAndCities.filter(
                area => area.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
              ).length > 0
          )
          .map(region => {
            //@ts-ignore
            region.areasAndCities = region.areasAndCities.filter(
              area => area.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
            );
            return region;
          })
      );
    } else {
      setFilteredList(_.cloneDeep(regionsList));
    }
  };

  const handleAreasAndCitiesModal = item => {
    setAreaAndCitiesModal(true);
    setSelectedArea(item);
  };

  const handleModalClose = () => {
    setAreaAndCitiesModal(false);
  };
  const handleApplyAreaFilter = locations => {
    handleModalClose();
    const newFilters = _.cloneDeep(selectedFilters);
    newFilters.areaAndCities = [...locations];
    newFilters.sortBy='rating';
    onChangeFilter && onChangeFilter(newFilters);
  };

  const handleChange = key => {
    if (isMobile) {
      setExpandedMobile(key);
    } else {
      const expandedWebKeys = [...expandedWeb];
      const index = expandedWebKeys.indexOf(key);
      if (index === -1) {
        expandedWebKeys.push(key);
      } else {
        expandedWebKeys.splice(index, 1);
      }
      setExpandedWeb([...expandedWebKeys]);
    }
  };

  const handleItemClick = (filterName, filterValue, toggleChecked, itemData) => {
    const newFilters = _.cloneDeep(selectedFilters);
    const multiSelect = itemData.multiSelect || false;
    let fireChange = true;
    if (toggleChecked) {
      if (multiSelect && newFilters[filterName].indexOf(filterValue) < 0) {
        if (itemData.selectAll && filterValue === itemData.allOption[itemData.fieldValue]) {
          // all selected already then don't fire it again
          if (newFilters[filterName].length === itemData.values.length) {
            fireChange = false;
          } else {
            newFilters[filterName] = itemData.values.map(item => item[itemData.fieldValue]);
          }
        } else {
          newFilters[filterName].push(filterValue);
        }
      } else if (!multiSelect) {
        newFilters[filterName] = filterValue;
      }
    } else {
      if (multiSelect) {
        const foundIndex = newFilters[filterName].indexOf(filterValue);
        if (foundIndex >= 0) {
          newFilters[filterName].splice(foundIndex, 1);
        }
      } else {
        // TODO: uncheck not allowed for self single value it will be toggle with its sibling
      }
    }

    fireChange && onChangeFilter && onChangeFilter(newFilters);
  };

  const filterSelectedItem = (itemData, selectedValue) => {
    let itemValue;
    let itemSelectedLabel;

    if (itemData.multiSelect) {
      itemValue = [];
      itemSelectedLabel = [];
      itemData.values.map(item => {
        if (selectedValue && selectedValue.includes(item[itemData.fieldValue])) {
          itemValue.push(item[itemData.fieldValue]);
          itemSelectedLabel.push(item.label);
        }
        return item;
      });
      // extra data should always be flat list
      itemData.extraData &&
        itemData.extraData.map(item => {
          if (selectedValue && selectedValue.includes(item)) {
            itemValue.push(item);
            itemSelectedLabel.push(item);
          }
          return item;
        });

      let totalItemsCount = itemData.values.length;
      if (itemData.extraData) {
        totalItemsCount += itemData.extraData.length;
      }

      if (itemValue.length > 0 && itemData.selectAll && itemValue.length === totalItemsCount) {
        itemSelectedLabel = [itemData.allOption.label];
      } else if (itemValue.length > 0) {
        if (itemValue.length === totalItemsCount) {
          itemSelectedLabel = itemData.allLabel || "All";
        } else if (itemValue.length > 1) {
          itemSelectedLabel = "Multi...";
        } else {
          itemSelectedLabel = itemSelectedLabel[0];
        }
      } else if (itemValue.length === 0) {
        itemSelectedLabel = itemData.noneLabel || "None";
      }
    } else {
      itemValue = null;
      itemSelectedLabel = "";
      if (selectedValue) {
        const foundItem = itemData.values.find(item => item[itemData.fieldValue] === selectedValue);
        if (foundItem) {
          itemValue = foundItem[itemData.fieldValue];
          itemSelectedLabel = foundItem.label;
        }
      }
    }

    return { itemValue, itemSelectedLabel };
  };

  const getPanelIcon = key => {
    return (
      <React.Fragment>
        {key === "sortBy" ? (
          <NearestIcon
            className={clsx(
              classes.filterIcon,
              !expandedMobile && isMobile ? classes.filterGreyIcon : ""
            )}
          />
        ) : null}
        {key === "country" ? (
          <FilterCountry
            className={clsx(
              classes.filterIcon,
              !expandedMobile && isMobile ? classes.filterGreyIcon : ""
            )}
          />
        ) : null}
        {key === "lifestyle" ? (
          <LifestyleIcon
            className={clsx(
              classes.filterIcon,
              !expandedMobile && isMobile ? classes.filterGreyIcon : ""
            )}
          />
        ) : null}
        {key === "areaAndCities" ? (
          <FilterArea
            className={clsx(classes.filterIcon, isMobile ? classes.filterGreyIcon : "")}
          />
        ) : null}
        {key === "rated" ? (
          <StarIcon className={clsx(classes.filterIcon, isMobile ? classes.filterGreyIcon : "")} />
        ) : null}
      </React.Fragment>
    );
  };

  const labelIcons = {
    InnerFilterNearestIcon: <InnerFilterNearestIcon className={classes.filterIcon} />,
    HighestRated: <HighestRated className={classes.filterIcon} />,
    MostReviewed: <MostReviewed className={classes.filterIcon} />,
    InnerFilterAll: <InnerFilterAll className={classes.filterIcon} />,
    InnerFilterFitness: <InnerFilterFitness className={classes.filterIcon} />,
    InnerFilterSports: <InnerFilterSports className={classes.filterIcon} />,
    InnerMartialArts: <InnerMartialArts className={classes.filterIcon} />,
    InnerRecreation: <InnerRecreation className={classes.filterIcon} />,
    InnerWellness: <InnerWellness className={classes.filterIcon} />,
    FlagBahrain: <FlagBahrain className={classes.filterIcon} />,
    FlagOman: <FlagOman className={classes.filterIcon} />,
    FlagQatar: <FlagQatar className={classes.filterIcon} />,
    FlagSAU: <FlagSAU className={classes.filterIcon} />,
    FlagUAE: <FlagUAE className={classes.filterIcon} />,
    FlagKuwait: <FlagKuwait className={classes.filterIcon} />,
    Star: <StarIcon className={classes.filterIcon} />,
  };

  const keys = Object.keys(ADVANCE_SEARCH_OPTIONS);

  return (
    <React.Fragment>
      <div
        className={clsx(classes.advSearchMarginBottom, classes.hiddenXs, classes.mbDrawerTitle)}
        style={{ textAlign: "left" }}
      >
        <Button
          color="primary"
          disableRipple
          classes={{
            textPrimary: classes.advanceSearchTextPrimary,
          }}
          onClick={() => handleChange("")}
          style={!expandedMobile ? { visibility: "hidden" } : {}}
        >
          Back
        </Button>

        <span className={clsx(classes.labelText, classes.mbDrawerLabel)}>
          {!expandedMobile ? (
            "Filter"
          ) : (
            <span>
              {getPanelIcon(expandedMobile)} {ADVANCE_SEARCH_OPTIONS[expandedMobile].label}
            </span>
          )}
        </span>
      </div>

      {keys.map(key => {
        const itemData = ADVANCE_SEARCH_OPTIONS[key];
        let extraData = false;
        if (key === "areaAndCities") {
          itemData.values = [...selectedRegions];
          extraData = true;
        } else if (key === "country") {
          itemData.values = [...activeCountries];
        }
        const { itemValue, itemSelectedLabel } = filterSelectedItem(
          extraData ? { ...itemData, extraData: [...allAreasAndCities] } : itemData,
          selectedFilters[key] || null
        );

        const renderWebAreasAndCities = itemData => {
          return (
            <FormControl component="fieldset" style={{ width: "100%" }}>
              <FormGroup>
                {itemData.values.map((item, index) => {
                  return (
                    <Grid
                      container
                      direction="row"
                      className={classes.advanceSearchAreaCitiesLabel}
                      key={`non-checkbox-${item.value}-${index}`}
                    >
                      <Grid item xs={8} sm={8} style={{ paddingTop: "12px", paddingLeft: "10px" }}>
                        {item.label}
                      </Grid>
                      <Grid item xs={4} sm={4}>
                        <Button
                          color="primary"
                          disableRipple
                          classes={{
                            label: classes.advanceSearchAreaCitiesBtnLabelText,
                            textPrimary: classes.advanceSearchTextPrimary,
                          }}
                          onClick={() => handleAreasAndCitiesModal(item)}
                        >
                          View
                        </Button>
                      </Grid>
                    </Grid>
                  );
                })}
              </FormGroup>
            </FormControl>
          );
        };

        const renderMobileAreasAndCities = () => {
          return (
            <div>
              {renderSearchField()}
              <Typography className={classes.filterNote}>
              Note: Any selection will disable nearby sorting option.
                </Typography>
              {filteredList.map((item, index) => {
                return (
                  <FormGroup classes={{ root: classes.advanceSearchFromGroupRoot }}>
                      <FormControlLabel
                        key={`checkbox-${item.value}-${index}`}
                        control={
                          <Checkbox
                            classes={{ root: classes.checkboxColor }}
                            checked={hasSelectedValue(item.label) ? true : false}
                            onChange={() =>
                              handleSelectLocation(item.label, 'region')
                            }
                          />
                        }
                        label={<div className={classes.checkboxRegionLabel}>{item.label}</div>}
                        labelPlacement="start"
                        classes={{
                          labelPlacementStart: classes.advSearchLabelPlacementStart,
                        }}
                      />
                       {getRegionList(item)}
                    </FormGroup>

                );
              })}
            </div>
          );
        };

        const hasSelectedValue = value => {
          const currentSelected = [...selectedFilters.areaAndCities];
          return currentSelected.includes(value);
        };

        const getRegionList = region => {
           return region.areasAndCities.map((item, index) => {
          return (
            <FormGroup classes={{ root: classes.advanceSearchFromGroupRoot }}>
              <FormControlLabel
                  key={`checkbox-${item.value}-${index}`}
                  control={
                    <Checkbox
                      classes={{ root: classes.checkboxColor }}
                      checked={hasSelectedValue(region.label) || hasSelectedValue(item) ? true : false}
                      onChange={() =>
                        handleSelectLocation(item, 'cities')
                      }
                    />
                  }
                  label={<div className={classes.checkboxLabel}>{item}</div>}
                  labelPlacement= "start"
                            classes={{
                              labelPlacementStart: classes.advSearchLabelPlacementStart,
                            }}
                />
           </FormGroup>
          );
          });
        };

        const handleSelectLocation = (value, mode) => {
          let currentLocation = [...selectedFilters.areaAndCities];
          if (mode === 'region') {
            const region = filteredList.find((item) => item.label === value);
            // toggle area
            if (currentLocation.includes(value)) {
              currentLocation = currentLocation.filter((item) => item !== value);
            } else {
              currentLocation = currentLocation.filter(
                (item) => !region.areasAndCities.includes(item),
              );
              currentLocation.push(value);
            }
          } else {
            const region = filteredList.find((item) =>
              item.areasAndCities.includes(value),
            );
            if (currentLocation.includes(value)) {
              currentLocation = currentLocation.filter((item) => item !== value);
            } else if (currentLocation.includes(region.label)) {
              currentLocation = region.areasAndCities.filter(
                (item) => item !== value,
              );
            } else {
              currentLocation.push(value);
            }
            // check if all region areas and cities selected
            // then select its region as selection
            if (
              currentLocation.filter((item) => region.areasAndCities.includes(item))
                .length === region.areasAndCities.length
            ) {
              return handleSelectLocation(region.label, 'region');
            }
          }
          handleApplyAreaFilter(currentLocation);
        };

        const renderSearchField = () => {
          return (
            <TextField
              onChange={evt => handleFilterAreaList(evt.target.value)}
              placeholder="Search Areas & Cities"
              className={
               classes.searchField
              }
              variant="outlined"
              value={searchPhrase}
              InputProps={{
                classes: {
                  root: classes.inputBorder,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="search" edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          );
        };


        return (
          <ExpansionPanel
            square
            expanded={isMobile ? expandedMobile === key : expandedWeb.includes(key)}
            onChange={() => handleChange(key)}
            className={classes.advSearchExpendedPanel}
            key={`filters-${key}`}
            style={
              isMobile && itemData.hiddenOnMobile
                ? { display: "none" }
                : !isMobile && itemData.showOnMobile
                ? { display: "none" }
                : {}
            }
          >
            <ExpansionPanelSummary
              expandIcon={<DropdownInactive />}
              aria-controls="panel1d-content"
              id="panel1d-header"
              className={clsx(
                classes.advSearchExpansionPanelSummary,
                classes.advanceSearchLabel,
                classes.advanceSearchFontFamily
              )}
              classes={{
                expanded: classes.advSearchExpansionPanelSummaryExpanded,
                content: classes.advSearchExpansionPanelSummaryContent,
                root: classes.advSearchExpansionPanelSummaryRoot,
                expandIcon: isMobile ? classes.mbExpandIcon : classes.advSearchExpandIcon,
              }}
              style={{ display: expandedMobile ? "none" : "" }}
            >
              {getPanelIcon(key)}
              <div className={classes.advSearchPanelLabelCt}>
                <Typography>
                  {itemData.label}
                  {itemSelectedLabel.length ? ": " : ""}
                </Typography>
                <Typography className={classes.filterValueLabel}>
                  {itemSelectedLabel.length ? itemSelectedLabel : ""}
                </Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{ root: classes.advanceSearchExpansionDetail }}>
              {itemData.type === "checkbox" ? (
                <FormControl component="div" className={classes.advanceSearchFormControl}>
                  <FormGroup classes={{ root: classes.advanceSearchFromGroupRoot }}>
                    {[itemData.selectAll ? itemData.allOption : null, ...itemData.values]
                      .filter(item => item)
                      .map((item, index) => {
                        return (
                          <FormControlLabel
                            key={`checkbox-${item.value}-${index}`}
                            control={
                              <Checkbox
                                checked={
                                  itemData.multiSelect
                                    ? itemData.selectAll && item.value === itemData.allOption.value
                                      ? itemData.values.length === itemValue.length
                                      : false || itemValue.includes(item[itemData.fieldValue])
                                    : itemValue === item[itemData.fieldValue]
                                }
                                classes={{ root: classes.checkboxColor }}
                                onChange={evt =>
                                  handleItemClick(
                                    key,
                                    item[itemData.fieldValue],
                                    evt.target.checked,
                                    itemData
                                  )
                                }
                              />
                            }
                            label={
                              <div className={classes.checkboxLabel}>
                                {//@ts-ignore
                                item.emoji ? (
                                  <span style={{ fontSize: "28px", verticalAlign: "middle" }}>
                                    {item.icon}
                                  </span>
                                ) : (
                                  labelIcons[item.icon]
                                )}{" "}
                                <span className={classes.advSearchCollapseLabel}>
                                  {item.label === "Highest Rated To Lowest"
                                    ? "Highest Rated"
                                    : item.label}
                                </span>{" "}
                              </div>
                            }
                            labelPlacement={isMobile ? "start" : "end"}
                            classes={{
                              labelPlacementStart: classes.advSearchLabelPlacementStart,
                            }}
                          />
                        );
                      })}
                  </FormGroup>
                </FormControl>
              ) : isMobile ? (
                renderMobileAreasAndCities()
              ) : (
                renderWebAreasAndCities(itemData)
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={areaAndCitiesModal}
        onClose={handleModalClose}
        maxWidth="md"
      >
        <AreasAndCitiesFilter
          onFilterApply={handleApplyAreaFilter}
          selectedArea={selectedArea}
          selectedFilter={selectedFilters.areaAndCities || []}
          handleModalClose={handleModalClose}
        />
      </Dialog>
    </React.Fragment>
  );
};

export default AdvanceSearchCollapse;
