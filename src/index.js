import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import detailReducer from "./store/reducers/detail";
import banksDataReducer from "./store/reducers/banksData";
import chartReducer from "./store/reducers/chart";
import authReducer from "./store/reducers/auth";
import addChartReducer from "./store/reducers/addChart";
import fieldPickerReducer from "./store/reducers/fieldPicker";
import { ThemeProvider } from "./styles/ThemeProvider.js";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const rootReducer = combineReducers({
  detail: detailReducer,
  banks: banksDataReducer,
  chart: chartReducer,
  auth: authReducer,
  addChart: addChartReducer,
  fieldPicker: fieldPickerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter basename="admin">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
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
