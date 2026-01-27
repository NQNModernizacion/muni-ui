import * as React from "react";

export type SwitchBaseProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> & {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
};

const SwitchBase = React.forwardRef<HTMLButtonElement, SwitchBaseProps>(
  function SwitchBase(
    { checked, onCheckedChange, disabled, className, ...props },
    ref
  ) {
    const handleClick = () => {
      if (disabled) return;
      onCheckedChange?.(!checked);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleClick}
        className={[
          "relative inline-flex h-7 w-12 items-center rounded-full border transition-colors",
          // OFF: gris suave visible
          !checked ? "bg-bg border-border" : "",
          // ON: coral
          checked ? "bg-primary-400 border-primary-400" : "",
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
          // focus ring coral
          "focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:ring-offset-2 focus:ring-offset-surface",
          className ?? "",
        ].join(" ")}
        {...props}
      >
        <span
          className={[
            "pointer-events-none inline-block h-5 w-5 rounded-full transition-transform",
            // Thumb visible (siempre)
            "bg-white shadow-sm border border-border",
            checked ? "translate-x-6" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    );
  }
);

export default SwitchBase;
