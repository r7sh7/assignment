import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { emailListReducer, selectedEmailReducer } from "./emailReducer";

const rootReducer = combineReducers({
  emailList: emailListReducer,
  selectedEmail: selectedEmailReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
