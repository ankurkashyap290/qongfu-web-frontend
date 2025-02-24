import _ from "lodash";
import {
  AppActionTypes,
  Location,
  AppAction,
  AdvanceSearchFilters,
  Notification,
  Qongfus,
  Languages,
  Lifestyles,
  RocketSearchResponse,
} from "../actionTypes";
import { DefaultSearchFilters } from "../../config";

export interface AppState {
  userPublicIp: string;
  location: Location;
  isInitialized: boolean;
  userAllowed: boolean;
  appInitError: string;
  advanceSearchFilters: AdvanceSearchFilters;
  lifestyleSlug: string;
  notification: Notification;
  loading: boolean;
  qongfus: Qongfus[] | [];
  error: string | null;
  languages: Languages[] | [];
  mapView: boolean;
  dialogInfo: any;
  lifestyles: Lifestyles[] | [];
  isFilterDrawerOpen: boolean;
  isAccountProfileDrawerOpen: boolean;
  isLocateMe: boolean;
  countries: any;
  areaAndCities: any[];
  searchLoading: boolean;
  searchedPlaces: RocketSearchResponse | null;
}

const initState: AppState = {
  userPublicIp: "",
  location: { lat: 0, lng: 0, city: "", address: "", country: "", area: "" },
  isInitialized: false,
  userAllowed: false,
  appInitError: "",
  advanceSearchFilters: {
    ...DefaultSearchFilters,
  },
  lifestyleSlug: "",
  notification: {
    open: false,
    message: "",
  },
  loading: false,
  qongfus: [],
  error: null,
  languages: [],
  mapView: false,
  dialogInfo: { dialogType: "", dialogCode: "" },
  lifestyles: [],
  isFilterDrawerOpen: false,
  isAccountProfileDrawerOpen: false,
  isLocateMe: false,
  countries: [],
  areaAndCities: [],
  searchLoading: false,
  searchedPlaces: null,
};

export const appReducer = (state = initState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionTypes.SET_IP: {
      return { ...state, userPublicIp: action.payload.ip };
    }
    case AppActionTypes.SET_LOCATION: {
      return {
        ...state,
        location: action.payload.location,
        userAllowed: action.payload.userAllowed,
        userPublicIp: action.payload.userPublicIp,
      };
    }
    case AppActionTypes.APP_INITIALIZED_SET: {
      return {
        ...state,
        isInitialized: true,
        countries: _.cloneDeep(action.payload.countries),
      };
    }
    case AppActionTypes.APP_INITIALIZE_ERROR: {
      return {
        appInitError: action.payload,
        ...state,
      };
    }
    case AppActionTypes.SET_ADVANCE_SEARCH_FILTERS: {
      return {
        ...state,
        advanceSearchFilters: action.payload,
      };
    }
    case AppActionTypes.SET_LIFESTYLE_SLUG: {
      const newSearchFilters = _.cloneDeep(state.advanceSearchFilters);
      const lifestyleSlug = action.payload.slug;
      if (lifestyleSlug) {
        newSearchFilters.lifestyle = [lifestyleSlug];
      } else {
        newSearchFilters.lifestyle = [...DefaultSearchFilters.lifestyle];
      }
      return {
        ...state,
        lifestyleSlug: action.payload.slug,
        advanceSearchFilters: newSearchFilters,
      };
    }
    case AppActionTypes.SET_NOTIFICATION: {
      return {
        ...state,
        notification: {
          open: action.payload.open,
          message: action.payload.message,
        },
      };
    }
    case AppActionTypes.UNSET_NOTIFICATION: {
      return {
        ...state,
        notification: {
          open: false,
          message: "",
        },
      };
    }
    case AppActionTypes.FETCH_ALL_QONGFUS:
      return { ...state, loading: true };
    case AppActionTypes.FETCH_ALL_QONGFUS_SUCCESS:
      return {
        ...state,
        loading: false,
        qongfus: [...action.payload.qongfus],
      };
    case AppActionTypes.FETCH_ALL_QONGFUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case AppActionTypes.FETCH_ALL_LANGUAGES:
      return { ...state, loading: true };
    case AppActionTypes.FETCH_ALL_LANGUAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        languages: [...action.payload.languages],
      };
    case AppActionTypes.FETCH_ALL_LANGUAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case AppActionTypes.SET_MAP_VIEW: {
      return {
        ...state,
        mapView: action.payload,
      };
    }
    case AppActionTypes.SHOW_DIALOG: {
      return {
        ...state,
        dialogInfo: {
          dialogType: action.modalType,
          dialogCode: action.code,
          open: true,
        },
      };
    }
    case AppActionTypes.HIDE_DIALOG: {
      return {
        ...state,
        dialogInfo: {
          dialogType: action.modalType,
          dialogCode: action.code,
          open: false,
        },
      };
    }
    case AppActionTypes.FETCH_ALL_LIFESTYLES:
      return { ...state, loading: true };
    case AppActionTypes.FETCH_ALL_LIFESTYLES_SUCCESS:
      return {
        ...state,
        loading: false,
        lifestyles: [...action.payload.lifestyles],
      };
    case AppActionTypes.FETCH_ALL_LIFESTYLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case AppActionTypes.SET_FILTER_DRAWER: {
      return {
        ...state,
        isFilterDrawerOpen: action.isFilterDrawerOpen,
      };
    }
    case AppActionTypes.SET_ACCOUNT_PROFILE_DRAWER: {
      return {
        ...state,
        isAccountProfileDrawerOpen: action.isAccountProfileDrawerOpen,
      };
    }
    case AppActionTypes.SET_LOCATE_ME_BUTTON: {
      return {
        ...state,
        isLocateMe: action.isLocateMe,
      };
    }
    case AppActionTypes.SET_AREA_AND_CITIES: {
      return {
        ...state,
        areaAndCities: [...action.payload],
      };
    }
    case AppActionTypes.SEARCH_PLACES:
      if (action.payload.search) {
        return { ...state, searchLoading: true };
      } else {
        return { ...state, searchedPlaces: null, searchLoading: false };
      }
    case AppActionTypes.SEARCH_PLACES_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchedPlaces: { ...action.payload.response },
      };
    case AppActionTypes.SEARCH_PLACES_FAILURE:
      return {
        ...state,
        searchLoading: false,
        error: action.payload.error,
        searchedPlaces: null,
      };
    case AppActionTypes.RESET_SEARCH_PLACES:
      return {
        ...state,
        searchLoading: false,
        searchedPlaces: null,
      };

    default:
      return state;
  }
};
