import * as React from "react";

export type TextareaBaseProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** Muestra borde/estado de error sin acoplar a ningún form lib */
  error?: boolean;
};

const TextareaBase = React.forwardRef<HTMLTextAreaElement, TextareaBaseProps>(
  function TextareaBase({ className, error, readOnly, disabled, rows = 4, ...props }, ref) {
    const base =
      "block w-full rounded-xl px-3 py-2 text-text placeholder:text-muted " +
      "bg-surface border border-border outline-none transition resize-y";

    const focus = "focus:border-primary-400 focus:ring-2 focus:ring-primary-400/25";

    const state = [
      disabled ? "disabled:opacity-60 disabled:cursor-not-allowed" : "",
      readOnly ? "bg-bg text-muted" : "",
      error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <textarea
        ref={ref}
        rows={rows}
        readOnly={readOnly}
        disabled={disabled}
        className={[base, focus, state, className ?? ""].join(" ")}
        {...props}
      />
    );
  }
);

export default TextareaBase;
