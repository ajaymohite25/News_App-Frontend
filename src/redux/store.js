import { createStore, combineReducers } from "redux";
import authReducerfrom from "./Reducers/authReducer";
import filterReducer from "./Reducers/filterReducer";

const Allreducers = combineReducers({
  auth: authReducerfrom,
  filter: filterReducer,
});

const store = createStore(Allreducers);

export default store;
