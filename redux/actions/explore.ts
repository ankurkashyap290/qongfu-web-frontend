import {
  ExploreAction,
  ExploreActionTypes,
  PlacesResponse,
  FetchAllPlacesType,
  Pagination,
} from "../actionTypes";
import { defaultPageSize } from "../../config";

export function fetchExplorePlaces(
  stateKey: string,
  payload: FetchAllPlacesType,
  pagination: Pagination = { page: 1, pageSize: defaultPageSize, total: 0 }
): ExploreAction {
  return {
    type: ExploreActionTypes.FETCH_EXPLORE_PLACES,
    payload,
    stateKey,
    pagination: pagination,
  };
}
export function fetchExplorePlacesSuccess(
  stateKey: string,
  response: PlacesResponse,
  pagination: Pagination,
  __extras: any = null
): ExploreAction {
  return {
    type: ExploreActionTypes.FETCH_EXPLORE_PLACES_SUCCESS,
    payload: { stateKey, response, pagination, __extras },
  };
}
export function fetchExplorePlacesFailure(stateKey: string, error: string): ExploreAction {
  return {
    type: ExploreActionTypes.FETCH_EXPLORE_PLACES_FAILURE,
    payload: { error, stateKey },
  };
}
