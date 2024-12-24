import { Box } from "@mui/material";
import React from "react";
import { AuthComponent } from "../auth";

export function AuthPage() {
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <AuthComponent />
    </Box>
  );
}