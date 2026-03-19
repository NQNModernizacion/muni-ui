import Select, { type GroupBase } from "react-select";

export type RSOption = { label: string; value: string | number };

export type SelectSearchProps = {
  id: string;
  options: RSOption[];
  isMulti?: boolean;

  value?: RSOption | RSOption[] | null;
  defaultValue?: RSOption | RSOption[] | null;

  onChange?: (value: RSOption | RSOption[] | null) => void;

  disabled?: boolean;
  loading?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;

  invalidMsg?: string;
};

export default function SelectSearch({
  id,
  options,
  isMulti,
  value,
  defaultValue,
  onChange,
  disabled,
  loading,
  isClearable = true,
  isSearchable = true,
  invalidMsg,
}: SelectSearchProps) {
  const selectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: 40,
      borderRadius: 12,
      backgroundColor: "rgb(var(--mx-surface))",
      borderColor: state.isFocused
        ? "rgb(var(--mx-primary-400))"
        : "rgb(var(--mx-border))",
      borderWidth: 1,
      boxShadow: state.isFocused
        ? "0 0 0 3px rgba(var(--mx-primary-400), 0.25)"
        : "none",
    }),
    valueContainer: (base: any) => ({ ...base, paddingLeft: 12, paddingRight: 12 }),
    placeholder: (base: any) => ({ ...base, color: "rgba(var(--mx-text), 0.6)" }),
    singleValue: (base: any) => ({ ...base, color: "rgb(var(--mx-text))" }),
    indicatorSeparator: (base: any) => ({ ...base, backgroundColor: "rgb(var(--mx-border))" }),
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
    <div className="mx-stack" style={{ gap: ".25rem" }}>
      <Select<RSOption, boolean, GroupBase<RSOption>>
        inputId={id}
        name={id}
        isMulti={!!isMulti}
        isSearchable={isSearchable}
        isLoading={loading}
        isDisabled={disabled || loading}
        isClearable={isClearable}
        defaultValue={defaultValue as any}
        value={value as any}
        options={options}
        onChange={(sel) => onChange?.(sel as any)}
        styles={selectStyles as any}
        theme={selectTheme}
      />

      {invalidMsg ? <div className="mx-error">{invalidMsg}</div> : null}
    </div>
  );
}
