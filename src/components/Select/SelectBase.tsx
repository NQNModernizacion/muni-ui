import * as React from "react";

export type Option = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

export type SelectBaseProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size" | "onChange" | "value"
> & {
  options: Option[];
  value?: string | number;
  onChange?: (value: string) => void;
  error?: boolean;
  placeholder?: string;
  disabled?: boolean
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const SelectBase = React.forwardRef<HTMLSelectElement, SelectBaseProps>(
  function SelectBase(
    { className, options, value, onChange, error, disabled, placeholder, ...props },
    ref
  ) {
    return (
      <select
        ref={ref}
        disabled={disabled}
        className={cx(
          "mx-select",
          error && "mx-select--error",
          disabled && "mx-disabled",
          className
        )}
        value={value === undefined || value === null ? "" : String(value)}
        onChange={(e) => onChange?.(e.target.value)}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}

        {options.map((opt) => (
          <option key={String(opt.value)} value={String(opt.value)} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
);

export default SelectBase;
export { SelectBase };
