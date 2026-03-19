import * as React from "react";

export type InputBaseProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  error?: boolean;
};

const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  function InputBase({ className, error, readOnly, disabled, ...props }, ref) {
    return (
      <input
        ref={ref}
        readOnly={readOnly}
        disabled={disabled}
        className={[
          "mx-input",
          error ? "mx-input--error" : "",
          disabled ? "mx-disabled" : "",
          className ?? "",
        ].join(" ")}
        {...props}
      />
    );
  }
);

export default InputBase;
export { InputBase };
