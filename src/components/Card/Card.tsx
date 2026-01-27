import * as React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "muted";
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant = "default", ...props },
  ref
) {
  const base =
    "w-full rounded-2xl border border-border shadow-sm overflow-hidden";

  const variants: Record<NonNullable<CardProps["variant"]>, string> = {
    default: "bg-surface",
    muted: "bg-bg",
  };

  return (
    <div
      ref={ref}
      className={[base, variants[variant], className ?? ""].join(" ")}
      {...props}
    />
  );
});

export default Card;
