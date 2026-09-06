import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { store } from "./State/Store.js";
import { ThemeProvider } from "./Theme/ThemeContext.jsx";
import { ToastProvider } from "./common/toast";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  </Provider>
);