import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import { ratesState } from "../../rates.state";
import RefreshIcon from '@mui/icons-material/Refresh';
import LogoutIcon from '@mui/icons-material/Logout';
import { HEADER_TITLE } from "../../rates.constants";

export default function RatesHeader() {
  const { fetchAssets, setLoaded } = ratesState
  const { signout } = useAuth();

  const handleRefrash = async () => {
    setLoaded(false)
    await fetchAssets()
  }
  const handleLogout = () => {
    signout()
  }
  
  return (
    <>
      <Box>
        <IconButton onClick={handleRefrash} size="small" >
          <RefreshIcon color="primary" />
        </IconButton>
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