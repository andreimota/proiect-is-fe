import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./RegisterPage.css";

import TextInput from "../../components/TextInput";
import GenericButton from "../../components/GenericButton";

import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";

import api from "../../api/api";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors}, watch } = useForm();

  const registerFormKeys = [
    { key: "firstName", label: "First Name", validation: { required: "First name is required." }},
    { key: "lastName", label: "Last Name", validation: { required: "Last name is required." }},
    { key: "username", label: "Username", validation: { required: "Username is required." }},
    { key: "email", label: "E-mail address", validation: { required: "E-mail is required." }},
    { key: "password", type: "password", label: "Password", validation: { 
      required: "Password is required.",
      minLength: { value: 8, message: "Password must be at least 8 characters long." }
    }},
    { key: "confirmPassword", type: "password", label: "Confirm password", validation: { 
      required: "First name is required.",
      validate: ( password: string ) => password === watch("password") ? true : "Passwords do not match",
    }},
  ];

  const handleFormSubmit = async ( data: FieldValues ) => {
    const jwt = await api.post(data, "/user/register");

    toast("Successfully registered!", {
      type: "success"
    });

    localStorage.setItem("jwt", jwt);

    navigate("/dashboard");
  };

  return <Container maxWidth="xl">
    <Grid container direction="row" justifyContent="space-evenly" className="registerForm">
      <Grid
        container
        item
        xs={12}
        md={6}
        direction="column"
        alignItems="center"
        
      >
        <Grid item className="registerText">
          <Typography variant="h3" className="title">Start, build and advance your career in tech.</Typography>
          <Typography variant="h6" textAlign="left" marginTop="1rem" display={{ xs: "none", md: "inline-flex", lg: "inline-flex"}}>Create an account now, free of charge.</Typography>
        </Grid>
      </Grid>

      <Grid 
        container 
        item 
        xs={12} 
        md={6} 
        rowSpacing={2.6} 
        direction="column" 
        alignItems="center"
      >
        {registerFormKeys.map(row => (
          <Grid key={row.key} item>
            <TextInput
              label={row.label}
              className="registerField"
              inputProps={register(row.key, row.validation)}
              error={!!errors[row.key]}
              helperText={errors ? errors[row.key]?.message : null}
              type={row.type}
            />
          </Grid>
        ))}
        <Grid item>
          <GenericButton onClick={handleSubmit((data) => handleFormSubmit(data))} className="registerButton">Register</GenericButton>
          <Grid container direction="row" justifyContent="center" sx={{ width: "20em", paddingTop: "0.7em"}}>
            <Link to="/login" style={{ color: "#F6AE2D", textDecoration: "none", textAlign: "center" }}>Already have an account? Sign in</Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Container>;
};

export default RegisterPage;