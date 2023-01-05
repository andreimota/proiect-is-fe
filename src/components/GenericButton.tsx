import React, { MouseEvent, ReactNode } from "react";

import { Button } from "@mui/material";
import { SubmitHandler } from "react-hook-form";

interface ButtonProps {
    onClick?: ( e: MouseEvent<HTMLButtonElement> ) => void
    children?: ReactNode
    className?: string
    disabled?: boolean
}

const GenericButton = ({
  onClick,
  children,
  className,
  disabled
}: ButtonProps) => {
  return <Button 
    onClick={onClick}
    className={className}
    variant="contained"
    color="secondary"
    disabled={disabled}
  >
    {children}
  </Button>;
};

export default GenericButton;