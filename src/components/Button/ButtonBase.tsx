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

/** backward compat */
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

function normalizeColor(color: ButtonBaseProps["color"]): ButtonColor {
  if (color === "gray") return "neutral";
  return (color ?? "primary") as ButtonColor;
}

const sizeCls: Record<NonNullable<ButtonBaseProps["size"]>, string> = {
  sm: "mx-btn--sm",
  md: "mx-btn--md",
  lg: "mx-btn--lg",
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

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cx(
          "mx-btn",
          `mx-btn--${variant}`,
          `mx-btn--${c}`,
          sizeCls[size],
          fullWidth && "mx-w-full",
          isLoading && "mx-btn--loading",
          className
        )}
        {...props}
      >
        {startContent ? <span className="mx-btn__slot">{startContent}</span> : null}

        <span className={cx(isLoading && "mx-btn__text--loading")}>{children}</span>

        {endContent ? <span className="mx-btn__slot">{endContent}</span> : null}

        {isLoading ? <span className="mx-spinner" aria-hidden="true" /> : null}
      </button>
    );
  }
);

export default ButtonBase;
