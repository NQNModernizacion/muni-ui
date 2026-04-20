//import * as React from "react";
import { SelectBase } from "../Select";
import { ButtonBase } from "../Button";


function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type TablePaginationProps = {
  total: number;
  page: number; // 0-based
  rowsPerPage: number;

  rowsPerPageOptions?: number[];

  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;

  className?: string;
};

export default function TablePagination({
  total,
  page,
  rowsPerPage,
  rowsPerPageOptions = [10, 25, 50, 100],
  onPageChange,
  onRowsPerPageChange,
  className,
}: TablePaginationProps) {
  const start = total === 0 ? 0 : page * rowsPerPage + 1;
  const end = Math.min((page + 1) * rowsPerPage, total);

  const canPrev = page > 0;
  const canNext = end < total;

  return (
    <div
      className={cx(
        "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex items-center gap-2 text-xs text-muted">
        <span>Filas por página:</span>

        <div className="w-24">
          <SelectBase
            value={rowsPerPage}
            onChange={(v) => {
              const n = Number(v);
              onRowsPerPageChange(n);
              onPageChange(0);
            }}
            options={rowsPerPageOptions.map((n) => ({ value: n, label: String(n) }))}
          />
        </div>

        <span className="ml-2">
          {start}–{end} de {total}
        </span>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <ButtonBase
          type="button"
          variant="solid"
          color="gray"
          size="sm"
          disabled={!canPrev}
          onClick={() => canPrev && onPageChange(page - 1)}
        >
          ‹
        </ButtonBase>

        <ButtonBase
          type="button"
          variant="solid"
          color="gray"
          size="sm"
          disabled={!canNext}
          onClick={() => canNext && onPageChange(page + 1)}
        >
          ›
        </ButtonBase>
      </div>
    </div>
  );
}
