import React, { MouseEvent, ReactNode } from "react";

import { Button } from "@mui/material";

interface ButtonProps {
    onClick: ( e: MouseEvent<HTMLButtonElement> ) => void
    children: ReactNode,
}

const GenericButton = ({
  onClick,
  children,
}: ButtonProps) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default GenericButton;