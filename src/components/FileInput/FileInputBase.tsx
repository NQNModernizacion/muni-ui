// import * as React from "react";
// import Label from "../Label/Label";


// export type FileValue = File | File[] | null;

// export type FileInputBaseProps = {
//   label?: React.ReactNode;
//   description?: React.ReactNode;
//   helperText?: React.ReactNode;

//   value?: FileValue;
//   onValueChange?: (value: FileValue) => void;

//   accept?: string | string[];
//   multiple?: boolean;
//   disabled?: boolean;
//   name?: string;
//   id?: string;

//   errorText?: string;

//   containerClassName?: string;
//   labelClassName?: string;

//   showList?: boolean;

//   preview?: boolean;
//   previewHeight?: number;
//   textMaxChars?: number;
// };

// function cx(...classes: Array<string | false | null | undefined>) {
//   return classes.filter(Boolean).join(" ");
// }

// type PreviewKind = "image" | "pdf" | "text" | "none";

// function getPreviewKind(file: File): PreviewKind {
//   const t = (file.type || "").toLowerCase();
//   const n = (file.name || "").toLowerCase();

//   if (t.startsWith("image/")) return "image";
//   if (t === "application/pdf" || n.endsWith(".pdf")) return "pdf";
//   if (t.startsWith("text/") || n.endsWith(".txt") || n.endsWith(".csv")) return "text";
//   return "none";
// }

// async function readTextPreview(file: File, maxChars = 2000) {
//   const text = await file.text();
//   return text.length <= maxChars ? text : text.slice(0, maxChars) + "…";
// }

// export default function FileInputBase({
//   label,
//   description,
//   helperText,
//   value = null,
//   onValueChange,
//   accept,
//   multiple,
//   disabled,
//   name,
//   id,
//   errorText,
//   containerClassName,
//   labelClassName,
//   showList = true,
//   preview = true,
//   previewHeight = 220,
//   textMaxChars = 2000,
// }: FileInputBaseProps) {
//   const reactId = React.useId();
//   const inputId = id ?? (name ? `file-${name}` : `file-${reactId}`);

//   const inputRef = React.useRef<HTMLInputElement | null>(null);

//   const filesArray: File[] = React.useMemo(() => {
//     if (!value) return [];
//     if (Array.isArray(value)) return multiple ? value : value.slice(0, 1);
//     return [value];
//   }, [value, multiple]);

//   const firstFile = filesArray[0] ?? null;

//   const [previewKind, setPreviewKind] = React.useState<PreviewKind>("none");
//   const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
//   const [previewText, setPreviewText] = React.useState<string>("");
//   const [previewErr, setPreviewErr] = React.useState<string | null>(null);

//   React.useEffect(() => {
//     let alive = true;
//     let objectUrl: string | null = null;

//     async function run() {
//       setPreviewErr(null);
//       setPreviewText("");
//       setPreviewUrl(null);
//       setPreviewKind("none");

//       if (!preview || !firstFile) return;

//       const kind = getPreviewKind(firstFile);
//       setPreviewKind(kind);

//       try {
//         if (kind === "image" || kind === "pdf") {
//           objectUrl = URL.createObjectURL(firstFile);
//           if (!alive) return;
//           setPreviewUrl(objectUrl);
//           return;
//         }

//         if (kind === "text") {
//           const text = await readTextPreview(firstFile, textMaxChars);
//           if (!alive) return;
//           setPreviewText(text);
//           return;
//         }
//       } catch (e: any) {
//         if (!alive) return;
//         setPreviewErr(e?.message ?? "No se pudo previsualizar el archivo.");
//       }
//     }

//     run();

//     return () => {
//       alive = false;
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [firstFile, preview, textMaxChars]);

//   const acceptAttr = Array.isArray(accept) ? accept.join(",") : accept;

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const fl = e.target.files;
//     if (!fl || fl.length === 0) {
//       onValueChange?.(null);
//       return;
//     }
//     const next: FileValue = multiple ? Array.from(fl) : fl[0];
//     onValueChange?.(next);
//   };

//   const clear = () => {
//     if (inputRef.current) inputRef.current.value = "";
//     onValueChange?.(null);
//   };

//   return (
//     <div className={cx("mx-ui", containerClassName ?? "mx-stack")}>
//       {label ? (
//         <Label label={label} name={name} className={labelClassName} />
//           {label}
//         </Label>
//       ) : null}

//       {description ? <div className="mx-text-sm mx-muted">{description}</div> : null}

//       <div className="mx-surface mx-surface-pad">
//         <div className="mx-row-between">
//           <input
//             ref={inputRef}
//             id={inputId}
//             name={name}
//             type="file"
//             disabled={disabled}
//             multiple={multiple}
//             accept={acceptAttr}
//             onChange={onChange}
//             className={cx("mx-file-input", disabled && "mx-disabled")}
//           />

//           {filesArray.length > 0 ? (
//             <button type="button" onClick={clear} className="mx-btn">
//               Quitar
//             </button>
//           ) : null}
//         </div>

//         {showList && filesArray.length > 0 ? (
//           <div className="mx-stack" style={{ marginTop: ".75rem" }}>
//             {filesArray.map((f) => (
//               <div key={`${f.name}-${f.size}-${f.lastModified}`} className="mx-text-sm mx-muted">
//                 {f.name}{" "}
//                 <span style={{ opacity: 0.7 }}>({Math.ceil(f.size / 1024)} KB)</span>
//               </div>
//             ))}
//           </div>
//         ) : null}

//         {helperText ? (
//           <div className="mx-text-xs mx-muted" style={{ marginTop: ".75rem" }}>
//             {helperText}
//           </div>
//         ) : null}
//         {errorText ? <div className="mx-error">{errorText}</div> : null}
//       </div>

//       {preview && firstFile ? (
//   <div className="mx-surface mx-surface-pad" style={{ marginTop: ".75rem" }}>
//     <div className="mx-row-between" style={{ alignItems: "center", marginBottom: ".5rem" }}>
//       <div className="mx-text-sm mx-font-semibold">Vista previa</div>
//       <div className="mx-text-xs mx-muted">
//         {firstFile.type || "sin tipo"} · {Math.ceil(firstFile.size / 1024)} KB
//       </div>
//     </div>

//     {previewErr ? (
//       <div className="mx-error">{previewErr}</div>
//     ) : previewKind === "image" && previewUrl ? (
//       <img
//         src={previewUrl}
//         alt={firstFile.name}
//         style={{
//           width: "100%",
//           height: previewHeight,
//           objectFit: "contain",
//           borderRadius: ".75rem",
//           background: "rgb(var(--mx-bg))",
//           border: "1px solid rgb(var(--mx-border))",
//         }}
//       />
//     ) : previewKind === "pdf" && previewUrl ? (
//       <iframe
//         title={`preview-${firstFile.name}`}
//         src={previewUrl}
//         style={{
//           width: "100%",
//           height: previewHeight,
//           border: "1px solid rgb(var(--mx-border))",
//           borderRadius: ".75rem",
//           background: "rgb(var(--mx-surface))",
//         }}
//       />
//     ) : previewKind === "text" ? (
//       <pre
//         style={{
//           height: previewHeight,
//           overflow: "auto",
//           background: "rgb(var(--mx-bg))",
//           border: "1px solid rgb(var(--mx-border))",
//           borderRadius: ".75rem",
//           padding: ".75rem",
//           whiteSpace: "pre-wrap",
//           fontSize: ".75rem",
//           lineHeight: "1rem",
//           color: "rgb(var(--mx-text))",
//         }}
//       >
//         {previewText || "Cargando..."}
//       </pre>
//     ) : (
//       // ✅ fallback para cualquier tipo: al menos “se muestra el archivo”
//       <div
//         className="mx-surface-pad"
//         style={{
//           background: "rgb(var(--mx-bg))",
//           border: "1px dashed rgb(var(--mx-border))",
//           borderRadius: ".75rem",
//         }}
//       >
//         <div className="mx-text-sm mx-font-semibold">{firstFile.name}</div>
//         <div className="mx-text-xs mx-muted" style={{ marginTop: ".25rem" }}>
//           No hay vista previa para este tipo de archivo.
//         </div>
//       </div>
//     )}
//   </div>
// ) : null}
//     </div>
//   );
// }
import * as React from "react";
import Label from "../Label/Label";

export type FileValue = File | File[] | null;

export type FileInputBaseProps = {
  label?: React.ReactNode;
  description?: React.ReactNode;
  helperText?: React.ReactNode;

  value?: FileValue;
  onValueChange?: (value: FileValue) => void;

  accept?: string | string[];
  multiple?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;

  errorText?: string;

  containerClassName?: string;
  labelClassName?: string;

  showList?: boolean;

  preview?: boolean;
  previewHeight?: number;
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
  if (t.startsWith("text/") || n.endsWith(".txt") || n.endsWith(".csv")) {
    return "text";
  }
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
  const reactId = React.useId();
  const inputId = id ?? (name ? `input-${name}` : `input-file-${reactId}`);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const filesArray: File[] = React.useMemo(() => {
    if (!value) return [];
    if (Array.isArray(value)) return multiple ? value : value.slice(0, 1);
    return [value];
  }, [value, multiple]);

  const firstFile = filesArray[0] ?? null;

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

  const clear = () => {
    if (inputRef.current) inputRef.current.value = "";
    onValueChange?.(null);
  };

  return (
    <div className={cx("mx-ui", containerClassName ?? "mx-stack")}>
      {label ? (
        <Label
          label={label}
          name={name ?? inputId.replace(/^input-/, "")}
          className={labelClassName}
        />
      ) : null}

      {description ? <div className="mx-text-sm mx-muted">{description}</div> : null}

      <div className="mx-surface mx-surface-pad">
        <div className="mx-row-between">
          <input
            ref={inputRef}
            id={inputId}
            name={name}
            type="file"
            disabled={disabled}
            multiple={multiple}
            accept={acceptAttr}
            onChange={onChange}
            className={cx("mx-file-input", disabled && "mx-disabled")}
          />

          {filesArray.length > 0 ? (
            <button type="button" onClick={clear} className="mx-btn">
              Quitar
            </button>
          ) : null}
        </div>

        {showList && filesArray.length > 0 ? (
          <div className="mx-stack" style={{ marginTop: ".75rem" }}>
            {filesArray.map((f) => (
              <div
                key={`${f.name}-${f.size}-${f.lastModified}`}
                className="mx-text-sm mx-muted"
              >
                {f.name}{" "}
                <span style={{ opacity: 0.7 }}>
                  ({Math.ceil(f.size / 1024)} KB)
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {helperText ? (
          <div className="mx-text-xs mx-muted" style={{ marginTop: ".75rem" }}>
            {helperText}
          </div>
        ) : null}

        {errorText ? <div className="mx-error">{errorText}</div> : null}
      </div>

      {preview && firstFile ? (
        <div className="mx-surface mx-surface-pad" style={{ marginTop: ".75rem" }}>
          <div
            className="mx-row-between"
            style={{ alignItems: "center", marginBottom: ".5rem" }}
          >
            <div className="mx-text-sm mx-font-semibold">Vista previa</div>
            <div className="mx-text-xs mx-muted">
              {firstFile.type || "sin tipo"} · {Math.ceil(firstFile.size / 1024)} KB
            </div>
          </div>

          {previewErr ? (
            <div className="mx-error">{previewErr}</div>
          ) : previewKind === "image" && previewUrl ? (
            <img
              src={previewUrl}
              alt={firstFile.name}
              style={{
                width: "100%",
                height: previewHeight,
                objectFit: "contain",
                borderRadius: ".75rem",
                background: "rgb(var(--mx-bg))",
                border: "1px solid rgb(var(--mx-border))",
              }}
            />
          ) : previewKind === "pdf" && previewUrl ? (
            <iframe
              title={`preview-${firstFile.name}`}
              src={previewUrl}
              style={{
                width: "100%",
                height: previewHeight,
                border: "1px solid rgb(var(--mx-border))",
                borderRadius: ".75rem",
                background: "rgb(var(--mx-surface))",
              }}
            />
          ) : previewKind === "text" ? (
            <pre
              style={{
                height: previewHeight,
                overflow: "auto",
                background: "rgb(var(--mx-bg))",
                border: "1px solid rgb(var(--mx-border))",
                borderRadius: ".75rem",
                padding: ".75rem",
                whiteSpace: "pre-wrap",
                fontSize: ".75rem",
                lineHeight: "1rem",
                color: "rgb(var(--mx-text))",
              }}
            >
              {previewText || "Cargando..."}
            </pre>
          ) : (
            <div
              className="mx-surface-pad"
              style={{
                background: "rgb(var(--mx-bg))",
                border: "1px dashed rgb(var(--mx-border))",
                borderRadius: ".75rem",
              }}
            >
              <div className="mx-text-sm mx-font-semibold">{firstFile.name}</div>
              <div className="mx-text-xs mx-muted" style={{ marginTop: ".25rem" }}>
                No hay vista previa para este tipo de archivo.
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}