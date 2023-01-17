import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";

import PasswordRecoveryPage from "./view/PasswordRecoveryPage/PasswordRecoveryPage";
import LoginPage from "./view/LoginPage/LoginPage";
import Articles from "./view/Articles/Articles";
import RegisterPage from "./view/RegisterPage/RegisterPage";
import ArticlePage from "./view/Articles/ArticlePage";
import QuizPage from "./view/Quizzes/QuizPage";
import Exercises from "./view/Exercises/Exercises";

import NavBar from "./view/NavBar/NavBar";

import mainTheme from "./themes/mainTheme";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import ExercisePage from "./view/Exercises/ExercisePage";
import Dashboard from "./view/Dashboard/Dashboard";


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
    index: true,
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute component={<Dashboard />} />,
  },
  {
    path: "/courses",
    element: <ProtectedRoute component={<Articles />} />,
  },
  {
    path: "/exercises",
    element: <ProtectedRoute component={<Exercises />} />,
  },
  {
    path: "/course/:courseId",
    element: <ProtectedRoute component={<ArticlePage />} />,
  },
  {
    path: "/quiz/:quizId",
    element: <ProtectedRoute component={<QuizPage />} />,
  },
  {
    path: "/exercise/:exerciseId",
    element: <ProtectedRoute component={<ExercisePage />} />,
  }
]);

root.render(
  <>
    <ThemeProvider theme={mainTheme}>
      <NavBar />
      <Container maxWidth="lg" sx={{marginTop: "7rem"}}>
        <CssBaseline />
        
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
    <ToastContainer 
      theme="dark"
      position="bottom-right"
    />
  </>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
