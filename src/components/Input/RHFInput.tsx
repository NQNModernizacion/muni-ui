import * as React from "react";
import {  useController, type Control } from "react-hook-form";
import Label from "../Label/Label";
import InputBase, { type InputBaseProps } from "./InputBase";


export type RHFInputProps = InputBaseProps & {
  control: Control<any>;
  name: string;
  label?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  helperText?: React.ReactNode;
  hideError?: boolean;
};

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

  const inputId = id ?? `input-${name}`;

  return (
    <div className={containerClassName ?? "space-y-1"}>
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

      {helperText ? (
        <div className="text-xs text-muted">{helperText}</div>
      ) : null}

      {!hideError && error?.message ? (
        <div className="text-xs text-red-600">{String(error.message)}</div>
      ) : null}
    </div>
  );
}
