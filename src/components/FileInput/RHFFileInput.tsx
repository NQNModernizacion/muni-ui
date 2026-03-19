// import * as React from "react";
// import { useController, type Control } from "react-hook-form";
// import FileInputBase, { type FileInputBaseProps, type FileValue } from "./FileInputBase";

// export type RHFFileInputProps = Omit<FileInputBaseProps, "value" | "onValueChange"> & {
//   control: Control<any>;
//   name: string;
//   hideError?: boolean;
// };

// export default function RHFFileInput({
//   control,
//   name,
//   hideError = false,
//   ...props
// }: RHFFileInputProps) {
//   const {
//     field: { value, onChange },
//     fieldState: { error },
//   } = useController({ name, control });

//   return (
//     <FileInputBase
//       {...props}
//       name={name}
//       value={(value ?? null) as FileValue}
//       onValueChange={(v) => onChange(v)}
//       errorText={!hideError && error?.message ? String(error.message) : undefined}
//     />
//   );
// }
import { useController, type Control } from "react-hook-form";
import FileInputBase, { type FileInputBaseProps, type FileValue } from "./FileInputBase";

export type RHFFileInputProps = Omit<FileInputBaseProps, "value" | "onValueChange"> & {
  control: Control<any>;
  name: string;
  hideError?: boolean;
};

export default function RHFFileInput({
  control,
  name,
  hideError = false,
  ...props
}: RHFFileInputProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FileInputBase
      {...props}
      name={name}
      value={(value ?? null) as FileValue}
      onValueChange={(v) => onChange(v)}
      errorText={!hideError && error?.message ? String(error.message) : undefined}
    />
  );
}
