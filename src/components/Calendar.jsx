import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay
} from "date-fns";

import Day from "./Day";
import CalendarHeader from "./CalendarHeader";

function Calendar({
  currentMonth,
  prevMonth,
  nextMonth,
  startDate,
  endDate,
  handleDateClick
}) {

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const days = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  const startDayIndex = getDay(monthStart);

  const isInRange = (day) =>
    startDate && endDate && day >= startDate && day <= endDate;

  const isStart = (day) => day === startDate;
  const isEnd = (day) => day === endDate;

  // ✅ Today logic
  const today = new Date();

  const isToday = (day) =>
    day === today.getDate() &&
    currentMonth.getMonth() === today.getMonth() &&
    currentMonth.getFullYear() === today.getFullYear();

  return (
    <div className="bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-md border border-gray-200">

      <CalendarHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-center font-semibold">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2">

        {/* Empty spaces */}
        {Array.from({ length: startDayIndex }).map((_, i) => (
          <div key={i}></div>
        ))}

        {/* Days */}
        {days.map((date, i) => {
          const day = Number(format(date, "d"));

          return (
            <Day
              key={i}
              day={day}
              onClick={handleDateClick}
              isStart={isStart(day)}
              isEnd={isEnd(day)}
              isInRange={isInRange(day)}
              isToday={isToday(day)}   // 👈 important
            />
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;