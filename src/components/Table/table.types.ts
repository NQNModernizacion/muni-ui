import * as React from "react";

export type TableColumn<T> = {

  id: string;
 
  header: React.ReactNode;

 
  headerClassName?: string;
 
  cellClassName?: string;


  align?: "left" | "center" | "right";


  render: (row: T, rowIndex: number) => React.ReactNode;
};

export type RowId = string | number;

export type GetRowId<T> = (row: T, rowIndex: number) => RowId;
