import { Typography } from "@mui/material";
import React from "react";

interface TextProps {
    text: string
}

const Text = ({text}: TextProps) => {
  return <Typography>{text}</Typography>;
};

export default Text;