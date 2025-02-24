import {
  AppAction,
  AppActionTypes,
  IpAddress,
  UserLocation,
  AdvanceSearchFilters,
  LifestyleSlug,
  Notification,
  Qongfus,
  Languages,
  Lifestyles,
  RocketSearchQueryType,
  RocketSearchResponse,
} from "../actionTypes";

export function setAreaAndCities(payload: any): AppAction {
  return {
    type: AppActionTypes.SET_AREA_AND_CITIES,
    payload,
  };
}

export function showDialog(modalType: string, code: string): AppAction {
  return {
    type: AppActionTypes.SHOW_DIALOG,
    modalType,
    code,
  };
}

export function hideDialog(modalType: string, code: string): AppAction {
  return {
    type: AppActionTypes.HIDE_DIALOG,
    modalType,
    code,
  };
}

export function setIp(payload: IpAddress): AppAction {
  return {
    type: AppActionTypes.SET_IP,
    payload,
  };
}

export function setLocation(payload: UserLocation): AppAction {
  return {
    type: AppActionTypes.SET_LOCATION,
    payload,
  };
}

export const requestAppInitialize = (): AppAction => {
  return {
    type: AppActionTypes.APP_INITIALIZE_REQUEST,
  };
};
export const setAppAsInitialized = (payload: any): AppAction => {
  return {
    type: AppActionTypes.APP_INITIALIZED_SET,
    payload,
  };
};
export const setAppInitializeError = (error: string): AppAction => {
  return {
    type: AppActionTypes.APP_INITIALIZE_ERROR,
    payload: error,
  };
};

export const setAdvanceSearchFilters = (payload: AdvanceSearchFilters): AppAction => {
  return {
    type: AppActionTypes.SET_ADVANCE_SEARCH_FILTERS,
    payload,
  };
};

export const setLifestyleSlug = (payload: LifestyleSlug): AppAction => {
  return {
    type: AppActionTypes.SET_LIFESTYLE_SLUG,
    payload,
  };
};

export function setNotification(payload: Notification): AppAction {
  return {
    type: AppActionTypes.SET_NOTIFICATION,
    payload,
  };
}
export function unsetNotification(): AppAction {
  return {
    type: AppActionTypes.UNSET_NOTIFICATION,
  };
}

export function fetchAllQongfus(): AppAction {
  return {
    type: AppActionTypes.FETCH_ALL_QONGFUS,
  };
}
export function fetchAllQongfusSuccess(qongfus: Qongfus[]): AppAction {
  return {
    type: AppActionTypes.FETCH_ALL_QONGFUS_SUCCESS,
    payload: { qongfus },
  };
}
export function fetchAllQongfusFailure(error: string): AppAction {
  return {
    type: AppActionTypes.FETCH_ALL_QONGFUS_FAILURE,
    payload: { error },
  };
}

export function fetchAllLanguages(): AppAction {
  return {
    type: AppActionTypes.FETCH_ALL_LANGUAGES,
  };
}
export function fetchAllLanguagesSuccess(languages: Languages[]): AppAction {
  return {
    type: AppActionTypes.FETCH_ALL_LANGUAGES_SUCCESS,
    payload: { languages },
  };
}
export function fetchAllLanguagesFailure(error: string): AppAction {
  return {
    type: AppActionTypes.FETCH_ALL_LANGUAGES_FAILURE,
    payload: { error },
  };
}
export function setMapView(payload: boolean): AppAction {
  return {
    type: AppActionTypes.SET_MAP_VIEW,
    payload,
  };
}
export function fetchAllLifestyles(): AppAction {
  return {
    type: AppActionTypes.FETCH_ALL_LIFESTYLES,
  };
}
export function fetchAllLifestylesSuccess(lifestyles: Lifestyles[]): AppAction {
  return {
    type: AppActionTypes.FETCH_ALL_LIFESTYLES_SUCCESS,
    payload: { lifestyles },
  };
}
export function fetchAllLifestylesFailure(error: string): AppAction {
  return {
    type: AppActionTypes.FETCH_ALL_LIFESTYLES_FAILURE,
    payload: { error },
  };
}
export function setFilterDrawer(isFilterDrawerOpen: boolean): AppAction {
  return {
    type: AppActionTypes.SET_FILTER_DRAWER,
    isFilterDrawerOpen,
  };
}
export function setAccountProfileDrawer(isAccountProfileDrawerOpen: boolean): AppAction {
  return {
    type: AppActionTypes.SET_ACCOUNT_PROFILE_DRAWER,
    isAccountProfileDrawerOpen,
  };
}
export function setLocateMeButton(isLocateMe: boolean): AppAction {
  return {
    type: AppActionTypes.SET_LOCATE_ME_BUTTON,
    isLocateMe,
  };
}

export function searchPlaces(payload: RocketSearchQueryType): AppAction {
  return {
    type: AppActionTypes.SEARCH_PLACES,
    payload,
  };
}

export function searchPlacesSuccess(response: RocketSearchResponse): AppAction {
  return {
    type: AppActionTypes.SEARCH_PLACES_SUCCESS,
    payload: { response },
  };
}

export function searchPlacesFailure(error: string): AppAction {
  return {
    type: AppActionTypes.SEARCH_PLACES_FAILURE,
    payload: { error },
  };
}

export function resetSearchPlaces(): AppAction {
  return { type: AppActionTypes.RESET_SEARCH_PLACES };
}
