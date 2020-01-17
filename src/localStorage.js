if (!window || !window.localStorage) {
  throw new Error("An environment have to support Local Storage feature.");
}
/**
 *
 * @param {*} key
 * @param {*} cacheBuster
 */
const buildKey = (key, cacheBuster) => `${key}--${cacheBuster}`;
/**
 *
 * @param {*} key
 */
export function getKey(key, cacheBuster) {
  try {
    const savedCacheBuster = localStorage.getItem("cacheBuster");

    if (savedCacheBuster !== cacheBuster) {
      window.localStorage.setItem("cacheBuster", cacheBuster);

      if (savedCacheBuster) {
        window.localStorage.removeItem(buildKey(key, savedCacheBuster));
      }
    }

    const stringified = window.localStorage.getItem(buildKey(key, cacheBuster));

    if (!stringified) return undefined;

    return JSON.parse(stringified);
  } catch (e) {
    return undefined;
  }
}
/**
 *
 * @param {*} key
 * @param {*} data
 */
export function saveKey(key, data) {
  try {
    const cacheBuster = localStorage.getItem("cacheBuster") || "";

    window.localStorage.setItem(
      buildKey(key, cacheBuster),
      JSON.stringify(data)
    );
  } catch (e) {}
}
