import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import { store } from "./redux/store";
import AuthListener from "./components/auth/AuthListener";

import ErrorBoundary from "./components/common/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <AuthListener />
        <Toaster
          position="top-right"
          reverseOrder={false}
          containerStyle={{
            top: 40,
          }}
          toastOptions={{
            duration: 5000,
          }}
        />
        <AppRoutes />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
