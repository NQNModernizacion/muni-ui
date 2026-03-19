import * as React from "react";

function cx(...c: Array<string | undefined | null | false>) {
  return c.filter(Boolean).join(" ");
}

export type ContainerProps = React.PropsWithChildren<{
  title?: React.ReactNode;
  subtitle?: React.ReactNode;

  /** Igual que el template */
  linkBack?: string;

  /** Alternativa para apps sin router */
  onBack?: () => void;

  /**
   * Para mantener la librería agnóstica (sin react-router-dom).
   * En el template pasás BackComponent={Link}.
   */
  BackComponent?: React.ElementType<any>;

  backLabel?: React.ReactNode;
  backIcon?: React.ReactNode;

  /** Estilos extra en el card interno */
  className?: string;

  /** Estilos extra en el wrapper externo */
  outerClassName?: string;
}>;

export default function Container({
  children,
  title,
  subtitle,
  linkBack,
  onBack,
  BackComponent,
  backLabel = "Volver",
  backIcon,
  className,
  outerClassName,
  ...props
}: ContainerProps) {
  const showBack = Boolean(linkBack || onBack);

  // Default: <a> si hay linkBack; <button> si hay onBack
  const BackTag: React.ElementType<any> =
    BackComponent ?? (linkBack ? "a" : "button");

  const backProps =
    BackTag === "button"
      ? { type: "button", onClick: onBack }
      : BackComponent
      ? { to: linkBack } // react-router Link
      : { href: linkBack }; // <a>

  return (
    <section
      className={cx("w-full max-w-screen-xl mx-auto p-3 relative", outerClassName)}
      {...props}
    >
      <div className={cx("bg-surface rounded-xl shadow-mxSoft p-4 sm:p-6", className)}>
        {showBack && (
          <div className="mb-4">
            <BackTag
              {...backProps}
              className={cx(
                "inline-flex items-center gap-1",
                "px-3 py-1.5 rounded-md",
                "text-sm font-semibold",
                // ✅ semánticos tokenizados (ya los tenés en tokens.css)
                "text-nav-action-text",
                "bg-nav-action-bg hover:bg-nav-action-bg-hover",
                "transition-colors"
              )}
            >
              {backIcon ? <span className="inline-flex">{backIcon}</span> : null}
              {backLabel}
            </BackTag>
          </div>
        )}

        {title && (
          <div className="mb-6">
            {/* Igual que template: deja heredar color del scope/base */}
            <h2 className="text-center text-3xl font-bold">{title}</h2>

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
