import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline } from "@mui/material";

import PasswordRecoveryPage from "./view/PasswordRecoveryPage/PasswordRecoveryPage";
import LoginPage from "./view/LoginPage/LoginPage";
import Articles from "./view/Articles/Articles";
import RegisterPage from "./view/RegisterPage/RegisterPage";
import NavBar from "./view/NavBar/NavBar";

import mainTheme from "./themes/mainTheme";
import "./index.css";
import ArticlePage from "./view/Articles/ArticlePage";

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
  },
  {
    path: "/courses",
    element: <Articles />,
  },
  {
    path: "/course/:courseId",
    element: <ArticlePage />,
  }
]);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <NavBar />
      <Container maxWidth="lg">
        <CssBaseline />
        
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
