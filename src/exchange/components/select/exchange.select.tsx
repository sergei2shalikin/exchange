import { FormControl, InputAdornment, TextField } from "@mui/material";
import React from "react";
import ExchangeDialog from "../dialog/exchange.dialog";
import { exchangeRates } from "../../exchange.state";
import { EExchangeSelect } from "../../exchange.types";

export default function ExchangeSelect({ label, data }:
  {
    label: string;
    data: Array<{id: string, symbol: string}>;
  }) {

  const { to, from } = exchangeRates;


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = (reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 340 }}>
        <TextField
          onClick={handleClickOpen}
          label={label}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end" >|</InputAdornment>,
              value: label === EExchangeSelect.From ?
                from?.symbol || '' :
                to?.symbol || '',
            }
          }}
        />
      </FormControl>
      <ExchangeDialog open={open}
        onClose={handleCloseDialog}
        data={data}
        label={label}
      />
    </>
  )
}