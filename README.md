# storekeep

`storekeep` is a simple partial store saver for redux applications. `storekeep` allows to save some deep redux store fields between reloads of an application.

```js
import { createStore } from "redux";
import { rootReducer } from "./reducer.js";

// you have to provide just 3 things:
// 1) a some localstorage field store data to
const LOCAL_STORAGE_FIELD = "your-app-store";
// 2) it's ok to use here a commit hash or an release version number for example
// It's required for a correct cache invalidation (in case your store structure will change)
const CACHE_TOKEN = "efwe3fwefw";
// 3) A list of fields to save
const FIELDS_TO_SAVE = [
  "todo.itemsList",
  "todo.itemsStore",
  "todo.color.accentColor",
  "todo.color.accentColor",
];

const savedStore = getPersistedState(
  rootReducer,
  LOCAL_STORAGE_FIELD,
  CACHE_TOKEN,
);

const reduxStore = persistState(
  createStore(
    rootReducer,
    savedStore,
  ),
  LOCAL_STORAGE_FIELD,
  FIELDS_TO_SAVE,
);
```
