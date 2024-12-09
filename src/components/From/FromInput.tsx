import { Input } from "antd";
import { useFormContext, Controller, RegisterOptions } from "react-hook-form";
import { ValidationRule } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  id?: string;
  placeholder?: string;
  validation?: ValidationRule | Record<string, ValidationRule>;
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  name,
  type,
  size = "large",
  id,
  placeholder,
  label,
  required,
  validation,
  onChange,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Get error message for the specific field
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
        rules={validation as RegisterOptions}
        render={({ field }) => (
          <Input
            id={id}
            type={type}
            size={size}
            placeholder={placeholder}
            {...field}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) {
                onChange(e);
              }
            }}
          />
        )}
      />
      {errorMessage && (
        <small style={{ color: "red", display: "block" }}>{errorMessage}</small>
      )}
    </div>
  );
};

export default FormInput;
