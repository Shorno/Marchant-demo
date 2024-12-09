/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from "antd";
import { useFormContext, Controller, ValidationRule, RegisterOptions, FieldError } from "react-hook-form";
export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  validation?: ValidationRule | Record<string, ValidationRule>;
  defaultValue?: SelectOptions;
  handleChange?: (el: string) => void;
  showSearch?: boolean;
  filterOption?: (input: string, option: any) => boolean;
};

const FormSelectField = ({
  name,
  size = "large",
  placeholder = "select",
  options,
  label,
  defaultValue,
  validation,
  handleChange,
  showSearch,
  filterOption,
}: SelectFieldProps) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div style={{ marginBottom: "1rem" }}>
      {label && <label>{label}</label>}
      <Controller
        control={control}
        name={name}
        rules={validation as RegisterOptions}
        defaultValue={defaultValue ? defaultValue.value : undefined} 
        render={({ field: { value, onChange } }) => (
          <Select
            value={value}
            onChange={(val) => {
              onChange(val); 
              if (handleChange) handleChange(val); 
            }}
            size={size}
            options={options}
            placeholder={placeholder}
            showSearch={showSearch}
            filterOption={filterOption}
            style={{ width: "100%" }}
          />
        )}
      />
      {/* Show error message if validation fails */}
      {errors[name] && (
        <small style={{ color: "red" }}>
          {(errors[name] as FieldError)?.message}
        </small>
      )}

    </div>
  );
};

export default FormSelectField;
