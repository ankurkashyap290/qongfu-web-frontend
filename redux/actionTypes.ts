import { Action } from "redux";

export interface Places {
  id: number;
  user_id: number | null;
  place_name: string | null;
  description: string | null;
  location_lat: string;
  location_lng: string;
  country_id: number | null;
  address: string | null;
  location: string | null;
  location_details: string | null;
  place_cover_path: string | null;
  place_logo_path: string | null;
  contact_number: string | null;
  email_address: string | null;
  verified: number | null;
  claimed: number | null;
  views: number | null;
  stars: string | null;
  score: string | null;
  ratings_count: number | null;
  timing: Timing[];
  lifestyles: Lifestyles[];
  qongfus: Qongfus[];
  ratings?: Rating[];
  specialists?: Specialists[];
  today_day_of_week?: string | null;
  distance_rounded?: number | null;
  distance_formatted?: string | null;
  slug?: string;
  timing_calculated?: Timing[];
  start?: string;
  close?: string;
  today_day_of_week_name?: string;
  open_now?: boolean;
  place_logo_url?: string | null;
  place_cover_url?: string | null;
  amenities?: any;
}

export interface Rating {
  id: number;
  ratingable_id: number;
  ratingable_type: string;
  stars: number;
  review: string;
  approved: number;
  user_id: number;
}

export interface PlaceRating {
  id: number;
  stars: number;
  review: string;
}

export interface Specialists {
  id: number;
  user_id: number;
  approved: number;
  title: string;
  client_type: string;
  passport: string | null;
  photo_id: number | null;
  created_at: string | null;
  updated_at: string | null;
  pivot: {
    place_id: number;
    specialist_id: number;
  };
}

export interface PlacesResponse {
  places: Places[];
  locations?: string[] | [];
  params: any | null;
}

export interface FetchPlacesType {
  location_lat?: number;
  location_lng?: number;
  search?: string;
  max_distance?: number;
  max_results?: number;
  country_id?: number;
  verified?: number;
  lifestyles?: string;
  slug?: string;
  sort_by?: string;
  __extras?: any;
}

export interface RocketSearchQueryType {
  search: string;
  country_id?: number;
}

export interface RocketSearchResponse {
  places: any[];
  specialists: any[];
  members: any[];
  qongfus: any[];
  locations: {
    countries: any[];
    regions: any[];
    cities: any[];
    areas: any[];
  };
}

export interface FetchAllPlacesType {
  location_lat?: number;
  location_lng?: number;
  location?: string;
  search?: string;
  max_distance?: number;
  max_results?: number;
  country_id?: number;
  verified?: number;
  lifestyles?: string;
  sort_by?: string;
  rating?: string;
  __extras?: any;
}

export interface GetPlaceType {
  slug: string;
}

export interface IpAddress {
  ip: string;
}

export interface Timing {
  day?: string;
  start: string;
  close: string;
  date: string;
  weekday: string;
}
export interface Lifestyles {
  id?: number;
  lifestyle: string;
  lifestyle_code?: string | null;
  lifestyle_color?: string | null;
  lifestyle_image?: string | null;
  lifestyle_cover?: string | null;
  lifestyle_icon?: string | null;
  views?: number | null;
  qongfus_count?: number | null;
  qongfus: Qongfus[];
  slug?: string;
}
export interface Pagination {
  total?: number;
  totalPage?: number;
  pageSize: number;
  page: number;
}

export interface Location {
  lat: number;
  lng: number;
  area?: string;
  city?: string;
  country?: string;
  address?: string;
  region?: string;
}

export interface Qongfus {
  id?: number;
  qongfu: string;
  qongfu_code?: string;
  qongfu_color?: string;
  qongfu_image?: string;
  qongfu_cover?: string;
  qongfu_icon?: string;
  lifestyle_id?: number;
}
export interface UserLocation {
  location: Location;
  userAllowed: boolean;
  userPublicIp: string;
}

export interface lifestyleFilter {
  all: boolean;
  fitness: boolean;
  sports: boolean;
  martialArts: boolean;
  wellness: boolean;
  recreation: boolean;
}

export interface AdvanceSearchFilters {
  sortBy: string;
  lifestyle: string[];
  country: string;
  areaAndCities?: string[];
  rated?: string[];
  search?: string;
}

export interface Marker {
  lat: number;
  lng: number;
  place: Places;
  onMarkerClick?: Function;
  clusterLength?: number;
}

export interface LifestyleSlug {
  slug: string;
}

export interface LoginType {
  email: string;
  password: any;
}

export interface RegisterType {
  fullname: string;
  email: string;
  password: any;
}

export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  fullname?: string;
  display_name?: string;
  country_id?: number;
  email?: string;
  city?: string;
  area?: string;
  contact_number?: string;
  gender?: string;
  bio?: string;
  location?: string;
  location_lat?: number;
  location_lng?: number;
  date_of_birth?: string;
  avatar?: File;
  avatar_url?: string;
  cover_url?: string;
  lifestyles?: Lifestyles[] | [];
  qongfus?: Qongfus[] | [];
  country?: any;
  email_verified?: boolean;
  contact_number_verified?: boolean;
  identity_verified?: boolean;
  cover_photo?: File;
  languages?: Languages[];
  hometown?: string;
  region?: string;
  location_data?: any;
}

export interface InputCode {
  code: string;
}
export interface Notification {
  open: boolean;
  message: string;
}

export interface UpdateNewPassword {
  password: string;
  oldPassword?: string;
}

export interface ResetPassword {
  reset_type: string;
  email?: string;
  contact_number?: string;
}
export interface ResetPasswordCode {
  reset_type: string;
  reset_key: string;
}
export interface UserPasswordChange {
  old_password: string;
  password: string;
}
export interface Languages {
  id: number;
  language: string;
  language_code: string;
}
export interface MissingEntity {
  id?: number;
  type: string;
  content: string;
  flags: string[];
  user_id?: number;
  email?: string;
}
export interface Countries {
  id: number;
  country: string;
  native: string | null;
  capital: string | null;
  country_code: string;
  nationality: string;
  dial_code: string;
  approved: number;
  currency: string | null;
  currency_code: string | null;
  currency_decimal: string | null;
  emoji: any;
  emojiU: string | null;
  flag: any;
  content: string | null;
  slag: string | null;
  meta: string | null;
  official_language: string;
  regions: [];
}
export enum FundsActionTypes {
  ADD_FUNDS = "ADD_FUNDS",
  ADD_FUNDS_SUCCESS = "ADD_FUNDS_SUCCESS",
  ADD_FUNDS_FAILURE = "ADD_FUNDS_FAILURE",
}

export enum PlacesActionTypes {
  FETCH_PLACES = "FETCH_PLACES",
  FETCH_PLACES_SUCCESS = "FETCH_PLACES_SUCCESS",
  FETCH_PLACES_FAILURE = "FETCH_PLACES_FAILURE",
  GET_PLACE = "GET_PLACE",
  GET_PLACE_SUCCESS = "GET_PLACE_SUCCESS",
  GET_PLACE_FAILURE = "GET_PLACE_FAILURE",
  SAVE_PLACE_RATING = "SAVE_PLACE_RATING",
  SAVE_PLACE_RATING_SUCCESS = "SAVE_PLACE_RATING_SUCCESS",
  SAVE_PLACE_RATING_FAILURE = "SAVE_PLACE_RATING_FAILURE",
}

export enum AppActionTypes {
  SET_IP = "SET_IP",
  SET_LOCATION = "SET_LOCATION",
  IS_LOCATION_ALLOW = "IS_LOCATION_ALLOW",
  APP_INITIALIZE_REQUEST = "app/INITIALIZE_REQUEST",
  APP_INITIALIZED_SET = "app/INITIALIZE_SET",
  APP_INITIALIZE_ERROR = "APP_INITIALIZE_ERROR",
  SET_ADVANCE_SEARCH_FILTERS = "SET_ADVANCE_SEARCH_FILTERS",
  SET_LIFESTYLE_SLUG = "SET_LIFESTYLE_SLUG",
  SET_NOTIFICATION = "SET_NOTIFICATION",
  UNSET_NOTIFICATION = "UNSET_NOTIFICATION",
  FETCH_ALL_QONGFUS = "FETCH_ALL_QONGFUS",
  FETCH_ALL_QONGFUS_SUCCESS = "FETCH_ALL_QONGFUS_SUCCESS",
  FETCH_ALL_QONGFUS_FAILURE = "FETCH_ALL_QONGFUS_FAILURE",
  FETCH_ALL_LANGUAGES = "FETCH_ALL_LANGUAGES",
  FETCH_ALL_LANGUAGES_SUCCESS = "FETCH_ALL_LANGUAGES_SUCCESS",
  FETCH_ALL_LANGUAGES_FAILURE = "FETCH_ALL_LANGUAGES_FAILURE",
  SET_MAP_VIEW = "SET_MAP_VIEW",
  SHOW_DIALOG = "SHOW_DIALOG",
  HIDE_DIALOG = "HIDE_DIALOG",
  FETCH_ALL_LIFESTYLES = "FETCH_ALL_LIFESTYLES",
  FETCH_ALL_LIFESTYLES_SUCCESS = "FETCH_ALL_LIFESTYLES_SUCCESS",
  FETCH_ALL_LIFESTYLES_FAILURE = "FETCH_ALL_LIFESTYLES_FAILURE",
  SET_FILTER_DRAWER = "SET_FILTER_DRAWER",
  SET_ACCOUNT_PROFILE_DRAWER = "SET_ACCOUNT_PROFILE_DRAWER",
  SET_LOCATE_ME_BUTTON = "SET_LOCATE_ME_BUTTON",
  SET_AREA_AND_CITIES = "SET_AREA_AND_CITIES",
  SEARCH_PLACES = "SEARCH_PLACES",
  SEARCH_PLACES_SUCCESS = "SEARCH_PLACES_SUCCESS",
  SEARCH_PLACES_FAILURE = "SEARCH_PLACES_FAILURE",
  RESET_SEARCH_PLACES = "RESET_SEARCH_PLACES",
}

export enum UserActionTypes {
  USER_REGISTER = "USER_REGISTER",
  USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS",
  USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE",
  USER_LOGIN = "USER_LOGIN",
  USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE",
  SET_MOBILE_NUMBER = "SET_MOBILE_NUMBER",
  SET_MOBILE_NUMBER_SUCCESS = "SET_MOBILE_NUMBER_SUCCESS",
  SET_MOBILE_NUMBER_FAILURE = "SET_MOBILE_NUMBER_FAILURE",
  VERIFY_INPUT_CODE = "VERIFY_INPUT_CODE",
  VERIFY_INPUT_CODE_SUCCESS = "VERIFY_INPUT_CODE_SUCCESS",
  VERIFY_INPUT_CODE_FAILURE = "VERIFY_INPUT_CODE_FAILURE",
  RESEND_PHONE_VERIFY = "RESEND_PHONE_VERIFY",
  RESEND_PHONE_VERIFY_SUCCESS = "RESEND_PHONE_VERIFY_SUCCESS",
  RESEND_PHONE_VERIFY_FAILURE = "RESEND_PHONE_VERIFY_FAILURE",
  RESET_PASSWORD = "RESET_PASSWORD",
  RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE",
  RESET_PASSWORD_CODE_VERIFICATION = "RESET_PASSWORD_CODE_VERIFICATION",
  RESET_PASSWORD_CODE_VERIFICATION_SUCCESS = "RESET_PASSWORD_CODE_VERIFICATION_SUCCESS",
  RESET_PASSWORD_CODE_VERIFICATION_FAILURE = "RESET_PASSWORD_CODE_VERIFICATION_FAILURE",
  SAVE_NEW_PASSWORD = "SAVE_NEW_PASSWORD",
  SAVE_NEW_PASSWORD_SUCCESS = "SAVE_NEW_PASSWORD_SUCCESS",
  SAVE_NEW_PASSWORD_FAILURE = "SAVE_NEW_PASSWORD_FAILURE",
  SAVE_USER_DETAILS = "SAVE_USER_DETAILS",
  SAVE_USER_DETAILS_SUCCESS = "SAVE_USER_DETAILS_SUCCESS",
  SAVE_USER_DETAILS_FAILURE = "SAVE_USER_DETAILS_FAILURE",
  GET_USER_DETAILS = "GET_USER_DETAILS",
  GET_USER_DETAILS_SUCCESS = "GET_USER_DETAILS_SUCCESS",
  GET_USER_DETAILS_FAILURE = "GET_USER_DETAILS_FAILURE",
  SET_TOKEN = "SET_TOKEN",
  SET_PROFILE = "SET_PROFILE",
  USER_LOGOUT = "USER_LOGOUT",
  USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS",
  USER_LOGOUT_FAILURE = "USER_LOGOUT_FAILURE",
  USER_PASSWORD_CHANGE = "USER_PASSWORD_CHANGE",
  USER_PASSWORD_CHANGE_SUCCESS = "USER_PASSWORD_CHANGE_SUCCESS",
  USER_PASSWORD_CHANGE_FAILURE = "USER_PASSWORD_CHANGE_FAILURE",
  SET_ACTIVE_SETTINGS_TAB = "SET_ACTIVE_SETTINGS_TAB",
  ADD_MISSING_ENTITY = "ADD_MISSING_ENTITY",
  ADD_MISSING_ENTITY_SUCCESS = "ADD_MISSING_ENTITY_SUCCESS",
  ADD_MISSING_ENTITY_FAILURE = "ADD_MISSING_ENTITY_FAILURE",
  SET_USER_ONBOARDING_STEP = "SET_USER_ONBOARDING_STEP",
  SET_UPLOAD_PROGRESS_PARAM = "SET_UPLOAD_PROGRESS_PARAM",
}

export enum MapActionTypes {
  FETCH_ALL_PLACES = "FETCH_ALL_PLACES",
  FETCH_ALL_PLACES_SUCCESS = "FETCH_ALL_PLACES_SUCCESS",
  FETCH_ALL_PLACES_FAILURE = "FETCH_ALL_PLACES_FAILURE",
}

export enum ExploreActionTypes {
  FETCH_EXPLORE_PLACES = "FETCH_EXPLORE_PLACES",
  FETCH_EXPLORE_PLACES_SUCCESS = "FETCH_EXPLORE_PLACES_SUCCESS",
  FETCH_EXPLORE_PLACES_FAILURE = "FETCH_EXPLORE_PLACES_FAILURE",
}

export interface fetchPlaces extends Action {
  type: typeof PlacesActionTypes.FETCH_PLACES;
  payload: FetchPlacesType;
  pagination?: Pagination | null;
}
export interface fetchPlacesSuccess extends Action {
  type: typeof PlacesActionTypes.FETCH_PLACES_SUCCESS;
  payload: { response: PlacesResponse; pagination: Pagination; __extras?: any };
}
export interface fetchPlacesFailure extends Action {
  type: typeof PlacesActionTypes.FETCH_PLACES_FAILURE;
  payload: { error: string };
}
export interface getPlace extends Action {
  type: typeof PlacesActionTypes.GET_PLACE;
  payload: GetPlaceType;
}
export interface getPlaceSuccess extends Action {
  type: typeof PlacesActionTypes.GET_PLACE_SUCCESS;
  payload: { place: Places };
}
export interface getPlaceFailure extends Action {
  type: typeof PlacesActionTypes.GET_PLACE_FAILURE;
  payload: { error: string };
}
export interface fetchAllLifestyles extends Action {
  type: typeof AppActionTypes.FETCH_ALL_LIFESTYLES;
}
export interface fetchAllLifestylesSuccess extends Action {
  type: typeof AppActionTypes.FETCH_ALL_LIFESTYLES_SUCCESS;
  payload: { lifestyles: Lifestyles[] };
}
export interface fetchAllLifestylesFailure extends Action {
  type: typeof AppActionTypes.FETCH_ALL_LIFESTYLES_FAILURE;
  payload: { error: string };
}
export interface fetchAllQongfus extends Action {
  type: typeof AppActionTypes.FETCH_ALL_QONGFUS;
}
export interface fetchAllQongfusSuccess extends Action {
  type: typeof AppActionTypes.FETCH_ALL_QONGFUS_SUCCESS;
  payload: { qongfus: Qongfus[] };
}
export interface fetchAllQongfusFailure extends Action {
  type: typeof AppActionTypes.FETCH_ALL_QONGFUS_FAILURE;
  payload: { error: string };
}
export interface fetchAllLanguages extends Action {
  type: typeof AppActionTypes.FETCH_ALL_LANGUAGES;
}
export interface fetchAllLanguagesSuccess extends Action {
  type: typeof AppActionTypes.FETCH_ALL_LANGUAGES_SUCCESS;
  payload: { languages: Languages[] };
}
export interface fetchAllLanguagesFailure extends Action {
  type: typeof AppActionTypes.FETCH_ALL_LANGUAGES_FAILURE;
  payload: { error: string };
}
export interface setIpType extends Action {
  type: typeof AppActionTypes.SET_IP;
  payload: IpAddress;
}

export interface setAreaAndCities extends Action {
  type: typeof AppActionTypes.SET_AREA_AND_CITIES;
  payload: any;
}

export interface showModal extends Action {
  type: typeof AppActionTypes.SHOW_DIALOG;
  modalType: string;
  code: string;
}

export interface hideModal extends Action {
  type: typeof AppActionTypes.HIDE_DIALOG;
  modalType: string;
  code: string;
}

export interface setLocationType extends Action {
  type: typeof AppActionTypes.SET_LOCATION;
  payload: UserLocation;
}

export interface RequestAppInitialize extends Action {
  type: AppActionTypes.APP_INITIALIZE_REQUEST;
}

export interface SetAppAsInitialized extends Action {
  type: AppActionTypes.APP_INITIALIZED_SET;
  payload: any;
}

export interface SetAppInitializeError extends Action {
  type: AppActionTypes.APP_INITIALIZE_ERROR;
  payload: string;
}

export interface SetAdvanceSearchFilters extends Action {
  type: AppActionTypes.SET_ADVANCE_SEARCH_FILTERS;
  payload: AdvanceSearchFilters;
}

export interface SetLifestyleSlug extends Action {
  type: AppActionTypes.SET_LIFESTYLE_SLUG;
  payload: LifestyleSlug;
}
export interface setNotification extends Action {
  type: typeof AppActionTypes.SET_NOTIFICATION;
  payload: Notification;
}
export interface unsetNotification extends Action {
  type: typeof AppActionTypes.UNSET_NOTIFICATION;
}
export interface setMapView extends Action {
  type: typeof AppActionTypes.SET_MAP_VIEW;
  payload: boolean;
}
export interface setFilterDrawer extends Action {
  type: typeof AppActionTypes.SET_FILTER_DRAWER;
  isFilterDrawerOpen: boolean;
}
export interface setAccountProfileDrawer extends Action {
  type: typeof AppActionTypes.SET_ACCOUNT_PROFILE_DRAWER;
  isAccountProfileDrawerOpen: boolean;
}
export interface setLocateMeButton extends Action {
  type: typeof AppActionTypes.SET_LOCATE_ME_BUTTON;
  isLocateMe: boolean;
}

export interface SearchPlaces extends Action {
  type: typeof AppActionTypes.SEARCH_PLACES;
  payload: RocketSearchQueryType;
}

export interface SearchPlacesSuccess extends Action {
  type: typeof AppActionTypes.SEARCH_PLACES_SUCCESS;
  payload: { response: RocketSearchResponse };
}
export interface SearchPlacesFailure extends Action {
  type: typeof AppActionTypes.SEARCH_PLACES_FAILURE;
  payload: { error: string };
}

export interface ResetSearchPlaces extends Action {
  type: typeof AppActionTypes.RESET_SEARCH_PLACES;
}
export interface userRegister extends Action {
  type: typeof UserActionTypes.USER_REGISTER;
  payload: RegisterType;
}
export interface userRegisterSuccess extends Action {
  type: typeof UserActionTypes.USER_REGISTER_SUCCESS;
  payload: { response: string };
}
export interface userRegisterFailure extends Action {
  type: typeof UserActionTypes.USER_REGISTER_FAILURE;
  payload: { error: string };
}
export interface userLogin extends Action {
  type: typeof UserActionTypes.USER_LOGIN;
  payload: LoginType;
  rememberMe: boolean;
}
export interface userLoginSuccess extends Action {
  type: typeof UserActionTypes.USER_LOGIN_SUCCESS;
  payload: { response: string; profile: User };
}
export interface userLoginFailure extends Action {
  type: typeof UserActionTypes.USER_LOGIN_FAILURE;
  payload: { error: string };
}
export interface setMobileNumber extends Action {
  type: typeof UserActionTypes.SET_MOBILE_NUMBER;
  payload: User;
  token: string | null;
}
export interface setMobileNumberSuccess extends Action {
  type: typeof UserActionTypes.SET_MOBILE_NUMBER_SUCCESS;
  payload: { response: User };
}
export interface setMobileNumberFailure extends Action {
  type: typeof UserActionTypes.SET_MOBILE_NUMBER_FAILURE;
  payload: { error: string };
}
export interface verifyInputCode extends Action {
  type: typeof UserActionTypes.VERIFY_INPUT_CODE;
  payload: InputCode;
  token: string | null;
}
export interface verifyInputCodeSuccess extends Action {
  type: typeof UserActionTypes.VERIFY_INPUT_CODE_SUCCESS;
  payload: { response: User | null };
}
export interface verifyInputCodeFailure extends Action {
  type: typeof UserActionTypes.VERIFY_INPUT_CODE_FAILURE;
  payload: { error: string };
}

export interface resendVerifyPhone extends Action {
  type: typeof UserActionTypes.RESEND_PHONE_VERIFY;
  token: string | null;
}
export interface resendVerifyPhoneSuccess extends Action {
  type: typeof UserActionTypes.RESEND_PHONE_VERIFY_SUCCESS;
  payload: { response: User | null };
}
export interface resendVerifyPhoneFailure extends Action {
  type: typeof UserActionTypes.RESEND_PHONE_VERIFY_FAILURE;
  payload: { error: string };
}

export interface resetPassword extends Action {
  type: typeof UserActionTypes.RESET_PASSWORD;
  payload: ResetPassword;
  resetPasswordType: string | null;
  resetPasswordValue: string | null;
}
export interface resetPasswordSuccess extends Action {
  type: typeof UserActionTypes.RESET_PASSWORD_SUCCESS;
  payload: { response: string };
}
export interface resetPasswordFailure extends Action {
  type: typeof UserActionTypes.RESET_PASSWORD_FAILURE;
  payload: { error: string; resetType: string };
}
export interface resetPasswordCodeVerification extends Action {
  type: typeof UserActionTypes.RESET_PASSWORD_CODE_VERIFICATION;
  payload: ResetPasswordCode;
}
export interface resetPasswordCodeVerificationSuccess extends Action {
  type: typeof UserActionTypes.RESET_PASSWORD_CODE_VERIFICATION_SUCCESS;
  payload: { response: string };
}
export interface resetPasswordCodeVerificationFailure extends Action {
  type: typeof UserActionTypes.RESET_PASSWORD_CODE_VERIFICATION_FAILURE;
  payload: { error: string; resetType: string };
}
export interface saveNewPassword extends Action {
  type: typeof UserActionTypes.SAVE_NEW_PASSWORD;
  payload: UpdateNewPassword;
  token: string;
}
export interface saveNewPasswordSuccess extends Action {
  type: typeof UserActionTypes.SAVE_NEW_PASSWORD_SUCCESS;
  payload: { response: string };
}
export interface saveNewPasswordFailure extends Action {
  type: typeof UserActionTypes.SAVE_NEW_PASSWORD_FAILURE;
  payload: { error: string };
}
export interface saveUserDetails extends Action {
  type: typeof UserActionTypes.SAVE_USER_DETAILS;
  payload: User;
  token: string | null;
  step?: string | null;
  updateType?: string | null;
}
export interface saveUserDetailsSuccess extends Action {
  type: typeof UserActionTypes.SAVE_USER_DETAILS_SUCCESS;
  payload: { response: User };
}
export interface saveUserDetailsFailure extends Action {
  type: typeof UserActionTypes.SAVE_USER_DETAILS_FAILURE;
  payload: { error: string; updateType: string };
}
export interface getUserDetails extends Action {
  type: typeof UserActionTypes.GET_USER_DETAILS;
  token: string | null;
}
export interface getUserDetailsSuccess extends Action {
  type: typeof UserActionTypes.GET_USER_DETAILS_SUCCESS;
  payload: { response: User };
}
export interface getUserDetailsFailure extends Action {
  type: typeof UserActionTypes.GET_USER_DETAILS_FAILURE;
  payload: { error: string };
}
export interface setToken extends Action {
  type: typeof UserActionTypes.SET_TOKEN;
  payload: { token: string };
}
export interface setProfile extends Action {
  type: typeof UserActionTypes.SET_PROFILE;
  payload: { profile: User };
}
export interface userLogout extends Action {
  type: typeof UserActionTypes.USER_LOGOUT;
  token: string | null;
}
export interface userLogoutSuccess extends Action {
  type: typeof UserActionTypes.USER_LOGOUT_SUCCESS;
  payload: { response: string };
}
export interface userLogoutFailure extends Action {
  type: typeof UserActionTypes.USER_LOGOUT_FAILURE;
  payload: { error: string };
}
export interface userPasswordChange extends Action {
  type: typeof UserActionTypes.USER_PASSWORD_CHANGE;
  payload: UserPasswordChange;
  token: string | null;
  updateType?: string | null;
}
export interface userPasswordChangeSuccess extends Action {
  type: typeof UserActionTypes.USER_PASSWORD_CHANGE_SUCCESS;
  payload: { response: string };
}
export interface userPasswordChangeFailure extends Action {
  type: typeof UserActionTypes.USER_PASSWORD_CHANGE_FAILURE;
  payload: { error: string };
}
export interface savePlaceRating extends Action {
  type: PlacesActionTypes.SAVE_PLACE_RATING;
  payload: PlaceRating;
  token: string | null;
}

export interface savePlaceRatingSuccess extends Action {
  type: typeof PlacesActionTypes.SAVE_PLACE_RATING_SUCCESS;
  payload: { response: string };
}
export interface savePlaceRatingFailure extends Action {
  type: typeof PlacesActionTypes.SAVE_PLACE_RATING_FAILURE;
  payload: { error: string };
}
export interface setActiveSettingsTab extends Action {
  type: typeof UserActionTypes.SET_ACTIVE_SETTINGS_TAB;
  activeSettingsTab: string;
}
export interface addMissingEntity extends Action {
  type: UserActionTypes.ADD_MISSING_ENTITY;
  payload: MissingEntity;
}

export interface addMissingEntitySuccess extends Action {
  type: typeof UserActionTypes.ADD_MISSING_ENTITY_SUCCESS;
  payload: { response: string };
}
export interface addMissingEntityFailure extends Action {
  type: typeof UserActionTypes.ADD_MISSING_ENTITY_FAILURE;
  payload: { error: string };
}
export interface setUserOnboardingStep extends Action {
  type: typeof UserActionTypes.SET_USER_ONBOARDING_STEP;
  userOnboardingStep: string;
}
export interface setUploadProgressParam extends Action {
  type: typeof UserActionTypes.SET_UPLOAD_PROGRESS_PARAM;
  progress: number;
}

export interface fetchAllPlaces extends Action {
  type: typeof MapActionTypes.FETCH_ALL_PLACES;
  payload: FetchAllPlacesType;
}
export interface fetchAllPlacesSuccess extends Action {
  type: typeof MapActionTypes.FETCH_ALL_PLACES_SUCCESS;
  payload: { response: PlacesResponse; __extras?: any };
}
export interface fetchAllPlacesFailure extends Action {
  type: typeof MapActionTypes.FETCH_ALL_PLACES_FAILURE;
  payload: { error: string };
}

export interface fetchExplorePlaces extends Action {
  type: typeof ExploreActionTypes.FETCH_EXPLORE_PLACES;
  stateKey: string;
  payload: FetchPlacesType;
  pagination?: Pagination | null;
}
export interface fetchExplorePlacesSuccess extends Action {
  type: typeof ExploreActionTypes.FETCH_EXPLORE_PLACES_SUCCESS;
  payload: { stateKey; response: PlacesResponse; pagination: Pagination; __extras?: any };
}
export interface fetchExplorePlacesFailure extends Action {
  type: typeof ExploreActionTypes.FETCH_EXPLORE_PLACES_FAILURE;
  payload: { error: string; stateKey: string };
}

export type PlacesAction =
  | fetchPlaces
  | fetchPlacesSuccess
  | fetchPlacesFailure
  | getPlace
  | getPlaceSuccess
  | getPlaceFailure
  | savePlaceRating
  | savePlaceRatingSuccess
  | savePlaceRatingFailure;

export type AppAction =
  | setLocationType
  | setIpType
  | RequestAppInitialize
  | SetAppAsInitialized
  | SetAppInitializeError
  | SetAdvanceSearchFilters
  | SetLifestyleSlug
  | setNotification
  | unsetNotification
  | fetchAllQongfus
  | fetchAllQongfusSuccess
  | fetchAllQongfusFailure
  | fetchAllLanguages
  | fetchAllLanguagesSuccess
  | fetchAllLanguagesFailure
  | setMapView
  | showModal
  | hideModal
  | fetchAllLifestyles
  | fetchAllLifestylesSuccess
  | fetchAllLifestylesFailure
  | setFilterDrawer
  | setAccountProfileDrawer
  | setLocateMeButton
  | setAreaAndCities
  | SearchPlaces
  | SearchPlacesSuccess
  | SearchPlacesFailure
  | ResetSearchPlaces;

export type UserAction =
  | userRegister
  | userRegisterSuccess
  | userRegisterFailure
  | userLogin
  | userLoginSuccess
  | userLoginFailure
  | setMobileNumber
  | setMobileNumberSuccess
  | setMobileNumberFailure
  | verifyInputCode
  | verifyInputCodeSuccess
  | verifyInputCodeFailure
  | resendVerifyPhone
  | resendVerifyPhoneSuccess
  | resendVerifyPhoneFailure
  | resetPassword
  | resetPasswordSuccess
  | resetPasswordFailure
  | resetPasswordCodeVerification
  | resetPasswordCodeVerificationSuccess
  | resetPasswordCodeVerificationFailure
  | saveNewPassword
  | saveNewPasswordSuccess
  | saveNewPasswordFailure
  | saveUserDetails
  | saveUserDetailsSuccess
  | saveUserDetailsFailure
  | getUserDetails
  | getUserDetailsSuccess
  | getUserDetailsFailure
  | setToken
  | setProfile
  | userLogout
  | userLogoutSuccess
  | userLogoutFailure
  | userPasswordChange
  | userPasswordChangeSuccess
  | userPasswordChangeFailure
  | setActiveSettingsTab
  | setActiveSettingsTab
  | addMissingEntity
  | addMissingEntityFailure
  | addMissingEntitySuccess
  | setUserOnboardingStep
  | setUploadProgressParam;

export type MapAction = fetchAllPlaces | fetchAllPlacesSuccess | fetchAllPlacesFailure;

export type ExploreAction =
  | fetchExplorePlaces
  | fetchExplorePlacesSuccess
  | fetchExplorePlacesFailure;
