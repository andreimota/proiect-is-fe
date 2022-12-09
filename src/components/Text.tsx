import React, { ReactNode } from "react";

import { Typography } from "@mui/material";

interface TextProps {
    children: ReactNode
}

const Text = ({
  children,
}: TextProps) => {
  return; 
  <Typography>
    {children}
  </Typography>;
};

export default Text;