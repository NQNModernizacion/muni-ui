import * as React from "react";
import MuniSpinner from "./MuniSpinner";

type FullscreenLoaderProps = {
  open: boolean;
  text?: string;
};

export default function FullscreenLoader({
  open,
  text = "Cargando...",
}: FullscreenLoaderProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999]
                 bg-white/70 backdrop-blur-sm
                 flex items-center justify-center"
    >
      <MuniSpinner size={56} text={text} />
    </div>
  );
}
