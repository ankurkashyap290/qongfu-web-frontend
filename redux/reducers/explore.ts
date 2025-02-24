import {
  ExploreActionTypes,
  ExploreAction,
  // Places,
  // Pagination
} from "./../actionTypes";
// import _ from 'lodash';
// import { defaultPageSize } from "../../config";

// interface placeState {
//   loading: boolean;
//   locations: string[] | [];
//   params: any | null;
//   error: string | null;
//   pagination: Pagination;
// }

export interface ExploreState {
  places: any;
  loading: any;
  pagination: any;
  locations: any;
  errors: any;
  countryId: number;
}
const initialState: ExploreState = {
  places: {},
  loading: {},
  pagination: {},
  locations: {},
  errors: {},
  countryId: 0,
};

export function exploreReducer(state = initialState, action: ExploreAction): ExploreState {
  switch (action.type) {
    case ExploreActionTypes.FETCH_EXPLORE_PLACES: {
      return { ...state, loading: { ...state.loading, [action.stateKey]: true } };
    }
    case ExploreActionTypes.FETCH_EXPLORE_PLACES_SUCCESS: {
      if (action.payload.__extras && action.payload.__extras.isPaginationScroll!) {
        return {
          ...state,
          loading: { ...state.loading, [action.payload.stateKey]: false },
          places: {
            ...state.places,
            [action.payload.stateKey]: [
              ...state.places[action.payload.stateKey],
              ...action.payload.response.places,
            ],
          },
          // locations: [...state.locations, ...action.payload.response.locations!],
          // params: { ...action.payload.response.params },
          pagination: {
            ...state.pagination,
            [action.payload.stateKey]: { ...action.payload.pagination },
          },
        };
      } else {
        return {
          ...state,
          loading: { ...state.loading, [action.payload.stateKey]: false },
          places: {
            ...state.places,
            [action.payload.stateKey]: [...action.payload.response.places],
          },
          // locations: [...action.payload.response.locations!],
          pagination: {
            ...state.pagination,
            [action.payload.stateKey]: { ...action.payload.pagination },
          },
        };
      }
    }

    case ExploreActionTypes.FETCH_EXPLORE_PLACES_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, [action.payload.stateKey]: false },
        places: { ...state.places, [action.payload.stateKey]: [] },
        // locations: [],
        pagination: {
          ...state.pagination,
          [action.payload.stateKey]: {
            ...state.pagination[action.payload.stateKey],
            total: 0,
            totalPage: 0,
          },
        },
        errors: { ...state.errors, [action.payload.stateKey]: action.payload.error },
      };
    default:
      return state;
  }
}
