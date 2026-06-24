import { useEffect, useRef, type FC } from "react";
import {
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";
import FileInputBase, { type FileValue } from "./FileInputBase";

type FilePreview = {
  name: string;
  url: string;
};

interface RHFFileInputProps {
  type?: "file";
  campo: string;

  register?: UseFormRegister<any> | null;
  setValue?: UseFormSetValue<any> | null;
  watch?: UseFormWatch<any>;

  accept?: string;
  multiple?: boolean | null;
  proyect?: string | null;
  setPreviews?: ((previews: FilePreview[]) => void) | null;

  label?: string;
  placeholder?: string;
  errors?: FieldErrors;
  className?: string;
  disabled?: boolean;

  hideError?: boolean;
  showList?: boolean;
  preview?: boolean;
  previewHeight?: number;
  inputSize?: "sm" | "md" | "lg";
  compact?: boolean;

  helperText?: React.ReactNode;
  description?: React.ReactNode;
}

const RHFFileInput: FC<RHFFileInputProps> = ({
  campo,
  register,
  setValue,
  watch,

  accept = "image/* ,application/pdf",
  multiple = null,
  proyect = null,
  setPreviews = null,

  label,
  placeholder,
  errors,
  className,
  disabled,
  hideError = false,
  showList = true,
  preview = true,
  previewHeight = 220,
  inputSize = "md",
  compact,
  helperText,
  description,
}) => {
  const registered = register ? register(campo) : undefined;
  const value = watch ? watch(campo) : null;
  const previewUrlsRef = useRef<string[]>([]);

  const errorMessage = errors?.[campo]?.message
    ? String(errors[campo]?.message)
    : undefined;

  useEffect(() => {
    return () => {
      for (const url of previewUrlsRef.current) {
        URL.revokeObjectURL(url);
      }
      previewUrlsRef.current = [];
    };
  }, []);

  const handleValueChange = (nextValue: FileValue) => {
    const files = !nextValue
      ? []
      : Array.isArray(nextValue)
        ? nextValue
        : [nextValue];

    if (setPreviews) {
      for (const url of previewUrlsRef.current) {
        URL.revokeObjectURL(url);
      }

      const previews = files.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));

      previewUrlsRef.current = previews.map((preview) => preview.url);

      setPreviews(previews);
    }

    setValue?.(campo, files, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <FileInputBase
      name={campo}
      label={label}
      description={description}
      helperText={helperText}
      placeholder={placeholder}
      accept={accept}
      multiple={Boolean(multiple)}
      disabled={disabled}
      containerClassName={className}
      value={(value ?? null) as FileValue}
      onValueChange={handleValueChange}
      errorText={!hideError ? errorMessage : undefined}
      showList={showList}
      preview={preview}
      previewHeight={previewHeight}
      inputSize={inputSize}
      compact={compact ?? proyect === "arbolado"}
      inputProps={{
        onBlur: registered?.onBlur,
        ref: registered?.ref,
      }}
    />
  );
};

export default RHFFileInput;
