import * as React from "react";

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  /** Cierra al clickear el overlay */
  closeOnOverlayClick?: boolean;

  /** Cierra con Escape */
  closeOnEsc?: boolean;

  /** Tamaños comunes */
  size?: "sm" | "md" | "lg";

  children: React.ReactNode;
};

const sizes: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
};

export default function Modal({
  open,
  onOpenChange,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  size = "md",
  children,
}: ModalProps) {
  React.useEffect(() => {
    if (!open || !closeOnEsc) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeOnEsc, onOpenChange]);

  React.useEffect(() => {
    if (!open) return;
    // Bloqueo scroll de fondo (simple)
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Cerrar modal"
        className="absolute inset-0 bg-black/40"
        onClick={() => closeOnOverlayClick && onOpenChange(false)}
      />

      {/* Panel */}
      <div className="relative flex min-h-full items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          className={[
            "w-full",
            sizes[size],
            "rounded-2xl border border-border bg-surface shadow-lg",
            "overflow-hidden",
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
