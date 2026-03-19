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
  disabled?: boolean
};

function safeId(s: string) {
  return s.replace(/[^a-zA-Z0-9\-_:.]/g, "-");
}

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
  disabled,
  ...selectProps
}: RHFSelectProps) {
  const reactId = React.useId();
  const selectId = id ?? `select-${safeId(name)}-${reactId}`;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className={containerClassName ?? "mx-stack"} style={{ gap: ".25rem" }}>
      {label ? (
        <Label htmlFor={selectId} className={labelClassName}>
          {label}
        </Label>
      ) : null}

      <SelectBase
         {...selectProps}
         id={selectId}
         options={options}
         placeholder={placeholder}
         value={field.value ?? ""}
         onChange={(v) => field.onChange(v)}
         onBlur={field.onBlur}
         name={field.name}
         error={Boolean(error)}
         disabled={disabled}
      />

      {helperText ? <div className="mx-text-xs mx-muted">{helperText}</div> : null}

      {!hideError && error?.message ? (
        <div className="mx-error">{String(error.message)}</div>
      ) : null}
    </div>
  );
}
