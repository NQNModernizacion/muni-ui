import * as React from "react";

export type CheckboxBaseProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  checked?: boolean;
};

const CheckboxBase = React.forwardRef<HTMLInputElement, CheckboxBaseProps>(
  function CheckboxBase({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={[
          "h-4 w-4 rounded border border-border",
          "text-primary-400 focus:ring-2 focus:ring-primary-400/30",
          "cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
          className ?? "",
        ].join(" ")}
        {...props}
      />
    );
  }
);

export default CheckboxBase;
