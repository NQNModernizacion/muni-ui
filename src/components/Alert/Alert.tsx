import * as React from "react";

export type AlertColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "gray";

export type AlertVariant = "soft" | "solid" | "outline";
export type AlertBorderStyle = "solid" | "dashed" | "dotted";
export type AlertTextAlign = "start" | "center" | "end";

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  color?: AlertColor;
  variant?: AlertVariant;
  textAlign?: AlertTextAlign;
  borderStyle?: AlertBorderStyle;

  startContent?: React.ReactNode;
  endContent?: React.ReactNode;

  title?: React.ReactNode;
  description?: React.ReactNode;

  classNames?: {
    container?: string;
    content?: string;
    title?: string;
    description?: string;
    icon?: string;
  };
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const textAligns: Record<AlertTextAlign, string> = {
  start: "text-left",
  center: "text-center",
  end: "text-right",
};

const borderStyles: Record<AlertBorderStyle, string> = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
};

const styles: Record<
  AlertVariant,
  Record<AlertColor, { container: string; icon: string; title: string; text: string }>
> = {
  soft: {
    primary: {
      container: "bg-primary-50 border-primary-200",
      icon: "text-primary-500",
      title: "text-primary-700",
      text: "text-text",
    },
    secondary: {
      container: "bg-secondary-50 border-secondary-200",
      icon: "text-secondary-600",
      title: "text-primary-700",
      text: "text-text",
    },
    success: {
      container: "bg-emerald-50 border-emerald-200",
      icon: "text-emerald-600",
      title: "text-emerald-800",
      text: "text-text",
    },
    danger: {
      container: "bg-red-50 border-red-200",
      icon: "text-red-600",
      title: "text-red-800",
      text: "text-text",
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200",
      icon: "text-yellow-700",
      title: "text-yellow-900",
      text: "text-text",
    },
    gray: {
      container: "bg-bg border-border",
      icon: "text-muted",
      title: "text-text",
      text: "text-text",
    },
  },

  outline: {
    primary: {
      container: "bg-surface border-primary-200",
      icon: "text-primary-500",
      title: "text-primary-700",
      text: "text-text",
    },
    secondary: {
      container: "bg-surface border-secondary-200",
      icon: "text-secondary-600",
      title: "text-primary-700",
      text: "text-text",
    },
    success: {
      container: "bg-surface border-emerald-200",
      icon: "text-emerald-600",
      title: "text-emerald-800",
      text: "text-text",
    },
    danger: {
      container: "bg-surface border-red-200",
      icon: "text-red-600",
      title: "text-red-800",
      text: "text-text",
    },
    warning: {
      container: "bg-surface border-yellow-200",
      icon: "text-yellow-700",
      title: "text-yellow-900",
      text: "text-text",
    },
    gray: {
      container: "bg-surface border-border",
      icon: "text-muted",
      title: "text-text",
      text: "text-text",
    },
  },

  solid: {
    primary: {
      container: "bg-primary-500 border-primary-500",
      icon: "text-white/90",
      title: "text-white",
      text: "text-white/90",
    },
    secondary: {
      container: "bg-secondary-500 border-secondary-500",
      icon: "text-primary-700",
      title: "text-primary-800",
      text: "text-primary-800",
    },
    success: {
      container: "bg-emerald-600 border-emerald-600",
      icon: "text-white/90",
      title: "text-white",
      text: "text-white/90",
    },
    danger: {
      container: "bg-red-600 border-red-600",
      icon: "text-white/90",
      title: "text-white",
      text: "text-white/90",
    },
    warning: {
      container: "bg-yellow-500 border-yellow-500",
      icon: "text-yellow-950",
      title: "text-yellow-950",
      text: "text-yellow-950",
    },
    gray: {
      container: "bg-text border-text",
      icon: "text-white/90",
      title: "text-white",
      text: "text-white/90",
    },
  },
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    color = "primary",
    variant = "soft",
    textAlign = "start",
    borderStyle = "solid",
    startContent,
    endContent,
    title,
    description,
    children,
    className,
    classNames,
    ...props
  },
  ref
) {
  const s = styles[variant][color];

  return (
    <div
      ref={ref}
      role="status"
      className={cx(
        "flex gap-3 rounded-xl border p-4",
        borderStyles[borderStyle],
        s.container,
        classNames?.container,
        className
      )}
      {...props}
    >
      {startContent ? (
        <div className={cx("shrink-0 self-start pt-0.5", s.icon, classNames?.icon)}>
          {startContent}
        </div>
      ) : null}

      <div className={cx("min-w-0 flex-1 space-y-1", textAligns[textAlign], classNames?.content)}>
        {title ? (
          <div className={cx("text-sm font-semibold", s.title, classNames?.title)}>
            {title}
          </div>
        ) : null}

        {description ? (
          <div className={cx("text-sm", s.text, classNames?.description)}>
            {description}
          </div>
        ) : null}

        {children ? (
          <div className={cx("text-sm", s.text)}>
            {children}
          </div>
        ) : null}
      </div>

      {endContent ? (
        <div className={cx("shrink-0 self-start pt-0.5", s.icon, classNames?.icon)}>
          {endContent}
        </div>
      ) : null}
    </div>
  );
});

export default Alert;
