import { Typography } from "@mui/material";
import React from "react";

export function AuthTitle({ title, ...props }: {title: string, [key: string]: string}) {
  return (
    <Typography {...props}>{title}</Typography>
  );
}