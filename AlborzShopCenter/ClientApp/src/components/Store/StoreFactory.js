import { createStore, combineReducers, applyMiddleware } from "redux";
import { orders } from "./Reducers";

const logger = (store) => (next) => (action) => {
  let result;
  console.groupCollapsed("dispatching", action.type);
  console.log("prev state", store.getState());
  console.log("action", action);
  result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

const saver = (store) => (next) => (action) => {
  let result = next(action);
  localStorage["redux-store"] = JSON.stringify(store.getState());
  return result;
};

const storeFactory = () =>
  applyMiddleware(logger, saver)(createStore)(
    combineReducers({ orders }),
    localStorage["redux-store"] ? JSON.parse(localStorage["redux-store"]) : {}
  );

export default storeFactory;
