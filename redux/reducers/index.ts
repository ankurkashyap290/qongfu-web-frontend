import { combineReducers } from "redux";
import { placesReducer as places } from "./places";
import { appReducer as app } from "./app";
import { userReducer as user } from "./user";
import { mapReducer as map } from "./map";
import { exploreReducer as explore } from "./explore";

const rootReducer = combineReducers({
  places,
  app,
  user,
  map,
  explore,
});

export default () => {
  return rootReducer;
};

export type AppState = ReturnType<typeof rootReducer>;
