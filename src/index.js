import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import softwareReducer from "./store/reducers/software";
import bankReducer from "./store/reducers/bank";


const rootReducer = combineReducers({
  software: softwareReducer,
  bank:bankReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
