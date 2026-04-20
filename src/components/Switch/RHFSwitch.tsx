// import * as React from "react";
import { useController, type Control } from "react-hook-form";

import SwitchBase from "./SwitchBase";
import Label from "../Label/Label";

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
        <Label label={label} name={name} className={labelClassName} />
      ) : null}

      <div className="flex items-start gap-3">
        <SwitchBase
          aria-label={typeof label === "string" ? label : name}
          checked={checked}
          disabled={disabled}
          onCheckedChange={(v) => field.onChange(v)}
        />

        {description ? (
          <div className="text-xs text-muted">{description}</div>
        ) : null}
      </div>
    </div>
  );
}

export default RHFSwitch;