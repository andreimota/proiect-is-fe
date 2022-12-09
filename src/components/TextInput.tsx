import React, { ChangeEvent } from "react";

import { TextField, ThemeProvider } from "@mui/material";
import textFieldTheme from "../themes/textFieldTheme";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface TextInputProps {
    name?: string
    value?: any
    onChange?: ( e: ChangeEvent<HTMLInputElement> ) => void
    className?: string
    label?: string
    inputProps?: object
    error?: boolean
    helperText?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | null | undefined
}

const TextInput = ({
  name,
  value,
  onChange,
  label,
  className,
  inputProps,
  error = false,
  helperText,
}: TextInputProps ) => {
  return <ThemeProvider theme={textFieldTheme}> 
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      className={className}
      color="secondary"
      inputProps={inputProps}
      error={error}
      helperText={helperText as string}
    />
  </ThemeProvider>;
};

export default TextInput;