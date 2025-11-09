import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer, { removeUser } from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionsSlice";
import requestsReducer from "./requestsSlice";
import appReducer from "./appSlice";

const reducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  connections: connectionsReducer,
  requests: requestsReducer,
  app: appReducer,
});

// Reset entire redux store on logout
const rootReducer = (state, action) => {
  if (action.type === removeUser.type) {
    state = undefined;
  }
  return reducer(state, action);
};

const appStore = configureStore({
  reducer: rootReducer,
});

export default appStore;
