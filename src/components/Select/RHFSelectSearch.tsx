
import { Controller } from "react-hook-form";
import Label from "../Label/Label";
import SelectSearch from "./SelectSearch";

export function RHFSelectSearch({
  control,
  name,
  label,
  options,
  isMulti = false,
  helperText,
  hideError = false,
  containerClassName,
  labelClassName,
  disabled,
  loading,
}: any) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errMsg = fieldState.error?.message;

        return (
          <div className={containerClassName ?? "mx-stack"}>
            {label && (
              <Label htmlFor={name} className={labelClassName}>
                {label}
              </Label>
            )}

            <SelectSearch
              id={name}
              options={options}
              isMulti={isMulti}
              disabled={disabled}
              loading={loading}
              onChange={(sel: any) => {
                if (isMulti) {
                  field.onChange(sel?.map((x: any) => x.value) ?? []);
                } else {
                  field.onChange(sel?.value ?? "");
                }
              }}
            />

            {helperText && (
              <div className="mx-text-xs mx-muted">{helperText}</div>
            )}

            {!hideError && errMsg && (
              <div className="mx-error">{String(errMsg)}</div>
            )}
          </div>
        );
      }}
    />
  );
}
