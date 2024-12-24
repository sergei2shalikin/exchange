import { Box } from "@mui/material";
import React from "react";
import RatesHeader from "../rates/components/header/rates.header";
import { useLocation } from "react-router";
import ExchangeHeader from "../exchange/components/header/exchange.header";

export default function Header() {
  const { pathname: path } = useLocation(); 
  
  return (
    <Box display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      height={'72px'}
      width={'100%'}
    >
      {path === '/' ? <RatesHeader /> : null}
      {path === '/exchange' ? <ExchangeHeader /> : null}
    </Box>
  );
}