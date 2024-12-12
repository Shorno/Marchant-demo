import React from "react";
import { Checkbox } from "antd";
import { useFormContext, Controller, RegisterOptions } from "react-hook-form";

interface ICheckbox {
  name: string;
  label?: string;
  validation?: RegisterOptions;
  required?: boolean;
  onChange?: () => void;
}

const FormCheckbox: React.FC<ICheckbox> = ({ name, label, validation, required, onChange }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Controller
        control={control}
        name={name}
        rules={validation}
        render={({ field }) => (
          <Checkbox
            {...field}
            checked={field.value}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) {
                onChange();
              }
            }}
          >
            {label && (
              <span>
                {required && <span style={{ color: "red" }}>*</span>} {label}
              </span>
            )}
          </Checkbox>
        )}
      />
      {errorMessage && (
        <small style={{ color: "red", display: "block" }}>{errorMessage}</small>
      )}
    </div>
  );
};

export default FormCheckbox;

