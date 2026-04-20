// import * as React from "react";

// export type ModalProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;

//   /** Cierra al clickear el overlay */
//   closeOnOverlayClick?: boolean;

//   /** Cierra con Escape */
//   closeOnEsc?: boolean;

//   /** Tamaños comunes */
//   size?: "sm" | "md" | "lg";

//   children: React.ReactNode;
// };

// const sizes: Record<NonNullable<ModalProps["size"]>, string> = {
//   sm: "max-w-md",
//   md: "max-w-xl",
//   lg: "max-w-2xl",
// };

// export default function Modal({
//   open,
//   onOpenChange,
//   closeOnOverlayClick = true,
//   closeOnEsc = true,
//   size = "md",
//   children,
// }: ModalProps) {
//   React.useEffect(() => {
//     if (!open || !closeOnEsc) return;

//     const onKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onOpenChange(false);
//     };

//     document.addEventListener("keydown", onKeyDown);
//     return () => document.removeEventListener("keydown", onKeyDown);
//   }, [open, closeOnEsc, onOpenChange]);

//   React.useEffect(() => {
//     if (!open) return;
//     // Bloqueo scroll de fondo (simple)
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = prev;
//     };
//   }, [open]);

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50">
//       {/* Overlay */}
//       <button
//         type="button"
//         aria-label="Cerrar modal"
//         className="absolute inset-0 bg-black/40"
//         onClick={() => closeOnOverlayClick && onOpenChange(false)}
//       />

//       {/* Panel */}
//       <div className="relative flex min-h-full items-center justify-center p-4">
//         <div
//           role="dialog"
//           aria-modal="true"
//           className={[
//             "w-full",
//             sizes[size],
//             "rounded-2xl border border-border bg-surface shadow-lg",
//             "overflow-hidden",
//           ].join(" ")}
//         >
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }
import * as React from "react";

export interface ModalProps {
  title?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  show: boolean;
  children?: React.ReactNode;
  closeButton?: boolean;
  noPadding?: boolean;
  variant?: "primary" | "danger" | "success" | "default";
  maxWidth?: string;
  onHide?: () => void;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const headerVariants: Record<
  NonNullable<ModalProps["variant"]>,
  string
> = {
  primary: "bg-primary-500 text-white",
  danger: "bg-danger-600 text-white",
  success: "bg-success-600 text-white",
  default: "bg-surface text-text border-b border-border",
};

export default function Modal({
  maxWidth = "max-w-4xl",
  show,
  onHide,
  title,
  children,
  loading,
  footer,
  closeButton = true,
  variant = "primary",
  noPadding = false,
}: ModalProps) {
  const modalRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!show) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [show]);

  React.useEffect(() => {
    if (!show) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onHide?.();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [show, onHide]);

  React.useEffect(() => {
    if (!show) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onHide?.();
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 grid max-h-full w-full place-items-center overflow-y-auto overflow-x-hidden bg-black/40 px-3 py-3 sm:px-6 sm:py-6">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className={cx(
          "relative max-h-full w-full overflow-hidden rounded-xl border border-border bg-surface shadow-lg",
          maxWidth
        )}
      >
        {(title || (closeButton && onHide)) && (
          <div
            className={cx(
              "flex flex-nowrap items-center justify-between rounded-t-xl p-3 md:p-4",
              !noPadding && "border-b border-border",
              headerVariants[variant]
            )}
          >
            {title ? (
              <h3 className="text-xl font-semibold">
                {!loading && title}
              </h3>
            ) : (
              <div />
            )}

            {closeButton && onHide ? (
              <button
                type="button"
                aria-label="Cerrar modal"
                className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors duration-300 hover:bg-black/15"
                onClick={onHide}
              >
                <span className="text-xl leading-none">×</span>
              </button>
            ) : null}
          </div>
        )}

        <div
          className={cx(
            "bg-surface",
            !noPadding && "px-4 py-6 sm:px-5 md:px-6"
          )}
        >
          {children}
        </div>

        {footer ? (
          <div className="border-t border-border bg-surface px-4 py-4 sm:px-5 md:px-6">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}