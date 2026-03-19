import * as React from "react";
import { ButtonBase } from "../Button";

export type FormFooterProps = {
  children?: React.ReactNode;
  onCancel?: () => void;
  submitButtonText?: string;
  isSubmitting?: boolean;

  /** opcional: customizar labels sin reescribir */
  cancelText?: React.ReactNode;
  className?: string;

  /** opcional: props extra para botones */
  cancelButtonProps?: React.ComponentProps<typeof ButtonBase>;
  submitButtonProps?: React.ComponentProps<typeof ButtonBase>;
};

export default function FormFooter({
  children,
  onCancel,
  submitButtonText,
  isSubmitting,
  cancelText = "Cancelar",
  className,
  cancelButtonProps,
  submitButtonProps,
}: FormFooterProps) {
  return (
    <footer
      className={[
        "flex flex-row flex-wrap gap-3 justify-end pt-6",
        className ?? "",
      ].join(" ")}
    >
      {onCancel ? (
        <ButtonBase
          type="button"
          color="danger"
          variant="solid"
          onClick={onCancel}
          disabled={isSubmitting || cancelButtonProps?.disabled}
          {...cancelButtonProps}
        >
          {cancelText}
        </ButtonBase>
      ) : null}

      {children}

      {submitButtonText ? (
        <ButtonBase
          type="submit"
          color="primary"
          variant="solid"
          isLoading={isSubmitting}
          disabled={isSubmitting || submitButtonProps?.disabled}
          className={[
            "disabled:opacity-50 disabled:hover:opacity-50",
            submitButtonProps?.className ?? "",
          ].join(" ")}
          {...submitButtonProps}
        >
          {submitButtonText}
        </ButtonBase>
      ) : null}
    </footer>
  );
}
