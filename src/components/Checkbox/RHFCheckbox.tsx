import * as React from "react";
import { useController, type Control } from "react-hook-form";
import CheckboxBase from "./CheckboxBase";

export type RHFCheckboxProps = {
  name: string;
  control: Control<any>;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
};

export function RHFCheckbox({
  name,
  control,
  label,
  description,
  disabled,
}: RHFCheckboxProps) {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <CheckboxBase
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />

      <div className="space-y-0.5">
        <div className="text-sm font-medium text-text">{label}</div>
        {description ? (
          <div className="text-xs text-muted">{description}</div>
        ) : null}
      </div>
    </label>
  );
}
