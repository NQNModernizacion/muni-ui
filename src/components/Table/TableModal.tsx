// import * as React from "react";

// import Table from "./Table";
// import TableToolbar from "./TableToolbar";
// import TablePagination from "./TablePagination";
// import type { GetRowId, TableColumn } from "./table.types";
// import { Modal, ModalContent, ModalFooter, ModalHeader } from "../Modal";

// export type TableModalProps<T> = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;

//   title: React.ReactNode;
  
  

//   rows: T[];
//   columns: Array<TableColumn<T>>;
//   getRowId?: GetRowId<T>;

//   searchValue: string;
//   onSearchChange: (value: string) => void;
//   searchPlaceholder?: string;

//   page: number;
//   rowsPerPage: number;
//   rowsPerPageOptions?: number[];
//   onPageChange: (page: number) => void;
//   onRowsPerPageChange: (rowsPerPage: number) => void;

//   emptyText?: React.ReactNode;
// };

// export default function TableModal<T>({
//   open,
//   onOpenChange,
//   title,
//   rows,
//   columns,
//   getRowId,
//   searchValue,
//   onSearchChange,
//   searchPlaceholder = "Buscar...",
//   page,
//   rowsPerPage,
//   rowsPerPageOptions,
//   onPageChange,
//   onRowsPerPageChange,
//   emptyText,
// }: TableModalProps<T>) {
//   const total = rows.length;
//   const start = page * rowsPerPage;
//   const end = Math.min(start + rowsPerPage, total);
//   const pageRows = rows.slice(start, end);

//   return (
//     <Modal open={open} onOpenChange={onOpenChange} size="lg">
//       <ModalHeader
//         className="bg-table-header-bg border-b-0"
//         title={
//           <span className="text-sm font-semibold text-table-header-text">
//             {title}
//           </span>
//         }
//         right={
//           <button
//             type="button"
//             onClick={() => onOpenChange(false)}
//             className="rounded-lg px-2 py-1 text-table-header-text/80 hover:text-table-header-text hover:bg-black/10"
//             aria-label="Cerrar"
//           >
//             ✕
//           </button>
//         }
//       />

//       <ModalContent className="space-y-3">
//         <TableToolbar
//           searchValue={searchValue}
//           onSearchChange={onSearchChange}
//           placeholder={searchPlaceholder}
//         />

//         <Table
//           rows={pageRows}
//           columns={columns}
//           getRowId={getRowId}
//           emptyText={emptyText}
//         />
//       </ModalContent>

//       <ModalFooter className="justify-between">
//         <div />
//         <TablePagination
//           total={total}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           rowsPerPageOptions={rowsPerPageOptions}
//           onPageChange={onPageChange}
//           onRowsPerPageChange={onRowsPerPageChange}
//         />
//       </ModalFooter>
//     </Modal>
//   );
// }
import * as React from "react";
import Table from "./Table";
import type { GetRowId, TableColumn } from "./table.types";
import { Modal } from "../Modal";

export type TableModalProps<T> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;

  rows: T[];
  columns: Array<TableColumn<T>>;
  getRowId?: GetRowId<T>;

  emptyText?: React.ReactNode;
  loading?: boolean;

  search?: boolean;
  searchPlaceholder?: string;
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];

  trigger?: boolean | number | string;
};


export default function TableModal<T>({
  open,
  onOpenChange,
  title,
  rows,
  columns,
  getRowId,
  emptyText,
  loading,
  search = true,
  searchPlaceholder = "Buscar...",
  pagination = true,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  trigger,
}: TableModalProps<T>) {
  return (
    <Modal
      show={open}
      onHide={() => onOpenChange(false)}
      title={title}
      variant="primary"
      maxWidth="max-w-6xl"
    >
      <Table
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        emptyText={emptyText}
        loading={loading}
        search={search}
        searchPlaceholder={searchPlaceholder}
        pagination={pagination}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        trigger={trigger}
      />
    </Modal>
  );
}