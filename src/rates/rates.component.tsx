import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { RatesTable } from "./components/table";
import { ratesState } from "./rates.state";
import { observer } from "mobx-react-lite";
import { LOADING_TEXT } from "./rates.constants";
import { ICurrency } from "./rates.types";

function RatesComponent() {
  const {
    fetchAssets,
    getRates,
    loaded,
    subscribeRates,
    unSubscribeRates,
    wsTimestamp
  } = ratesState;
  const [rates, setRates] = React.useState<Array<ICurrency>>([]);

  useEffect(() => {
    (async () => {
      await fetchAssets();
      const data = getRates();
      setRates(data)
    })();
  }, []);

  useEffect(() => {
    const data = getRates();
    setRates(data)
  }, [wsTimestamp]);

  useEffect(() => {
    if (!loaded) return;
    subscribeRates();

    return () => (unSubscribeRates())
  }, [loaded]);

  return (
    <Box display={'flex'}
      justifyContent={'flex-start'}
      alignItems={'center'}
    >
      {loaded ?
        (
          <RatesTable rates={rates} />
        ) :
        (
          <Box display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -55%)'
            }}
          >
            <CircularProgress size="30px" />
            <Typography variant="body1">
              {LOADING_TEXT}
            </Typography>
          </Box>
        )}
    </Box>
  );
}

export default observer(RatesComponent)
