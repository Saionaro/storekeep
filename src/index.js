import set from "lodash.set";
import get from "lodash.get";
import throttle from "lodash.throttle";
import merge from "lodash.merge";

import { saveKey, getKey } from "./localStorage.js";

const DUMMY_ACTION = "STORE_KEEPER/GET_INITIAL_STATE";
const SAVE_INTERVAL = 2500;
/**
 * Returns an initial state with saved fields set
 * @param {Function} reducer Root reducer function
 * @param {String} key Local storage key
 * @param {String} cacheBuster Cache invalidation token
 * @returns {Object}
 */
export const getPersistedState = (reducer, key, cacheBuster) => {
  const initialState = {};
  const savedState = getKey(key, cacheBuster);

  if (savedState) {
    merge(initialState, reducer(undefined, { type: DUMMY_ACTION }), savedState);
  }

  return initialState;
};
/**
 * Subscribes on store changes and save interesting fields
 * @param {Object} store Redux store instance
 * @param {String} key Key for storing values
 * @param {String[]} fields Field paths store to
 * @returns {Object} Store instance
 */
export const persistState = (store, key, fields) => {
  const finalKey = key;

  store.subscribe(
    throttle(() => {
      const state = store.getState();
      const toSave = {};

      for (const field of fields) {
        set(toSave, field, get(state, field));
      }

      saveKey(finalKey, toSave);
    }, SAVE_INTERVAL)
  );

  return store;
};
