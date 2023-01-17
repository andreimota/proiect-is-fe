import React, { ChangeEvent, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";

import TextInput from "../../components/TextInput";
import GenericButton from "../../components/GenericButton";

import "./LoginPage.css";

import api from "../../api/api";
import { toast } from "react-toastify";


interface Credentials {
  username: string
  password: string
}

const LoginPage = () => {
  const [credentials, setCredentials] = useState<Credentials>({} as Credentials);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if(jwt) useNavigate()("/dashboard");
  }, []);

  const handleCredentialsChange = ( {target}: ChangeEvent<HTMLInputElement> ) => {
    setCredentials({
      ...credentials,
      [target.name]: target.value,
    });
  };

  const handleLogin = async ( data: Credentials ) => {
    try {
      const response = await api.post(data, "/user/login");

      localStorage.setItem("jwt", response);

      useNavigate()("/dashboard");
    } catch ( e: any ) {
      toast( "Invalid username or password.", {
        hideProgressBar: true,
        type: "error",
      } );
    }
  };

  return <Container maxWidth="xs">
    <Grid container direction="column" alignItems="center" className="loginForm">
      <Typography variant="h3" textAlign="center" paddingBottom="2rem">Welcome back! Log in to AceTech</Typography>
      <Grid item>
        <TextInput
          label="Username"
          name="username"
          value={credentials.username || ""}
          onChange={handleCredentialsChange}
          className="credentialField"
        />
      </Grid>
      <Grid item>
        <TextInput
          label="Password"
          name="password"
          value={credentials.password || ""}
          onChange={handleCredentialsChange}
          className="credentialField"
          type="password"
        />
      </Grid>
      <Grid item>
        <GenericButton onClick={() => handleLogin(credentials)} className="credentialButton">Login</GenericButton>
      </Grid>
      <Grid container item sx={{
        paddingTop: "1rem",
        width: "80%"
      }}>
        <Grid item xs={6} md={6} lg={6}>
          <Link 
            to="/register" 
            style={{ color: "#F6AE2D", textDecoration: "none" }}
          >
            {"Don't have an account? Sign up"}
          </Link>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Link 
            to="/forgotPassword" 
            style={{ color: "#F6AE2D", textDecoration: "none", paddingLeft: "1.7rem" }}
          >
            Forgot password?  
          </Link>
        </Grid>
      </Grid>
    </Grid>
  </Container>;
};

export default LoginPage;