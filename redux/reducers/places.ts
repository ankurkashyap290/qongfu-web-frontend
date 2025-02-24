import { PlacesActionTypes, PlacesAction, Places, Pagination } from "./../actionTypes";
import { defaultPageSize } from "../../config";

export interface PlacesState {
  loading: boolean;
  places: Places[];
  locations: string[] | [];
  params: any | null;
  error: string | null;
  pagination: Pagination;
  place: Places | null;
  placeError: string | null;
  searchPlaces: Places[];
  searchLoading: boolean;
}
const initialState: PlacesState = {
  loading: false,
  places: [],
  locations: [],
  params: {},
  error: null,
  pagination: {
    total: 0,
    page: 1,
    pageSize: defaultPageSize,
  },
  place: null,
  placeError: null,
  searchPlaces: [],
  searchLoading: false,
};

export function placesReducer(state = initialState, action: PlacesAction): PlacesState {
  switch (action.type) {
    case PlacesActionTypes.FETCH_PLACES:
      return { ...state, loading: true };
    case PlacesActionTypes.FETCH_PLACES_SUCCESS: {
      if (action.payload.__extras && action.payload.__extras.isPaginationScroll!) {
        return {
          ...state,
          loading: false,
          places: [...state.places, ...action.payload.response.places],
          // locations: [...state.locations, ...action.payload.response.locations!],
          params: { ...action.payload.response.params },
          pagination: { ...action.payload.pagination },
        };
      } else {
        return {
          ...state,
          loading: false,
          places: [...action.payload.response.places],
          // locations: [...action.payload.response.locations!],
          params: { ...action.payload.response.params },
          pagination: { ...action.payload.pagination },
        };
      }
    }

    case PlacesActionTypes.FETCH_PLACES_FAILURE:
      return {
        ...state,
        loading: false,
        places: [],
        locations: [],
        pagination: { ...state.pagination, total: 0, totalPage: 0 },
        error: action.payload.error,
      };
    case PlacesActionTypes.GET_PLACE:
      return { ...state, loading: true, place: null, placeError: null };
    case PlacesActionTypes.GET_PLACE_SUCCESS:
      return {
        ...state,
        loading: false,
        place: { ...action.payload.place },
      };
    case PlacesActionTypes.GET_PLACE_FAILURE:
      return {
        ...state,
        loading: false,
        placeError: action.payload.error,
      };
    case PlacesActionTypes.SAVE_PLACE_RATING:
      return { ...state, loading: true };

    case PlacesActionTypes.SAVE_PLACE_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        // searchPlaces: [...action.payload.response.places],
      };
    case PlacesActionTypes.SAVE_PLACE_RATING_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
}
