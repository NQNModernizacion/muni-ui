
// import { Controller } from "react-hook-form";
// import Label from "../Label/Label";
// import SelectSearch from "./SelectSearch";

// export function RHFSelectSearch({
//   control,
//   name,
//   label,
//   options,
//   isMulti = false,
//   helperText,
//   hideError = false,
//   containerClassName,
//   labelClassName,
//   disabled,
//   loading,
// }: any) {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState }) => {
//         const errMsg = fieldState.error?.message;

//         return (
//           <div className={containerClassName ?? "mx-stack"}>
//             {label && (
//               <Label htmlFor={name} className={labelClassName}>
//                 {label}
//               </Label>
//             )}

//             <SelectSearch
//               id={name}
//               options={options}
//               isMulti={isMulti}
//               disabled={disabled}
//               loading={loading}
//               onChange={(sel: any) => {
//                 if (isMulti) {
//                   field.onChange(sel?.map((x: any) => x.value) ?? []);
//                 } else {
//                   field.onChange(sel?.value ?? "");
//                 }
//               }}
//             />

//             {helperText && (
//               <div className="mx-text-xs mx-muted">{helperText}</div>
//             )}

//             {!hideError && errMsg && (
//               <div className="mx-error">{String(errMsg)}</div>
//             )}
//           </div>
//         );
//       }}
//     />
//   );
// }
import { Controller, useController, type Control } from "react-hook-form";
import Select, { type GroupBase, type OptionsOrGroups } from "react-select";
import Label from "../Label/Label";

export type Option = {
  value: string | number;
  label: string;
};

export interface RHFSelectSearchProps {
  name: string;
  label?: React.ReactNode;
  control: Control<any>;
  options: OptionsOrGroups<Option, GroupBase<Option>>;
  isMulti?: boolean;
  smallText?: React.ReactNode;
  hideErrors?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export function RHFSelectSearch({
  name,
  label,
  smallText,
  hideErrors = false,
  control,
  options,
  isMulti = false,
  isDisabled,
  isLoading,
  ...props
}: RHFSelectSearchProps) {
  const {
    formState: { errors },
  } = useController({ name, control });

  const selectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: 40,
      borderRadius: 12,
      backgroundColor: "rgb(var(--mx-surface))",
      borderColor: state.isFocused
        ? "rgb(var(--mx-primary-400))"
        : errors[name]
          ? "rgb(var(--mx-danger-600))"
          : "rgb(var(--mx-border))",
      borderWidth: 1,
      boxShadow: state.isFocused
        ? "0 0 0 3px rgba(var(--mx-primary-400), 0.25)"
        : "none",
    }),
    valueContainer: (base: any) => ({
      ...base,
      paddingLeft: 12,
      paddingRight: 12,
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "rgba(var(--mx-text), 0.6)",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "rgb(var(--mx-text))",
    }),
    indicatorSeparator: (base: any) => ({
      ...base,
      backgroundColor: "rgb(var(--mx-border))",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "rgb(var(--mx-primary-600))"
        : state.isFocused
          ? "rgba(var(--mx-primary-400), 0.12)"
          : "rgb(var(--mx-surface))",
      color: state.isSelected ? "#fff" : "rgb(var(--mx-text))",
    }),
  };

  const selectTheme = (theme: any) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: "rgb(var(--mx-primary-400))",
      primary25: "rgba(var(--mx-primary-400), 0.12)",
      primary50: "rgba(var(--mx-primary-400), 0.18)",
      neutral20: "rgb(var(--mx-border))",
      neutral30: "rgb(var(--mx-border))",
      neutral80: "rgb(var(--mx-text))",
    },
  });

  return (
    <div>
      <Label label={label} name={name} />

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            inputId={`input-${name}`}
            options={options}
            isMulti={isMulti}
            isClearable
            isDisabled={isDisabled || isLoading}
            isLoading={isLoading}
            styles={selectStyles as any}
            theme={selectTheme}
            onChange={(selectedValue: any) => {
              const values = isMulti
                ? selectedValue?.map((option: any) => option.value) ?? []
                : selectedValue?.value ?? "";

              field.onChange(values);
            }}
            value={
              isMulti
                ? (options as any[]).filter((option: any) =>
                    field.value?.includes(option.value)
                  )
                : (options as any[]).find(
                    (option: any) => option.value === field.value
                  ) ?? null
            }
            {...props}
          />
        )}
      />

      {smallText ? <div className="mx-text-xs mx-muted">{smallText}</div> : null}

      {!hideErrors && errors[name]?.message ? (
        <div className="mx-error">{String(errors[name]?.message)}</div>
      ) : null}
    </div>
  );
}

export default RHFSelectSearch;