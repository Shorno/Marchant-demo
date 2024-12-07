import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { generateDate, months } from "../../../utils/calendar";
import cn from "../../../utils/cn";
import dayjs from "dayjs";
import { setSelectedDate } from "../../../redux/slice/calendarSlice";
import { useGetHolidayQuery } from "../../../redux/api/Holiday/holiday";
import { RootState } from "../../../redux/store";
import "./Calendar.css";

const CalendarPage = () => {
  const dispatch = useDispatch();
  const { selectedDate, refresh } = useSelector((state: RootState) => state.selectDate);
  const { data: holiday, refetch } = useGetHolidayQuery({});
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [hoverNext, setHoverNext] = useState(false);
  const [hoverPrevious, setHoverPrevious] = useState(false);

  useEffect(() => {
    refetch();
  }, [refresh, refetch]);

  return (
    <div className="container">
      {/* status */}
      <div className="legend-container">
        <div className="legend-item">
          <div className="legend-circle current-day"></div>
          <span className="legend-text">Current Day</span>
        </div>
        <div className="legend-item">
          <div className="legend-circle full-day-off"></div>
          <span className="legend-text">Full Day Off</span>
        </div>
        <div className="legend-item">
          <div className="legend-circle time-slots-off"></div>
          <span className="legend-text">Time Slots Off</span>
        </div>
      </div>
      {/* Header */}
      <div className="header">
        <div className="navigation">
          <GrFormPrevious
            className="icon"
            style={{ color: hoverPrevious ? "red" : "green" }}
            onClick={() => setToday(today.month(today.month() - 1))}
            onMouseEnter={() => setHoverPrevious(true)}
            onMouseLeave={() => setHoverPrevious(false)}
          />
          <div className="current-month">
            {months[today.month()]}, {today.year()}
          </div>
          <GrFormNext
            className="icon"
            style={{ color: hoverNext ? "red" : "green" }}
            onClick={() => setToday(today.month(today.month() + 1))}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
          />
        </div>
        <div
          className="today-button"
          onClick={() => {
            setToday(dayjs());
            dispatch(setSelectedDate(dayjs().format("YYYY-MM-DD")));
          }}
        >
          Today
        </div>
      </div>

      {/* Days Header */}
      <div className="days-header">
        {days.map((day, index) => (
          <div key={index} className="day">
            {day}
          </div>
        ))}
      </div>


      {/* Date Grid */}
      <div className="date-grid">
        {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => {
          const holidayOnDate = holiday?.find((h: { date: string }) => h.date === date.format("YYYY-MM-DD"));
          const isFullDayOff = holidayOnDate?.is_full_day_off === true;
          const hasSlotsData =
            holidayOnDate?.is_morning_slot_off ||
            holidayOnDate?.is_lunch_slot_off ||
            holidayOnDate?.is_dinner_slot_off ||
            holidayOnDate?.morning_slots.length > 0 ||
            holidayOnDate?.lunch_slots.length > 0 ||
            holidayOnDate?.dinner_slots.length > 0;

          return (
            <div key={index} className="date-cell">
              <div
                className={cn(
                  "date-circle",
                  today && "today",
                  selectedDate === date.format("YYYY-MM-DD") && "selected",
                  !currentMonth && "other-month",
                  isFullDayOff && "full-day-off"
                )}
                title={isFullDayOff ? "Full day off" : ""}
                onClick={() => {
                  dispatch(setSelectedDate(date.format("YYYY-MM-DD")));
                }}
                style={{
                  ...styles.dateCircle,
                  backgroundColor: today
                    ? "#581845"
                    : selectedDate === date.format('YYYY-MM-DD')
                      ? "black"
                      : isFullDayOff
                        ? "#FF5733"
                        : hasSlotsData
                          ? "#eec645"
                          : "transparent",
                  color:
                    today || selectedDate === date.format('YYYY-MM-DD') || isFullDayOff
                      ? "white"
                      : currentMonth
                        ? "black"
                        : "gray",
                }}
              >
                {date.date()}
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
};

export default CalendarPage;

const styles = {
  dateCircle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  } as const
}