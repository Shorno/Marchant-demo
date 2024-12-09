import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface TimeSlot {
  time: string;
  selected: boolean;
}

interface TimeSlotSelectorProps {
  name: string; 
  mealTime: string;
  timeSlots: TimeSlot[];
}

const FromTimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  name,
  mealTime,
  timeSlots,
}) => {
  const { control, setValue } = useFormContext();

  const toggleTimeSlot = (index: number) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index].selected = !updatedTimeSlots[index].selected;
    setValue(name, updatedTimeSlots); 
  };

  return (
    <div className="meal-section">
      <h2 className="meal-title">
        {mealTime} Time<span className="required">*</span>
      </h2>
      <div className="time-slots">
        <Controller
          name={name}
          control={control}
          defaultValue={timeSlots}
          render={({ field }) => (
            <>
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`time-slot ${slot.selected ? "selected" : ""}`}
                  onClick={() => toggleTimeSlot(index)}
                >
                  {slot.time}
                </button>
              ))}
            </>
          )}
        />
      </div>
    </div>
  );
};

export default FromTimeSlotSelector;
