// import * as React from "react";
// import type { GetRowId, TableColumn } from "./table.types";

// function cx(...classes: Array<string | false | null | undefined>) {
//   return classes.filter(Boolean).join(" ");
// }

// const alignCls = {
//   left: "text-left",
//   center: "text-center",
//   right: "text-right",
// } as const;

// export type TableProps<T> = {
//   rows: T[];
//   columns: Array<TableColumn<T>>;
//   getRowId?: GetRowId<T>;

//   /** Estado vacío */
//   emptyText?: React.ReactNode;

//   /** Zebra + hover */
//   zebra?: boolean;

//   /** Para tablas dentro de modals: limita alto + scroll */
//   maxHeightClassName?: string;

//   className?: string;
// };

// export default function Table<T>({
//   rows,
//   columns,
//   getRowId,
//   emptyText = "Sin resultados",
//   zebra = true,
//   maxHeightClassName = "max-h-[60vh]",
//   className,
// }: TableProps<T>) {
//   return (
//     <div
//       className={cx(
//         "w-full overflow-auto rounded-xl border border-border bg-surface",
//         maxHeightClassName,
//         className
//       )}
//     >
//       <table className="w-full border-separate border-spacing-0">
//         <thead className="sticky top-0 z-10 bg-surface">
//           <tr>
//             {columns.map((c) => (
//               <th
//               key={c.id}
//               className={cx(
//                 "border-b border-border px-3 py-2 text-xs font-semibold text-table-header-text",
//                 c.align ? alignCls[c.align] : "text-left",
//                 c.headerClassName
//               )}
//               >
//                 {c.header}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {rows.length === 0 ? (
//             <tr>
//               <td
//                 colSpan={columns.length}
//                 className="px-3 py-10 text-center text-sm text-muted"
//               >
//                 {emptyText}
//               </td>
//             </tr>
//           ) : (
//             rows.map((row, rowIndex) => {
//               const id = getRowId ? getRowId(row, rowIndex) : rowIndex;
//               const isZebra = zebra && rowIndex % 2 === 1;

//               return (
//                 <tr
//                   key={id}
//                   className={cx(
//                     "border-b border-border",
//                     isZebra ? "bg-bg/60" : "bg-surface",
//                     "hover:bg-table-row-hover"
//                   )}
//                 >
//                   {columns.map((c) => (
//                     <td
//                       key={c.id}
//                       className={cx(
//                         "px-3 py-2 text-sm text-text",
//                         c.align ? alignCls[c.align] : "text-left",
//                         c.cellClassName
//                       )}
//                     >
//                       {c.render(row, rowIndex)}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import * as React from "react";
import InputBase from "../Input/InputBase";
import TablePagination from "./TablePagination";
import type { TableProps } from "./table.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const alignCls = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

type SortDirection = "asc" | "desc" | null;



function matchesSearchValue(value: unknown, token: string) {
  if (value == null) return false;
  return String(value).toLowerCase().includes(token);
}

function rowMatchesTokens<T>(
  row: T,
  tokens: string[],
  columns: Array<{
    filterValue?: (row: T) => string | number | null | undefined;
  }>
) {
  if (!tokens.length) return true;

  const values = columns
    .map((column) => column.filterValue?.(row))
    .filter((value) => value != null);

  return tokens.every((token) =>
    values.some((value) => matchesSearchValue(value, token))
  );
}

export default function Table<T>({
  rows,
  columns,
  getRowId,
  emptyText = "Sin resultados",
  zebra = true,
  loading = false,

  search = false,
  disabledSearch = false,
  searchPlaceholder = "Buscar...",
  trigger = true,

  pagination = true,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],

  renderToolbarRight,

  onRowClick,
  onCellClick,
  getRowClassName,

  className,
  containerClassName,
  rowClassName,
  headerClassName,

  maxHeightClassName = "max-h-[60vh]",
  height,
}: TableProps<T>) {
  const [searchValue, setSearchValue] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pageSize);

  const [sortBy, setSortBy] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);



  React.useEffect(() => {
    setSearchValue("");
    setPage(0);
    setRowsPerPage(pageSize);
    setSortBy(null);
    setSortDirection(null);
  }, [trigger, pageSize]);

  React.useEffect(() => {
    setPage(0);
  }, [searchValue, rowsPerPage, sortBy, sortDirection]);

  const filteredRows = React.useMemo(() => {
    if (disabledSearch || !searchValue.trim()) return rows;

    const tokens = searchValue
      .toLowerCase()
      .trim()
      .split(" ")
      .filter(Boolean);

    return rows.filter((row) => rowMatchesTokens(row, tokens, columns));
  }, [rows, columns, searchValue, disabledSearch]);

  const sortedRows = React.useMemo(() => {
    if (!sortBy || !sortDirection) return filteredRows;

    const column = columns.find((c) => c.id === sortBy);
    if (!column?.sortValue) return filteredRows;

    const copy = [...filteredRows];

    copy.sort((a, b) => {
      const aValue = column.sortValue?.(a);
      const bValue = column.sortValue?.(b);

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      const result = String(aValue).localeCompare(String(bValue), "es", {
        sensitivity: "base",
        numeric: true,
      });

      return sortDirection === "asc" ? result : -result;
    });

    return copy;
  }, [filteredRows, columns, sortBy, sortDirection]);

  const total = sortedRows.length;
  const start = page * rowsPerPage;
  const end = Math.min(start + rowsPerPage, total);

  const visibleRows = React.useMemo(() => {
    if (!pagination) return sortedRows;
    return sortedRows.slice(start, end);
  }, [sortedRows, pagination, start, end]);

  const containerStyle = height ? { height, width: "100%" } : undefined;

  function handleSort(columnId: string, sortable?: boolean) {
    if (!sortable) return;

    if (sortBy !== columnId) {
      setSortBy(columnId);
      setSortDirection("asc");
      return;
    }

    if (sortDirection === "asc") {
      setSortDirection("desc");
      return;
    }

    if (sortDirection === "desc") {
      setSortBy(null);
      setSortDirection(null);
      return;
    }

    setSortDirection("asc");
  }

  function getSortIcon(columnId: string, sortable?: boolean) {
    if (!sortable) return null;
    if (sortBy !== columnId) return "↕";
    if (sortDirection === "asc") return "↑";
    if (sortDirection === "desc") return "↓";
    return "↕";
  }

  return (
    <div className={cx("mx-stack mx-w-full", className)}>
      {(search || renderToolbarRight) && (
        <div className="mx-surface mx-row-between mx-surface-pad">
          <div>{renderToolbarRight ?? null}</div>

          {search ? (
            <div className="mx-w-full max-w-sm">
              <InputBase
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchPlaceholder}
                disabled={disabledSearch}
              />
            </div>
          ) : null}
        </div>
      )}

      <div
        style={containerStyle}
        className={cx(
          "mx-surface w-full overflow-auto",
          !height && maxHeightClassName,
          containerClassName
        )}
      >
        <table className="mx-table">
          <thead className="mx-table__head sticky top-0 z-10">
            <tr>
              {columns.map((c) => {
                const sortable = !!c.sortable;

                return (
                  <th
                    key={c.id}
                    className={cx(
                      "mx-table__th",
                      c.align ? alignCls[c.align] : "text-left",
                      sortable && "cursor-pointer select-none",
                      headerClassName,
                      c.headerClassName
                    )}
                    onClick={() => handleSort(c.id, sortable)}
                  >
                    <span className="inline-flex items-center gap-2">
                      {c.header}
                      {sortable ? (
                        <span aria-hidden="true" className="text-xs">
                          {getSortIcon(c.id, sortable)}
                        </span>
                      ) : null}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="mx-table__empty">
                  Cargando...
                </td>
              </tr>
            ) : visibleRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="mx-table__empty">
                  {emptyText}
                </td>
              </tr>
            ) : (
              visibleRows.map((row, rowIndex) => {
                const absoluteIndex = pagination ? start + rowIndex : rowIndex;
                const id = getRowId ? getRowId(row, absoluteIndex) : absoluteIndex;

                const zebraClass =
                  zebra && absoluteIndex % 2 === 0 ? "mx-table__row--zebra" : "";

                const customRowClass = getRowClassName
                  ? getRowClassName(row, absoluteIndex)
                  : "";

                const clickable = !!onRowClick;

                return (
                  <tr
                    key={id}
                    className={cx(
                      "mx-table__row",
                      "mx-table__row--hover",
                      zebraClass,
                      clickable && "cursor-pointer",
                      rowClassName,
                      customRowClass
                    )}
                    onClick={() => onRowClick?.(row, absoluteIndex)}
                  >
                    {columns.map((c) => (
                      <td
                        key={c.id}
                        className={cx(
                          "mx-table__cell",
                          c.align ? alignCls[c.align] : "text-left",
                          c.cellClassName
                        )}
                        onClick={(event) => {
                          if (onCellClick) {
                            event.stopPropagation();
                            onCellClick(row, absoluteIndex, c, event);
                          }
                        }}
                      >
                        {c.render(row, absoluteIndex)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && !loading && total > 0 ? (
        <div className="mx-surface mx-surface-pad">
          <TablePagination
            total={total}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={pageSizeOptions}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        </div>
      ) : null}
    </div>
   );
}