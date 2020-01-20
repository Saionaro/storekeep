# storekeep [![npm version](https://badge.fury.io/js/storekeep.svg)](https://badge.fury.io/js/storekeep)

`storekeep` is a simple partial store saver for redux applications. `storekeep` allows to save some deep redux store fields between reloads of an application.

## Example

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

## Installation

### Download package

For NPM users:

`npm i storekeep`

or if you using Yarn:

`yarn add storekeep`

## Options

`getPersistedState(reducer, localStorageField, cacheToken)`

| Name               | Type     | Default value | Description                                                                                   |
| ------------------ | -------- | ------------- | --------------------------------------------------------------------------------------------- |
| `reducer` | `Function` | undefined | Application root reducer to generate initial state |
| `localStorageField` | `string` | undefined | The target loccal storage field where data save to |
| `cacheToken` | `string` | undefined | Cache invalidation token - if changed `storekeep` will clear a previous data |

`persistState(store, localStorageField, fieldsToSave)`

| Name               | Type     | Default value | Description                                                                                   |
| ------------------ | -------- | ------------- | --------------------------------------------------------------------------------------------- |
| `store` | `ReduxStore` | undefined | Application redux store |
| `localStorageField` | `string` | undefined | The target loccal storage field where data save to |
| `fieldsToSave` | `string[]` | undefined | List of deep redux store fields to save|
