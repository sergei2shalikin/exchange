import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ExchangeSelect from './components/select/exchange.select';
import { exchangeRates } from './exchange.state';
import { ratesState } from '../rates/rates.state';
import { observer } from 'mobx-react-lite';
import { CircularProgress, Typography } from '@mui/material';
import ExchangeInput from './components/input/exchange.input';
import ExchangeViewer from './components/viewer/exchange.viewer';
import { ICurrencyRate } from './exchange.types';
import { ICurrency } from '../rates/rates.types';
import { LOADING_TEXT } from './exchange.constant';
import { EExchangeSelect } from './exchange.types';

function ExchangeComponent() {
  const {
    fetchRates,
    getRates,
    loaded: loadedRates,
    from,
    subscribeRates,
    unSubscribeRates,
  } = exchangeRates;
  const {
    fetchAssets,
    loaded: loadedAssets,
    getRates: getAssets,
  } = ratesState;

  const [fromList, setFromList] = useState<Array<ICurrency>>([]);
  const [toList, setToList] = useState<Array<ICurrencyRate>>([]);

  useEffect(() => {
    (async () => {
      await fetchAssets();
      const assetsData = getAssets();
      setFromList(assetsData)
      await fetchRates();
      const ratesData = getRates();
      setToList(ratesData)
    })()
  }, [])

  useEffect(() => {
    if (!from) return;
    subscribeRates(from.id);

    return () => (unSubscribeRates())
  }, [from?.id]);

  return loadedRates && loadedAssets ? (
    <Box display={'flex'} flexDirection={'column'}>
      <ExchangeSelect label={EExchangeSelect.From} data={fromList} />
      <ExchangeSelect label={EExchangeSelect.To} data={toList} />
      <ExchangeInput />

      <ExchangeViewer />
    </Box >
  ) : (
    (
      <Box display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -55%)' }}
      >
        <CircularProgress size="30px" />
          <Typography variant="body1">
            {LOADING_TEXT}
        </Typography>
      </Box>
    )
  )
}

export default observer(ExchangeComponent)
