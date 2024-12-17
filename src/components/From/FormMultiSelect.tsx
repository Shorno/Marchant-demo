import { Select } from "antd";
import { useFormContext, Controller, RegisterOptions } from "react-hook-form";


interface IFormMultiSelect {
  name: string;
  label?: string;
  size?: "large" | "small";
  id?: string;
  placeholder?: string;
  validation?: RegisterOptions;
  required?: boolean;
  options: { label: string; value: string }[]; // Options for the dropdown
}

const FormMultiSelect = ({
  name,
  label,
  size = "large",
  id,
  placeholder,
  validation,
  required,
  options,
}: IFormMultiSelect) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div style={{ marginBottom: "1rem" }}>
      {label && (
        <label htmlFor={id || name}>
          {required && <span style={{ color: "red" }}>*</span>} {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={validation}
        render={({ field }) => (
          <Select
            id={id}
            size={size}
            mode="multiple"
            placeholder={placeholder}
            {...field}
            onChange={(value) => {
              field.onChange(value);
            }}
            options={options}
          />
        )}
      />
      {errorMessage && (
        <small style={{ color: "red", display: "block" }}>{errorMessage}</small>
      )}
    </div>
  );
};

export default FormMultiSelect;
