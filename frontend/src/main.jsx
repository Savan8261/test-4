import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { StyleSheetManager } from "styled-components";

import App from "./App.jsx";
import store from "./store.js";
import isPropValid from "@emotion/is-prop-valid";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
        <App />
      </StyleSheetManager>
    </Provider>
  </React.StrictMode>
);
