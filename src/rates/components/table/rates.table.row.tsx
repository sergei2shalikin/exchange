import { TableRow, TableCell } from "@mui/material";
import React, { useEffect } from "react";

interface Column {
  id: 'symbol' | 'priceUsd';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string;
}

const columns: Column[] = [
  { id: 'symbol', label: 'symbol', minWidth: 170 },
  {
    id: 'priceUsd',
    label: 'priceUsd',
    minWidth: 170,
    align: 'right',
    format: (value: string) => ('$' + value),
  },
];
interface RatesTableRowProps {
  row: {
    id: string;
    symbol: string;
    priceUsd: string;
  }
}
export default function RatesTableRow({ row, ...props }: RatesTableRowProps) {
  const rowRef = React.useRef<HTMLTableRowElement>(null);
  const prevValue = React.useRef<string>('');

  useEffect(() => {
    if (rowRef?.current && prevValue?.current) {
      if (row?.priceUsd > prevValue.current) {
        rowRef.current.classList.add('flash-green')
        setTimeout(() => rowRef.current?.classList.remove('flash-green'), 1000)
      } else {
        rowRef.current.classList.add('flash-red')
        setTimeout(() => rowRef.current?.classList.remove('flash-red'), 1000)
      }
    }
    prevValue.current = row?.priceUsd

  }, [row])

  return (
    <TableRow
      ref={rowRef}
      hover
      tabIndex={-1}
      key={row.id}
      {...props}
    >
      {columns.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {column.format ? column.format(value) : value}
          </TableCell>
        );
      })}
    </TableRow>
  )
}
