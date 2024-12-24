import { Dialog, DialogActions, Button, Divider, DialogContent, List, ListItemButton, ListItemText } from "@mui/material";
import React, { SetStateAction, useState } from "react";
import { exchangeRates } from "../../exchange.state";
import { ICurrencyRate } from "../../exchange.types";
import { ICurrency } from "../../../rates/rates.types";
import { EExchangeSelect } from "../../exchange.types";
import { observer } from "mobx-react-lite";

interface IExchangeDialog {
  open: boolean;
  onClose: () => void;
  data: Array<{id: string, symbol: string}>;
  label: string;
}

function ExchangeDialog({
  open,
  onClose,
  data,
  label
}: IExchangeDialog) {
  const { setToCurrency, setFromCurrency, intersection } = exchangeRates;

  const [selected, setSelected] = useState<{ symbol: string; id: string } | null>(null);

  const handleListItemClick = (item: SetStateAction<{ symbol: string; id: string }>) => {
    setSelected(item as { symbol: string; id: string });
  };

  const handleClose = () => {
    onClose();
  };
  const handleConfirm = () => {
    if (label === EExchangeSelect.From) setFromCurrency(selected as ICurrency);
    if (label === EExchangeSelect.To) setToCurrency(selected as ICurrencyRate);
    onClose();
  }

  return (
    <Dialog open={open}
      onClose={handleClose}
      sx={{
        width: '100%',
        '& .MuiDialog-container': { alignItems: 'flex-end' }
      }}
      PaperProps={{
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
          width: '100%',
          maxWidth: '100%',
          height: '36%',
        },
      }}
    >
      <DialogActions sx={{
        width: '100%',
        justifyContent: 'space-between'
      }}
      >
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
      <Divider sx={{ width: '100%' }} />
      <DialogContent sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
        <List sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          bgcolor: 'background.paper',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
          {intersection(data, label).map((eachItem) => (
            <ListItemButton
              key={eachItem.id}
              selected={selected?.symbol === eachItem.symbol}
              onClick={() => handleListItemClick(eachItem)}
              sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <ListItemText sx={{ display: 'flex', justifyContent: 'center' }}
                primary={eachItem.symbol}
              />
            </ListItemButton>
          )
          )}
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default observer(ExchangeDialog)