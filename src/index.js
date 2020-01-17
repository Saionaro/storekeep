const set = require("lodash.set");
const get = require("lodash.get");
const throttle = require("lodash.throttle");
const merge = require("lodash.merge");

const { saveKey, getKey } = require("./localStorage.js");

const DUMMY_ACTION = "STORE_KEEPER/GET_INITIAL_STATE";
const SAVE_INTERVAL = 2500;
/**
 * Returns an initial state with saved fields set
 * @param {Function} reducer Root reducer function
 * @param {String} key Local storage key
 * @param {String} cacheBuster Cache invalidation token
 * @returns {Object}
 */
function getPersistedState(reducer, key, cacheBuster) {
  const initialState = {};
  const savedState = getKey(key, cacheBuster);

  if (savedState) {
    merge(initialState, reducer(undefined, { type: DUMMY_ACTION }), savedState);
  }

  return initialState;
}
/**
 * Subscribes on store changes and save interesting fields
 * @param {Object} store Redux store instance
 * @param {String} key Key for storing values
 * @param {String[]} fields Field paths store to
 * @returns {Object} Store instance
 */
function persistState(store, key, fields) {
  const finalKey = key;

  store.subscribe(
    throttle(() => {
      const state = store.getState();
      const toSave = {};

      for (let i = 0; i < fields.length; i++) {
        set(toSave, fields[i], get(state, fields[i]));
      }

      saveKey(finalKey, toSave);
    }, SAVE_INTERVAL)
  );

  return store;
}

module.exports = { persistState, getPersistedState };
