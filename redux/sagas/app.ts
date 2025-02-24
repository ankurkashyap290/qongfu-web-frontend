import { fork, takeLatest, put, call, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";
import { AppActionTypes, SearchPlaces } from "../actionTypes";
import actionCreators from "../actions";
import { stringify } from "qs";
// import { AppState } from "../reducers";
// import { getAppState } from "../../selectors";
import { apiInitialize } from "../../utils/request";
import {
  fetchAllQongfusFailure,
  fetchAllQongfusSuccess,
  fetchAllLanguagesSuccess,
  fetchAllLanguagesFailure,
  fetchAllLifestylesSuccess,
  fetchAllLifestylesFailure,
  searchPlacesSuccess,
  searchPlacesFailure,
} from "../actions/app";
import { get } from "../../utils/request";
import { SuccessStatusCode } from "../../config";

const fetchAllCountries = async () => {
  let countries = [];
  try {
    const response = await get(`/api/countries?per_page=500`);
    if (SuccessStatusCode.includes(response.status)) {
      countries = response.data.data.data ? response.data.data.data : response.data.data;
      // for india
      // @ts-ignore
      const found = countries.findIndex(country => country.id === 102);
      if (found >= 0) {
        // @ts-ignore
        countries[found].approved = 1;
      }
    } else {
      // console.log('error while fetching countries');
    }
  } catch (ex) {
    countries = [];
  }
  return countries;
};

export function* initializeApp() {
  try {
    apiInitialize();
    const countries = yield call(fetchAllCountries);
    yield put(actionCreators.fetchAllLifestyles());
    yield put(actionCreators.fetchAllQongfus());
    yield put(actionCreators.fetchAllLanguages());
    yield put(actionCreators.setAppAsInitialized({ countries }));
  } catch (error) {
    yield put(actionCreators.setAppInitializeError(error));
  }
}

export function* fetchQongfus() {
  try {
    const response = yield call(get, `/api/qongfus`);
    if (SuccessStatusCode.includes(response.status)) {
      yield put(fetchAllQongfusSuccess(response.data.data));
    } else {
      yield put(fetchAllQongfusFailure(response.message));
    }
  } catch (ex) {
    yield call(toast, "Error while fetching Qongfus");
    yield put(fetchAllQongfusFailure("Error while fetching Qongfus"));
  }
}

export function* fetchLanguages() {
  try {
    const response = yield call(get, `/api/languages`);
    if (SuccessStatusCode.includes(response.status)) {
      yield put(fetchAllLanguagesSuccess(response.data.records));
    } else {
      yield put(fetchAllLanguagesFailure(response.message));
    }
  } catch (ex) {
    yield call(toast, "Error while fetching languages");
    yield put(fetchAllLanguagesFailure("Error while fetching languages"));
  }
}

export function* fetchLifestyles() {
  try {
    const response = yield call(get, `/api/lifestyles`);
    if (SuccessStatusCode.includes(response.status)) {
      yield put(fetchAllLifestylesSuccess(response.data.data));
    } else {
      yield put(fetchAllLifestylesFailure(response.message));
    }
  } catch (ex) {
    yield call(toast, "Error while fetching lifestyles");
    yield put(fetchAllLifestylesFailure("Error while fetching lifestyles"));
  }
}

export function* searchPlaces(action: SearchPlaces) {
  try {
    const { payload } = action;
    if (!payload.search) {
      delete payload.search;
    }
    const response = yield call(get, `/api/rocket-search?${stringify(payload)}`);
    if (SuccessStatusCode.includes(response.status)) {
      yield put(searchPlacesSuccess(response.data.data));
    } else {
      yield put(searchPlacesFailure(response.data.message));
    }
  } catch (ex) {
    yield call(toast, "Error while searching");
    yield put(searchPlacesFailure("Error while searching"));
  }
}

export function* watchInitializationRequest() {
  yield takeLatest(AppActionTypes.APP_INITIALIZE_REQUEST, initializeApp);
  yield takeEvery(AppActionTypes.FETCH_ALL_QONGFUS, fetchQongfus);
  yield takeEvery(AppActionTypes.FETCH_ALL_LANGUAGES, fetchLanguages);
  yield takeEvery(AppActionTypes.FETCH_ALL_LIFESTYLES, fetchLifestyles);
  yield takeEvery(AppActionTypes.SEARCH_PLACES, searchPlaces);
}

export default function* root() {
  yield fork(watchInitializationRequest);
}
