/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, DatePicker, Spin, Switch, message } from 'antd';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useGetOffTimeSlotQuery } from "../../../redux/api/TimeSlot/timeSlot";
import { useCreateHolidayMutation } from "../../../redux/api/Holiday/holiday";
import { RootState } from "../../../redux/store";
import "./TimeSlots.css";
import { toggleRefresh } from "../../../redux/slice/calendarSlice";


type TimeSlot = {
    [time: string]: boolean;
};

interface TimeData {
    is_full_day_off: boolean;
    is_morning_slot_off: boolean;
    is_lunch_slot_off: boolean;
    is_dinner_slot_off: boolean;
    morning: TimeSlot;
    lunch: TimeSlot;
    dinner: TimeSlot;
}

const TimeSlots = () => {
    const dispatch = useDispatch();
    const { selectedDate: selectedDateProp} = useSelector((state: RootState) => state.selectDate);
    const { data, isLoading: loading, refetch } = useGetOffTimeSlotQuery(selectedDateProp);
    const [timeData, setTimeData] = useState<TimeData | null>(null);
    const [updateTimeSlotOff, { isLoading: isSaving }] = useCreateHolidayMutation();
    const selectedDate = dayjs(selectedDateProp);
    const [fromDate, setFromDate] = useState<Dayjs | null>(null);
    const [toDate, setToDate] = useState<Dayjs | null>(null);

    useEffect(() => {
        if (data) {
            setTimeData(data);
        }
    }, [data]);

    const toggleSlotAvailability = (slotCategory: keyof TimeData, time: string) => {
        if (!timeData || timeData.is_full_day_off || timeData[`is_${slotCategory}_slot_off` as keyof TimeData]) return;

        setTimeData((prevData) => ({
            ...prevData!,
            [slotCategory]: {
                ...prevData![slotCategory as keyof Omit<TimeData, 'is_full_day_off' | 'is_morning_slot_off' | 'is_lunch_slot_off' | 'is_dinner_slot_off'>],
                [time]: !prevData![slotCategory as keyof Omit<TimeData, 'is_full_day_off' | 'is_morning_slot_off' | 'is_lunch_slot_off' | 'is_dinner_slot_off'>][time],
            },
        }));
    };

    const handleFullDayOffToggle = (checked: boolean) => {
        if (!timeData) return;

        setTimeData((prevData) => ({
            ...prevData!,
            is_full_day_off: checked,
            is_morning_slot_off: checked,
            is_lunch_slot_off: checked,
            is_dinner_slot_off: checked,
            morning: Object.keys(prevData!.morning).reduce(
                (acc, time) => ({ ...acc, [time]: !checked }),
                {}
            ),
            lunch: Object.keys(prevData!.lunch).reduce(
                (acc, time) => ({ ...acc, [time]: !checked }),
                {}
            ),
            dinner: Object.keys(prevData!.dinner).reduce(
                (acc, time) => ({ ...acc, [time]: !checked }),
                {}
            ),
        }));
    };

    const handleSlotToggle = (slot: keyof TimeData, checked: boolean) => {
        if (!timeData) return;

        setTimeData((prevData) => {
            const newData = {
                ...prevData!,
                [`is_${slot}_slot_off` as keyof TimeData]: checked,
                [slot]: Object.keys(prevData![slot as keyof Omit<TimeData, 'is_full_day_off' | 'is_morning_slot_off' | 'is_lunch_slot_off' | 'is_dinner_slot_off'>]).reduce(
                    (acc, time) => ({ ...acc, [time]: !checked }),
                    {}
                ),
            };

            const allSlotsOff = newData.is_morning_slot_off && newData.is_lunch_slot_off && newData.is_dinner_slot_off;
            return {
                ...newData,
                is_full_day_off: allSlotsOff,
            };
        });
    };

    const renderTimeSlots = (timeSlots: TimeSlot, slotCategory: keyof TimeData) => {
        if (!timeData) return null;

        const slotDisabled = timeData?.is_full_day_off || timeData[`is_${slotCategory}_slot_off` as keyof TimeData];

        return Object.entries(timeSlots).map(([time, available]) => (
            <Button
                size="large"
                key={time}
                onClick={() => toggleSlotAvailability(slotCategory, time)}
                style={{
                    color:
                        timeData?.is_full_day_off ||
                            (slotCategory === "morning" && timeData?.is_morning_slot_off) ||
                            (slotCategory === "lunch" && timeData?.is_lunch_slot_off) ||
                            (slotCategory === "dinner" && timeData?.is_dinner_slot_off)
                            ? "red"
                            : available
                                ? "green"
                                : "red",
                    margin: "2px",

                }}
                disabled={slotDisabled ? true : false}
            >
                {time}
            </Button>

        ));
    };
    const createPayload = () => {
        if (!timeData) return null;

        return {
            from_date: fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : dayjs(selectedDate).format('YYYY-MM-DD'),
            to_date: toDate ? dayjs(toDate).format('YYYY-MM-DD') : dayjs(selectedDate).format('YYYY-MM-DD'),
            is_full_day_off: timeData?.is_full_day_off,
            is_morning_slot_off: timeData?.is_morning_slot_off,
            is_lunch_slot_off: timeData?.is_lunch_slot_off,
            is_dinner_slot_off: timeData?.is_dinner_slot_off,
            morning_slots: Object.keys(timeData?.morning).filter((time) => !timeData.morning[time]),
            lunch_slots: Object.keys(timeData?.lunch).filter((time) => !timeData.lunch[time]),
            dinner_slots: Object.keys(timeData?.dinner).filter((time) => !timeData.dinner[time]),
        };
    };

    const handleSaveChanges = async () => {
        const payload = createPayload();
        if (!payload) return;

        try {
            await updateTimeSlotOff(payload).unwrap();
            message.success("Time slots updated successfully!");
            refetch();
            dispatch(toggleRefresh());

        } catch (error: any) {
            message.error("Failed to update time slots. Please try again.", error.message);
        }
    };

    if (loading || !timeData) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "50px" }}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </div>
        )
    }



    return (
        <div className="slot-container">
            <h1 className="title">Time Slots</h1>
            {/*full_day_off */}
            <div className="full_day">
                <div className="full_day_header">
                    <h2><CheckCircleOutlined className="icon" /> Full Day Off</h2>
                    <Switch
                        checked={timeData.is_full_day_off}
                        onChange={handleFullDayOffToggle}
                    />
                </div>
                <div className="date_picker">
                    <DatePicker
                        className="picker"
                        size="large"
                        value={fromDate || selectedDate}
                        onChange={(date) => setFromDate(date)}
                        placeholder="From Date"
                    />
                    <DatePicker
                        className="picker"
                        size="large"
                        value={toDate || selectedDate}
                        onChange={(date) => setToDate(date)}
                        placeholder="To Date"
                    />
                </div>
            </div>
            {/* Morning Slot Section */}
            <div className="slot">
                <div className="header">
                    <h2><CheckCircleOutlined className="icon" />Morning</h2>
                    <Switch
                        checked={timeData.is_morning_slot_off}
                        onChange={(checked) => handleSlotToggle("morning", checked)}
                    />
                </div>
                <div className="time_slot">{renderTimeSlots(timeData.morning, "morning")}</div>
            </div>
            {/* Lunch Slot Section */}
            <div className="slot">
                <div className="header">
                    <h2><CheckCircleOutlined className="icon" />lunch</h2>
                    <Switch
                        checked={timeData.is_lunch_slot_off}
                        onChange={(checked) => handleSlotToggle("lunch", checked)}
                    />
                </div>
                <div className="time_slot">{renderTimeSlots(timeData.lunch, "lunch")}</div>
            </div>
            {/* Dinner Slot Section */}
            <div className="slot">
                <div className="header">
                    <h2><CheckCircleOutlined className="icon" />Dinner</h2>
                    <Switch
                        checked={timeData.is_dinner_slot_off}
                        onChange={(checked) => handleSlotToggle("dinner", checked)}
                    />
                </div>
                <div className="time_slot">{renderTimeSlots(timeData.dinner, "dinner")}</div>
            </div>
            {/* Save Changes Button */}
            <div className="btn">
                <Button
                    onClick={handleSaveChanges}
                    className="custom-button"
                    loading={isSaving}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </div>

    );
};

export default TimeSlots;
