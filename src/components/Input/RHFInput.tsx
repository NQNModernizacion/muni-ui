import * as React from "react";
import { useController, type Control } from "react-hook-form";
import Label from "../Label/Label";
import InputBase, { type InputBaseProps } from "./InputBase";

export type RHFInputProps = Omit<InputBaseProps, "value" | "defaultValue" | "onChange" | "onBlur" | "name"> & {
  control: Control<any>;
  name: string;
  label?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  helperText?: React.ReactNode;
  hideError?: boolean;
};

function safeId(name: string) {
  return name.replace(/[^a-zA-Z0-9\-_:.]/g, "-");
}

export function RHFInput({
  control,
  name,
  label,
  containerClassName,
  labelClassName,
  helperText,
  hideError = false,
  id,
  ...inputProps
}: RHFInputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const inputId = id ?? `mx-input-${safeId(name)}`;

  return (
    <div className={containerClassName ?? "mx-stack"} style={{ gap: ".25rem" }}>
      {label ? (
        <Label htmlFor={inputId} className={labelClassName}>
          {label}
        </Label>
      ) : null}

      <InputBase
        id={inputId}
        {...inputProps}
        {...field}
        value={field.value ?? ""}
        error={Boolean(error)}
      />

      {helperText ? <div className="mx-text-xs mx-muted">{helperText}</div> : null}

      {!hideError && error?.message ? (
        <div className="mx-error">{String(error.message)}</div>
      ) : null}
    </div>
  );
}
