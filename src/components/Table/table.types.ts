import * as React from "react";

export type TableColumn<T> = {
  id: string;
  header: React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  render: (row: T, rowIndex: number) => React.ReactNode;
  sortValue?: (row: T) => string | number | null | undefined;
  filterValue?: (row: T) => string | number | null | undefined;
};

export type RowId = string | number;

export type GetRowId<T> = (row: T, rowIndex: number) => RowId;

export type TableProps<T> = {
  rows: T[];
  columns: Array<TableColumn<T>>;
  getRowId?: GetRowId<T>;

  emptyText?: React.ReactNode;
  zebra?: boolean;
  loading?: boolean;

  search?: boolean;
  disabledSearch?: boolean;
  searchPlaceholder?: string;
  trigger?: boolean | number | string;

  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];

  renderToolbarRight?: React.ReactNode;

  onRowClick?: (row: T, rowIndex: number) => void;
  onCellClick?: (
    row: T,
    rowIndex: number,
    column: TableColumn<T>,
    event: React.MouseEvent<HTMLTableCellElement>
  ) => void;

  getRowClassName?: (row: T, rowIndex: number) => string;

  className?: string;
  containerClassName?: string;
  rowClassName?: string;
  headerClassName?: string;

  maxHeightClassName?: string;
  height?: string | number;
};