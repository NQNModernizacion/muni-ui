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
  placeholder?: string; // "Seleccione..."
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const SelectBase = React.forwardRef<HTMLSelectElement, SelectBaseProps>(
  function SelectBase(
    { className, options, value, onChange, error, placeholder, disabled, ...props },
    ref
  ) {
    const base =
      "block w-full rounded-xl px-3 py-2 text-text placeholder:text-muted " +
      "bg-surface border border-border outline-none transition";

    const focus = "focus:border-primary-400 focus:ring-2 focus:ring-primary-400/25";

    const state = cx(
      disabled && "disabled:opacity-60 disabled:cursor-not-allowed",
      error && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
    );

    return (
      <select
        ref={ref}
        disabled={disabled}
        className={cx(base, focus, state, className)}
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
