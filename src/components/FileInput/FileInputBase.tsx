import * as React from "react";
import Label from "../Label/Label";

export type FileValue = File | File[] | null;

export type FileInputBaseProps = {
  label?: React.ReactNode;
  description?: React.ReactNode;
  helperText?: React.ReactNode;

  /** valor controlado */
  value?: FileValue;

  /** callback controlado */
  onValueChange?: (value: FileValue) => void;

  /** input props */
  accept?: string | string[];
  multiple?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;

  /** estados */
  errorText?: string;

  /** UI */
  containerClassName?: string;
  labelClassName?: string;

  /** lista de archivos (default true) */
  showList?: boolean;

  /** PREVIEW */
  preview?: boolean; // default true
  previewHeight?: number; // px
  textMaxChars?: number;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type PreviewKind = "image" | "pdf" | "text" | "none";

function getPreviewKind(file: File): PreviewKind {
  const t = (file.type || "").toLowerCase();
  const n = (file.name || "").toLowerCase();

  if (t.startsWith("image/")) return "image";
  if (t === "application/pdf" || n.endsWith(".pdf")) return "pdf";
  if (t.startsWith("text/") || n.endsWith(".txt") || n.endsWith(".csv")) return "text";

  return "none";
}

async function readTextPreview(file: File, maxChars = 2000) {
  const text = await file.text();
  return text.length <= maxChars ? text : text.slice(0, maxChars) + "…";
}

export default function FileInputBase({
  label,
  description,
  helperText,
  value = null,
  onValueChange,
  accept,
  multiple,
  disabled,
  name,
  id,
  errorText,
  containerClassName,
  labelClassName,
  showList = true,

  preview = true,
  previewHeight = 220,
  textMaxChars = 2000,
}: FileInputBaseProps) {
  const inputId = id ?? (name ? `file-${name}` : "file-input");

  const filesArray: File[] = React.useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const firstFile = filesArray[0] ?? null;

  // ---------- PREVIEW STATE ----------
  const [previewKind, setPreviewKind] = React.useState<PreviewKind>("none");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [previewText, setPreviewText] = React.useState<string>("");
  const [previewErr, setPreviewErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    let alive = true;
    let objectUrl: string | null = null;

    async function run() {
      setPreviewErr(null);
      setPreviewText("");
      setPreviewUrl(null);
      setPreviewKind("none");

      if (!preview || !firstFile) return;

      const kind = getPreviewKind(firstFile);
      setPreviewKind(kind);

      try {
        if (kind === "image" || kind === "pdf") {
          objectUrl = URL.createObjectURL(firstFile);
          if (!alive) return;
          setPreviewUrl(objectUrl);
          return;
        }

        if (kind === "text") {
          const text = await readTextPreview(firstFile, textMaxChars);
          if (!alive) return;
          setPreviewText(text);
          return;
        }
      } catch (e: any) {
        if (!alive) return;
        setPreviewErr(e?.message ?? "No se pudo previsualizar el archivo.");
      }
    }

    run();

    return () => {
      alive = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [firstFile, preview, textMaxChars]);

  // ---------- HANDLERS ----------
  const acceptAttr = Array.isArray(accept) ? accept.join(",") : accept;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fl = e.target.files;
    if (!fl || fl.length === 0) {
      onValueChange?.(null);
      return;
    }
    const next: FileValue = multiple ? Array.from(fl) : fl[0];
    onValueChange?.(next);
  };

  const clear = () => onValueChange?.(null);

  // ---------- UI ----------
  return (
    <div className={containerClassName ?? "space-y-2"}>
      {label ? (
        <Label htmlFor={inputId} className={labelClassName}>
          {label}
        </Label>
      ) : null}

      {description ? <div className="text-sm text-muted">{description}</div> : null}

      <div className="rounded-2xl border border-border bg-surface p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            id={inputId}
            name={name}
            type="file"
            disabled={disabled}
            multiple={multiple}
            accept={acceptAttr}
            onChange={onChange}
            className={cx(
              "block w-full text-sm text-text file:mr-4 file:rounded-xl file:border-0 file:px-4 file:py-2",
              "file:bg-primary-400 file:text-white file:font-semibold hover:file:bg-primary-500",
              disabled && "opacity-60"
            )}
          />

          {filesArray.length > 0 ? (
            <button
              type="button"
              onClick={clear}
              className={cx(
                "rounded-xl border border-border bg-bg px-3 py-2 text-sm font-semibold text-text",
                "hover:bg-surface"
              )}
            >
              Quitar
            </button>
          ) : null}
        </div>

        {showList && filesArray.length > 0 ? (
          <div className="mt-3 space-y-1">
            {filesArray.map((f) => (
              <div key={f.name + f.size} className="text-sm text-muted">
                {f.name} <span className="text-muted/70">({Math.ceil(f.size / 1024)} KB)</span>
              </div>
            ))}
          </div>
        ) : null}

        {helperText ? <div className="mt-3 text-xs text-muted">{helperText}</div> : null}

        {errorText ? <div className="mt-2 text-xs text-danger-700">{errorText}</div> : null}
      </div>

      {/* PREVIEW INLINE */}
      {preview && firstFile ? (
        <div className="rounded-2xl border border-border bg-surface p-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-primary-700">Previsualización</div>

            {previewUrl ? (
              <a
                className="text-sm font-semibold text-primary-700 hover:underline"
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
              >
                Abrir
              </a>
            ) : null}
          </div>

          {previewErr ? (
            <div className="text-sm text-danger-700">{previewErr}</div>
          ) : previewKind === "image" && previewUrl ? (
            <div
              className="overflow-hidden rounded-xl border border-border bg-bg"
              style={{ height: previewHeight }}
            >
              <img src={previewUrl} alt={firstFile.name} className="h-full w-full object-contain" />
            </div>
          ) : previewKind === "pdf" && previewUrl ? (
            <div
              className="overflow-hidden rounded-xl border border-border bg-bg"
              style={{ height: previewHeight }}
            >
              <iframe title={`pdf-${firstFile.name}`} src={previewUrl} className="h-full w-full" />
            </div>
          ) : previewKind === "text" ? (
            <pre
              className="max-w-full overflow-auto rounded-xl border border-border bg-bg p-3 text-xs text-text"
              style={{ maxHeight: previewHeight }}
            >
              {previewText}
            </pre>
          ) : (
            <div className="text-sm text-muted">
              No hay previsualización disponible para este tipo de archivo.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
