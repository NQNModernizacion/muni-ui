import * as React from "react";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "neutral"
  | "danger"
  | "success"
  | "warning"
  | "info";

/**
 * Backward compatibility:
 * - Antes usabas `gray`. Ahora preferimos `neutral`.
 */
type LegacyColor = "gray";

export type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  color?: ButtonColor | LegacyColor;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  fullWidth?: boolean;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const sizeCls: Record<NonNullable<ButtonBaseProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

const baseCls =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold " +
  "border transition-colors outline-none " +
  // Focus CORAL consistente (MuniExpress)
  "focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 " +
  "disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none";

function normalizeColor(color: ButtonBaseProps["color"]): ButtonColor {
  if (color === "gray") return "neutral";
  return (color ?? "primary") as ButtonColor;
}

/**
 * Nota: estos colores asumen que en Tailwind existen:
 * - primary-400/500, secondary-500/600, border, bg, surface, text, muted
 * - danger-600/700 + danger-50 (o equivalente)
 * - success-600/700 + success-50
 * - warning-500/600 + warning-50
 * - info-600/700 + info-50
 *
 * Si todavía no existen, abajo te dejo cómo mapearlos desde tokens.
 */

const solid: Record<ButtonColor, string> = {
  primary:
    "bg-primary-400 text-white border-primary-400 hover:bg-primary-500 hover:border-primary-500",

  secondary:
    "bg-secondary-500 text-primary-700 border-secondary-500 hover:bg-secondary-600 hover:border-secondary-600",

  neutral: "bg-surface text-text border-border hover:bg-bg",

  danger:
    "bg-danger-600 text-white border-danger-600 hover:bg-danger-700 hover:border-danger-700",

  success:
    "bg-success-600 text-white border-success-600 hover:bg-success-700 hover:border-success-700",

  warning:
    "bg-warning-500 text-black border-warning-500 hover:bg-warning-600 hover:border-warning-600",

  info:
    "bg-info-600 text-white border-info-600 hover:bg-info-700 hover:border-info-700",
};

const outline: Record<ButtonColor, string> = {
  primary:
    "bg-transparent text-primary-700 border-primary-400 hover:bg-primary-50",

  secondary:
    "bg-transparent text-primary-700 border-secondary-500 hover:bg-secondary-50",

  neutral: "bg-transparent text-text border-border hover:bg-bg",

  danger: "bg-transparent text-danger-700 border-danger-600 hover:bg-danger-50",

  success:
    "bg-transparent text-success-700 border-success-600 hover:bg-success-50",

  warning:
    "bg-transparent text-warning-700 border-warning-500 hover:bg-warning-50",

  info: "bg-transparent text-info-700 border-info-600 hover:bg-info-50",
};

const ghost: Record<ButtonColor, string> = {
  primary: "bg-transparent text-primary-700 border-transparent hover:bg-primary-50",
  secondary:
    "bg-transparent text-primary-700 border-transparent hover:bg-secondary-50",
  neutral: "bg-transparent text-text border-transparent hover:bg-bg",
  danger: "bg-transparent text-danger-700 border-transparent hover:bg-danger-50",
  success:
    "bg-transparent text-success-700 border-transparent hover:bg-success-50",
  warning:
    "bg-transparent text-warning-700 border-transparent hover:bg-warning-50",
  info: "bg-transparent text-info-700 border-transparent hover:bg-info-50",
};

export const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  function ButtonBase(
    {
      className,
      variant = "solid",
      color = "primary",
      size = "md",
      isLoading,
      startContent,
      endContent,
      fullWidth,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) {
    const c = normalizeColor(color);

    const variantCls =
      variant === "solid" ? solid[c] : variant === "outline" ? outline[c] : ghost[c];

    // Spinner: en solid blanco, en outline/ghost usa currentColor
    const spinnerCls =
      variant === "solid"
        ? "border-white/40 border-t-white"
        : "border-current/30 border-t-current";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cx(
          baseCls,
          sizeCls[size],
          variantCls,
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {startContent ? <span className="shrink-0">{startContent}</span> : null}

        <span className={cx(isLoading && "opacity-70")}>{children}</span>

        {endContent ? <span className="shrink-0">{endContent}</span> : null}

        {isLoading ? (
          <span
            className={cx(
              "ml-1 inline-block h-4 w-4 animate-spin rounded-full border-2",
              spinnerCls
            )}
          />
        ) : null}
      </button>
    );
  }
);

export default ButtonBase;
