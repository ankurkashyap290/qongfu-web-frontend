import { takeEvery, put, fork, call } from "redux-saga/effects";
import { stringify } from "qs";
import { ExploreActionTypes, fetchExplorePlaces } from "./../actionTypes";
import { fetchExplorePlacesSuccess, fetchExplorePlacesFailure } from "../actions/explore";
import { setAreaAndCities } from "../actions/app";
import { get } from "../../utils/request";
import { SuccessStatusCode } from "../../config";

import { toast } from "react-toastify";

export function* fetchExplorePlacesRequest(action: fetchExplorePlaces) {
  const { stateKey, payload, pagination } = action;
  try {
    const { __extras, ...data } = payload;
    const queryParams = { ...data, page: pagination?.page, per_page: pagination?.pageSize };
    const response = yield call(get, `/api/places?${stringify(queryParams)}`);
    if (SuccessStatusCode.includes(response.status)) {
      pagination!.total = response.data.total;
      pagination!.totalPage = Math.ceil(response.data.total / queryParams.per_page!);
      yield put(
        fetchExplorePlacesSuccess(
          stateKey,
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
      yield put(fetchExplorePlacesFailure(stateKey, response.message));
    }
  } catch (ex) {
    yield call(toast, "Error while fetching places");
    yield put(fetchExplorePlacesFailure(stateKey, "Error while fetching places"));
  }
}

export function* watchRequests() {
  yield takeEvery(ExploreActionTypes.FETCH_EXPLORE_PLACES, fetchExplorePlacesRequest);
}

export default function* root() {
  yield fork(watchRequests);
}
