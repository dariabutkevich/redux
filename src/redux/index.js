import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import { notesReducer } from "./notes/reducer";
import { userReducer } from "./user/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  notes: notesReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["user"],
  },
  rootReducer
);

const store = createStore(persistedReducer, applyMiddleware(thunk));

export default store;
export const persistor = persistStore(store);
