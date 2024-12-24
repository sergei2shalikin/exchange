import { Typography } from "@mui/material";
import React from "react";

export function AuthTitle({title, ...props}) {
  return (
    <Typography {...props}>{title}</Typography>
  );
}