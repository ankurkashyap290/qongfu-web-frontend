import { all } from "redux-saga/effects";
import placesSaga from "./places";
import appSagas from "./app";
import userSaga from "./user";
import mapSaga from "./map";
import exploreSaga from "./explore";

export default function* root() {
  yield all([placesSaga(), appSagas(), userSaga(), mapSaga(), exploreSaga()]);
}
