import { Box, TextField } from "@mui/material";
import React from "react";

export function AuthInput({ ...props }) {
  return <Box
    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
  >
    <TextField
      {...props}
    />
  </Box>
}
