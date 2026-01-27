import * as React from "react";

export type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full bg-secondary-500/40 px-2 py-0.5",
        "text-xs font-semibold text-primary-500",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </span>
  );
}
