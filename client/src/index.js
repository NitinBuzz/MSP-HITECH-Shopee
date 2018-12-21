import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

import App from "./components/app";
import reducers from "./reducers";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any oknaaaa..
);

ReactDOM.render(
  <Provider store={createStore(reducers, enhancer)}>
    <div>
      <App />
    </div>
  </Provider>,
  document.querySelector(".container")
);
