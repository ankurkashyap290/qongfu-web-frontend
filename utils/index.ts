import moment from "moment";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  QongfuIPAddressKey,
  QongfuGeoLocationKey,
  DefaultSearchFilters,
  filterQueryParams,
} from "../config";
import { CATEGORY_FILTERS } from "../constants";
import _ from "lodash";
import qs from "qs";

const rootFontSize = 16;
export const getRemFontSizeByPx = function(px: Number) {
  //@ts-ignore
  let remValue = px / rootFontSize;
  return remValue.toFixed(3) + "rem";
};

export const getRememberMe = () => {
  return localStorage.getItem("qongfu-user-remember-me") || "false";
};

export const setRememberMe = rememberMe => {
  return localStorage.setItem("qongfu-user-remember-me", rememberMe || "false");
};

export const getToken = () => {
  if (getRememberMe() === "true") {
    return localStorage.getItem("qongfu-web-token") || null;
  } else {
    return sessionStorage.getItem("qongfu-web-token") || null;
  }
};

export const setToken = token => {
  if (getRememberMe() === "true") {
    return localStorage.setItem("qongfu-web-token", token || null);
  } else {
    return sessionStorage.setItem("qongfu-web-token", token || null);
  }
};

export const getProfile = () => {
  if (getRememberMe() === "true") {
    const profile = localStorage.getItem("qongfu-user-profile") || null;
    if (profile) {
      return JSON.parse(profile);
    }
    return null;
  } else {
    const profile = sessionStorage.getItem("qongfu-user-profile") || null;
    if (profile) {
      return JSON.parse(profile);
    }
    return null;
  }
};

export const setProfile = profile => {
  if (getRememberMe() === "true") {
    return localStorage.setItem("qongfu-user-profile", JSON.stringify(profile || null));
  } else {
    return sessionStorage.setItem("qongfu-user-profile", JSON.stringify(profile || null));
  }
};

export const getTimeToAmPmFormat = time => {
  return moment(time, "hh:mm A").format("hh:mm A");
};

export const getIsMobile = () => {
  let result = false;
  const theme = useTheme();
  const matchScreen = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  if (matchScreen) {
    result = true;
  }
  return result;
};

export const getIPAddress = () => {
  return localStorage.getItem(QongfuIPAddressKey) || null;
};

export const setIPAddress = ip => {
  return localStorage.setItem(QongfuIPAddressKey, ip);
};

export const getGeoLocationToLocal = () => {
  const location = localStorage.getItem(QongfuGeoLocationKey) || null;
  if (location) {
    return JSON.parse(location);
  }
  return null;
};

export const setGeoLocationToLocal = location => {
  return localStorage.setItem(QongfuGeoLocationKey, location);
};

export const getDirection = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("qongfu-user-direction") || "ltr";
  } else {
    return "ltr";
  }
};

export const isUserLoggedIn = profile => {
  if (!profile) {
    return false;
  }
  if (profile.first_name.trim() === "##FIRST##" && profile.last_name.trim() === "##LAST##") {
    return false;
  } else {
    return true;
  }
};

export const getDistance = (lat1, lon1, lat2, lon2) => {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

export const getFilterQueryParams = (filters, forApi) => {
  const queryParams: any = {};

  if (filters.search && DefaultSearchFilters.search !== filters.search) {
    queryParams.search = filters.search;
  }

  if (filters.sortBy && (forApi || DefaultSearchFilters.sortBy !== filters.sortBy)) {
    queryParams.sort_by = filters.sortBy;
  }

  if (
    filters.lifestyle &&
    filters.lifestyle.length &&
    DefaultSearchFilters.lifestyle.length !== filters.lifestyle.length
  ) {
    if (filters.lifestyle.length !== CATEGORY_FILTERS.length) {
      queryParams.lifestyles = filters.lifestyle.join(",");
    }
  }
  if (filters.country && (forApi || DefaultSearchFilters.country + "" !== filters.country + "")) {
    queryParams.country_id = filters.country;
  }

  if (
    filters.rated &&
    filters.rated.length &&
    DefaultSearchFilters.rated.length !== filters.rated.length
  ) {
    queryParams.stars = filters.rated.join(",");
  }

  if (
    filters.areaAndCities &&
    filters.areaAndCities.length &&
    DefaultSearchFilters.areaAndCities.length !== filters.areaAndCities.length
  ) {
    queryParams.location = filters.areaAndCities.join(",");
  }

  return queryParams;
};

export const loadFiltersFromQuery = queryParams => {
  const newFilters = _.cloneDeep(DefaultSearchFilters);
  if (queryParams) {
    if (queryParams.search) {
      newFilters.search = queryParams.search;
    }
    if (queryParams.sort_by) {
      newFilters.sortBy = queryParams.sort_by;
    }
    if (queryParams.country_id) {
      newFilters.country = queryParams.country_id;
    }
    if (queryParams.lifestyles) {
      newFilters.lifestyle = queryParams.lifestyles.split(",");
    }
    if (queryParams.stars) {
      newFilters.rated = queryParams.stars.split(",");
    }
    if (queryParams.location) {
      newFilters.areaAndCities = queryParams.location.split(",");
    }
  }
  return newFilters;
};

export const updateRouterHistory = (router, filters) => {
  const urlArr = router.asPath.split("?");
  const asPath = urlArr[0];
  let queryParams: any = {};
  if (urlArr.length > 1) {
    queryParams = qs.parse(urlArr[1]);
    // remove all filter query params from qs
    filterQueryParams.map(filter => {
      delete queryParams[filter];
      return filter;
    });
  }
  queryParams = { ...queryParams, ...getFilterQueryParams(filters, false) };
  let queryString = Object.keys(queryParams).length
    ? `?${qs.stringify(queryParams, { encode: false })}`
    : "";
  router.push(router.pathname, `${asPath}${queryString}`); //not reload intial page
};

export const queryHasFilterParam = query => {
  if (!query) return false;

  const foundParam = Object.keys(query).find(item => filterQueryParams.includes(item));
  if (foundParam) {
    return true;
  }
  return false;
};
