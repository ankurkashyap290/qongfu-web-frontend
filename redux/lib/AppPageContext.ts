import { Store } from "redux";
import { NextPageContext } from "next";

export default interface AppPageContext extends NextPageContext {
  store: Store;
  isServer: boolean;
}
