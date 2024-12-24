import { Box, Typography } from "@mui/material";
import React from "react";

export default function NotFoundPage() {
  return (<Box display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    height={'100vh'}
    width={'100vw'}
  >
    <Typography variant="h3">
      Page not found (404)
    </Typography>
  </Box>)
}