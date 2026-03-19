import * as React from "react";

export type BadgeSize = "xs" | "sm" | "md" | "lg";
export type BadgeTextSize = "xs" | "sm" | "md" | "lg";

export type BadgeColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "gray"
  | "blue"
  | "orange"
  | "purple";

export type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  size?: BadgeSize;
  textSize?: BadgeTextSize;
  color?: BadgeColor;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const sizes: Record<BadgeSize, string> = {
  xs: "px-1.5 py-0.5",
  sm: "px-2 py-0.5",
  md: "px-2.5 py-1",
  lg: "px-3 py-1",
};

const textSizes: Record<BadgeTextSize, string> = {
  xs: "text-[10px]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const colors: Record<BadgeColor, string> = {
  primary: "bg-primary-100 text-primary-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-700",
  gray: "bg-gray-200 text-gray-700",
  blue: "bg-blue-100 text-blue-700",
  orange: "bg-orange-100 text-orange-700",
  purple: "bg-purple-100 text-purple-700",
};

export default function Badge({
  children,
  className,
  size = "sm",
  textSize = "sm",
  color = "primary",
}: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full font-semibold",
        sizes[size],
        textSizes[textSize],
        colors[color],
        className
      )}
    >
      {children}
    </span>
  );
}
