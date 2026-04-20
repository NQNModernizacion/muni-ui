// import * as React from "react";

// export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
//   variant?: "default" | "muted";
// };

// const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
//   { className, variant = "default", ...props },
//   ref
// ) {
//   const base =
//     "w-full rounded-2xl border border-border shadow-sm overflow-hidden";

//   const variants: Record<NonNullable<CardProps["variant"]>, string> = {
//     default: "bg-surface",
//     muted: "bg-bg",
//   };

//   return (
//     <div
//       ref={ref}
//       className={[base, variants[variant], className ?? ""].join(" ")}
//       {...props}
//     />
//   );
// });

// export default Card;
import * as React from "react";

type CardBgColor =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "success"
  | "gray";

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  children: React.ReactNode;
  bgColor?: CardBgColor;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const headerColors: Record<CardBgColor, string> = {
  primary: "bg-primary-500 text-white",
  secondary: "bg-secondary-500 text-primary-700",
  danger: "bg-danger-500 text-white",
  warning: "bg-warning-500 text-text",
  success: "bg-success-500 text-white",
  gray: "bg-surface text-text",
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { title, children, bgColor = "gray", className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx(
        "w-full overflow-hidden rounded-xl border border-border bg-surface shadow-md",
        className
      )}
      {...props}
    >
      {title ? (
        <div className={cx("rounded-t-xl px-4 py-2 font-semibold", headerColors[bgColor])}>
          {title}
        </div>
      ) : null}

      <div className="p-4">{children}</div>
    </div>
  );
});

export default Card;