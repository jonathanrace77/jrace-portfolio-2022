import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import Site from "./features/site/Site";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/store";

const domNode = document.getElementById("root");
if (domNode !== null) {
  const root = createRoot(domNode);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Site />
      </Provider>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
