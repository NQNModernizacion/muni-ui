// import * as React from "react";

// export type LabelProps = {
//   htmlFor?: string;
//   children: React.ReactNode;
//   className?: string;
// };

// const Label = ({ htmlFor, children, className }: LabelProps) => {
//   return (
//     <label
//       htmlFor={htmlFor}
//       className={["mx-label", className ?? ""].join(" ")}
//     >
//       {children}
//     </label>
//   );
// };

// export default Label;
import * as React from "react";

export type LabelProps = {
  label?: React.ReactNode;
  name: string;
  className?: string;
};

const Label = ({ label, name, className }: LabelProps) => {
  if (!label) return null;

  return (
    <label
      htmlFor={`input-${name}`}
      id={`label-${name}`}
      className={["mx-label", className ?? ""].join(" ")}
    >
      <span className="flex items-center gap-2">{label}</span>
    </label>
  );
};

export default Label;