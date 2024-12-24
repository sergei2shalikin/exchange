import React from "react";
import { TableHead, TableRow, TableCell, TableSortLabel, Box, Typography } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { Order, OrderType } from "./rates.table.types";
import { OrderBy } from "./rates.table.types";

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: OrderBy) => void;
  order: Order;
  orderBy: string;
}

interface HeadCell {
  disablePadding: boolean;
  id: OrderBy;
  label: string;
  numeric: boolean;
  ordering?: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'symbol',
    numeric: false,
    disablePadding: false,
    label: 'Currency',
  },
  {
    id: 'priceUsd',
    numeric: true,
    disablePadding: false,
    label: 'Price USD',
    ordering: true
  },
];


export default function RatesTableHead(props: EnhancedTableProps) {
  const {
    order,
    orderBy,
    onRequestSort
  } = props;
  const createSortHandler =
    (property: OrderBy) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          headCell.ordering ?
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : OrderType.ASC}
                onClick={createSortHandler(headCell.id)}
              >
                <Typography
                  sx={{ flex: '1 1 100%' }}
                  color="inherit"
                  variant="subtitle1"
                  component="div"
                >
                  {headCell.label}
                </Typography>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === OrderType.DESC ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            : (
              <TableCell key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}>
                <Typography
                  sx={{ flex: '1 1 100%' }}
                  color="inherit"
                  variant="subtitle1"
                  component="div"
                >
                  {headCell.label}
                </Typography>
              </TableCell>
            )
        ))}
      </TableRow>
    </TableHead>
  );
}