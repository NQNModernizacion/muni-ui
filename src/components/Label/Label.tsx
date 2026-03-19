import * as React from "react";

export type LabelProps = {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
};

const Label = ({ htmlFor, children, className }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={["mx-label", className ?? ""].join(" ")}
    >
      {children}
    </label>
  );
};

export default Label;
