import { format } from "date-fns";

function CalendarHeader({ currentMonth, prevMonth, nextMonth }) {
  return (
    <div className="flex justify-between items-center mb-3">
      <button onClick={prevMonth} className="px-3 py-1 bg-gray-300 rounded">
        ←Prev
      </button>

      <h2 className="text-xl font-semibold">
        {format(currentMonth, "MMMM yyyy")}
      </h2>

      <button onClick={nextMonth} className="px-3 py-1 bg-gray-300 rounded">
        Next→
      </button>
    </div>
  );
}

export default CalendarHeader;