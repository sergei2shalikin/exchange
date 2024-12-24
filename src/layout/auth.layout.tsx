import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";

export function AuthLayout() {
  return (

    <Box display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100vw'}
      height={'100vh'}
    >
      <Outlet />
    </Box>
  );
}