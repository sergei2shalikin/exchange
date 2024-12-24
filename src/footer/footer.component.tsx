import { Box, Button, Typography } from "@mui/material";
import React from "react";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import { useNavigate } from "react-router";

export default function Footer() {
  const navigate = useNavigate();

  const handleClickRates = () => {
    navigate('/')
  }
  const handleClickExchange = () => {
    navigate('/exchange')
  }

  return (
    <Box display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      height={'72px'}
      width={'100%'}
    >
      <Box display={'flex'} width={'50%'} justifyContent={'center'} alignItems={'center'}>
        <Button onClick={handleClickRates} size="large" >
          <Box display={'flex'} gap={1} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <PaidOutlinedIcon />
            <Typography component={"span"} variant="subtitle2">Rates</Typography>
          </Box>
        </Button>
      </Box>
      <Box display={'flex'} width={'50%'} justifyContent={'center'} alignItems={'center'}>
        <Button onClick={handleClickExchange} size="large" >
          <Box display={'flex'} gap={1} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <CurrencyExchangeOutlinedIcon />
            <Typography component={"span"} variant="subtitle2">Convert</Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  );
}