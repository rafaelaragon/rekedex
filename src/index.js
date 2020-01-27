import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/index.css";
import App from "./controllers/App/App.jsx";
import registerServiceWorker from "./services/registerServiceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducers from "./redux/reducers/reducers";
import thunk from "redux-thunk";

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;
 
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

const store = createStore(reducers, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
