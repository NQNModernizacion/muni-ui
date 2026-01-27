import * as React from "react";
import InputBase from "../Input/InputBase";


function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type TableToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  right?: React.ReactNode;
  className?: string;
};

export default function TableToolbar({
  searchValue,
  onSearchChange,
  placeholder = "Buscar...",
  right,
  className,
}: TableToolbarProps) {
  return (
    <div className={cx("flex items-center gap-3", className)}>
      <div className="flex-1">
        <InputBase
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>

      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}
