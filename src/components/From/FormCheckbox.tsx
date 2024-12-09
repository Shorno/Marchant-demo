import { Checkbox } from "antd";
import { useFormContext, Controller, RegisterOptions } from "react-hook-form";

interface ICheckbox {
  name: string;
  label?: string;
  validation?: RegisterOptions;
  required?: boolean;
}

const FormCheckbox = ({ name, label, validation, required }: ICheckbox) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Get error message for the specific field
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Controller
        control={control}
        name={name}
        rules={validation}
        render={({ field }) => (
          <Checkbox {...field} checked={field.value}>
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
