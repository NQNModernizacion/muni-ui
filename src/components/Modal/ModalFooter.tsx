import * as React from "react";

export type ModalFooterProps = React.HTMLAttributes<HTMLDivElement>;

export default function ModalFooter({ className, ...props }: ModalFooterProps) {
  return (
    <div
      className={[
        "border-t border-border bg-surface px-6 py-4",
        "flex items-center justify-end gap-3",
        className ?? "",
      ].join(" ")}
      {...props}
    />
  );
}
