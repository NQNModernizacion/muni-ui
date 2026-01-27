import * as React from "react";

export type ModalContentProps = React.HTMLAttributes<HTMLDivElement>;

export default function ModalContent({ className, ...props }: ModalContentProps) {
  return (
    <div className={["px-6 py-5", className ?? ""].join(" ")} {...props} />
  );
}
