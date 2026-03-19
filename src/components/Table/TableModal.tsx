import * as React from "react";

import Table from "./Table";
import TableToolbar from "./TableToolbar";
import TablePagination from "./TablePagination";
import type { GetRowId, TableColumn } from "./table.types";
import { Modal, ModalContent, ModalFooter, ModalHeader } from "../Modal";

export type TableModalProps<T> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: React.ReactNode;
  
  

  rows: T[];
  columns: Array<TableColumn<T>>;
  getRowId?: GetRowId<T>;

  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;

  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;

  emptyText?: React.ReactNode;
};

export default function TableModal<T>({
  open,
  onOpenChange,
  title,
  rows,
  columns,
  getRowId,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  page,
  rowsPerPage,
  rowsPerPageOptions,
  onPageChange,
  onRowsPerPageChange,
  emptyText,
}: TableModalProps<T>) {
  const total = rows.length;
  const start = page * rowsPerPage;
  const end = Math.min(start + rowsPerPage, total);
  const pageRows = rows.slice(start, end);

  return (
    <Modal open={open} onOpenChange={onOpenChange} size="lg">
      <ModalHeader
        className="bg-table-header-bg border-b-0"
        title={
          <span className="text-sm font-semibold text-table-header-text">
            {title}
          </span>
        }
        right={
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-lg px-2 py-1 text-table-header-text/80 hover:text-table-header-text hover:bg-black/10"
            aria-label="Cerrar"
          >
            ✕
          </button>
        }
      />

      <ModalContent className="space-y-3">
        <TableToolbar
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          placeholder={searchPlaceholder}
        />

        <Table
          rows={pageRows}
          columns={columns}
          getRowId={getRowId}
          emptyText={emptyText}
        />
      </ModalContent>

      <ModalFooter className="justify-between">
        <div />
        <TablePagination
          total={total}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </ModalFooter>
    </Modal>
  );
}
