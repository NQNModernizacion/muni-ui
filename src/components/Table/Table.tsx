import * as React from "react";
import type { GetRowId, TableColumn } from "./table.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const alignCls = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

export type TableProps<T> = {
  rows: T[];
  columns: Array<TableColumn<T>>;
  getRowId?: GetRowId<T>;

  /** Estado vacío */
  emptyText?: React.ReactNode;

  /** Zebra + hover */
  zebra?: boolean;

  /** Para tablas dentro de modals: limita alto + scroll */
  maxHeightClassName?: string;

  className?: string;
};

export default function Table<T>({
  rows,
  columns,
  getRowId,
  emptyText = "Sin resultados",
  zebra = true,
  maxHeightClassName = "max-h-[60vh]",
  className,
}: TableProps<T>) {
  return (
    <div
      className={cx(
        "w-full overflow-auto rounded-xl border border-border bg-surface",
        maxHeightClassName,
        className
      )}
    >
      <table className="w-full border-separate border-spacing-0">
        <thead className="sticky top-0 z-10 bg-surface">
          <tr>
            {columns.map((c) => (
              <th
              key={c.id}
              className={cx(
                "border-b border-border px-3 py-2 text-xs font-semibold text-table-header-text",
                c.align ? alignCls[c.align] : "text-left",
                c.headerClassName
              )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-10 text-center text-sm text-muted"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => {
              const id = getRowId ? getRowId(row, rowIndex) : rowIndex;
              const isZebra = zebra && rowIndex % 2 === 1;

              return (
                <tr
                  key={id}
                  className={cx(
                    "border-b border-border",
                    isZebra ? "bg-bg/60" : "bg-surface",
                    "hover:bg-table-row-hover"
                  )}
                >
                  {columns.map((c) => (
                    <td
                      key={c.id}
                      className={cx(
                        "px-3 py-2 text-sm text-text",
                        c.align ? alignCls[c.align] : "text-left",
                        c.cellClassName
                      )}
                    >
                      {c.render(row, rowIndex)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
