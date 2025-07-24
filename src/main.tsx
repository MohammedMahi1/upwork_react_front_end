import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router/index.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Provide the Redux store to the application */}
    <Provider store={store}>
      {/* Provide the router to the application */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
