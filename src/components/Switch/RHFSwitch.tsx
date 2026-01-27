import * as React from "react";
import { useController, type Control } from "react-hook-form";
import Label from "../Label/Label";
import SwitchBase from "./SwitchBase";

export type RHFSwitchProps = {
  control: Control<any>;
  name: string;
  label?: React.ReactNode;
  description?: React.ReactNode;

  containerClassName?: string;
  labelClassName?: string;

  disabled?: boolean;
};

export function RHFSwitch({
  control,
  name,
  label,
  description,
  containerClassName,
  labelClassName,
  disabled,
}: RHFSwitchProps) {
  const { field } = useController({ name, control });

  const checked = Boolean(field.value);

  return (
    <div className={containerClassName ?? "space-y-2"}>
      {label ? (
        <Label htmlFor={`switch-${name}`} className={labelClassName}>
          {label}
        </Label>
      ) : null}

      <div className="flex items-start gap-3">
        <SwitchBase
          aria-label={typeof label === "string" ? label : name}
          checked={checked}
          disabled={disabled}
          onCheckedChange={(v) => field.onChange(v)}
        />

        <div className="space-y-1">
          <div className="text-sm text-text font-medium">
            {typeof label === "string" ? label : null}
          </div>

          {description ? (
            <div className="text-xs text-muted">{description}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
