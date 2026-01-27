import * as React from "react";
import { useController, type Control } from "react-hook-form";
import Label from "../Label/Label";
import SelectBase, { type Option, type SelectBaseProps } from "./SelectBase";

export type RHFSelectProps = Omit<SelectBaseProps, "value" | "onChange"> & {
  control: Control<any>;
  name: string;
  label?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  helperText?: React.ReactNode;
  hideError?: boolean;
  options: Option[];
};

export function RHFSelect({
  control,
  name,
  label,
  containerClassName,
  labelClassName,
  helperText,
  hideError = false,
  id,
  options,
  placeholder = "Seleccione una opción",
  ...selectProps
}: RHFSelectProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const selectId = id ?? `select-${name}`;

  return (
    <div className={containerClassName ?? "space-y-1"}>
      {label ? (
        <Label htmlFor={selectId} className={labelClassName}>
          {label}
        </Label>
      ) : null}

      <SelectBase
        id={selectId}
        options={options}
        placeholder={placeholder}
        value={field.value ?? ""}
        onChange={(v) => field.onChange(v)}
        onBlur={field.onBlur}
        name={field.name}
        disabled={selectProps.disabled}
        error={Boolean(error)}
        {...selectProps}
      />

      {helperText ? <div className="text-xs text-muted">{helperText}</div> : null}

      {!hideError && error?.message ? (
        <div className="text-xs text-red-600">{String(error.message)}</div>
      ) : null}
    </div>
  );
}
