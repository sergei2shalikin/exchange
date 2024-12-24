import React, { useEffect, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import RatesTableHead from './rates.table.head';
import RatesTableRow from './rates.table.row';
import { Box } from '@mui/material';
import { tableState } from './rates.table.state';
import { getComparator } from '../../helpers/sorting';
import { Order, OrderBy, OrderType } from './rates.table.types';
import { ICurrency } from '../../rates.types';

type RatesTableProps = {
  rates: Array<ICurrency>
}

export default function RatesTable({ rates }: RatesTableProps) {
  const {
    pagination,
    setPage,
    setRowsPerPage
  } = tableState;
  const { page, rowsPerPage } = pagination;
  const [rows, setRows] = React.useState<Array<ICurrency>>([]);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<OrderBy>('');

  useEffect(() => {
    setRows(rates);
  }, [rates]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === OrderType.ASC;
    setOrder(isAsc ? OrderType.DESC : OrderType.ASC);
    setOrderBy(property);
  };

  const visibleRows = useMemo(() => {
    if (!orderBy) return [...rows]
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return [...rows]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  },
    [rows, order, orderBy, page, rowsPerPage],
  );

  return  (
    <Box display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      alignItems={'flex-start'}
      minWidth={'375px'}
    >
      <Box display={'flex'} width={'100%'} justifyContent={'flex-end'}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          size='medium'
          labelRowsPerPage='Rows:'
        />
      </Box>
      <TableContainer sx={{ maxHeight: "calc(100vh - 196px)" }}>
        <Table stickyHeader size="medium" >
          <RatesTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={() =>handleRequestSort}
          />
          <TableBody >
            {visibleRows.map((row) => {
              return (
                <RatesTableRow key={row.id} row={row} />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  ) 
}

