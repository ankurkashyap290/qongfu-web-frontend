import { takeEvery, put, fork, call } from "redux-saga/effects";
import { stringify } from "qs";
// import Router from "next/router";
import { fetchAllPlaces, MapActionTypes } from "../actionTypes";
import { fetchAllPlacesFailure, fetchAllPlacesSuccess } from "../actions/map";
import { get } from "../../utils/request";
import { SuccessStatusCode } from "../../config";
// import { showDialog } from "../actions/app";
import { toast } from "react-toastify";

export function* fetchPlaces(action: fetchAllPlaces) {
  try {
    const { payload } = action;
    const { __extras, ...data } = payload;
    const queryParams = { ...data };
    const response = yield call(get, `/api/places?${stringify(queryParams)}`);
    if (SuccessStatusCode.includes(response.status)) {
      yield put(
        fetchAllPlacesSuccess(
          {
            places: response.data.data,
            locations: response.data.locations,
            params: response.data.params,
          },
          __extras!
        )
      );
    } else {
      yield call(toast, "Error while fetching places");
      yield put(fetchAllPlacesFailure(response.message));
    }
  } catch (ex) {
    yield call(toast, "Error while fetching places");
    yield put(fetchAllPlacesFailure("Error while fetching places"));
  }
}

export function* watchRequests() {
  yield takeEvery(MapActionTypes.FETCH_ALL_PLACES, fetchPlaces);
}

export default function* root() {
  yield fork(watchRequests);
}
