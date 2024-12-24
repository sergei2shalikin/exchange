import { Button } from "@mui/material";
import React from "react";

export function AuthButton({ text, ...props }) {
  
  return (
    <Button
    {...props}
  >
    {text}
    </Button>
  )
}