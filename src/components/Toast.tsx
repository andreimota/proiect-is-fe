import React, { ReactNode } from "react";

import { Alert, Grow } from "@mui/material";


interface ToastProps {
    children: ReactNode
}

const Toast = ({
  children,

} : ToastProps) => {
  // TO DO: Generic toast component
  
  return (
    <Grow>
      <Alert>{children}</Alert>
    </Grow>
  );
};

export default Toast;