import * as React from "react";

function cx(...c: Array<string | undefined | null | false>) {
  return c.filter(Boolean).join(" ");
}

export type ContainerProps = React.PropsWithChildren<{
  title?: React.ReactNode;
  subtitle?: React.ReactNode;

  /** acción "volver" (la app decide cómo navegar) */
  onBack?: () => void;
  backLabel?: React.ReactNode;
  backIcon?: React.ReactNode; // para usar cualquier librería de íconos
  className?: string;
}>;

export default function Container({
  children,
  title,
  subtitle,
  onBack,
  backLabel = "Volver",
  backIcon,
  className,
  ...props
}: ContainerProps) {
  return (
    <section className="w-full max-w-screen-xl mx-auto p-3 relative" {...props}>
      <div className={cx("bg-surface rounded-xl shadow-mxSoft p-4 sm:p-6", className)}>
        {onBack && (
          <div className="mb-4">
            <button
              type="button"
              onClick={onBack}
              className={cx(
                "inline-flex items-center gap-1",
                "px-3 py-1.5 rounded-md",
                "text-sm font-semibold",
                "text-nav-action-text",
                "bg-nav-action-bg hover:bg-nav-action-bg-hover",
                "transition-colors"
              )}
            >
              {backIcon ? <span className="inline-flex">{backIcon}</span> : null}
              {backLabel}
            </button>
          </div>
        )}

        {title && (
          <div className="mb-6">
            <h2 className="text-center text-3xl font-bold text-text">{title}</h2>

            {subtitle && (
              <p className="mt-1 text-center text-lg font-medium text-muted">
                {subtitle}
              </p>
            )}

            <hr className="mt-4 border-border" />
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
