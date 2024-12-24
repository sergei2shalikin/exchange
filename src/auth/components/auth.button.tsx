import { Button } from "@mui/material";
import React from "react";

export function AuthButton({ text, ...props }: {text: string, [key: string]: unknown}) {
  
  return (
    <Button
    {...props}
  >
    {text}
    </Button>
  )
}