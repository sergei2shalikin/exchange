import { FormControl, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { exchangeRates } from "../../exchange.state";

export default function ExchangeInput() {
  const { amount, setAmount } = exchangeRates;
  const [value, setValue] = React.useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setAmount(event.target.value);
  };

  useEffect(() => {
    setValue(amount)
  }, [amount])

  return (
    <FormControl sx={{ m: 1, minWidth: 340 }}>
      <TextField label="Amount" onChange={handleInputChange} value={value} />
    </FormControl>
  )
}
