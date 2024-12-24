import { Box, FormControl, Stack } from "@mui/material";
import React from "react";
import { exchangeRates } from "../../exchange.state";
import { observer } from "mobx-react-lite";
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';

function ExchangeViewer() {
  const {
    to,
    from,
    percentage,
    amount,
    calculete,
    calculeteWithPercentage
  } = exchangeRates;

  return to && from && percentage && amount ? (
    <FormControl sx={{ m: 1, minWidth: 340, backgroundColor: '#F9F9F9' }}>
      <Stack gap={1} p={2}>
        <Box display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {`${amount} ${from?.symbol || ''}`}
        </Box>
        <Box display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <CurrencyExchangeOutlinedIcon />
        </Box>
        <Box display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {`${calculeteWithPercentage(from, to, amount)}`} {to?.symbol || ''}
        </Box>
        <Box display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          ({`${calculete(from, to, amount)} ${to?.symbol} + ${percentage || '0'}%`})
        </Box>
      </Stack>
    </FormControl>
  ) :
    null
}

export default observer(ExchangeViewer)