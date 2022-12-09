import React, { MouseEvent, ReactNode } from "react";

import { Button } from "@mui/material";
import { SubmitHandler } from "react-hook-form";

interface ButtonProps {
    onClick: ( e: MouseEvent<HTMLButtonElement> ) => void
    children: ReactNode
    className: string
}

const GenericButton = ({
  onClick,
  children,
  className,
}: ButtonProps) => {
  return <Button 
    onClick={onClick}
    className={className}
    variant="contained"
    color="secondary"
  >
    {children}
  </Button>;
};

export default GenericButton;