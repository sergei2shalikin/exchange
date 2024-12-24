import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import LogoutIcon from '@mui/icons-material/Logout';
import { HEADER_TITLE } from "../../exchange.constant";

export default function RatesHeader() {
  const { signout } = useAuth();

  const handleLogout = () => {
    signout()
  }

  return (
    <>
      <Box>
      </Box>
      <Box>
        <Typography variant="subtitle1">
          {HEADER_TITLE}
        </Typography>
      </Box>
      <Box>
        <IconButton onClick={handleLogout}>
          <LogoutIcon color="primary" />
        </IconButton>
      </Box></>
  )
}