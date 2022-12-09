import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./view/RegisterPage/RegisterPage";
import NavBar from "./view/NavBar/NavBar";
import { ThemeProvider } from "@emotion/react";
import mainTheme from "./themes/mainTheme";
import { CssBaseline } from "@mui/material";
import PasswordRecoveryPage from "./view/PasswordRecoveryPage/PasswordRecoveryPage";
import LoginPage from "./view/LoginPage/LoginPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter  ([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgotPassword",
    element: <PasswordRecoveryPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
]);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
