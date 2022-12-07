import React, { ChangeEvent } from "react";

import { TextField } from "@mui/material";

interface TextInputProps {
    key: string | number,
    name: string
    value: any
    onChange: ( e: ChangeEvent<HTMLInputElement> ) => void
    
}

const TextInput = ({
  key,
  name,
  value,
  onChange
}: TextInputProps ) => {
  return <TextField
    key={key}
    name={name}
    value={value}
    onChange={onChange}
  />;
};

export default TextInput;