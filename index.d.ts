import { Reducer, Store } from "redux";

// declare namespace "storekeep" {
// }
export declare function getPersistedState(
  reducer: Reducer,
  key: string,
  cacheBuster: string
): object;

export declare function persistState(
  store: Store,
  key: string,
  fields: string[]
): Store;
