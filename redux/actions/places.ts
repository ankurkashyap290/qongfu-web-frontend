import {
  PlacesActionTypes,
  PlacesAction,
  Places,
  Pagination,
  FetchPlacesType,
  GetPlaceType,
  PlacesResponse,
  PlaceRating,
} from "../actionTypes";

import { defaultPageSize } from "../../config";

export function fetchPlaces(
  payload: FetchPlacesType,
  pagination: Pagination = { page: 1, pageSize: defaultPageSize, total: 0 }
): PlacesAction {
  return {
    type: PlacesActionTypes.FETCH_PLACES,
    payload,
    pagination: pagination,
  };
}
export function fetchPlacesSuccess(
  response: PlacesResponse,
  pagination: Pagination,
  __extras: any = null
): PlacesAction {
  return {
    type: PlacesActionTypes.FETCH_PLACES_SUCCESS,
    payload: { response, pagination, __extras },
  };
}
export function fetchPlacesFailure(error: string): PlacesAction {
  return {
    type: PlacesActionTypes.FETCH_PLACES_FAILURE,
    payload: { error },
  };
}

export function getPlace(payload: GetPlaceType): PlacesAction {
  return {
    type: PlacesActionTypes.GET_PLACE,
    payload,
  };
}
export function getPlaceSuccess(place: Places): PlacesAction {
  return {
    type: PlacesActionTypes.GET_PLACE_SUCCESS,
    payload: { place },
  };
}
export function getPlaceFailure(error: string): PlacesAction {
  return {
    type: PlacesActionTypes.GET_PLACE_FAILURE,
    payload: { error },
  };
}

export function savePlaceRatingSuccess(response: string): PlacesAction {
  return {
    type: PlacesActionTypes.SAVE_PLACE_RATING_SUCCESS,
    payload: { response },
  };
}

export function savePlaceRatingFailure(error: string): PlacesAction {
  return {
    type: PlacesActionTypes.SAVE_PLACE_RATING_FAILURE,
    payload: { error },
  };
}

export function savePlaceRating(payload: PlaceRating, token: string | null): PlacesAction {
  return {
    type: PlacesActionTypes.SAVE_PLACE_RATING,
    payload,
    token,
  };
}
