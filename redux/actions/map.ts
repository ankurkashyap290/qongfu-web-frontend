import { MapAction, MapActionTypes, PlacesResponse, FetchAllPlacesType } from "../actionTypes";

export function fetchAllPlaces(payload: FetchAllPlacesType): MapAction {
  return {
    type: MapActionTypes.FETCH_ALL_PLACES,
    payload,
  };
}
export function fetchAllPlacesSuccess(response: PlacesResponse, __extras: any = null): MapAction {
  return {
    type: MapActionTypes.FETCH_ALL_PLACES_SUCCESS,
    payload: { response, __extras },
  };
}
export function fetchAllPlacesFailure(error: string): MapAction {
  return {
    type: MapActionTypes.FETCH_ALL_PLACES_FAILURE,
    payload: { error },
  };
}
