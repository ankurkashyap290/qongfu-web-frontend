import { takeEvery, put, fork, call } from "redux-saga/effects";
import { stringify } from "qs";
import { PlacesActionTypes, fetchPlaces, savePlaceRating } from "./../actionTypes";
import {
  fetchPlacesSuccess,
  fetchPlacesFailure,
  getPlaceSuccess,
  getPlaceFailure,
  savePlaceRatingFailure,
  savePlaceRatingSuccess,
} from "../actions/places";
import { get, post } from "../../utils/request";
import { SuccessStatusCode } from "../../config";
import { showDialog, setAreaAndCities } from "../actions/app";
import { toast } from "react-toastify";

export function* fetchAllPlaces(action: fetchPlaces) {
  try {
    const { payload, pagination } = action;
    const { __extras, ...data } = payload;
    const queryParams = { ...data, page: pagination?.page, per_page: pagination?.pageSize };
    const response = yield call(get, `/api/places?${stringify(queryParams)}`);
    if (SuccessStatusCode.includes(response.status)) {
      pagination!.total = response.data.total;
      pagination!.totalPage = Math.ceil(response.data.total / queryParams.per_page!);
      yield put(
        fetchPlacesSuccess(
          {
            places: response.data.data,
            locations: response.data.locations,
            params: response.data.params,
          },
          pagination!,
          __extras!
        )
      );

      yield put(setAreaAndCities(response.data.locations));
    } else {
      yield call(toast, "Error while fetching places");
      yield put(fetchPlacesFailure(response.message));
    }
  } catch (ex) {
    yield call(toast, "Error while fetching places");
    yield put(fetchPlacesFailure("Error while fetching places"));
  }
}

export function* getPlace(action: fetchPlaces) {
  try {
    const slug = action.payload.slug;
    const result = yield call(get, `/api/places/${slug}`);
    const response = result.response ? result.response : result;
    if (SuccessStatusCode.includes(response.status)) {
      yield put(getPlaceSuccess(response.data.data));
    } else if (response.status === 404) {
      yield put(getPlaceFailure("404"));
    } else {
      yield put(getPlaceFailure(response.message));
    }
  } catch (ex) {
    yield call(toast, "Error while fetching place");
    yield put(getPlaceFailure("Error while fetching place"));
  }
}

export function* placeRating(action: savePlaceRating) {
  try {
    const { payload, token } = action;
    const result = yield call(
      post,
      `/api/places/ratings`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response = result.response ? result.response : result;
    if (SuccessStatusCode.includes(response.status)) {
      yield put(savePlaceRatingSuccess(response.data.user));
      yield put(showDialog("info", `saved-place-rating`));
    } else {
      yield put(savePlaceRatingFailure(response.message));
    }
  } catch (ex) {
    yield call(toast, "Error while saving your reviews and ratings. Please try later");
    yield put(savePlaceRatingFailure("Error while saving your reviews and ratings"));
  }
}

export function* watchRequests() {
  yield takeEvery(PlacesActionTypes.FETCH_PLACES, fetchAllPlaces);
  yield takeEvery(PlacesActionTypes.GET_PLACE, getPlace);
  yield takeEvery(PlacesActionTypes.SAVE_PLACE_RATING, placeRating);
}

export default function* root() {
  yield fork(watchRequests);
}
