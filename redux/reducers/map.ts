import { Places, AdvanceSearchFilters, MapAction, MapActionTypes } from "./../actionTypes";

export interface MapState {
  loading: boolean;
  places: Places[];
  filters: AdvanceSearchFilters[];
}

const initialState: MapState = {
  loading: false,
  places: [],
  filters: [],
};

export function mapReducer(state = initialState, action: MapAction): MapState {
  switch (action.type) {
    case MapActionTypes.FETCH_ALL_PLACES:
      return { ...state, loading: true };
    case MapActionTypes.FETCH_ALL_PLACES_SUCCESS: {
      if (action.payload.__extras && action.payload.__extras.isPaginationScroll!) {
        return {
          ...state,
          loading: false,
          places: [...state.places, ...action.payload.response.places],
          //   locations: [...state.locations, ...action.payload.response.locations!],
          // params: { ...action.payload.response.params },
        };
      } else {
        return {
          ...state,
          loading: false,
          places: [...action.payload.response.places],
          // locations: [...action.payload.response.locations!],
          //   params: { ...action.payload.response.params },
        };
      }
    }

    case MapActionTypes.FETCH_ALL_PLACES_FAILURE:
      return {
        ...state,
        loading: false,
        places: [],
        // locations: [],
        // pagination: { ...state.pagination, total: 0, totalPage: 0 },
        // error: action.payload.error,
      };
    default:
      return state;
  }
}
