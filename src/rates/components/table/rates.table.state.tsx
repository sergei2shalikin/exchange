import { makeAutoObservable } from "mobx";

class TableState {
  pagination: { page: number, rowsPerPage: number } = {
    page: 1,
    rowsPerPage: 10
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.pagination.page = parseInt(localStorage.getItem('page') || '1')
    this.pagination.rowsPerPage = parseInt(localStorage.getItem('rowsPerPage') || '10')
  }

  getPagination() {
    return this.pagination
  }

  setPage(page: number) {
    this.pagination.page = page
    localStorage.setItem('page', page.toString())
  }

  setRowsPerPage(rowsPerPage: number) {
    this.pagination.rowsPerPage = rowsPerPage
    localStorage.setItem('rowsPerPage', rowsPerPage.toString())
  }
}

export const tableState = new TableState()