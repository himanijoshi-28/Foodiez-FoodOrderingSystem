import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";

import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </StateProvider>
  </Router>,
  document.getElementById("root")
);
