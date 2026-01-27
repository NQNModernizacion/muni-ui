import * as React from "react";

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export default function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div className={["px-6 py-5", className ?? ""].join(" ")} {...props} />
  );
}
