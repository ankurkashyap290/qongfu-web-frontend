export const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";
export const IS_SERVER = typeof window === "undefined";
export const ADVANCE_SEARCH_OPTIONS = {
  lifestyle: {
    label: "LifeStyles",
    allLabel: "All",
    noneLabel: "All",
    // selectAll: true,
    allOption: { label: "All", icon: "InnerFilterAll", value: "all" },
    values: [
      { label: "Fitness", icon: "InnerFilterFitness", value: "fitness" },
      { label: "Sports", icon: "InnerFilterSports", value: "sports" },
      { label: "Martial Arts", icon: "InnerMartialArts", value: "martialArts" },
      { label: "Wellness", icon: "InnerWellness", value: "wellness" },
      { label: "Recreation", icon: "InnerRecreation", value: "recreation" },
    ],
    type: "checkbox",
    fieldValue: "label",
    multiSelect: true,
  },
  rated: {
    label: "Rated",
    allLabel: "All Ratings",
    noneLabel: "All Ratings",
    // selectAll: true,
    values: [
      { label: "5 Star Only", value: "5", icon: "Star" },
      { label: "4 Star Plus", value: "4+", icon: "Star" },
      { label: "4 Star Only", value: "4", icon: "Star" },
      { label: "3 Star Plus", value: "3+", icon: "Star" },
      { label: "3 Star Only", value: "3", icon: "Star" },
    ],
    type: "checkbox",
    fieldValue: "value",
    multiSelect: true,
  },
  areaAndCities: {
    label: "Area/Cities",
    allLabel: "All",
    noneLabel: "Nearby",
    values: [{ label: "", value: "", icon: "" }], //values filled from redux->app-state->locations
    type: "button",
    fieldValue: "label",
    multiSelect: true,
  },
  country: {
    label: "Country",
    multiSelect: false,
    showOnMobile: true,
    values: [{ label: "", value: "", icon: "" }], //values filled from redux->app-state->countries
    type: "checkbox",
    fieldValue: "value",
  },
};

export const CATEGORY_FILTERS = ADVANCE_SEARCH_OPTIONS.lifestyle.values.map(item => item.label);
export const RATED_FILTERS = ADVANCE_SEARCH_OPTIONS.rated.values.map(item => item.value);
