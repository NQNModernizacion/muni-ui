// import * as React from "react";

// export type ButtonVariant = "solid" | "outline" | "ghost";
// export type ButtonColor =
//   | "primary"
//   | "secondary"
//   | "neutral"
//   | "danger"
//   | "success"
//   | "warning"
//   | "info";

// /** backward compat */
// type LegacyColor = "gray";

// export type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
//   variant?: ButtonVariant;
//   color?: ButtonColor | LegacyColor;
//   size?: "sm" | "md" | "lg";
//   isLoading?: boolean;
//   startContent?: React.ReactNode;
//   endContent?: React.ReactNode;
//   fullWidth?: boolean;
// };

// function cx(...classes: Array<string | false | null | undefined>) {
//   return classes.filter(Boolean).join(" ");
// }

// function normalizeColor(color: ButtonBaseProps["color"]): ButtonColor {
//   if (color === "gray") return "neutral";
//   return (color ?? "primary") as ButtonColor;
// }

// const sizeCls: Record<NonNullable<ButtonBaseProps["size"]>, string> = {
//   sm: "mx-btn--sm",
//   md: "mx-btn--md",
//   lg: "mx-btn--lg",
// };

// export const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
//   function ButtonBase(
//     {
//       className,
//       variant = "solid",
//       color = "primary",
//       size = "md",
//       isLoading,
//       startContent,
//       endContent,
//       fullWidth,
//       disabled,
//       children,
//       type = "button",
//       ...props
//     },
//     ref
//   ) {
//     const c = normalizeColor(color);

//     return (
//       <button
//         ref={ref}
//         type={type}
//         disabled={disabled || isLoading}
//         className={cx(
//           "mx-btn",
//           `mx-btn--${variant}`,
//           `mx-btn--${c}`,
//           sizeCls[size],
//           fullWidth && "mx-w-full",
//           isLoading && "mx-btn--loading",
//           className
//         )}
//         {...props}
//       >
//         {startContent ? <span className="mx-btn__slot">{startContent}</span> : null}

//         <span className={cx(isLoading && "mx-btn__text--loading")}>{children}</span>

//         {endContent ? <span className="mx-btn__slot">{endContent}</span> : null}

//         {isLoading ? <span className="mx-spinner" aria-hidden="true" /> : null}
//       </button>
//     );
//   }
// );

// export default ButtonBase;
import * as React from "react";
import { Loader } from "../Loader";
//import Loader from "../Loader";

type ButtonVariant = "solid" | "bordered";
type ButtonColor =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "success"
  | "gray";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonTextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type ButtonShadow = "none" | "sm" | "md" | "lg" | "xl";

export interface ButtonBaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  textSize?: ButtonTextSize;
  shadow?: ButtonShadow;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isLoading?: boolean;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const variantClasses: Record<ButtonColor, Record<ButtonVariant, string>> = {
  primary: {
    solid:
      "mx-btn--solid mx-btn--primary",
    bordered:
      "mx-btn--outline mx-btn--primary",
  },
  secondary: {
    solid:
      "mx-btn--solid mx-btn--secondary",
    bordered:
      "mx-btn--outline mx-btn--secondary",
  },
  gray: {
    solid:
      "mx-btn--solid mx-btn--neutral",
    bordered:
      "mx-btn--outline mx-btn--neutral",
  },
  danger: {
    solid:
      "mx-btn--solid mx-btn--danger",
    bordered:
      "mx-btn--outline mx-btn--danger",
  },
  warning: {
    solid:
      "mx-btn--solid mx-btn--warning",
    bordered:
      "mx-btn--outline mx-btn--warning",
  },
  success: {
    solid:
      "mx-btn--solid mx-btn--success",
    bordered:
      "mx-btn--outline mx-btn--success",
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: "py-0.5",
  sm: "py-1",
  md: "py-2",
  lg: "py-3",
  xl: "py-4",
};

const textSizeClasses: Record<ButtonTextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const shadowClasses: Record<ButtonShadow, string> = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

export const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  function ButtonBase(
    {
      children,
      className,
      variant = "solid",
      color = "primary",
      size = "md",
      textSize = "md",
      type = "button",
      shadow = "md",
      startContent,
      endContent,
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        {...props}
        disabled={isDisabled}
        className={cx(
          "mx-btn rounded-lg border-2 px-3 font-semibold transition-all duration-200 ease-linear disabled:pointer-events-none disabled:select-none disabled:opacity-70",
          shadowClasses[shadow],
          textSizeClasses[textSize],
          variantClasses[color][variant],
          isLoading && "mx-btn--loading",
          className
        )}
      >
        <div
          className={cx(
            "flex flex-nowrap items-center justify-center gap-2",
            sizeClasses[size]
          )}
        >
          {startContent}
          {children}
          {endContent}
          {isLoading && <Loader />}
        </div>
      </button>
    );
  }
);

export default ButtonBase;
