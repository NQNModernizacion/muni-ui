import * as React from "react";

// export type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
//   title?: React.ReactNode;
//   subtitle?: React.ReactNode;
//   right?: React.ReactNode; // ej. botón cerrar, badge, etc.
// };

export type ModalHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
};

export default function ModalHeader({
  className,
  title,
  subtitle,
  right,
  ...props
}: ModalHeaderProps) {
  return (
    <div
      className={[
        "flex items-start justify-between gap-3",
        "border-b border-border bg-primary/10 px-6 py-4",
        className ?? "",
      ].join(" ")}
      {...props}
    >
      <div className="space-y-0.5">
        {title ? (
          <div className="text-base font-semibold text-primary-700">
            {title}
          </div>
        ) : null}
        {subtitle ? <div className="text-sm text-muted">{subtitle}</div> : null}
      </div>

      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}
