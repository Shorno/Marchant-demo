/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, message, Steps } from "antd";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/local-storage";
import logo from '../../assets/ubaky_logo.png';
import './stepperFrom.css';

interface ISteps {
  title?: string;
  content?: React.ReactElement | React.ReactNode;
}

interface IStepsProps {
  steps: ISteps[];
  submitHandler: (el: any) => void;
  navigateLink?: string;
}

const StepperForm = ({ steps, submitHandler }: IStepsProps) => {
  const [current, setCurrent] = useState<number>(
    getFromLocalStorage("step")
      ? Number(JSON.parse(getFromLocalStorage("step") as string).step)
      : 0
  );

  useEffect(() => {
    setToLocalStorage("step", JSON.stringify({ step: current }));
  }, [current]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item, index) => ({
    key: index,
    title: item.title || `Step ${index + 1}`
  }));

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const handleStudentOnSubmit = (data: any) => {
    submitHandler(data);
    reset();
    setToLocalStorage("step", JSON.stringify({ step: 0 }));
  };

  return (
    <div className="stepper-form-container">
      <div className="steps">
        <img className="logo" src={logo} alt="logo" />
        <Steps direction="vertical" current={current} items={items} />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleStudentOnSubmit)} className="form-content">
          <div className="step-content">{steps[current].content}</div>
          <div className="form-buttons">
            <div className="btn">
              {current > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                  Previous
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => message.success("Processing complete!")}
                >
                  Done
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default StepperForm;
