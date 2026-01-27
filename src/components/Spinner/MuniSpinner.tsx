import * as React from "react";

export type MuniSpinnerProps = {
  size?: number;     // diámetro del spinner
  stroke?: number;   // grosor del borde
  text?: string;
};

export default function MuniSpinner({
  size = 48,
  stroke = 4,
  text,
}: MuniSpinnerProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {text && (
        <span className="text-sm font-medium text-primary-700">
          {text}
        </span>
      )}

      <span
        className="animate-spin rounded-full
                   border-border border-t-primary-400"
        style={{
          width: size,
          height: size,
          borderWidth: stroke,
        }}
      />
    </div>
  );
}
