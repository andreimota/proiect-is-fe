import React, { ChangeEvent } from "react";

import { SxProps, TextField, ThemeProvider } from "@mui/material";
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
    type?: string
    multiline?: boolean
    disabled?: boolean
    sx?: SxProps
    rows?: number
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
  type,
  multiline,
  disabled,
  sx,
  rows
}: TextInputProps ) => {
  return <ThemeProvider theme={textFieldTheme}> 
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      className={className}
      color="secondary"
      inputProps={{
        ...inputProps,
        spellCheck: false
      }}
      error={error}
      helperText={helperText as string}
      type={type}
      multiline={multiline}
      disabled={disabled}
      sx={sx}
      rows={rows}
    />
  </ThemeProvider>;
};

export default TextInput;