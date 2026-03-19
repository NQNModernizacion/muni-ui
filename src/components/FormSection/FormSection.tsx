import * as React from "react";

export type FormSectionProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  headClassName?: string;
  bodyClassName?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function FormSection({
  children,
  title,
  subtitle,
  fullWidth = false,
  className,
  headClassName,
  bodyClassName,
  ...props
}: FormSectionProps) {
  return (
    <section className={cx("mx-section", className)} {...props}>
      {title || subtitle ? (
        <header className={cx("mx-section__head", headClassName)}>
          {title ? <div className="mx-section__title">{title}</div> : null}
          {subtitle ? <div className="mx-section__subtitle">{subtitle}</div> : null}
        </header>
      ) : null}

      <div className={cx("mx-section__body", bodyClassName)}>
        <div className={cx("mx-grid", !fullWidth && "mx-grid--2")}>{children}</div>
      </div>
    </section>
  );
}
