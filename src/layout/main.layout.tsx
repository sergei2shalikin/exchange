import { Box, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Header from "../header/header.component";
import Footer from "../footer/footer.component";

export default function MainLayout() {
  const { user, token } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [user, token, navigate])

  return (
    <Box display={'flex'}
      flexDirection={'column'}
      width={'100vw'}
      height={'100vh'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      overflow={'hidden'}
    >
      <Header />
      <Divider variant="fullWidth" sx={{ width: '100%' }} />
      <Box display={'flex'} flex={"1 1 auto"} alignItems={'flex-start'}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}