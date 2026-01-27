import * as React from "react";

export type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string; 
};

const Label = ({ htmlFor, children, className }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={[
        "block font-semibold text-primary-500", // coral en labels
        className ?? "",
      ].join(" ")}
    >
      {children}
    </label>
  );
}

export default Label
