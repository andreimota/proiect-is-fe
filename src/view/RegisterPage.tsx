import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TextInput from "../components/TextInput";

import { Grid } from "@mui/material";

import api from "../api/api";
import GenericButton from "../components/GenericButton";

interface IRegisterForm {
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
}

const registerFormKeys = ["firstName", "lastName", "username", "email", "password"];

const RegisterPage = () => {
  const [registerForm, setRegisterForm] = useState<IRegisterForm>({} as IRegisterForm);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async () => {
    const jwt = await api.post(registerForm, "/user");

    localStorage.setItem("jwt", jwt);
  };

  return <Grid container>
    {registerFormKeys.map(field => (
      <TextInput
        key={field}
        name={field}
        value={registerForm[field as keyof IRegisterForm]}
        onChange={handleFormChange}
      />
    ))}
    

    <GenericButton onClick={handleFormSubmit}>Register</GenericButton>
  </Grid>;
};

export default RegisterPage;