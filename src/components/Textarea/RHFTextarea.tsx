import * as React from "react";
import { useController, type Control } from "react-hook-form";
import Label from "../Label/Label";
import TextareaBase, { type TextareaBaseProps } from "./TextareaBase";

export type RHFTextareaProps = TextareaBaseProps & {
  control: Control<any>;
  name: string;
  label?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  helperText?: React.ReactNode;
  hideError?: boolean;
  smallText?: React.ReactNode;
};

export function RHFTextarea({
  control,
  name,
  label,
  containerClassName,
  labelClassName,
  helperText,
  smallText,
  hideError = false,
  id,
  ...textareaProps
}: RHFTextareaProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const textareaId = id ?? `textarea-${name}`;

  return (
    <div className={containerClassName ?? "space-y-1"}>
      {label ? (
       <Label label={label} name={name} className={labelClassName} />
      ) : null}

      <TextareaBase
        id={textareaId}
        {...textareaProps}
        {...field}
        value={field.value ?? ""}
        error={Boolean(error)}
      />

      {/* {helperText ? <div className="text-xs text-muted">{helperText}</div> : null} */}
        {smallText ? <div className="text-xs text-muted">{smallText}</div> : null}


      {!hideError && error?.message ? (
        <div className="text-xs text-red-600">{String(error.message)}</div>
      ) : null}
    </div>
  );
}
