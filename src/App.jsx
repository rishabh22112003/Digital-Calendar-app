import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import Notes from "./components/Notes";

function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleDateClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      // First click
      setStartDate(day);
      setEndDate(null);
    } else {
      // Second click → complete range
      if (day < startDate) {
        setEndDate(startDate);
        setStartDate(day);
      } else {
        setEndDate(day);
      }

      // Flip only after range selection
      if (!isMobile) setIsFlipped(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-3 md:p-4">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/40">

        {/* Hero */}
        <div className="h-40 md:h-56 relative">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xl md:text-3xl font-bold">
            {currentMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>

        {/* 📱 MOBILE */}
        {isMobile ? (
          <div className="p-3 space-y-4">
            <Calendar
              currentMonth={currentMonth}
              prevMonth={prevMonth}
              nextMonth={nextMonth}
              startDate={startDate}
              endDate={endDate}
              handleDateClick={handleDateClick}
            />

            <Notes
              startDate={startDate}
              endDate={endDate}
              currentMonth={currentMonth}
            />
          </div>
        ) : (
          /* 💻 DESKTOP FLIP */
          <div className="p-4 perspective min-h-[500px]">
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* FRONT */}
              <div className="absolute w-full h-full backface-hidden">
                <Calendar
                  currentMonth={currentMonth}
                  prevMonth={prevMonth}
                  nextMonth={nextMonth}
                  startDate={startDate}
                  endDate={endDate}
                  handleDateClick={handleDateClick}
                />
              </div>

              {/* BACK */}
              <div className="absolute w-full h-full rotate-y-180 backface-hidden">
                <Notes
                  startDate={startDate}
                  endDate={endDate}
                  currentMonth={currentMonth}
                />

                <button
                  onClick={() => setIsFlipped(false)}
                  className="mt-3 text-sm text-blue-600 underline"
                >
                  ← Back to Calendar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;